<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $classes = [];

        foreach ($request->user('admin')->school_levels as $school_level) {
            foreach ($school_level->classe_types as $classe_type) {
                foreach ($classe_type->classes as $classe) {
                    $classes[] = $classe;
                }
            }
        }

        return response()->json($classes);
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


    public function onChangeClass()
    {
        $classe = Classe::find(request()->classe_id);
        if (!$classe) return response()->json(['message' => 'Classe non trouve'], 404);
        return response()->json(['courses' => $classe->courses, 'passing_mark' => $classe->classeType->school_level->passing_mark, 'classe' => $classe]);
    }

    public function getStudentsByClasse($id)
    {
        request()->validate([
            'module_id' => 'nullable|exists:modules,id',
            'semester_id' => 'required|exists:semesters,id',
            'type_exam_id' => 'required|exists:type_exams,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $classe = Classe::find($id);
        if (!$classe) return response()->json(['message' => 'classe non trouve'], 404);
        return response()->json($classe->students);
    }
}
