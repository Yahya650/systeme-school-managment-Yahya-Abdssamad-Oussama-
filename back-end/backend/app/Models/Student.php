<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Classe;
use App\Models\Report;
use App\Models\Absence;
use App\Models\Payment;
use App\Models\ExamRecord;
use App\Models\StudentParent;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'student';
    }

    protected $fillable = [
        'profile_picture',
        'first_name',
        'last_name',
        'gender',
        'email',
        'code_massar',
        'cin',
        'health_status',
        'date_of_birth',
        'blood_type',
        'phone_number',
        'address',
        'last_login_date',
        'status_pay',
        'class_id',
        'parent_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function parent()
    {
        return $this->belongsTo(StudentParent::class, 'parent_id');
    }
}
