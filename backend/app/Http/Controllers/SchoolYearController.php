<?php

namespace App\Http\Controllers;

use App\Models\SchoolYear;
use Illuminate\Http\Request;

class SchoolYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SchoolYear::all());
    }


    public function getCurrent()
    {
        return response()->json(SchoolYear::latest()->first());
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
    public function show(SchoolYear $schoolYear)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolYear $schoolYear)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolYear $schoolYear)
    {
        //
    }
}
