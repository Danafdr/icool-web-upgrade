<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Technician;
use Inertia\Inertia;

class TechnicianController extends Controller
{
    public function index()
    {
        $technicians = Technician::latest()->paginate(10);
        return Inertia::render('Admin/TechnicianManager', [
            'technicians' => $technicians
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
        ]);

        Technician::create($request->all());

        return redirect()->back()->with('success', 'Teknisi berhasil ditambahkan.');
    }

    public function update(Request $request, Technician $technician)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
        ]);

        $technician->update($request->all());

        return redirect()->back()->with('success', 'Data teknisi berhasil diperbarui.');
    }

    public function destroy(Technician $technician)
    {
        // Don't delete if they have assigned contacts, just set to inactive
        if ($technician->contacts()->count() > 0) {
            $technician->update(['status' => 'inactive']);
            return redirect()->back()->with('success', 'Teknisi di-nonaktifkan karena memiliki riwayat jadwal.');
        }

        $technician->delete();
        return redirect()->back()->with('success', 'Teknisi berhasil dihapus.');
    }
}
