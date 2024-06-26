<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\ExerciseClasse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exercise extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'file',
    ];

    // protected $with = ['course', 'classes'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'exercise_classes')
            ->using(ExerciseClasse::class)
            // ->wherePivot('deleted_at', null)
            ->withTimestamps();
    }
}
