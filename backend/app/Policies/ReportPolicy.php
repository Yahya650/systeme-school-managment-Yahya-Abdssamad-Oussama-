<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Report;
use App\Models\SuperAdmin;

class ReportPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(SuperAdmin $superAdmin): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $admin, Report $report): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Admin $admin): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, Report $report): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, Report $report): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, Report $report): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, Report $report): bool
    {
        return true;
    }
}
