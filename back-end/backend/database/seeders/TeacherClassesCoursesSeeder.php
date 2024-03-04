<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\TeacherClasseCourse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeacherClassesCoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacherClassesCourses = [
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 82, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 83, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 84, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 85, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 86, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 87, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 88, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 89, 'classe_id' => 22],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 90, 'classe_id' => 22],
        ];
        foreach ($teacherClassesCourses as $teacherClassesCourse) {
            TeacherClasseCourse::create($teacherClassesCourse);
        }
    }
}
