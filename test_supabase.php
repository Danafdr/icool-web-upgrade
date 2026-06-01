<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$cols = Illuminate\Support\Facades\DB::select("SELECT column_name FROM information_schema.columns WHERE table_name = 'contacts'");
$colNames = array_map(fn($c) => $c->column_name, $cols);
echo "Columns: " . implode(', ', $colNames) . "\n";

$migrations = Illuminate\Support\Facades\DB::select("SELECT migration FROM migrations");
$migNames = array_map(fn($m) => $m->migration, $migrations);
echo "Migrations: \n" . implode("\n", $migNames) . "\n";
