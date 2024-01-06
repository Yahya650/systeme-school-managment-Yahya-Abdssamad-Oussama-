<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\SuperAdmin;
use App\Models\StudentParent;
use Illuminate\Auth\Access\Response;

class StudentParentPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }
    public function renewPassword(Admin $admin, StudentParent $studentParent): bool
    {
        return true;
    }
}
