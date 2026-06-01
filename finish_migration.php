<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts MODIFY COLUMN status ENUM('pending', 'resolved', 'spam', 'menunggu', 'dijadwalkan', 'dalam_proses', 'selesai') NOT NULL DEFAULT 'pending'");
Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'menunggu' WHERE status = 'pending'");
Illuminate\Support\Facades\DB::statement("UPDATE contacts SET status = 'selesai' WHERE status = 'resolved'");
Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts MODIFY COLUMN status ENUM('menunggu', 'dijadwalkan', 'dalam_proses', 'selesai', 'spam') NOT NULL DEFAULT 'menunggu'");
Illuminate\Support\Facades\DB::insert("INSERT INTO migrations (migration, batch) VALUES ('2026_06_01_200635_add_workflow_columns_to_contacts_table', 3)");

echo "Migration manually finished successfully.";
