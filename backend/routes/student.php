<?php

use Illuminate\Http\Request;
use Spatie\FlareClient\Time\Time;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TimeTableController;
use App\Http\Controllers\ExamRecordController;
use App\Http\Controllers\StudentParentController;

// Routes Auth
Route::middleware(['auth:student'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user('student');
    });

    Route::get('/logout', [StudentController::class, 'logout']);
    Route::put('/change-password', [StudentController::class, 'changePassword']);
    Route::get('/timetable', [TimeTableController::class, 'timetableForStudent']);
    Route::get('/exercises', [ExerciseController::class, 'exersicesForStudent']);
    Route::get('/get-latest-marks', [ExamRecordController::class, 'getLatestMarks']);
    Route::get('/get-parent', [StudentParentController::class, 'getParentByStudent']);
    Route::post('/marks', [ExamRecordController::class, 'getMarks']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentController::class, 'login']);
});