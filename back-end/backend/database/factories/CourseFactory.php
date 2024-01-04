<?php

namespace Database\Factories;

use App\Models\ClasseType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
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
            'name' => 'PC',
            'description' => fake()->text(255),
            'ceof' => '5',
            'classe_type_id' => 12,
        ];
    }
}
