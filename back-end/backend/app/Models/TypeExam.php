<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeExam extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
    ];

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}
