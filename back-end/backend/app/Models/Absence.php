<?php

namespace App\Models;

use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Absence extends Model
{
    use HasFactory, SoftDeletes;
    protected $with = ['course'];
    

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // Define the relationship with the Student model
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Define the relationship with the Teacher model
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

}
