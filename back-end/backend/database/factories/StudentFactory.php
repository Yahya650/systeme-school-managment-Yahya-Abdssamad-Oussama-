<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'gender' => fake()->randomElement(['male', 'female']),
            'email' => fake()->unique()->safeEmail,
            'code_massar' => fake()->unique()->numerify('##########'), // Assuming a 10-digit code
            'cin' => fake()->unique()->numerify('##########'), // Assuming a 10-digit CIN
            'password' => Hash::make('12345678'), // You may use a more secure way to generate passwords
            'date_of_birth' => fake()->date(),
            'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone_number' => fake()->unique()->phoneNumber,
            'address' => fake()->address,
            'classe_id' => 18,
            'student_parent_id' => 1
        ];
    }
}
