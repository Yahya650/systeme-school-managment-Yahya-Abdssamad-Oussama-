<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Classe::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // if i want return the courses for any classe not have teacher
        // return response()->json(TeacherClasseCourse::where('classe_id', $idclasse)->where('teacher_id', null)->with('course')->get('course_id'));
        // mnin tbghi dir create l classe dkhal m3ah les modules liki9ra 3la 7sab classe type and l filier likintami liha
    }

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Classe $classe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
        //
    }
}
