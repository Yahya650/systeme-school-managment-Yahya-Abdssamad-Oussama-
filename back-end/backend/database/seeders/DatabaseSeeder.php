<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Factories\AdminFactory;
use Database\Factories\StudentFactory;
use Database\Factories\TeacherFactory;
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
        $this->call([
            SuperAdminSeeder::class,
            SchoolLevelSeeder::class,
            AdminSeeder::class,
            ClasseTypeSeeder::class,
            FiliereSeeder::class,
            CourseSeeder::class,
            ModuleSeeder::class,
            SemesterSeeder::class,
            ClasseSeeder::class,
            TeacherSeeder::class,
            StudentParentSeeder::class,
            StudentSeeder::class,
        ]);
    }
}
