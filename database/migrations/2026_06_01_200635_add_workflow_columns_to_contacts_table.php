<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('address')->nullable()->after('email');
            $table->text('ai_reasoning')->nullable()->after('urgency_level');
            $table->string('suggested_service')->nullable()->after('hvac_issue_type');
            $table->text('internal_notes')->nullable()->after('message');
            $table->dateTime('scheduled_at')->nullable()->after('internal_notes');
            $table->foreignId('technician_id')->nullable()->constrained('technicians')->nullOnDelete()->after('scheduled_at');
        });

        // Modify the status ENUM safely using a 4-step process to prevent data truncation
        if (\Illuminate\Support\Facades\DB::getDriverName() === 'mysql') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts MODIFY COLUMN status ENUM('pending', 'resolved', 'spam', 'menunggu', 'dijadwalkan', 'dalam_proses', 'selesai') NOT NULL DEFAULT 'pending'");
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'menunggu' WHERE status = 'pending'");
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'selesai' WHERE status = 'resolved'");
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts MODIFY COLUMN status ENUM('menunggu', 'dijadwalkan', 'dalam_proses', 'selesai', 'spam') NOT NULL DEFAULT 'menunggu'");
        } else {
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'menunggu' WHERE status = 'pending'");
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'selesai' WHERE status = 'resolved'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropForeign(['technician_id']);
            $table->dropColumn([
                'address', 
                'ai_reasoning', 
                'suggested_service', 
                'internal_notes', 
                'scheduled_at', 
                'technician_id'
            ]);
        });

        if (\Illuminate\Support\Facades\DB::getDriverName() === 'mysql') {
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'pending' WHERE status = 'menunggu'");
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'resolved' WHERE status = 'selesai'");
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts MODIFY COLUMN status ENUM('pending', 'resolved', 'spam', 'menunggu', 'dijadwalkan', 'dalam_proses', 'selesai') NOT NULL DEFAULT 'pending'");
        } else {
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'pending' WHERE status = 'menunggu'");
            \Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'resolved' WHERE status = 'selesai'");
        }
    }
};
