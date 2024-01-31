<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Database\Seeders\CourseSeeder;
use Database\Seeders\ModuleSeeder;
use Database\Seeders\FiliereSeeder;
use Database\Seeders\SemesterSeeder;
use Illuminate\Foundation\Auth\User;
use Database\Seeders\ClasseTypeSeeder;
use Database\Seeders\SuperAdminSeeder;
use Database\Seeders\SchoolLevelSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([
            SchoolLevelSeeder::class,
            ClasseTypeSeeder::class,
            FiliereSeeder::class,
            SuperAdminSeeder::class,
            CourseSeeder::class,
            ModuleSeeder::class,
            SemesterSeeder::class,
        ]);
    }
}
