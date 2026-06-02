<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Services\GeminiService;
use Spatie\SimpleExcel\SimpleExcelReader;
use Illuminate\Support\Facades\Log;

class ImportController extends Controller
{
    protected GeminiService $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:5120',
        ]);

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, ['csv', 'xlsx', 'xls'])) {
            return redirect()->back()->with('error', 'Format file harus berupa CSV atau Excel.');
        }

        $path = $file->getRealPath();

        try {
            $rows = SimpleExcelReader::create($path, $extension)->getRows()->toArray();
            
            if (empty($rows)) {
                return redirect()->back()->with('error', 'File kosong atau tidak memiliki data.');
            }

            // Limit to 50 rows for safety in MVP (sync processing)
            $rowsToProcess = array_slice($rows, 0, 50);

            // Chunk in groups of 10 to avoid Gemini payload limits / timeouts
            $chunks = array_chunk($rowsToProcess, 10);
            $importedCount = 0;

            foreach ($chunks as $chunk) {
                // Remove empty rows from chunk
                $chunk = array_filter($chunk, function($row) {
                    return count(array_filter($row)) > 0;
                });

                if (empty($chunk)) continue;

                try {
                    $aiResults = $this->geminiService->bulkAnalyzeData(array_values($chunk));
                    
                    foreach ($aiResults as $result) {
                        if (isset($result['is_spam']) && $result['is_spam'] === true) {
                            continue; // Skip spam
                        }

                        Contact::create([
                            'name' => $result['name'] ?? 'Pelanggan',
                            'phone' => $result['phone'] ?? null,
                            'message' => $result['message'] ?? 'Tidak ada pesan',
                            'ai_summary' => $result['message'] ?? 'Tidak ada pesan',
                            'hvac_issue_type' => $result['hvac_issue_type'] ?? null,
                            'urgency_level' => $result['urgency_level'] ?? 'medium',
                            'status' => 'menunggu',
                            'is_spam' => false,
                        ]);
                        $importedCount++;
                    }
                } catch (\Exception $e) {
                    Log::error("Error processing chunk: " . $e->getMessage());
                    // Continue to next chunk even if one fails
                }
            }

            return redirect()->back()->with('success', "Berhasil mengimpor {$importedCount} data pelanggan.");
            
        } catch (\Exception $e) {
            Log::error('Import error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal memproses file. Pastikan format benar.');
        }
    }
}
