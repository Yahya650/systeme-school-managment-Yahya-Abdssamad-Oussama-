<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentParentController;

// Routes Auth
Route::middleware(['auth:sanctum,student_parent'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    Route::get('/logout', [StudentParentController::class, 'logout']);
});

Route::middleware(['guest:sanctum,student,admin,super_admin,teacher,student_parent'])->group(function () {
    Route::post('/login', [StudentParentController::class, 'login']);
});