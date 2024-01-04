<?php

namespace Database\Factories;

use App\Models\SuperAdmin;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'profile_picture' => fake()->image(), // Use fake() for image generation
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'gender' => fake()->randomElement(['male', 'female']),
            'email' => fake()->unique()->safeEmail,
            'cin' => fake()->unique()->regexify('[0-9]{8}'),
            'password' => Hash::make('password'), // Change this with a secure password
            'health_status' => fake()->word,
            'date_of_birth' => fake()->date,
            'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone_number' => fake()->unique()->phoneNumber,
            'address' => fake()->address,
            'last_login_date' => fake()->dateTimeThisYear,
            'super_admin_id' => SuperAdmin::all()->random()->id,
            'remember_token' => Str::random(10),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
