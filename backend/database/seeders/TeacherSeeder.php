<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\TeacherClasseCourse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'profile_picture' => null,
                'first_name' => 'Hafsa',
                'last_name' => 'Hamdy',
                'gender' => 'female',
                'email' => 'hafsa@gmail.com',
                'cin' => 'BW12346',
                'password' => Hash::make('12345678'),
                'health_status' => null,
                'date_of_birth' => '1977/12/12',
                'blood_type' => null,
                'phone_number' => '0612345678',
                'address' => null,
                'last_login_date' => now(),
                'super_admin_id' => 1,
                'remember_token' => Str::random(10),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'profile_picture' => null,
                'first_name' => 'Yahya',
                'last_name' => 'Hamdy',
                'gender' => 'male',
                'email' => 'yahya@gmail.com',
                'cin' => 'BW49789',
                'password' => Hash::make('12345678'),
                'health_status' => null,
                'date_of_birth' => '1988/12/12',
                'blood_type' => null,
                'phone_number' => '0612345745',
                'address' => null,
                'last_login_date' => now(),
                'super_admin_id' => 1,
                'remember_token' => Str::random(10),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'profile_picture' => null,
                'first_name' => 'Saad',
                'last_name' => 'Asraoui',
                'gender' => 'male',
                'email' => 'oussama@gmail.com',
                'cin' => 'BW123456',
                'password' => Hash::make('12345678'),
                'health_status' => null,
                'date_of_birth' => '1978/12/12',
                'blood_type' => null,
                'phone_number' => '0612345147',
                'address' => null,
                'last_login_date' => now(),
                'super_admin_id' => 1,
                'remember_token' => Str::random(10),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach ($teachers as $teacher) {
            Teacher::create($teacher);
        }
    }
}
