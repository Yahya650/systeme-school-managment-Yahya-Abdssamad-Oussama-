<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Module;
use App\Models\Student;
use App\Models\Semester;
use App\Models\TypeExam;
use App\Models\ExamRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ExamRecordRequest;

class ExamRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ExamRecord::all());
    }
    public function getLatestMarks()
    {
        return response()->json(request()->user('student')->examRecords()->latest()->get());
    }

    public function lastMarks(Request $request)
    {
        $admin = $request->user('admin');
        $examRecords = $admin->examRecords()->with(['student'])->latest()->limit(5)->get();
        return response()->json($examRecords);
    }


    public function getMarks(Request $request)
    {
        $request->validate([
            "semester_id" => ['required', 'exists:semesters,id'],
            "school_year_id" => ['required', 'exists:school_years,id'],
        ]);

        $student = $request->user('student');
        $result = [];

        $student->examRecords()->each(function ($exam_record) use ($request, &$result) {
            $exam = $exam_record->exam()->where('school_year_id', $request->school_year_id)->where('semester_id', $request->semester_id)->first();
            if ($exam) {
                $result[] = $exam_record; // Include entire exam record
            }
        });

        return response()->json($result);
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
                    $student->code_massar . '-' .  $student->first_name . "_" . $student->last_name  . '-' . $cours->name . "-" . $exam->type . "-" . getCurrentSchoolYear('_') . '-' . now()->timestamp . '.' . $request->image->extension();

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
                    $student->code_massar . '-' .  $student->first_name . "_" . $student->last_name  . '-' . $cours->name . "-" . $exam->type . "-" . getCurrentSchoolYear('_') . '-' . now()->timestamp . '.' . $request->image->extension();

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


    public function saveMarksByCourseManual()
    {
        $request = request();
        $admin = $request->user('admin');
        $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'course_id' => 'required|exists:courses,id',
            'module_id' => 'nullable|exists:modules,id',
            'semester_id' => 'required|exists:semesters,id',
            'type_exam_id' => 'required|exists:type_exams,id',
            'marks' => 'required|array',
        ]);


        $classe = Classe::find($request->classe_id);
        if (!$classe) return response()->json(['message' => 'Classe non trouve'], 404);

        if (!$admin->school_levels()->wherePivot('school_level_id', $classe->classeType->school_level->id)->wherePivot('types', 'like', '%educational%')->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas les autorisations pour effectuer cette action'], 401);
        }

        $course = Course::find($request->course_id);
        if (!$course) return response()->json(['message' => 'Matiére non trouve'], 404);
        if ($course->modules()->exists() && !$request->module_id) {
            return response()->json(['message' => 'sil vous plait selectionner une sous unité'], 409);
        }

        $semester = Semester::find($request->semester_id);
        if (!$semester) return response()->json(['message' => 'Session non trouve'], 404);

        $typeExam = TypeExam::find($request->type_exam_id);
        if (!$typeExam) return response()->json(['message' => 'Type de controle non trouve'], 404);


        if ($request->module_id) {
            $module = Module::find($request->module_id);
            if (!$module) return response()->json(['message' => 'lsous unité non trouve'], 404);

            if ($exam = Exam::where('classe_id', $request->classe_id)->where('type_exam_id', $request->type_exam_id)->where('school_year_id', getCurrentSchoolYearFromDataBase()->id)->where('course_id', $request->course_id)->where('module_id', $request->module_id)->where('semester_id', $request->semester_id)->first()) {
                foreach ($request->marks as $mark) {
                    $exam_record = ExamRecord::where('student_id', $mark['student_id'])->where('exam_id', $exam->id)->first();
                    if ($exam_record) {
                        $exam_record->note = $mark['mark'];
                        $exam_record->admin_id = $admin->id;
                        $exam_record->save();
                    }
                }
                return response()->json(['message' => 'les notes ont bien été mis à jour'], 200);
            }
        }
        if ($exam = Exam::where('classe_id', $request->classe_id)->where('type_exam_id', $request->type_exam_id)->where('school_year_id', getCurrentSchoolYearFromDataBase()->id)->where('course_id', $request->course_id)->where('module_id', null)->where('semester_id', $request->semester_id)->first()) {
            foreach ($request->marks as $mark) {
                $exam_record = ExamRecord::where('student_id', $mark['student_id'])->where('exam_id', $exam->id)->first();
                if ($exam_record) {
                    $exam_record->note = $mark['mark'];
                    $exam_record->admin_id = $admin->id;
                    $exam_record->save();
                }
            }
            return response()->json(['message' => 'les notes ont bien été mis à jour'], 200);
        }

        $exam = new Exam();
        $exam->module_id = $request->module_id;
        $exam->course_id = $request->course_id;
        $exam->semester_id = $request->semester_id;
        $exam->type_exam_id = $request->type_exam_id;
        $exam->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $exam->classe_id = $request->classe_id;
        $exam->save();

        foreach ($request->marks as $mark) {
            $exam_record = new ExamRecord();
            $exam_record->exam_id = $exam->id;
            $exam_record->student_id = $mark['student_id'];
            $exam_record->note = $mark['mark'];
            $exam_record->admin_id = $admin->id;
            $exam_record->save();
        }

        return response()->json(['message' => 'Les notes ont bien été enregistrées'], 200);
    }
}
