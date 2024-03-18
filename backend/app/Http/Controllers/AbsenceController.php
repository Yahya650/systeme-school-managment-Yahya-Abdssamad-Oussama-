<?php

namespace App\Http\Controllers;

use Nette\Utils\Json;
use App\Models\Course;
use App\Models\Absence;
use Illuminate\Http\Request;
use App\Models\TeacherClasseCourse;
use App\Http\Requests\AbsenceRequest;

class AbsenceController extends Controller
{

    public function index(Request $request)
    {
        $absences = Absence::all();

        foreach ($absences as $absence) {
            if ($request->user('admin')->school_levels()->where('type', 'educational')->find($absence->student->classe->classeType->school_level->id)->exists()) {
                $result[] = $absence;
            }
        }

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
        ]);

        if (!TeacherClasseCourse::where('teacher_id', $request->user('teacher')->id)->where('course_id', $request->course_id)->exists()) {
            return response()->json([
                'message' => 'Ce professeur ne peut pas enseigner à cette classe ou n\'est pas enseigné à cette matière',
            ], 401);
        }

        $classes = $request->user('teacher')->classes()->get();
        foreach ($classes as $classe) {
            if ($classe->students()->find($request->student_id)->exists() && $request->user('teacher')->courses()->find($request->course_id)->exists()) {

                $newAbsence = new Absence();
                $newAbsence->start_time = $request->start_time;
                $newAbsence->end_time = $request->end_time;
                $newAbsence->student_id = $request->student_id;
                $newAbsence->teacher_id = $request->user('teacher')->id;
                $newAbsence->course_id = $request->course_id;
                $newAbsence->save();

                return response()->json([
                    'message' => 'Absence ajouter avec succès',
                ], 201);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {

        if (!Absence::find($id)) {
            return response()->json([
                'message' => 'Absence introuvable',
            ], 404);
        }

        $absence = Absence::find($id);

        if (!$request->user('admin')->school_levels()->wherePivot('type', 'educational')->where('school_level_id', $absence->student->classe->classeType->school_level->id)) {
            return response()->json([
                'message' => 'Vous n\'avez pas le droit d\'acceder à cette absence',
            ], 401);
        }

        return response()->json($absence);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AbsenceRequest $request, $id)
    {

        if (!Absence::find($id)) {
            return response()->json([
                'message' => 'Absence introuvable',
            ], 404);
        }

        $absence = Absence::find($id);
        if (!$request->user('admin')->school_levels()->wherePivot('type', 'educational')->where('school_level_id', $absence->student->classe->classeType->school_level->id)) {
            return response()->json([
                'message' => 'Vous n\'avez pas le droit d\'acceder à cette absence',
            ], 401);
        }


        $absence = Absence::find($id);
        $absence->reason = $request->reason;
        $absence->is_excused = $request->is_excused === 'true' ? 1 : 0;
        $absence->save();
        return response()->json([
            'message' => 'Absence mis à jour avec succès',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        if (!Absence::find($id)) {
            return response()->json([
                'message' => 'Absence introuvable',
            ], 404);
        }

        $absence = Absence::find($id);
        if (!$request->user('admin')->school_levels()->wherePivot('type', 'educational')->where('school_level_id', $absence->student->classe->classeType->school_level->id)) {
            return response()->json([
                'message' => 'Vous n\'avez pas le droit d\'acceder à cette absence',
            ], 401);
        }

        $absence = Absence::find($id);
        if ($absence->delete()) {
            return response()->json([
                'message' => 'Absence supprimé avec succès',
            ]);
        }
    }
}
