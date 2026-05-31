<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'hvac_issue_type' => 'nullable|string',
            'message' => 'nullable|string'
        ]);

        // Generate Order ID (e.g., ORD-20260531-0001) first, but wait, $contact->id is only available after creation.
        // So we create the contact, generate the ID, and then update it.
        $contact = Contact::create($validated);
        
        $orderId = 'ORD-' . date('Ymd') . '-' . str_pad($contact->id, 4, '0', STR_PAD_LEFT);
        $contact->update(['order_id' => $orderId]);

        if ($contact->email) {
            \Illuminate\Support\Facades\Mail::to($contact->email)
                ->send(new \App\Mail\OrderReceivedMail($contact));
        }

        return back()->with([
            'success' => 'Your request has been sent successfully!',
            'order_id' => $orderId
        ]);
    }
}
