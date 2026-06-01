<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use App\Models\Technician;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $sixMonthsAgo = $now->copy()->subMonths(5)->startOfMonth();

        // 1. Leads per month (last 6 months)
        $leadsPerMonth = Contact::where('status', '!=', 'spam')
            ->where('created_at', '>=', $sixMonthsAgo)
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        // Map to displayable format
        $monthlyLeads = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = $now->copy()->subMonths($i);
            $monthKey = $month->format('Y-m');
            $monthName = $month->translatedFormat('M Y');
            
            $found = $leadsPerMonth->firstWhere('month', $monthKey);
            $monthlyLeads[] = [
                'name' => $monthName,
                'count' => $found ? $found->count : 0
            ];
        }

        // 2. Service Types breakdown
        $serviceBreakdown = Contact::where('status', '!=', 'spam')
            ->whereNotNull('hvac_issue_type')
            ->where('hvac_issue_type', '!=', '')
            ->selectRaw('hvac_issue_type as name, COUNT(*) as value')
            ->groupBy('hvac_issue_type')
            ->orderByDesc('value')
            ->get();

        // 3. Completion Rate by Technician
        $technicians = Technician::withCount(['contacts as total_jobs', 'contacts as completed_jobs' => function ($query) {
            $query->where('status', 'selesai');
        }])->get();

        $techStats = $technicians->map(function ($tech) {
            $rate = $tech->total_jobs > 0 ? round(($tech->completed_jobs / $tech->total_jobs) * 100) : 0;
            return [
                'id' => $tech->id,
                'name' => $tech->name,
                'total_jobs' => $tech->total_jobs,
                'completed_jobs' => $tech->completed_jobs,
                'completion_rate' => $rate
            ];
        });

        // 4. Overall Stats
        $totalLeads = Contact::where('status', '!=', 'spam')->count();
        $totalResolved = Contact::where('status', 'selesai')->count();
        
        // Calculate average resolution time (rough estimate using created_at and updated_at for resolved jobs)
        $resolvedJobs = Contact::where('status', 'selesai')->get();
        $avgResponseHours = 0;
        
        if ($resolvedJobs->count() > 0) {
            $totalHours = 0;
            foreach ($resolvedJobs as $job) {
                // If it's resolved, updated_at is the rough resolution time
                $totalHours += $job->created_at->diffInHours($job->updated_at);
            }
            $avgResponseHours = round($totalHours / $resolvedJobs->count());
        }

        return Inertia::render('Admin/Analytics', [
            'monthlyLeads' => $monthlyLeads,
            'serviceBreakdown' => $serviceBreakdown,
            'technicianStats' => $techStats,
            'overallStats' => [
                'totalLeads' => $totalLeads,
                'completionRate' => $totalLeads > 0 ? round(($totalResolved / $totalLeads) * 100) : 0,
                'avgResolutionHours' => $avgResponseHours
            ]
        ]);
    }
}
