<?php
$host = 'aws-1-ap-southeast-1.pooler.supabase.com';
$db = 'postgres';
$user = 'postgres.uwpvuirxqgvytbdcbkmv';
$pass = 'icoolproject123';
$port = '6543';

$dsn = "pgsql:host=$host;port=$port;dbname=$db;sslmode=require";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Updating technicians table...\n";
    $pdo->exec("ALTER TABLE technicians ADD COLUMN IF NOT EXISTS specialization VARCHAR(255) NULL");
    $pdo->exec("ALTER TABLE technicians ADD COLUMN IF NOT EXISTS service_area VARCHAR(255) NULL");
    echo "Columns added successfully!\n";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
