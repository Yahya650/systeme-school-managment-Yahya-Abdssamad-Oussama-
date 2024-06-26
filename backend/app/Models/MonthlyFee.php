<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MonthlyFee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_id',
    ];

    // public function student()
    // {
    //     return $this->belongsTo(Student::class);
    // }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
