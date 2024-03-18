<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReportMail;
use App\Models\SchoolYear;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $admin = $request->user('admin');

        $reports = [];

        foreach (Report::all() as $report) {
            if ($admin->school_levels()->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->wherePivot('school_level_id', $report->student->classe->classeType->school_level_id)->exists()) {
                $reports[] = $report;
            }
        }

        return response()->json($reports);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'student_id' => 'required|exists:students,id',
        ]);

        $student = Student::find($request->student_id);

        if (!$student) {
            return response()->json(['message' => 'Étudiant non trouvé'], 404);
        }

        $admin = $request->user('admin');

        if (!$admin->school_levels()->wherePivot('school_level_id', $student->classe->classeType->school_level->id)->wherePivot('types', 'like', '%educational%')->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas les autorisations pour effectuer cette action'], 401);
        }

        $report = new Report();
        $report->title = $request->title;
        $report->content = $request->content;
        $report->school_year_id = SchoolYear::latest()->first()->id;
        $report->student_id = $request->student_id;
        $report->admin_id = $admin->id;
        $report->save();

        // make mailer for send this report to parent
        $parent = $student->parent;
        $parentEmail = $parent->email;
        $reportData = [
            'title' => $report->title,
            'content' => $report->content,
            'student' => $student,
        ];

        Mail::to($parentEmail)->send(new ReportMail($reportData));

        return response()->json(['message' => 'Rapport crée et envoyé au parent ' . $parent->last_name . ' ' . $parent->first_name . ' avec succès'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        if (!Report::find($id)) {
            return response()->json([
                'message' => 'Rapport non trouvé'
            ], 404);
        }

        $report = Report::find($id);

        $admin = $request->user('admin');

        if (!$admin->school_levels()->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->where('school_level_id', $report->student->classe->classeType->school_level->id)) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce rapport'
            ], 401);
        }

        return response()->json($report);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        if (!Report::find($id)) {
            return response()->json([
                'message' => 'Rapport non trouvé'
            ], 404);
        }

        $report = Report::find($id);
        $student_id = $report->student->id;
        $admin = $request->user('admin');

        if (!$admin->school_levels()->wherePivot('school_level_id', Student::find($student_id)->classe->classeType->school_level->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas les autorisations pour effectuer cette action'], 401);
        }

        Report::find($id)->delete();
        return response()->json(['message' => 'Rapport supprimé avec succès']);
    }
}
