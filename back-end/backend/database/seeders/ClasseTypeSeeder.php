<?php

namespace Database\Seeders;

use App\Models\ClasseType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClasseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the data for each class type
        $classTypesData = [

            // Préscolaire
            ['name' => 'Première Année', 'code' => 'DEPE', 'school_level_id' => 1],
            ['name' => 'Deux Année', 'code' => 'PS1', 'school_level_id' => 1],
            ['name' => 'Troisième Année', 'code' => 'PS2', 'school_level_id' => 1],

            // Primaire
            ['name' => 'Première Année', 'code' => '1AP', 'school_level_id' => 2],
            ['name' => 'Deux Année', 'code' => '2AP', 'school_level_id' => 2],
            ['name' => 'Troisième Année', 'code' => '3AP', 'school_level_id' => 2],
            ['name' => 'Quatrième Année', 'code' => '4AP', 'school_level_id' => 2],
            ['name' => 'Cinquième Année', 'code' => '5AP', 'school_level_id' => 2],
            ['name' => 'Sixième Année', 'code' => '6AP', 'school_level_id' => 2],

            // Collège
            ['name' => 'Première Année', 'code' => '1AP', 'school_level_id' => 3],
            ['name' => 'Deuxième Année', 'code' => '2AP', 'school_level_id' => 3],
            ['name' => 'Troisième Année', 'code' => '3AP', 'school_level_id' => 3],

            // Lycée
            ['name' => 'Première Année', 'school_level_id' => 4],
            ['name' => 'Deuxième Année', 'code' => '1BAC', 'school_level_id' => 4],
            ['name' => 'Troisième Année', 'code' => '2BAC', 'school_level_id' => 4],

        ];

        // Loop through the data and create ClasseType instances
        foreach ($classTypesData as $classTypeData) {
            ClasseType::create($classTypeData);
        }
    }
}
