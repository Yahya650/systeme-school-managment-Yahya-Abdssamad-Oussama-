<?php

namespace Database\Seeders;

use App\Models\SchoolLevel;
use Illuminate\Database\Seeder;

class SchoolLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the data for each school level
        $schoolLevelsData = [
            ['name' => 'Préscolaire', 'passing_mark' => "5"],
            ['name' => 'Primaire', 'passing_mark' => "5"],
            ['name' => 'Collége', 'passing_mark' => "10"],
            ['name' => 'Lycée', 'passing_mark' => "10"],
        ];

        // Loop through the data and create SchoolLevel instances
        foreach ($schoolLevelsData as $schoolLevelData) {
            SchoolLevel::create($schoolLevelData);
        }
    }
}
