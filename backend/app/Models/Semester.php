<?php

namespace App\Models;

use App\Models\SchoolYear;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Semester extends Model
{
    use HasFactory, SoftDeletes;


    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

}
