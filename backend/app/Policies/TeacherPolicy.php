<?php

namespace App\Policies;

use App\Models\SuperAdmin;
use App\Models\Teacher;
use Illuminate\Auth\Access\Response;

class TeacherPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

    public function renewPassword(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }
    
    public function attachTeacherToClasse(SuperAdmin $superAdmin, Teacher $teacher): bool
    {
        return $superAdmin->id === $teacher->super_admin_id;
    }

}
