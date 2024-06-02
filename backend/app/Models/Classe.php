<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\Filiere;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Exercise;
use App\Models\TimeTable;
use App\Models\ClasseType;
use App\Models\ExerciseClasse;
use App\Models\TeacherClasseCourse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classe extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'number_etud',
        'number_etud_max',
    ];

    protected $with = ['classeType', 'filiere', 'courses', 'exams'];

    public function classeType()
    {
        return $this->belongsTo(ClasseType::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function time_table()
    {
        return $this->hasOne(TimeTable::class);
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teachers_classes_courses')
            ->using(TeacherClasseCourse::class)
            // ->wherePivot('deleted_at', null)
            ->withTimestamps();
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'teachers_classes_courses')
            ->using(TeacherClasseCourse::class)
            ->wherePivot('deleted_at', null)
            ->withTimestamps();
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'exercise_classes')
            ->using(ExerciseClasse::class)
            ->wherePivot('deleted_at', null)
            ->withTimestamps();
    }
}
