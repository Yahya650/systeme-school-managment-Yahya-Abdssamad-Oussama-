<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Modules = [
            # Primaire
            // 1AP
            // Arabe
            ['name' => 'التعبير الكتابي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'الخط', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'النقل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'الاستماع والتحدث', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 1, 'classe_type_id' => 4, 'filiere_id' => 1],

            // Français
            ['name' => 'Projet de classe', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 2, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Activités orales', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 2, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Graphisme', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 2, 'classe_type_id' => 4, 'filiere_id' => 1],
            ['name' => 'Comptine/Chant', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 2, 'classe_type_id' => 4, 'filiere_id' => 1],


            // 2AP
            // Arabe
            ['name' => 'التعبير الكتابي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'الخط', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'الاستماع والتحدث', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'تمارين كتابية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 11, 'classe_type_id' => 5, 'filiere_id' => 2],

            // Français
            ['name' => 'Activités de prod. écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Lexique', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Grammaire', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Conjugaison', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Orthographe/Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Copie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Activités orales', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Poésie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Lecture', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Ecriture/Copie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Expression Écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],
            ['name' => 'Projet de classe', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 12, 'classe_type_id' => 5, 'filiere_id' => 2],


            // 3AP
            // Arabe
            ['name' => 'التعبير الكتابي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'الاستماع والتحدث', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'التطبيقات كتابية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'مشروع الوحدة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 21, 'classe_type_id' => 6, 'filiere_id' => 3],

            // Français
            ['name' => 'Activités de prod. écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Lexique', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Grammaire', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Conjugaison', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Activités orales', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Poésie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Lecture', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Ecriture/Copie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Exercices Écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Production de l\'écrit', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],
            ['name' => 'Projet de classe', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 22, 'classe_type_id' => 6, 'filiere_id' => 3],


            // 4AP
            // Arabe
            ['name' => 'التعبير الكتابي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'التراكيب', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'الصرف والتحويل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'مشروع الوحدة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'التواصل الشفهي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 31, 'classe_type_id' => 7, 'filiere_id' => 4],

            // Français
            ['name' => 'Lexique', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Grammaire', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Conjugaison', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Activités orales', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Poésie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Lecture', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Ecriture/Copie', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Orthographe/Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Production de l\'écrit', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'Projet de classe', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 32, 'classe_type_id' => 7, 'filiere_id' => 4],

            // Sociétés ( الجتماعيات )
            ['name' => 'التاريخ', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 37, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'الجغرافية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 37, 'classe_type_id' => 7, 'filiere_id' => 4],
            ['name' => 'التربية المدنية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 37, 'classe_type_id' => 7, 'filiere_id' => 4],


            // 5AP
            // Arabe
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'الشكل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'التراكيب', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'الصرف والتحويل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'فهم المقروء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'انشاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'التواصل الشفهي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'مشروع الوحدة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 42, 'classe_type_id' => 8, 'filiere_id' => 5],

            // Français
            ['name' => 'Activités de prod. écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Lexique', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Grammaire', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Conjugaison', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Orthographe/Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Activités de Lecture', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Communication et actes de langage', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'Poésie/Lecture/Diction', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 43, 'classe_type_id' => 8, 'filiere_id' => 5],

            // Sociétés ( الجتماعيات )
            ['name' => 'التاريخ', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 48, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'الجغرافية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 48, 'classe_type_id' => 8, 'filiere_id' => 5],
            ['name' => 'التربية المدنية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 48, 'classe_type_id' => 8, 'filiere_id' => 5],


            // 6AP
            // Arabe
            ['name' => 'القراءة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'الاملاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'الشكل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'التراكيب', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'الصرف والتحويل', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'فهم المقروء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'انشاء', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'التواصل الشفهي', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'مشروع الوحدة', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 53, 'classe_type_id' => 9, 'filiere_id' => 6],

            // Français
            ['name' => 'Activités de prod. écrite', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Lexique', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Grammaire', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Conjugaison', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Orthographe/Dictée', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Activités de Lecture', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Communication et actes de langage', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'Poésie/Lecture/Diction', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 54, 'classe_type_id' => 9, 'filiere_id' => 6],

            // Sociétés ( الجتماعيات )
            ['name' => 'التاريخ', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 59, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'الجغرافية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 59, 'classe_type_id' => 9, 'filiere_id' => 6],
            ['name' => 'التربية المدنية', 'ceof1' => 1, 'ceof2' => 1, 'course_id' => 59, 'classe_type_id' => 9, 'filiere_id' => 6],

        ];

        foreach ($Modules as $Module) {
            Module::create($Module);
        }
    }
}
