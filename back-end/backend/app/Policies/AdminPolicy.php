<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\SuperAdmin;
use Illuminate\Auth\Access\Response;

class AdminPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    // public function viewAny(SuperAdmin $superAdmin): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can view the model.
     */
    public function view(SuperAdmin $superAdmin, Admin $admin): bool
    {
        return $superAdmin->id === $admin->super_admin_id;
    }

    /**
     * Determine whether the user can create models.
     */
    // public function create(SuperAdmin $superAdmin): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can update the model.
     */
    public function update(SuperAdmin $superAdmin, Admin $admin): bool
    {
        return $superAdmin->id === $admin->super_admin_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(SuperAdmin $superAdmin, Admin $admin): bool
    {
        return $superAdmin->id === $admin->super_admin_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(SuperAdmin $superAdmin, Admin $admin): bool
    {
        return $superAdmin->id === $admin->super_admin_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(SuperAdmin $superAdmin, Admin $admin): bool
    {
        return $superAdmin->id === $admin->super_admin_id;
    }
}
