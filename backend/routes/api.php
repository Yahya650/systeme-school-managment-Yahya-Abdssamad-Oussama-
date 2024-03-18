<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\TypeExamController;
use App\Http\Controllers\SchoolYearController;
use App\Http\Controllers\SchoolLevelController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => 'admin'], function () {
    require __DIR__ . '/admin.php';
});


Route::group(['prefix' => 'super-admin'], function () {
    require __DIR__ . '/super_admin.php';
});


Route::group(['prefix' => 'teacher'], function () {
    require __DIR__ . '/teacher.php';
});


Route::group(['prefix' => 'student'], function () {
    require __DIR__ . '/student.php';
});


Route::group(['prefix' => 'student-parent'], function () {
    require __DIR__ . '/student_parent.php';
});

// Global APIs
Route::get('/current-school-year', [SchoolYearController::class, 'getCurrent']);
Route::apiResource('school-years', SchoolYearController::class);
Route::apiResource('semesters', SemesterController::class);
Route::apiResource('type-exams', TypeExamController::class);
Route::apiResource('school_levels', SchoolLevelController::class);
