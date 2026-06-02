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
        $query = Contact::with('technician');

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

        $totalForms = Contact::where('status', '!=', 'spam')->count();
        $waitingForSchedule = Contact::where('status', 'menunggu')->count();
        $inProgress = Contact::whereIn('status', ['dijadwalkan', 'dalam_proses'])->count();
        $resolved = Contact::where('status', 'selesai')->count();

        // Fetch distinct service types for filtering
        $serviceTypes = Contact::whereNotNull('hvac_issue_type')
            ->where('hvac_issue_type', '!=', '')
            ->distinct()
            ->pluck('hvac_issue_type')
            ->toArray();

        $forms = $query->latest()->paginate(10)->withQueryString();

        $technicians = \App\Models\Technician::where('status', 'active')->get();

        return Inertia::render('Admin/DashboardOverview', [
            'stats' => [
                'totalForms' => $totalForms,
                'waitingForSchedule' => $waitingForSchedule,
                'inProgress' => $inProgress,
                'resolved' => $resolved,
            ],
            'forms' => $forms,
            'serviceTypes' => $serviceTypes,
            'technicians' => $technicians,
            'filters' => $request->only(['search', 'status', 'service_type']),
        ]);
    }

    public function updateStatus(Request $request, Contact $contact)
    {
        $request->validate([
            'status' => 'required|in:menunggu,dijadwalkan,dalam_proses,selesai,spam',
        ]);

        $contact->update([
            'status' => $request->status,
        ]);

        return redirect()->back();
    }

    public function updateNotes(Request $request, Contact $contact)
    {
        $request->validate([
            'internal_notes' => 'nullable|string',
        ]);

        $contact->update([
            'internal_notes' => $request->internal_notes,
        ]);

        return redirect()->back();
    }

    public function schedule(Request $request, Contact $contact)
    {
        $request->validate([
            'technician_id' => 'required|exists:technicians,id',
            'scheduled_at' => 'required|date',
        ]);

        $contact->update([
            'technician_id' => $request->technician_id,
            'scheduled_at' => \Carbon\Carbon::parse($request->scheduled_at)->format('Y-m-d H:i:s'),
            'status' => 'dijadwalkan', // Automatically move to scheduled status
        ]);

        return redirect()->back();
    }

    public function forms(Request $request)
    {
        $query = Contact::with('technician');

        // Apply search if exists
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        
        // Allowed sort columns to prevent SQL injection
        $allowedSorts = ['created_at', 'urgency_level', 'status'];
        if (in_array($sortBy, $allowedSorts)) {
            // For urgency, we might want custom ordering if sorting by string, but desc sort string works ok (high -> medium -> low)
            $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');
        } else {
            $query->latest();
        }

        // Fetch paginated contacts for the Forms Manager
        $contacts = $query->paginate(10)->withQueryString();
        $technicians = \App\Models\Technician::where('status', 'active')->get();

        return Inertia::render('Admin/FormsManager', [
            'forms' => $contacts,
            'technicians' => $technicians,
            'filters' => $request->only(['search', 'sort_by', 'sort_dir']),
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

    public function refineReply(Request $request, \App\Services\GeminiService $geminiService)
    {
        $request->validate([
            'draft' => 'required|string'
        ]);

        try {
            $refined = $geminiService->refineReply($request->input('draft'));
            return response()->json(['reply' => $refined]);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('refineReply Controller Error: ' . $e->getMessage() . ' ' . $e->getTraceAsString());
            return response()->json(['reply' => 'Gagal memperbaiki balasan: ' . $e->getMessage()], 500);
        }
    }

    public function history(Contact $contact)
    {
        // If there's no email or phone to match on, return empty history
        if (!$contact->email && !$contact->phone) {
            return response()->json(['history' => []]);
        }

        // Find other contacts with same email or phone, excluding this one
        $query = Contact::where('id', '!=', $contact->id);
        
        $query->where(function($q) use ($contact) {
            if ($contact->email) {
                $q->where('email', $contact->email);
            }
            if ($contact->phone) {
                $q->orWhere('phone', $contact->phone);
            }
        });

        $history = $query->latest()->get();

        return response()->json(['history' => $history]);
    }
}
