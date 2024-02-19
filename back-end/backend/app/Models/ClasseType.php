<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Filiere;
use App\Models\SchoolLevel;
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

    protected $with = ['school_level'];


    public function school_level()
    {
        return $this->belongsTo(SchoolLevel::class);
    }

    public function filieres()
    {
        return $this->hasMany(Filiere::class);
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
