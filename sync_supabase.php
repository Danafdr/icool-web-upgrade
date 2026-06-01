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

    // 1. Create technicians table
    echo "Creating technicians table...\n";
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS technicians (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            status VARCHAR(50) DEFAULT 'active',
            created_at TIMESTAMP NULL,
            updated_at TIMESTAMP NULL
        );
    ");

    // 2. Add new columns to contacts table
    echo "Adding columns to contacts table...\n";
    $columnsToAdd = [
        'internal_notes' => 'TEXT NULL',
        'scheduled_at' => 'TIMESTAMP NULL',
        'technician_id' => 'BIGINT NULL',
        'ai_reasoning' => 'TEXT NULL',
        'suggested_service' => 'VARCHAR(255) NULL'
    ];

    foreach ($columnsToAdd as $column => $type) {
        try {
            $pdo->exec("ALTER TABLE contacts ADD COLUMN \"$column\" $type;");
            echo "Added $column\n";
        } catch (Exception $e) {
            // Column might already exist
            echo "Skipped $column (might already exist)\n";
        }
    }

    echo "Done syncing Supabase schema!\n";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
