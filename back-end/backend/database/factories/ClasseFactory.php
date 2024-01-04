<?php

namespace Database\Factories;

use App\Models\ClasseType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Nette\Utils\Random;

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
        $classeType = ClasseType::whereIn('id', [11, 12])->inRandomOrder()->first();

        return [
            'code' => $classeType->code . "-" . fake()->numberBetween(1, 10),
            'number_etud' => fake()->numberBetween(15, 35),
            'number_etud_max' => 35,
            'classe_type_id' => $classeType->id
        ];
    }
}
