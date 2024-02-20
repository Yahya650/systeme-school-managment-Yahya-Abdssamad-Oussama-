<?php

namespace Database\Seeders;

use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StudentParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudentParent::create([
            'profile_picture' => null,
            'first_name' => 'Ahmed',
            'last_name' => 'Hamdy',
            'gender' => 'male',
            'email' => 'ahmed@gmail.com',
            'cin' => 'BW188696',
            'password' => Hash::make('12345678'),
            'health_status' => null,
            'date_of_birth' => '1976-08-12',
            'blood_type' => null,
            'phone_number' => '0612345678',
            'address' => null,
            'last_login_date' => now(),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
