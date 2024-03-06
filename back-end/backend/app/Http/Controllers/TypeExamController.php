<?php

namespace App\Http\Controllers;

use App\Models\TypeExam;
use Illuminate\Http\Request;

class TypeExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(TypeExam::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TypeExam $typeExam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypeExam $typeExam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypeExam $typeExam)
    {
        //
    }
}
