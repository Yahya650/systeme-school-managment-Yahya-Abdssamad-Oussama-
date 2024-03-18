<?php

namespace Database\Seeders;

use App\Models\Filiere;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FiliereSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $filieres = [

            // Primaire
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 4],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 5],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 6],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 7],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 8],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 9],

            // Collège
            ['name' => 'Parcours International', "code" => "IC", 'classe_type_id' => 10],
            ['name' => 'Parcours International', "code" => "IC", 'classe_type_id' => 11],
            ['name' => 'Parcours International', "code" => "IC", 'classe_type_id' => 12],

            ['name' => 'Sport Etude', "code" => "OSE", 'classe_type_id' => 10],
            ['name' => 'Sport Etude', "code" => "OSE", 'classe_type_id' => 11],
            ['name' => 'Sport Etude', "code" => "OSE", 'classe_type_id' => 12],

            ['name' => 'Sport et Education Physique', "code" => "SEP", 'classe_type_id' => 11],
            ['name' => 'Sport et Education Physique', "code" => "SEP", 'classe_type_id' => 12],

            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 10],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 11],
            ['name' => 'Générale', "code" => "G", 'classe_type_id' => 12],

        ];

        foreach ($filieres as $filiere) {
            Filiere::create($filiere);
        }
    }
}
