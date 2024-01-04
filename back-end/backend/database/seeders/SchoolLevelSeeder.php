<?php

namespace Database\Seeders;

use App\Models\SchoolLevel;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SchoolLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the data for each school level
        $schoolLevelsData = [
            ['name' => 'Primaire'],
            ['name' => 'College'],
            ['name' => 'Lycée'],
        ];

        // Loop through the data and create SchoolLevel instances
        foreach ($schoolLevelsData as $schoolLevelData) {
            SchoolLevel::create($schoolLevelData);
        }
    }
}
