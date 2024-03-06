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
            // 1APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 1, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 2, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 3, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 4, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 5, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 6, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 7, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 8, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 9, 'classe_id' => 6],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 10, 'classe_id' => 6],
            // 1APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 1, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 2, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 3, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 4, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 5, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 6, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 7, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 8, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 9, 'classe_id' => 7],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 10, 'classe_id' => 7],
            // 1APG-3
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 1, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 2, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 3, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 4, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 5, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 6, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 7, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 8, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 9, 'classe_id' => 8],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 10, 'classe_id' => 8],

            // 2APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 11, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 12, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 13, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 14, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 15, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 16, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 17, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 18, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 19, 'classe_id' => 9],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 20, 'classe_id' => 9],
            // 2APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 11, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 12, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 13, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 14, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 15, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 16, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 17, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 18, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 19, 'classe_id' => 10],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 20, 'classe_id' => 10],
            // 2APG-3
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 11, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 12, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 13, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 14, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 15, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 16, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 17, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 18, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 19, 'classe_id' => 11],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 20, 'classe_id' => 11],

            // 3APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 21, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 22, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 23, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 24, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 25, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 26, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 27, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 28, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 29, 'classe_id' => 12],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 30, 'classe_id' => 12],
            // 3APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 21, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 22, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 23, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 24, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 25, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 26, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 27, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 28, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 29, 'classe_id' => 13],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 30, 'classe_id' => 13],

            // 4APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 31, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 32, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 33, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 34, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 35, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 36, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 37, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 38, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 39, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 40, 'classe_id' => 14],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 41, 'classe_id' => 14],
            // 4APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 31, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 32, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 33, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 34, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 35, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 36, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 37, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 38, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 39, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 40, 'classe_id' => 15],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 41, 'classe_id' => 15],

            // 5APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 42, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 43, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 44, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 45, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 46, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 47, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 48, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 49, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 50, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 51, 'classe_id' => 16],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 52, 'classe_id' => 16],
            // 5APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 42, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 43, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 44, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 45, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 46, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 47, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 48, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 49, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 50, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 51, 'classe_id' => 17],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 52, 'classe_id' => 17],

            // 6APG-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 53, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 54, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 55, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 56, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 57, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 58, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 59, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 60, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 61, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 62, 'classe_id' => 18],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 63, 'classe_id' => 18],
            // 6APG-2
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 53, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 54, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 55, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 56, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 57, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 58, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 59, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 60, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 61, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 62, 'classe_id' => 19],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 63, 'classe_id' => 19],

            // 1APIC-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 64, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 65, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 66, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 67, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 68, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 69, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 70, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 71, 'classe_id' => 20],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 72, 'classe_id' => 20],

            // 2APIC-1
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 73, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 74, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 75, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 76, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 77, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 78, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 79, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 80, 'classe_id' => 21],
            ['teacher_id' => Teacher::all()->random()->id, 'course_id' => 81, 'classe_id' => 21],

            // 3APIC-1
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
