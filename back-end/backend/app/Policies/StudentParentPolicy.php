<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\SuperAdmin;
use App\Models\StudentParent;
use Illuminate\Auth\Access\Response;

class StudentParentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    // public function viewAny(Admin $admin): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $admin, StudentParent $studentParent): bool
    {
        return $admin->id === $studentParent->admin_id;
    }

    /**
     * Determine whether the user can create models.
     */
    // public function create(Admin $admin): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, StudentParent $studentParent): bool
    {
        return $admin->id === $studentParent->admin_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, StudentParent $studentParent): bool
    {
        return $admin->id === $studentParent->admin_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, StudentParent $studentParent): bool
    {
        return $admin->id === $studentParent->admin_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, StudentParent $studentParent): bool
    {
        return $admin->id === $studentParent->admin_id;
    }
}
