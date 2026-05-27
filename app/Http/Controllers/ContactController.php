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

        // Save to database
        Contact::create($validated);

        // Here you would typically send an email.
        // Mail::to('info@icool.co.id')->send(new ContactMail($validated));

        return back()->with('success', 'Your request has been sent successfully!');
    }
}
