<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Report extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'admin_id',
        'student_id',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }


}
