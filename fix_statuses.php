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

    echo "Updating check constraint...\n";
    
    // Drop existing constraint if exists
    try {
        $pdo->exec("ALTER TABLE contacts DROP CONSTRAINT contacts_status_check;");
        echo "Dropped old constraint.\n";
    } catch (Exception $e) {
        echo "Could not drop constraint, it might not exist or have a different name.\n";
    }

    // Add new constraint
    $pdo->exec("ALTER TABLE contacts ADD CONSTRAINT contacts_status_check CHECK (status IN ('menunggu', 'dijadwalkan', 'dalam_proses', 'selesai', 'spam', 'pending', 'resolved'));");
    echo "Added new constraint.\n";

    echo "Updating statuses...\n";
    
    $stmt1 = $pdo->prepare("UPDATE contacts SET status = 'menunggu' WHERE status = 'pending'");
    $stmt1->execute();
    echo $stmt1->rowCount() . " rows updated from pending to menunggu.\n";
    
    $stmt2 = $pdo->prepare("UPDATE contacts SET status = 'selesai' WHERE status = 'resolved'");
    $stmt2->execute();
    echo $stmt2->rowCount() . " rows updated from resolved to selesai.\n";

    echo "Status update complete!\n";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
