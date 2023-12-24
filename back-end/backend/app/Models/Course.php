<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\Absence;
use App\Models\Teacher;
use App\Models\ClasseType;
use App\Models\TeacherCourse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'ceof',
    ];

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teacher_courses')
            ->using(TeacherCourse::class)
            ->withTimestamps();
    }

}
