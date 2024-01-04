<?php

namespace Database\Factories;

use App\Models\TeacherClasseCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherClasseCourse>
 */
class TeacherClasseFactory extends Factory
{

    protected $model = TeacherClasseCourse::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teacher_id' => null,
            'classe_id' => 1,
            'course_id' => 1,
        ];
    }
}
