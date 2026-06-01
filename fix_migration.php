<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

Illuminate\Support\Facades\DB::insert("INSERT INTO migrations (migration, batch) VALUES ('2026_05_31_181328_add_order_id_to_contacts_table', 3)");
echo "Inserted migration record.\n";
