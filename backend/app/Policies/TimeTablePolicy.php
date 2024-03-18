<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\TimeTable;
use App\Models\SuperAdmin;
use Illuminate\Auth\Access\Response;

class TimeTablePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Admin $admin): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Admin $admin, TimeTable $timeTable): bool
    {
        return $admin->school_levels()->wherePivot('school_level_id', $timeTable->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists();
    }
}
