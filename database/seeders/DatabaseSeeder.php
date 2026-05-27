<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Team;
use App\Enums\TeamRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@icool.co.id'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('Secret123!'),
            ]
        );

        $team = Team::create([
            'name' => 'Admin Team',
            'is_personal' => true,
        ]);

        // Attach admin user to team as Owner via pivot
        $team->members()->attach($user->id, ['role' => TeamRole::Owner->value]);

        // Set as current team
        $user->current_team_id = $team->id;
        $user->save();
    }
}
