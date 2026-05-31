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
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'hvac_issue_type' => 'nullable|string',
            'message' => 'nullable|string'
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

        // AI Analysis
        $analysis = $geminiService->analyzeContactForm($validated);

        // Prepare data for creation
        $contactData = array_merge($validated, [
            'ai_summary' => $analysis['cleaned_message'] ?? null,
            'urgency_level' => $analysis['urgency'] ?? null,
        ]);

        if (isset($analysis['is_spam']) && $analysis['is_spam'] === true) {
            $contactData['status'] = 'spam';
        }

        // Generate Order ID (e.g., ORD-20260531-0001) first, but wait, $contact->id is only available after creation.
        // So we create the contact, generate the ID, and then update it.
        $contact = Contact::create($contactData);
        
        try {
            $orderId = 'ORD-' . date('Ymd') . '-' . str_pad($contact->id, 4, '0', STR_PAD_LEFT);
            $contact->update(['order_id' => $orderId]);

            // Don't send confirmation email if it's spam
            if ($contact->email && $contact->status !== 'spam') {
                \Illuminate\Support\Facades\Mail::to($contact->email)
                    ->send(new \App\Mail\OrderReceivedMail($contact));
            }

            return back()->with([
                'success' => 'Your request has been sent successfully!',
                'order_id' => $orderId
            ]);
        } catch (\Throwable $e) {
            // Flash the EXACT error to the frontend so we can see what's wrong!
            return back()->with([
                'success' => 'ERROR LOG: ' . $e->getMessage(),
                'order_id' => 'ERROR'
            ]);
        }
    }
}
