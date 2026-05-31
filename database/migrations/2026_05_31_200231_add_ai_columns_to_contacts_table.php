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
            $table->text('ai_summary')->nullable()->after('message');
            $table->string('urgency_level')->nullable()->after('ai_summary'); // low, medium, high
            // We can't easily alter an ENUM in Postgres using Blueprint reliably without raw SQL,
            // so we will just leave the status column as a string or ENUM and assume it works if we use a check or string.
            // Wait, looking at the previous schema dump, `status` might just be a string. Let's not alter it unless needed.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn(['ai_summary', 'urgency_level']);
        });
    }
};
