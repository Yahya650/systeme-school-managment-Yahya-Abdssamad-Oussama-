<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes Authenticated Teacher
Route::middleware(['auth:teacher'])->group(function () {

    // Routes Teacher
    Route::get('/profile', function (Request $request) {
        return $request->user('teacher');
    });

    Route::put('/update-profile', [TeacherController::class, 'updateProfile']);
    Route::post('/update-profile-picture', [TeacherController::class, 'updatePictureProfileAuth']);
    Route::get('/logout', [TeacherController::class, 'logout']);
    Route::put('/change-password', [TeacherController::class, 'changePassword']);

    // Routes Absences
    Route::post('/create-absence', [AbsenceController::class, 'store']);

    // Routes Exams
    Route::post('/upload-exam', [ExamController::class, 'store']);
    Route::post('/update-exam/{id}', [ExamController::class, 'update']);
    Route::apiResource('exams', ExamController::class)->only(['index', 'destroy', 'show']);

    // Routes Exercises
    Route::post('/upload-exercise', [ExerciseController::class, 'store']);
    Route::post('/update-exercise/{id}', [ExerciseController::class, 'update']);
    Route::apiResource('exercises', ExerciseController::class)->only(['index', 'destroy', 'show']);
});

// Routes Guest
Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [TeacherController::class, 'login']);
});
