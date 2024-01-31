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
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],

            // 2AP
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 5, 'filiere_id' => 2],


            // 3AP
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 6, 'filiere_id' => 3],


            // 4AP
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Sociétés ( الجتماعيات )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 7, 'filiere_id' => 4],

            // 5AP
            // Arabe
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Sociétés ( الجتماعيات )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 8, 'filiere_id' => 5],

            // 6AP
            // Arabe
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Langue Francais', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Langue amazighe', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 2, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Sociétés ( الجتماعيات )', 'ceof1' => 1, 'ceof2' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Activité Scientifique ( النشاط العلمي )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Informatique ( المعلوميات )', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Éducation Artistique ( التربية الفنية )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 9, 'filiere_id' => 6],


            // Collège
            // 1AP
            ['name' => 'الجتماعيات', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Mathematiques', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Physique Chimie	( الفيزياء والكيمياء )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Langue Arabe', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Langue Francaise', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'SC. De le vie et de la terre ( علوم الحياة والأرض )', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 10, 'filiere_id' => 7],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 10, 'filiere_id' => 7],


            // 2AP
            ['name' => 'الجتماعيات', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Mathematiques', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Physique Chimie	( الفيزياء والكيمياء )', 'ceof1' => 2, 'ceof2' => 2, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Langue Arabe', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Langue Francaise', 'ceof1' => 5, 'ceof2' => 5, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'SC. De le vie et de la terre ( علوم الحياة والأرض )', 'ceof1' => 3, 'ceof2' => 3, 'classe_type_id' => 11, 'filiere_id' => 8],
            ['name' => 'Langue English', 'ceof1' => 0, 'ceof2' => 0, 'classe_type_id' => 11, 'filiere_id' => 8],


            // 3AP
            ['name' => 'الجتماعيات', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Éducation Islamique ( التربية الاسلامية )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Éducation Physique ( التربية البدنية )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Mathematiques', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Physique Chimie	( الفيزياء والكيمياء )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Langue English', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Langue Arabe', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'Langue Francaise', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 3, 'classe_type_id' => 12, 'filiere_id' => 9],
            ['name' => 'SC. De le vie et de la terre ( علوم الحياة والأرض )', 'ceof1' => 1, 'ceof2' => 1, 'ceof_final1' => 1, 'ceof_final2' => 1, 'classe_type_id' => 12, 'filiere_id' => 9],

        ];

        // Loop through the data and create SchoolLevel instances
        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
