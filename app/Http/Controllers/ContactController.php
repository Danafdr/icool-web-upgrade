<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

use App\Services\GeminiService;

class ContactController extends Controller
{
    public function store(Request $request, GeminiService $geminiService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'service_area' => 'nullable|string|max:255',
            'hvac_issue_type' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        // Duplicate Checking: Prevent identical requests within 5 minutes
        $duplicate = Contact::where('phone', $validated['phone'])
            ->where('created_at', '>=', now()->subMinutes(5))
            ->first();
            
        if ($duplicate) {
            return back()->with([
                'success' => 'Permintaan Anda sudah kami terima sebelumnya. Mohon tunggu tim kami menghubungi Anda.',
                'order_id' => $duplicate->order_id
            ]);
        }

        // Create contact immediately so user doesn't wait
        try {
            $contact = Contact::create(array_merge($validated, [
                'status' => 'menunggu'
            ]));
            
            $orderId = 'ORD-' . date('Ymd') . '-' . str_pad($contact->id, 4, '0', STR_PAD_LEFT);
            $contact->update(['order_id' => $orderId]);

            // Defer AI and Email processing to run after the response is sent to the user
            defer(function () use ($contact, $validated, $geminiService) {
                try {
                    // AI Analysis
                    $analysis = $geminiService->analyzeContactForm($validated);
                    
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
                'success' => 'Permintaan Anda telah berhasil dikirim! Tim kami akan segera menghubungi Anda.',
                'order_id' => $orderId
            ]);
        } catch (\Throwable $e) {
            return back()->with([
                'error' => 'Terjadi kesalahan sistem. Mohon coba lagi atau hubungi kami langsung.',
            ]);
        }
    }
}
