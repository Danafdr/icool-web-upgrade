<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\AdminReplyMail;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::query();

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('service_type') && $request->service_type !== 'all') {
            $query->where('hvac_issue_type', $request->service_type);
        }

        $totalForms = Contact::count();
        $unresolvedIssues = Contact::where('status', 'pending')->count();
        $newFormsThisWeek = Contact::where('created_at', '>=', now()->subWeek())->count();

        // Fetch distinct service types for filtering
        $serviceTypes = Contact::whereNotNull('hvac_issue_type')
            ->where('hvac_issue_type', '!=', '')
            ->distinct()
            ->pluck('hvac_issue_type')
            ->toArray();

        $forms = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/DashboardOverview', [
            'stats' => [
                'totalForms' => $totalForms,
                'unresolvedIssues' => $unresolvedIssues,
                'newFormsThisWeek' => $newFormsThisWeek,
            ],
            'forms' => $forms,
            'serviceTypes' => $serviceTypes,
            'filters' => $request->only(['search', 'status', 'service_type']),
        ]);
    }

    public function updateStatus(Request $request, Contact $contact)
    {
        $request->validate([
            'status' => 'required|in:pending,resolved',
        ]);

        $contact->update([
            'status' => $request->status,
        ]);

        return redirect()->back();
    }

    public function forms()
    {
        // Fetch paginated contacts for the Forms Manager
        $forms = Contact::latest()->paginate(10);

        return Inertia::render('Admin/FormsManager', [
            'forms' => $forms
        ]);
    }

    public function reply(Request $request, Contact $contact)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        if (!$contact->email) {
            return redirect()->back()->with('error', 'Kontak ini tidak memiliki alamat email.');
        }

        try {
            Mail::to($contact->email)->send(new AdminReplyMail($contact, $request->message));
            
            return redirect()->back()->with('success', 'Balasan email berhasil dikirim ke ' . $contact->email);
        } catch (\Throwable $e) {
            return redirect()->back()->with('error', 'Gagal mengirim email: ' . $e->getMessage());
        }
    }

    public function generateReply(Request $request, Contact $contact, \App\Services\GeminiService $geminiService)
    {
        try {
            $reply = $geminiService->generateReply($contact);
            return response()->json(['reply' => $reply]);
        } catch (\Throwable $e) {
            return response()->json(['reply' => 'Gagal menghasilkan balasan AI: ' . $e->getMessage()], 500);
        }
    }
}
