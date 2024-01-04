<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Absence;
use App\Models\Exercise;
use App\Models\SuperAdmin;
use App\Models\TeacherClasse;
use App\Models\TeacherCourse;
use Laravel\Sanctum\HasApiTokens;
use App\Models\TeacherClasseCourse;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Teacher extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'teacher';
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

    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'teachers_classes_courses')
            ->using(TeacherClasseCourse::class)
            ->withTimestamps();
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
    public function super_admin()
    {
        return $this->belongsTo(SuperAdmin::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'teachers_classes_courses')
            ->using(TeacherClasseCourse::class)
            ->withTimestamps();
    }

}
