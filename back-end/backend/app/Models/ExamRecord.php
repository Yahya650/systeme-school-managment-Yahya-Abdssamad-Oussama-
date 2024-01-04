<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Semester;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExamRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'note',
        'comment',
        'student_id',
        'exam_id',
        'teacher_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

}
