<?php

namespace Database\Factories;

use App\Models\Classe;
use Illuminate\Database\Eloquent\Factories\Factory;
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
            'profile_picture' => $this->faker->imageUrl(),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'email' => $this->faker->unique()->safeEmail,
            'cin' => $this->faker->unique()->regexify('[0-9]{8}'),
            'password' => bcrypt('password'), // You may want to use a more secure password generation method
            'health_status' => $this->faker->optional()->word,
            'date_of_birth' => $this->faker->date,
            'blood_type' => $this->faker->optional()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone_number' => $this->faker->unique()->phoneNumber,
            'address' => $this->faker->optional()->address,
            'last_login_date' => $this->faker->optional()->dateTimeThisMonth,
            'remember_token' => Str::random(10),
            'email_verified_at' => $this->faker->optional()->dateTimeThisDecade,
            'deleted_at' => $this->faker->optional()->dateTimeThisMonth,
            'created_at' => $this->faker->dateTimeThisYear,
            'updated_at' => $this->faker->dateTimeThisYear,
        ];
    }
}
