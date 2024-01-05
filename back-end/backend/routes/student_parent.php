<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentParentController;

// Routes Auth
Route::middleware(['auth:student_parent'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user('student_parent');
    });

    Route::get('/logout', [StudentParentController::class, 'logout']);
    Route::put('/change-password', [StudentParentController::class, 'changePassword']);
    // Route::put('/reset-password', [StudentParentController::class, 'resetPassword']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentParentController::class, 'login']);
});