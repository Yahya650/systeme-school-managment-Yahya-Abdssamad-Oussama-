<?php

use Illuminate\Http\Request;
use Spatie\FlareClient\Time\Time;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TimeTableController;

// Routes Auth
Route::middleware(['auth:student'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user('student');
    });

    Route::get('/logout', [StudentController::class, 'logout']);
    Route::put('/change-password', [StudentController::class, 'changePassword']);
    Route::get('/timetable', [TimeTableController::class, 'timetableForStudent']);
    Route::get('/exercises', [ExerciseController::class, 'exersicesForStudent']);
    Route::post('/marks', [StudentController::class, 'getMarks']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentController::class, 'login']);
});