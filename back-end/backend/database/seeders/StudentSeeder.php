<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            $student = new Student();
            $student->id = $i; // Example: Student1, Student2, ...
            $student->first_name = 'Student' . $i; // Example: Student1, Student2, ...
            $student->last_name = 'Doe';
            $student->gender = $i % 2 == 0 ? 'female' : 'male'; // Alternating genders
            $student->email = 'student' . $i . '@example.com'; // Example: student1@example.com
            $student->code_massar = '123456' . $i; // Example: 1234561, 1234562, ...
            $student->cin = 'AB123456' . $i; // Example: AB1234561, AB1234562, ...
            $student->password = Hash::make('password');
            $student->date_of_birth = '1990-01-01'; // Example date of birth
            $student->blood_type = 'A+';
            $student->phone_number = '123456789' . $i; // Example: 1234567891, 1234567892, ...
            $student->address = '123 Street, City';
            $student->classe_id = Classe::all()->random()->id;
            $student->student_parent_id = StudentParent::all()->random()->id;
            $student->save();
        }
    }
}
