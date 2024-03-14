<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Filiere;
use App\Models\ClasseType;
use Illuminate\Http\Request;
use App\Models\TeacherClasseCourse;
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
    public function getAllClasses()
    {
        return response()->json(Classe::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'filiere_id' => 'required|exists:filieres,id',
            'number_etud_max' => 'required|integer',
            'classe_type_id' => 'required|exists:classe_types,id',
        ]);

        $filiere = Filiere::find($request->filiere_id);
        if (!$filiere) return response()->json(['message' => 'filière non trouvé'], 404);
        // 
        $classeType = ClasseType::find($request->classe_type_id);
        if (!$classeType) return response()->json(['message' => 'type de classe non trouvé'], 404);

        $code = $classeType->code . $filiere->code . '-' . Classe::where('filiere_id', $request->filiere_id)->where('classe_type_id', $request->classe_type_id)->count() + 1;

        $classe = new Classe();
        $classe->code = $code;
        $classe->filiere_id = $request->filiere_id;
        $classe->number_etud_max = $request->number_etud_max;
        $classe->classe_type_id = $request->classe_type_id;
        $classe->number_etud = 0;
        $classe->save();

        $courses = Course::where('filiere_id', $request->filiere_id)->where('classe_type_id', $request->classe_type_id)->get();
        foreach ($courses as $course) {
            $teacherClasseCourse = new TeacherClasseCourse();
            $teacherClasseCourse->course_id = $course->id;
            $teacherClasseCourse->classe_id = $classe->id;
            $teacherClasseCourse->save();
        }
        return response()->json(["message" => "classe ajouté avec succès"]);

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
