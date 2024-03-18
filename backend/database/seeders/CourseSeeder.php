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

            # Primaire
            // 1AP
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],

            // 2AP
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],


            // 3AP
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],


            // 4AP
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Sociétés', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],

            // 5AP
            // Arabe
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Sociétés', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],

            // 6AP
            // Arabe
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 2, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'HISTOIRE GEOGRAPHIE', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Activité Scientifique', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Informatique', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Éducation Artistique', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],


            // Collège
            // 1AP
            ['name' => 'HISTOIRE GEOGRAPHIE', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'PHYSIQUE CHIMIE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'LANGUE ARABE', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'SC. DE LA VIE ET DE LA TERRE', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 10, 'filiere_id' => 7],


            // 2AP
            ['name' => 'HISTOIRE GEOGRAPHIE', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'PHYSIQUE CHIMIE', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'LANGUE ARABE', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'SC. DE LA VIE ET DE LA TERRE', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 11, 'filiere_id' => 8],


            // 3AP
            ['name' => 'HISTOIRE GEOGRAPHIE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'INSTRUCTION ISLAMIQUE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'EDUCATION PHYSIQUE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'MATHEMATIQUES', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'PHYSIQUE CHIMIE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'LANGUE ANGLAISE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'LANGUE ARABE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'LANGUE FRANCAISE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'SC. DE LA VIE ET DE LA TERRE', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],

        ];

        // Loop through the data and create SchoolLevel instances
        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
