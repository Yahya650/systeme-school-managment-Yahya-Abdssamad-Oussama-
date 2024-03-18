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
    ];

    protected $with = ['exam'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
