<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassTypeController;
use App\Http\Controllers\TimeTableController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\SchoolLevelController;


// Routes Authentication Super Admin
Route::middleware(['auth:super_admin'])->group(function () {

    // Routes Admin
    Route::get('/profile', function (Request $request) {
        return $request->user('super_admin');
    });

    Route::put('/update-profile', [SuperAdminController::class, 'update']);
    Route::post('/update-profile-picture', [SuperAdminController::class, 'updatePictureProfile']);
    Route::put('/change-password', [SuperAdminController::class, 'changePassword']);
    Route::get('/logout', [SuperAdminController::class, 'logout']);
    // End Routes Admin

    // CRUD for admins and teachers
    Route::middleware(['abilities:can-crud_teachers,can-crud_admins'])->group(function () {
        Route::apiResource('teachers', TeacherController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
        Route::apiResource('admins', AdminController::class)->only(['index', 'show', 'update', 'store', 'destroy']);
    });

    Route::post('/upload-timetable/{idClass}', [TimeTableController::class, 'uploadTimeTableBySP']);
    Route::get('/get-classe-types-by-school-level/{idSchoolLevel}', [ClassTypeController::class, 'getClasseTypesBySchoolLevel']);
    Route::get('/filter-classe', [ClasseController::class, 'filterClasses']);
    Route::post('/add-classes', [ClasseController::class, 'store']);
    Route::get('/all-classes', [ClasseController::class, 'getAllClasses']);
    Route::post('/modify-classes', [ClasseController::class, 'modifyClasses']);
    Route::apiResource('classe-types', ClassTypeController::class);

    // Routes Admins
    Route::group(['prefix' => 'administrators'], function () {
        Route::get('/{id}/renew-password', [AdminController::class, 'renewPassword']);
        Route::get('/{id}/restore', [AdminController::class, 'restore']);
        Route::get('/restore-all', [AdminController::class, 'restoreAll']);
        Route::get('/trash', [AdminController::class, 'trash']);
        Route::get('/search', [AdminController::class, 'search']);
        Route::post('/restore-select', [AdminController::class, 'restoreSelect']);
        Route::post('/delete-select', [AdminController::class, 'deleteSelect']);
        Route::post('/{id}/update-profile-picture', [AdminController::class, 'updatePictureProfile']);
    });

    // Routes Teachers
    Route::group(['prefix' => 'professors'], function () {
        Route::get('/{id}/renew-password', [TeacherController::class, 'renewPassword']);
        Route::get('/{id}/restore', [TeacherController::class, 'restore']);
        Route::get('/restore-all', [TeacherController::class, 'restoreAll']);
        Route::get('/trash', [TeacherController::class, 'trash']);
        Route::get('/search', [TeacherController::class, 'search']);
        Route::post('/restore-select', [TeacherController::class, 'restoreSelect']);
        Route::post('/delete-select', [TeacherController::class, 'deleteSelect']);
        Route::post('/attach-teacher-to-classe/{idclasse}', [TeacherController::class, 'attachTeacherToClasse']);
        Route::post('/{id}/update-profile-picture', [TeacherController::class, 'updatePictureProfile']);
    });
});


// Routes Guest
Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [SuperAdminController::class, 'login']);
});
