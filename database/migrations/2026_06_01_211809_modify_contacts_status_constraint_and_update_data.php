<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();
        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_status_check');
            DB::statement("ALTER TABLE contacts ADD CONSTRAINT contacts_status_check CHECK (status IN ('menunggu', 'dijadwalkan', 'dalam_proses', 'selesai', 'spam', 'pending', 'resolved'))");
        } elseif ($driver === 'mysql') {
            // MySQL drop constraint syntax varies, but we can just skip check constraints in MySQL for this simple case or alter the column if it was an ENUM
            // Let's assume it was just a string
        }

        DB::table('contacts')->where('status', 'pending')->update(['status' => 'menunggu']);
        DB::table('contacts')->where('status', 'resolved')->update(['status' => 'selesai']);
    }

    public function down(): void
    {
        DB::table('contacts')->where('status', 'menunggu')->update(['status' => 'pending']);
        DB::table('contacts')->where('status', 'selesai')->update(['status' => 'resolved']);
    }
};
