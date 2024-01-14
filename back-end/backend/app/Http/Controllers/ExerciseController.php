<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Exercise;
use App\Models\ExerciseClasse;
use App\Models\TeacherClasseCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExerciseController extends Controller
{

    private function getCurrentSchoolYear()
    {
        $currentYear = now()->year;
        $startMonth = 9;

        if (now()->month < $startMonth) {
            $currentYear--;
        }

        return $currentYear . '_' . ($currentYear + 1);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user('teacher')->exercises()->with('course')->with('classes')->get(), 200);
    }

    public function exersicesForStudent(Request $request)
    {
        return response()->json($request->user('student')->classe()->with('exercises.course')->get(), 200);
    }
    
    public function getExercisesForAllChildrens(Request $request)
    {
        return response()->json($request->user('student_parent')->students()->with('classe.exercises')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'file' => ['required', 'mimes:pdf,png,jpg,jpeg', 'max:2048'],
            'classe_id' => ['required', 'exists:classes,id'],
            'course_id' => ['required', 'exists:courses,id'],
        ]);

        if (!TeacherClasseCourse::where('teacher_id', $request->user('teacher')->id)->where('classe_id', $request->classe_id)->where('course_id', $request->course_id)->exists()) {
            return response()->json(['message' => 'vous n\'avez pas accès à ce cours ou à cette classe'], 401);
        }

        $classe = Classe::find($request->classe_id);

        $schoolLevel = $classe->classeType()->first()->school_level()->first();

        $newExercise = new Exercise();

        if ($request->file) {
            $directoryPath = 'exercises/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : 'high_school')) . '/' .
                $classe->classeType()->first()->code . $classe->filiere()->first()->code . '-' . $classe->courses()->find($request->course_id)->name . "-" . $this->getCurrentSchoolYear() . '-' . now()->timestamp . '.' . $request->file->extension();
            
            Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->file));
            $newExercise->file = $directoryPath; 
        }

        $newExercise->title = $request->title;
        $newExercise->course_id = $request->course_id;
        $newExercise->teacher_id = $request->user('teacher')->id;
        $newExercise->save();

        $exerciseClasses = new ExerciseClasse();
        $exerciseClasses->classe_id = $request->classe_id;
        $exerciseClasses->exercise_id = $newExercise->id;
        $exerciseClasses->save();
        
        return response()->json(['message' => 'Exercice ajouté et envoyé avec succès'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (!Exercise::find($id)) {
            return response()->json([
                'message' => 'Exercice introuvable'
            ], 404);
        }

        if (request()->user()->cannot('view', Exercise::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce exercice'
            ], 401);
        }

        return response()->json(Exercise::find($id)->with('course')->with('classes')->get(), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        if (request()->user()->cannot('update', Exercise::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce exercice'
            ], 401);
        }

        $request->validate([
            'file' => ['nullable', 'mimes:pdf,png,jpg,jpeg', 'max:2048'],
        ]);

        if (Exercise::find($id) && $request->file) {

            $exercise = Exercise::find($id);
            Storage::delete('public/' . $exercise->file);
            $course = Course::find($exercise->course_id);

            $filiere = $course->filiere()->first();
            $school_level = $course->classeType()->first()->school_level()->first();
            $classe_type = $course->classeType()->first();

            $directoryPath = 'exercises/' . ($school_level->name === 'Primaire' ? 'primary' : ($school_level->name === 'College' ? "college" : 'high_school')) . '/' .
                $classe_type->code . $filiere->code . '-' . $course->name . "-" . $this->getCurrentSchoolYear() . '-' . now()->timestamp . '.' . $request->file->extension();

            Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->file));
            $exercise->file = $directoryPath;
            $exercise->title = $request->title;
            $exercise->save();
            return response()->json(['message' => 'Exercice mis à jour et envoyé avec succès']);
        }

        return response()->json(['message' => 'Exercice introuvable'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (request()->user()->cannot('delete', Exercise::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce exercice'
            ], 401);
        }

        if (Exercise::find($id)) {
            Exercise::find($id)->delete();
            return response()->json(['message' => 'Exercice supprimé avec succès']);
        }

        return response()->json(['message' => 'Exercice introuvable'], 404);
    }
}
