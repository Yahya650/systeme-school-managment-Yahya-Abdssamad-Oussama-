<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Student;
use App\Models\TimeTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TimeTableController extends Controller
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

    public function timetableForStudent(Request $request)
    {
        $student = $request->user('student');

        return response()->json(
            $student->classe->time_table,
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(
            $request->user('admin')
                ->school_level
                ->classe_types
                ->flatMap(function ($classeType) {
                    return $classeType->classes()->with('time_table')->get();
                }),
            200
        );
    }

    public function timetableForParent(Request $request, $idStudent)
    {
        if (!Student::find($idStudent)) {
            return response()->json(['message' => 'Eleve introuvable'], 404);
        };

        $student = Student::find($idStudent);

        if ($student->student_parent_id !== $request->user('student_parent')->id) {
            return response()->json(['message' => 'Vous n\'avez pas la permission de voir ce emploi du temps'], 401);
        }
        return response()->json($student->classe->time_table, 200);
    }

    public function store(Request $request, $idClasse)
    {
        if (!Classe::find($idClasse)) {
            return response()->json(['message' => 'Classe introuvable'], 404);
        };

        $request->validate([
            'title' => ['nullable', 'string'],
            'file' => ['required', 'mimes:pdf,png,jpg,jpeg', 'max:2048'],
            "start_date" => ['required', 'date', 'after:' . now()->toDateString()],
        ]);

        $classe = Classe::find($idClasse);
        $admin = $request->user('admin');
        $schoolLevel = $classe->classeType->school_level;


        if (!$admin->school_levels()->wherePivot('school_level_id', $schoolLevel->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas la permission de modifier ou ajouter ce emploi du temps'], 401);
        }

        if ($classe->time_table_id) {
            Storage::exists("public/" . $classe->time_table->file) && Storage::disk('local')->delete("public/" . $classe->time_table->file);
            TimeTable::find($classe->time_table_id)->forceDelete();
        }

        $newTimeTable = new TimeTable();
        if ($request->file) {
            $directoryPath = 'time_tables/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : ($schoolLevel->name === 'Préscolaire' ? 'préscolaire' : 'high_school'))) . '/' .
                $classe->code . '-' . getCurrentSchoolYear() . '-' . now()->timestamp . '.' . $request->file->extension();

            Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->file));
            $newTimeTable->file = $directoryPath;
        }

        $newTimeTable->start_date = $request->start_date;
        $newTimeTable->title = $request->title;
        $newTimeTable->classe_id = $idClasse;
        $newTimeTable->save();

        $classe->time_table_id = $newTimeTable->id;
        $classe->save();
        return response()->json(['message' => 'Emploi du temps ajouté et envoyé avec succès'], 201);
    }

    public function show($id)
    {
        if (!TimeTable::find($id)) {
            return response()->json([
                'message' => 'Emploi du temps introuvable'
            ], 404);
        }

        if (request()->user()->cannot('view', TimeTable::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce emploi du temps'
            ], 401);
        }

        return response()->json(TimeTable::find($id)->with('classe')->get(), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => ['nullable', 'string'],
            'file' => ['nullable', 'mimes:pdf,png,jpg,jpeg', 'max:2048'],
        ]);

        if (!TimeTable::find($id)) {
            return response()->json(['message' => 'Emploi du temps introuvable'], 404);
        }

        $timeTable = TimeTable::find($id);

        $classe = Classe::find($timeTable->classe_id);
        $admin = $request->user('admin');
        $schoolLevel = $classe->classeType->school_level;

        if (!$admin->school_levels()->wherePivot('school_level_id', $schoolLevel->id)->wherePivot('type', 'educational')->wherePivot('deleted_at', null)->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas la permission de modifier ce emploi du temps'], 401);
        }

        if ($request->file) {
            Storage::exists("public/" . $classe->time_table()->file) && Storage::disk('local')->delete("public/" . $classe->time_table()->first()->file);
            $directoryPath = 'time_tables/' . ($schoolLevel->name === 'Primaire' ? 'primary' : ($schoolLevel->name === 'College' ? "college" : ($schoolLevel->name === 'Préscolaire' ? 'préscolaire' : 'high_school'))) . '/' .
                $classe->code . '-' . getCurrentSchoolYear() . '.' . $request->file->extension();

            Storage::disk('local')->put("public/" . $directoryPath, file_get_contents($request->file));
            $timeTable->file = $directoryPath;
        }

        $timeTable->title = $request->title;
        $timeTable->save();

        return response()->json(['message' => 'Emploi du temps mis à jour et envoyé avec succès']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (!TimeTable::find($id)) {
            return response()->json([
                'message' => 'Emploi du temps introuvable'
            ], 404);
        }

        TimeTable::find($id)->delete();

        return response()->json(['message' => 'Emploi du temps supprimé avec succès']);
    }
}
