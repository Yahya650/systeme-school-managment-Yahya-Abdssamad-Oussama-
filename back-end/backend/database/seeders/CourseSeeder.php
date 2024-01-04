<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the data for each school level
        $courses = [
            ['name' => 'ASSIDUITE ET CONDUITE', 'ceof' => 1, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof' => 5, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof' => 2, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'LANGUE FRANCAISE', 'ceof' => 5, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'LANGUE ARABE', 'ceof' => 3, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'MATHEMATIQUES', 'ceof' => 7, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'PHILOSOPHIE', 'ceof' => 2, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'PHYSIQUE CHIMIE', 'ceof' => 5, 'classe_type_id' => 12, 'filiere_id' => 1],
            ['name' => 'SC. DE LA VIE ET DE LA TERRE', 'ceof' => 7, 'classe_type_id' => 12, 'filiere_id' => 1],
        ];

        // Loop through the data and create SchoolLevel instances
        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
