<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Student;
use App\Models\SuperAdmin;
use Illuminate\Auth\Access\Response;

class StudentPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }

    public function renewPassword(Admin $admin, Student $student): bool
    {
        return $admin->school_levels()
            ->wherePivot('school_level_id', $student->classe->classeType->school_level->id)
            ->wherePivot('types', 'like', '%educational%')
            ->exists();
    }
}
