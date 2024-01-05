<?php

namespace App\Policies;

use App\Models\Teacher;
use App\Models\Exercise;
use App\Models\SuperAdmin;
use Illuminate\Auth\Access\Response;

class ExercisePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Teacher $teacher)
    {
        // 
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Teacher $teacher, Exercise $exercise): bool
    {
        return $teacher->id === $exercise->teacher_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Teacher $teacher)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Teacher $teacher, Exercise $exercise): bool
    {
        return $teacher->id === $exercise->teacher_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Teacher $teacher, Exercise $exercise): bool
    {
        return $teacher->id === $exercise->teacher_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Teacher $teacher, Exercise $exercise): bool
    {
        return $teacher->id === $exercise->teacher_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Teacher $teacher, Exercise $exercise): bool
    {
        return $teacher->id === $exercise->teacher_id;
    }
}
