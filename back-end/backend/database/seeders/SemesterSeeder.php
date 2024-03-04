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

        $semestersData = [
            // Semestres
            ['name' => 'Premiere Semestres', 'semester' => 1],
            ['name' => 'Deuxième Semestres', 'semester' => 2],
        ];

        foreach ($semestersData as $semesterData) {
            Semester::create($semesterData);
        }
    }
}
