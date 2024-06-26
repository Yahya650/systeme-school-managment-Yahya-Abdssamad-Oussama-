<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\SchoolLevel;
use Illuminate\Http\Request;

class SchoolLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $request = request();
        if ($request->user('admin')) {
            $school_levels = Admin::find($request->user('admin')->id)->school_levels;
            return response()->json($school_levels);
        }

        $school_levels = SchoolLevel::all();
        return response()->json($school_levels);
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
    public function show(SchoolLevel $schoolLevel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolLevel $schoolLevel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolLevel $schoolLevel)
    {
        //
    }
}
