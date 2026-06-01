<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;

class ScheduleController extends Controller
{
    public function index()
    {
        // Fetch contacts that are scheduled or in progress, eager loading the technician
        $scheduledJobs = Contact::with('technician')
            ->whereIn('status', ['dijadwalkan', 'dalam_proses'])
            ->whereNotNull('scheduled_at')
            ->orderBy('scheduled_at', 'asc')
            ->get();

        return Inertia::render('Admin/ScheduleCalendar', [
            'jobs' => $scheduledJobs
        ]);
    }
}
