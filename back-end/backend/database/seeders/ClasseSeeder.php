<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Filiere;
use App\Models\ClasseType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {

        $classes = [
            // // Première Année (Préscolaire)
            [
                'code' => 'DEPE-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 1,
            ],
            // Deuxième Année (Préscolaire)
            [
                'code' => 'PS1-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 2,
            ],
            [
                'code' => 'PS1-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 2,
            ],
            // Troisième Année (Préscolaire)
            [
                'code' => 'PS2-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 3,
            ],
            [
                'code' => 'PS2-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 3,
            ],

            // // Première Année (Primaire)
            [
                'code' => '1AP' . Filiere::find(1)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 4,
                'filiere_id' => 1,
            ],
            [
                'code' => '1AP' . Filiere::find(1)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 4,
                'filiere_id' => 1,
            ],
            [
                'code' => '1AP' . Filiere::find(1)->code . '-3',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 4,
                'filiere_id' => 1,
            ],
            // Deuxième Année (Primaire)
            [
                'code' => '2AP' . Filiere::find(2)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 5,
                'filiere_id' => 2,
            ],
            [
                'code' => '2AP' . Filiere::find(2)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 5,
                'filiere_id' => 2,
            ],
            [
                'code' => '2AP' . Filiere::find(2)->code . '-3',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 5,
                'filiere_id' => 2,
            ],
            // Troisième Année (Primaire)
            [
                'code' => '3AP' . Filiere::find(3)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 6,
                'filiere_id' => 3,
            ],
            [
                'code' => '3AP' . Filiere::find(3)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 6,
                'filiere_id' => 3,
            ],
            // Quatrième Année (Primaire)
            [
                'code' => '4AP' . Filiere::find(4)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 7,
                'filiere_id' => 4,
            ],
            [
                'code' => '4AP' . Filiere::find(4)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 7,
                'filiere_id' => 4,
            ],
            // Cinqème Année (Primaire)
            [
                'code' => '5AP' . Filiere::find(5)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 8,
                'filiere_id' => 5,
            ],
            [
                'code' => '5AP' . Filiere::find(5)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 8,
                'filiere_id' => 5,
            ],
            // Sixième Année (Primaire)
            [
                'code' => '6AP' . Filiere::find(6)->code . '-1',
                'number_etud' => 1,
                'number_etud_max' => 50,
                'classe_type_id' => 9,
                'filiere_id' => 6,
            ],
            [
                'code' => '6AP' . Filiere::find(6)->code . '-2',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 9,
                'filiere_id' => 6,
            ],

            // // Première Année (Collége)
            [
                'code' => '1AP' . Filiere::find(7)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 10,
                'filiere_id' => 7,
            ],
            // Deuxième Année (Collége)
            [
                'code' => '2AP' . Filiere::find(8)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 11,
                'filiere_id' => 8,
            ],
            // Troisième Année (Collége)
            [
                'code' => '3AP' . Filiere::find(9)->code . '-1',
                'number_etud' => 0,
                'number_etud_max' => 50,
                'classe_type_id' => 12,
                'filiere_id' => 9,
            ],

        ];

        foreach ($classes as $classe) {
            Classe::create($classe);
        }
    }
}
