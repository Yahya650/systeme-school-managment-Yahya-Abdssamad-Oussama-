<?php

namespace App\Models;

use App\Models\Report;
use App\Models\Student;
use App\Models\ExamRecord;
use App\Models\SuperAdmin;
use App\Models\SchoolLevel;
use App\Models\StudentParent;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'admin';
    }

    protected $fillable = [
        'profile_picture',
        'first_name',
        'last_name',
        'gender',
        'email',
        'cin',
        'health_status',
        'date_of_birth',
        'blood_type',
        'phone_number',
        'address',
        'last_login_date',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function school_levels()
    {
        return $this->belongsToMany(SchoolLevel::class, 'responsibles')
        ->using(Responsible::class)
        ->withPivot('type')
        ->withTimestamps();
    }
    
    // public function students()
    // {
    //     return $this->hasMany(Student::class);
    // }
    public function student_parents()
    {
        return $this->hasMany(StudentParent::class);
    }

    public function super_admin()
    {
        return $this->belongsTo(SuperAdmin::class);
    }

    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);    
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
