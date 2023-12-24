<?php

namespace App\Models;

use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'amount',
        'method',
        'payment_date',
        'description',
        'receipt',
    ];

    public function parent()
    {
        return $this->belongsTo(StudentParent::class, 'parent_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

}
