<?php

use App\Http\Controllers\ExerciseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TimeTableController;
use App\Http\Controllers\StudentParentController;

// Routes Authentication Student Parent
Route::middleware(['auth:student_parent'])->group(function () {

    // Routes Student Parent
    Route::get('/profile', function (Request $request) {
        return $request->user('student_parent');
    });
    Route::get('/logout', [StudentParentController::class, 'logout']);
    Route::put('/change-password', [StudentParentController::class, 'changePassword']);
    Route::group(['prefix' => 'mychildrens'], function () {
        Route::get('/timetable/{idStudent}', [TimeTableController::class, 'timetableForParent']);
        Route::get('/{idStudent}', [StudentController::class, 'getStudentWithAllInfo']);
        Route::get('/exercises', [ExerciseController::class, 'getExercisesForAllChildrens']);
    });
});


// Routes Guest
Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentParentController::class, 'login']);
});
