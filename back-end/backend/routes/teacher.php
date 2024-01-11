<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes Auth
Route::middleware(['auth:teacher'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user('teacher');
    });

    Route::get('/logout', [TeacherController::class, 'logout']);
    Route::put('/change-password', [TeacherController::class, 'changePassword']);

    Route::post('/create-absence', [AbsenceController::class, 'store']);

    Route::post('/upload-exercise', [ExerciseController::class, 'store']);
    Route::post('/update-exercise/{id}', [ExerciseController::class, 'update']);
    Route::apiResource('exercises', ExerciseController::class)->only(['index', 'destroy', 'show']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [TeacherController::class, 'login']);
});
