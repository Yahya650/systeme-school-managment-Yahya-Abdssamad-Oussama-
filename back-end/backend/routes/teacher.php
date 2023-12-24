<?php

use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Routes Auth
Route::middleware(['auth:sanctum,teacher'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    Route::get('/logout', [TeacherController::class, 'logout']);
});

Route::middleware(['guest:sanctum,student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [TeacherController::class, 'login']);
});