<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Routes Auth
Route::middleware(['auth:student'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    Route::get('/logout', [StudentController::class, 'logout']);
});

Route::middleware(['guest:student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentController::class, 'login']);
});