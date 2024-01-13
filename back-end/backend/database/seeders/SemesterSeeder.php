<?php

namespace Database\Seeders;

use App\Models\Semester;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Define the data for each semester
        $semestersData = [
            // Semestres
            ['name' => 'Semester 1', 'semester' => 1],
            ['name' => 'Semester 2', 'semester' => 2],
        ];

        // Loop through the data and create Semester instances
        foreach ($semestersData as $semesterData) {
            Semester::create($semesterData);
        }
    }
}
