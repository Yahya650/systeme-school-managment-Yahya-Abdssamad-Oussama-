<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Teacher;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class SuperAdmin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'super_admin';
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


    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }


    public function admins()
    {
        return $this->hasMany(Admin::class);    
    }

}
