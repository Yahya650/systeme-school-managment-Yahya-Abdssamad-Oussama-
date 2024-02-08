<?php

namespace Database\Factories;

use App\Models\Classe;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'profile_picture' => fake()->imageUrl(),
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'gender' => fake()->randomElement(['male', 'female']),
            'email' => fake()->unique()->safeEmail,
            'cin' => fake()->unique()->regexify('[0-9]{8}'),
            'password' => Hash::make('password'), // You may want to use a more secure password generation method
            'health_status' => fake()->optional()->word,
            'date_of_birth' => fake()->date,
            'blood_type' => fake()->optional()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone_number' => fake()->unique()->phoneNumber,
            'address' => fake()->optional()->address,
            'last_login_date' => fake()->optional()->dateTimeThisMonth,
            'remember_token' => Str::random(10),
            'email_verified_at' => fake()->optional()->dateTimeThisDecade,
            'created_at' => fake()->dateTimeThisYear,
            'updated_at' => fake()->dateTimeThisYear,
        ];
    }
}
