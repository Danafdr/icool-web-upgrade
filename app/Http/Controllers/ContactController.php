<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

use App\Services\GeminiService;

class ContactController extends Controller
{
    public function step1(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string|max:20',
            'hvac_issue_type' => 'nullable|string|max:255',
        ]);

        // Duplicate Checking: Prevent identical requests within 5 minutes
        $duplicate = Contact::where('phone', $validated['phone'])
            ->where('created_at', '>=', now()->subMinutes(5))
            ->first();
            
        if ($duplicate) {
            return response()->json([
                'success' => true,
                'order_id' => $duplicate->order_id,
                'is_duplicate' => true
            ]);
        }

        try {
            $contact = Contact::create([
                'name' => 'Calon Pelanggan', // Placeholder
                'phone' => $validated['phone'],
                'hvac_issue_type' => $validated['hvac_issue_type'],
                'address' => 'Belum diisi', // Placeholder
                'status' => 'menunggu'
            ]);
            
            $orderId = 'ORD-' . date('Ymd') . '-' . str_pad($contact->id, 4, '0', STR_PAD_LEFT);
            $contact->update(['order_id' => $orderId]);

            return response()->json([
                'success' => true,
                'order_id' => $orderId,
                'is_duplicate' => false
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan sistem. Mohon coba lagi.',
            ], 500);
        }
    }

    public function step2(Request $request, GeminiService $geminiService)
    {
        $validated = $request->validate([
            'order_id' => 'required|string',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string|max:500',
            'service_area' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $contact = Contact::where('order_id', $validated['order_id'])->first();

        if (!$contact) {
            return back()->with(['error' => 'Data pesanan tidak ditemukan.']);
        }

        try {
            $contact->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'],
                'service_area' => $validated['service_area'],
                'message' => $validated['message']
            ]);

            // Defer AI and Email processing to run after the response is sent to the user
            defer(function () use ($contact, $geminiService) {
                try {
                    // Gather all fields for AI analysis
                    $dataForAi = [
                        'name' => $contact->name,
                        'phone' => $contact->phone,
                        'email' => $contact->email,
                        'address' => $contact->address,
                        'service_area' => $contact->service_area,
                        'hvac_issue_type' => $contact->hvac_issue_type,
                        'message' => $contact->message,
                    ];

                    // AI Analysis
                    $analysis = $geminiService->analyzeContactForm($dataForAi);
                    
                    if (isset($analysis['is_spam']) && $analysis['is_spam'] === true) {
                        // Mark as spam and DO NOT send email
                        $contact->update([
                            'status' => 'spam',
                            'ai_summary' => $analysis['cleaned_message'] ?? 'Spam detected',
                            'ai_reasoning' => $analysis['reasoning'] ?? null,
                        ]);
                        return;
                    }

                    // Update with AI results
                    $contact->update([
                        'ai_summary' => $analysis['cleaned_message'] ?? null,
                        'urgency_level' => $analysis['urgency'] ?? null,
                        'ai_reasoning' => $analysis['reasoning'] ?? null,
                        'suggested_service' => $analysis['suggested_service'] ?? null,
                    ]);

                    // Send email if not spam
                    if ($contact->email) {
                        \Illuminate\Support\Facades\Mail::to($contact->email)
                            ->send(new \App\Mail\OrderReceivedMail($contact));
                    }
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::error('Deferred AI/Mail failed: ' . $e->getMessage());
                }
            });

            return back()->with([
                'success' => 'Permintaan Anda telah berhasil dikirim! Tim kami akan segera menghubungi Anda via WhatsApp.',
                'order_id' => $contact->order_id
            ]);
        } catch (\Throwable $e) {
            return back()->with([
                'error' => 'Terjadi kesalahan sistem. Mohon coba lagi atau hubungi kami langsung.',
            ]);
        }
    }
}
