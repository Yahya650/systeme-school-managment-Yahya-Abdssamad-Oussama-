<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Routes Auth
Route::middleware(['auth:admin'])->group(function () {

    // Routes Admin
    Route::get('/profile', function (Request $request) {
        return $request->user('admin');
    });
    Route::put('/reset-password', [AdminController::class, 'resetPassword']);
    Route::get('/logout', [AdminController::class, 'logout']);
    // End Routes Admin

    // CRUD for students and student parents
    Route::middleware(['abilities:can-crud_students,can-crud_student_parents'])->group(function () {
        Route::apiResource('students', StudentController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
        Route::apiResource('student-parents', StudentParentController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
    });

    // Routes Students
    Route::group(['prefix' => 'students'], function () {
        Route::get('/renew-password/{id}', [StudentController::class, 'renewPassword']);
        Route::get('/restore/{id}', [StudentController::class, 'restore']);
        Route::post('/restore-all', [StudentController::class, 'restoreAll']);
        Route::post('/trash', [StudentController::class, 'trash']);
    });

    // Routes Student Parents
    Route::group(['prefix' => 'student-parents'], function () {
        Route::get('/renew-password/{id}', [StudentParentController::class, 'renewPassword']);
        Route::get('/restore/{id}', [StudentParentController::class, 'restore']);
        Route::post('/restore-all', [StudentParentController::class, 'restoreAll']);
        Route::post('/trash', [StudentParentController::class, 'trash']);
    });
});






Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
});