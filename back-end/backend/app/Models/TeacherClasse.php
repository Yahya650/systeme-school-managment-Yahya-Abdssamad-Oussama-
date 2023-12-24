<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TeacherClasse extends Pivot
{
    use HasFactory, SoftDeletes;

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
}
