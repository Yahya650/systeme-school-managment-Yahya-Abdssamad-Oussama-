<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Teacher;
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

    protected $with = ['course'];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}
