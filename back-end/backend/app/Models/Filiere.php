<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Course;
use App\Models\ClasseType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Filiere extends Model
{
    use HasFactory, SoftDeletes;

    public function classe_type()
    {
        return $this->belongsTo(ClasseType::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }
}
