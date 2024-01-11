<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\ClasseType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SchoolLevel extends Model
{
    use HasFactory, SoftDeletes;

    public $fallable = [
        'name',
    ];
    
    public function classe_types(){
        return $this->hasMany(ClasseType::class);
    }

    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'responsibles')
        ->using(Responsible::class)
        ->withPivot('type')
        ->withTimestamps();
    }

}
