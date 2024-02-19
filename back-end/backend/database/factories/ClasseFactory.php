<?php

namespace Database\Factories;

use App\Models\Classe;
use App\Models\ClasseType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classe>
 */
class ClasseFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $classeType = ClasseType::where('id', '>', 3)->where('id', '<', 13)->get()->random();

        $filiere = $classeType->filieres->random();

        $lastId = Classe::max('id');
        $nextId = $lastId + 1;

        $code = $classeType->code . $filiere->code . "-" . $nextId;

        return [
            'code' => $code,
            'number_etud' => fake()->numberBetween(15, 35),
            'number_etud_max' => 35,
            'classe_type_id' => $classeType->id,
            'filiere_id' => $filiere->id
        ];
    }

    // private function getLastId(): int
    // {
    //     $lastId = Classe::max('id');
    //     return $lastId ? (int)$lastId : 0;
    // }
}
