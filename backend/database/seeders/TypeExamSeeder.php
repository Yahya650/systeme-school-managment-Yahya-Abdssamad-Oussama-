<?php

namespace Database\Seeders;

use App\Models\TypeExam;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TypeExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $type_exams = [
            ['name' => 'Premier contrôle', 'type' => 'cc1'],
            ['name' => 'Deuxième contrôle', 'type' => 'cc2'],
            ['name' => 'Troisième contrôle', 'type' => 'cc3'],
            ['name' => 'Quatrième contrôle', 'type' => 'cc4'],
            ['name' => 'Activités intégrées', 'type' => 'AI'],
            ['name' => 'Note Examen', 'type' => 'cff'],
        ];
        foreach ($type_exams as $type_exam) {
            TypeExam::create($type_exam);
        }
    }
}
