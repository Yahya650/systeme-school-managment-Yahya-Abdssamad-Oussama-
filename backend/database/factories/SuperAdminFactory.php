<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SuperAdmin>
 */
class SuperAdminFactory extends Factory
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
            'password' => Hash::make('password'), // You might want to change this with a secure password
            'health_status' => fake()->word,
            'date_of_birth' => fake()->date,
            'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone_number' => fake()->unique()->phoneNumber,
            'address' => fake()->address,
            'last_login_date' => fake()->dateTimeThisYear,
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
