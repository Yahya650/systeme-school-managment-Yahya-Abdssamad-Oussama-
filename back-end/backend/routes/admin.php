<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Routes Auth
Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    // CRUD
    Route::middleware(['abilities:can-crud_students,can-crud_parent_students'])->group(function () {
        Route::apiResource('students', StudentController::class);
        Route::apiResource('student-parents', StudentParentController::class);
    });
   

    Route::get('/logout', [AdminController::class, 'logout']);
});

Route::middleware(['guest:sanctum,student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
});