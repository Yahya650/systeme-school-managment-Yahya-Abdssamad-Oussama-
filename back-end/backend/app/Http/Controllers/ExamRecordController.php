<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Course;
use App\Models\Student;
use App\Models\ExamRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ExamRecordRequest;

class ExamRecordController extends Controller
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
    public function index()
    {
        return response()->json(ExamRecord::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExamRecordRequest $request)
    {
        $admin = $request->user('admin');
        if ($admin->school_levels()->wherePivot('school_level_id', Student::find($request->student_id)->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists()) {
            if (ExamRecord::where('student_id', $request->student_id)->where('exam_id', $request->exam_id)->exists()) {
                return response()->json([
                    'message' => 'La note existe déja',
                ], 409);
            }
            $record = new ExamRecord();
            $exam = Exam::find($request->exam_id);
            $admin = $request->user('admin');
            $cours = $exam->course;
            $student = Student::find($request->student_id);


            if ($request->image) {
                $schoolLevel = $cours->classeType->school_level;
                $directoryPath = 'exams/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : 'high_school')) . '/Marks' . '/' .
                    $student->code_massar . '-' .  $student->first_name . "_" . $student->last_name  . '-' . $cours->name . "-" . $exam->type . "-" . $this->getCurrentSchoolYear('_') . '-' . now()->timestamp . '.' . $request->image->extension();

                Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->image));
                $record->image = $directoryPath;
            }

            $record->mark = $request->mark;
            $record->comment = $request->comment;
            $record->student_id = $request->student_id;
            $record->exam_id = $request->exam_id;
            $record->admin_id = $admin->id;
            $record->save();
            return response()->json([
                'message' => 'Note enregistrée avec succès',
            ], 201);
        }
        return response()->json([
            'message' => 'Vous n\'avez pas les autorisations pour effectuer cette action',
        ], 401);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (ExamRecord::find($id)) {
            return response()->json(ExamRecord::find($id));
        }
        return response()->json([
            'message' => 'La note n\'existe pas',
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExamRecordRequest $request, $id)
    {
        $admin = $request->user('admin');

        if ($admin->school_levels()->wherePivot('school_level_id', Student::find($request->student_id)->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists()) {

            if (!ExamRecord::find($id)) {
                return response()->json([
                    'message' => 'La note n\'existe pas',
                ], 404);
            }

            $record = ExamRecord::find($id);
            $exam = Exam::find($request->exam_id);
            $admin = $request->user('admin');
            $cours = $exam->course;
            $student = Student::find($request->student_id);

            if ($request->image) {
                $schoolLevel = $cours->classeType->school_level;
                $directoryPath = 'exams/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : 'high_school')) . '/Marks' . '/' .
                    $student->code_massar . '-' .  $student->first_name . "_" . $student->last_name  . '-' . $cours->name . "-" . $exam->type . "-" . $this->getCurrentSchoolYear('_') . '-' . now()->timestamp . '.' . $request->image->extension();

                Storage::delete("public/" . $record->image);
                Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->image));
                $record->image = $directoryPath;
            }

            $record->mark = $request->mark;
            $record->comment = $request->comment;
            $record->student_id = $request->student_id;
            $record->exam_id = $request->exam_id;
            $record->admin_id = $admin->id;
            $record->save();
            return response()->json([
                'message' => 'Note mis à jour avec succès',
            ], 201);
        }
        return response()->json([
            'message' => 'Vous n\'avez pas les autorisations pour effectuer cette action',
        ], 401);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (ExamRecord::find($id)) {
            $record = ExamRecord::find($id);
            $record->delete();
            return response()->json([
                'message' => 'Note supprimée avec succès',
            ], 200);
        }
        return response()->json([
            'message' => 'La note n\'existe pas',
        ], 404);
    }
}
