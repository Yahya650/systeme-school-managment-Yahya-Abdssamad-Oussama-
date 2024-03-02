<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\ExamClasse;
use App\Models\ExamRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exam extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
    ];

    protected $with = ['course', 'classes'];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);
    }

    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'exam_classes')
            ->using(ExamClasse::class)
            ->wherePivot('deleted_at', null)
            ->withTimestamps();
    }
}
