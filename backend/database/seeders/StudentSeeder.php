<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Student;
use Illuminate\Support\Str;
use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'first_name' => 'adam',
                'last_name' => 'yassine',
                'gender' => 'male',
                'email' => 'R123456789@taalim.ma',
                'code_massar' => 'R123456789',
                'cin' => 'AB1234561',
                'password' => Hash::make('123456789'),
                'date_of_birth' => '2012-08-15',
                'blood_type' => 'A+',
                'phone_number' => '0615987654',
                'address' => 'anassi, CasaBlanca',
                'classe_id' => 18,
                'student_parent_id' => 1,
            ],
            [
                'first_name' => 'malak',
                'last_name' => 'yassine',
                'gender' => 'female',
                'email' => 'R987654321@taalim.ma',
                'code_massar' => 'R987654321',
                'cin' => 'AB1234562',
                'password' => Hash::make('123456789'),
                'date_of_birth' => '2018-12-02',
                'blood_type' => 'B+',
                'phone_number' => '0615987647',
                'address' => 'anassi, CasaBlanca',
                'classe_id' => 18,
                'student_parent_id' => 1,
            ],
        ];

        foreach ($students as $studentData) {
            Student::create($studentData);
        }
    }

}
