<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Routes Auth
Route::middleware(['auth:super_admin'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user('super_admin');
    });

    // CRUD for admins and teachers
    Route::middleware(['abilities:can-crud_teachers,can-crud_admins'])->group(function () {
        Route::apiResource('teachers', TeacherController::class);
        Route::apiResource('admins', AdminController::class);
    });
    
    Route::get('/logout', [SuperAdminController::class, 'logout']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [SuperAdminController::class, 'login']);
    Route::post('/register', [SuperAdminController::class, 'register']);
});
