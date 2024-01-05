<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Exercise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExerciseClasse extends Pivot
{
    use HasFactory, SoftDeletes;

    protected $table = 'exercise_classes';


    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
