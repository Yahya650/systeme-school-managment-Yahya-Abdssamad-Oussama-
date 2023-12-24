<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Classe;
use App\Models\Course;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClasseType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'filiere',
        'code',
    ];



    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }
   
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
