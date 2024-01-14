<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Routes Authentication Super Admin
Route::middleware(['auth:super_admin'])->group(function () {

    // Routes Admin
    Route::get('/profile', function (Request $request) {
        return $request->user('super_admin');
    });
    Route::put('/change-password', [SuperAdminController::class, 'changePassword']);
    Route::get('/logout', [SuperAdminController::class, 'logout']);
    // End Routes Admin

    // CRUD for admins and teachers
    Route::middleware(['abilities:can-crud_teachers,can-crud_admins'])->group(function () {
        Route::apiResource('teachers', TeacherController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
        Route::apiResource('admins', AdminController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
    });


    // Routes Admins
    Route::group(['prefix' => 'administrators'], function () {
        Route::get('/renew-password/{id}', [AdminController::class, 'renewPassword']);
        Route::get('/restore/{id}', [AdminController::class, 'restore']);
        Route::post('/restore-all', [AdminController::class, 'restoreAll']);
        Route::post('/trash', [AdminController::class, 'trash']);
    });

    // Routes Teachers
    Route::group(['prefix' => 'professors'], function () {
        Route::get('/renew-password/{id}', [TeacherController::class, 'renewPassword']);
        Route::get('/restore/{id}', [TeacherController::class, 'restore']);
        Route::post('/restore-all', [TeacherController::class, 'restoreAll']);
        Route::post('/trash', [TeacherController::class, 'trash']);
        Route::post('/attach-teacher-to-classe/{idclasse}', [TeacherController::class, 'attachTeacherToClasse']); 
    });
});


// Routes Guest
Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [SuperAdminController::class, 'login']);
});