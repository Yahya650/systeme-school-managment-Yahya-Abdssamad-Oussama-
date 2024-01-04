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
            // Primaire
            ['name' => 'Première Année', 'school_level_id' => 1],
            ['name' => 'Deux Année', 'school_level_id' => 1],
            ['name' => 'Troisième Année', 'school_level_id' => 1],
            ['name' => 'Quatrième Année', 'school_level_id' => 1],
            ['name' => 'Cinquième Année', 'school_level_id' => 1],
            ['name' => 'Sixième Année', 'school_level_id' => 1],

            // Collège
            ['name' => 'Première Année', 'school_level_id' => 2],
            ['name' => 'Deuxième Année', 'school_level_id' => 2],
            ['name' => 'Troisième Année', 'school_level_id' => 2],

            // Lycée
            ['name' => 'Première Année', 'school_level_id' => 3],
            ['name' => 'Deuxième Année', 'code' => '1BAC', 'school_level_id' => 3],
            ['name' => 'Troisième Année', 'code' => '2BAC', 'school_level_id' => 3],
        ];

        // Loop through the data and create ClasseType instances
        foreach ($classTypesData as $classTypeData) {
            ClasseType::create($classTypeData);
        }
    }
}
