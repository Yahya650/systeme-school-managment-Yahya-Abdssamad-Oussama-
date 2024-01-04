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
            ['name' => 'Sciences de la vie et de la terre', "code" => "SVT", 'classe_type_id' => 12],
            ['name' => 'physique et chimie', "code" => "PC", 'classe_type_id' => 12],
            ['name' => 'Sciences Mathématiques', "code" => "SMATH", 'classe_type_id' => 12],
        ];

        foreach ($filieres as $filiere) {
            Filiere::create($filiere);
        }
    }
}
