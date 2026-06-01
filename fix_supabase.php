<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    Illuminate\Support\Facades\DB::statement('ALTER TABLE contacts ADD COLUMN ai_summary TEXT NULL;');
    echo "Added ai_summary.\n";
} catch (\Exception $e) { echo $e->getMessage() . "\n"; }

try {
    Illuminate\Support\Facades\DB::statement('ALTER TABLE contacts ADD COLUMN urgency_level VARCHAR(255) NULL;');
    echo "Added urgency_level.\n";
} catch (\Exception $e) { echo $e->getMessage() . "\n"; }

try {
    Illuminate\Support\Facades\DB::statement('ALTER TABLE contacts ADD COLUMN service_area VARCHAR(255) NULL;');
    echo "Added service_area.\n";
} catch (\Exception $e) { echo $e->getMessage() . "\n"; }

// And for the status enum modification:
try {
    // In Postgres, to add a value to an enum, it's a specific syntax. But wait, what is the type of 'status' in Supabase?
    $type = Illuminate\Support\Facades\DB::select("SELECT data_type FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'status'");
    echo "Status type: " . $type[0]->data_type . "\n";
    if ($type[0]->data_type === 'USER-DEFINED') {
        Illuminate\Support\Facades\DB::statement("ALTER TYPE contacts_status_enum ADD VALUE IF NOT EXISTS 'spam'");
        echo "Added spam to enum.\n";
    } else {
        Illuminate\Support\Facades\DB::statement("ALTER TABLE contacts ALTER COLUMN status TYPE VARCHAR(255)");
        echo "Changed status to varchar.\n";
    }
} catch (\Exception $e) { echo $e->getMessage() . "\n"; }

// Mark migrations as ran
Illuminate\Support\Facades\DB::insert("INSERT INTO migrations (migration, batch) VALUES ('2026_05_31_200231_add_ai_columns_to_contacts_table', 3) ON CONFLICT DO NOTHING");
Illuminate\Support\Facades\DB::insert("INSERT INTO migrations (migration, batch) VALUES ('2026_06_01_181201_modify_status_enum_in_contacts_table', 3) ON CONFLICT DO NOTHING");
Illuminate\Support\Facades\DB::insert("INSERT INTO migrations (migration, batch) VALUES ('2026_06_01_183054_add_service_area_to_contacts_table', 3) ON CONFLICT DO NOTHING");
echo "Done.\n";
