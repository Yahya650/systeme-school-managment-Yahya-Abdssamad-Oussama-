<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamClasse;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExamController extends Controller
{

    private function getCurrentSchoolYear($between)
    {
        $currentYear = now()->year;
        $startMonth = 9;

        if (now()->month < $startMonth) {
            $currentYear--;
        }

        return $currentYear . $between . ($currentYear + 1);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user('teacher')->exams);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'nullable|max:255',
            'image' => 'nullable|mimes:pdf,png,jpg,jpeg|max:2048',
            'type' => 'required|in:cc1,cc2,cc3,cc4,cc5,cc6,cc7',
            'duration' => 'required',
            'passing_marks' => 'required|in:5,10',
            'variant' => 'nullable|in:v1,v2,v3,v4,v5',
            'course_id' => 'required|exists:courses,id',
            'semester_id' => 'required|exists:semesters,id',
        ]);

        $teacher = $request->user('teacher');

        if (Exam::where('type', $request->type)->where('course_id', $request->course_id)->where('teacher_id', $teacher->id)->where('school_year', $this->getCurrentSchoolYear('/'))->exists()) {
            return response()->json([
                'message' => 'Cet examen existe déja',
            ], 409);
        }

        if ($teacher->courses()->find($request->course_id)) {
            $exam = new Exam();
            if ($request->image) {
                $schoolLevel = $teacher->classes()->first()->classeType->school_level;
                $directoryPath = 'exams/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : 'high_school')) . '/' .
                    $teacher->first_name . "_" . $teacher->last_name  . '-' . $request->type . '-' .  $teacher->courses()->find($request->course_id)->name . "-" . $this->getCurrentSchoolYear("_") . '-' . now()->timestamp . '.' . $request->image->extension();

                Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->image));
                $exam->image = $directoryPath;
            }
            $exam->name = $request->name;
            $exam->type = $request->type;
            $exam->duration = $request->duration;
            $exam->school_year = $this->getCurrentSchoolYear("/");
            $exam->semester_id = $request->semester_id;
            $exam->passing_marks = $request->passing_marks;
            $exam->course_id = $request->course_id;
            $exam->teacher_id = $teacher->id;
            $exam->save();

            $classes = $teacher->classes;
            foreach ($classes as $classe) {
                if ($classe->courses()->wherePivot('course_id', $request->course_id)->exists()) {
                    $examClasse = new ExamClasse();
                    $examClasse->exam_id = $exam->id;
                    $examClasse->classe_id = $classe->id;
                    $examClasse->save();
                }
            }
            return response()->json(['message' => 'Exam créé avec succès'], 201);
        }

        return response()->json([
            'message' => 'Ce professeur ne peut pas enseigner à cette matiere'
        ], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (!Exam::find($id)) {
            return response()->json([
                'message' => 'Examen introuvable'
            ], 404);
        }
        return response()->json(Exam::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'nullable|max:255',
            'image' => 'nullable|mimes:pdf,png,jpg,jpeg|max:2048',
            'type' => 'required|in:cc1,cc2,cc3,cc4,cc5,cc6,cc7',
            'duration' => 'required',
            'passing_marks' => 'required|in:5,10',
            'variant' => 'nullable|in:v1,v2,v3,v4,v5',
            'course_id' => 'required|exists:courses,id',
            'semester_id' => 'required|exists:semesters,id'
        ]);

        $teacher = $request->user('teacher');
        if ($teacher->courses()->find($request->course_id)) {
            if ($exam = Exam::find($id)) {
                if ($request->image) {
                    $schoolLevel = $teacher->classes()->first()->classeType->school_level;
                    $directoryPath = 'exams/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : 'high_school')) . '/' .
                        $teacher->first_name . "_" . $teacher->last_name  . '-' . $request->type . '-' .  $teacher->courses()->find($request->course_id)->name . "-" . $this->getCurrentSchoolYear("_") . '-' . now()->timestamp . '.' . $request->image->extension();

                    Storage::delete("public/" . $exam->image);
                    Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->image));
                    $exam->image = $directoryPath;
                }
                $exam->name = $request->name;
                $exam->type = $request->type;
                $exam->duration = $request->duration;
                $exam->passing_marks = $request->passing_marks;
                $exam->semester_id = $request->semester_id;
                $exam->course_id = $request->course_id;
                $exam->teacher_id = $teacher->id;
                $exam->save();
                return response()->json([
                    'message' => 'Exam mis à jour avec succès'
                ]);
            }
            return response()->json([
                'message' => 'Cet examen n\'existe pas'
            ], 404);
        }
        return response()->json([
            'message' => 'Ce professeur ne peut pas enseigner à cette matiere'
        ], 401);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if ($exam = Exam::find($id)) {
            $exam->delete();
            return response()->json(['message' => 'Examen supprimé avec succès']);
        }
        return response()->json(['message' => 'Examen introuvable'], 404);
    }
}
