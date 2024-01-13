<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Nette\Utils\Random;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'code_massar' => 'required',
            'password' => 'required',
        ]);

        $student = Student::where('code_massar', $request->code_massar)->first();
        if (!$student || !Hash::check($request->password, $student->password)) {
            return response([
                'message' => 'Les identifiants fournis sont incorrects'
            ], 422);
        }

        $student->last_login_date = date('Y-m-d H:i:s');
        $student->save();

        return response([
            'token' => $student->createToken('Student', ['student'])->plainTextToken
        ], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:students,email',
            'cin' => 'nullable|string|regex:/^[A-Z]{1,2}\d+$/|unique:students,cin',
            'code_massar' => 'required|string|unique:students,code_massar|regex:/^[A-Z]\d{9}$/',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required','size:10', 'regex:/^(06|07)\d{8}$/', Rule::unique('students', 'phone_number')],
            'address' => 'nullable|string|max:255',
            'student_parent_id' => 'nullable|exists:student_parents,id',
            'classe_id' => 'required|exists:classes,id',
        ]);

        $password = Random::generate(8);

        $newStudent = new Student();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newStudent->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $newStudent->first_name = $request->first_name;
        $newStudent->last_name = $request->last_name;
        $newStudent->gender = $request->gender;
        $newStudent->email = $request->email;
        $newStudent->cin = $request->cin;
        $newStudent->code_massar = $request->code_massar;
        $newStudent->password = Hash::make($password);
        $newStudent->health_status = $request->health_status;
        $newStudent->date_of_birth = $request->date_of_birth;
        $newStudent->blood_type = $request->blood_type;
        $newStudent->phone_number = $request->phone_number;
        $newStudent->address = $request->address;
        $newStudent->classe_id = $request->classe_id;
        $newStudent->student_parent_id = $request->student_parent_id;
        $newStudent->admin_id = $request->user('admin')->id;
        $newStudent->save();

        return response([
            'code_massar' => $request->code_massar,
            'password' => $password,
            'message' => "Étudiant créé avec succès"
        ], 201);
    }

    public function logout(Request $request)
    {
        try {
            $request->user('student')->tokens()->delete();
            return response([
                'message' => 'Déconnexion réussie'
            ], 200);
        } catch (\Throwable $th) {
            return response([
                'message' => $th->getMessage()
            ], 500);
        }
    }



    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user('admin')->school_level()->first()->classe_types()->with('classes.students.parent')->get());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('view', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce Étudiant'
            ], 401);
        }

        return response()->json(Student::find($id)->with('parent')->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('update', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce Étudiant'
            ], 401);
        }


        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('students', 'email')->ignore($id)],
            'cin' => ['nullable', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('students', 'cin')->ignore($id)],
            'code_massar' => ['required', 'string', Rule::unique('students', 'code_massar')->ignore($id), 'regex:/^[A-Z]\d{9}$/'],
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', 'size:10', Rule::unique('students', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
        ]);

        $student = Student::find($id);

        if ($request->profile_picture) {
            Storage::delete('public/' . $student->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $student->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $student->first_name = $request->first_name;
        $student->last_name = $request->last_name;
        $student->gender = $request->gender;
        $student->email = $request->email;
        $student->cin = $request->cin;
        $student->code_massar = $request->code_massar;
        $student->health_status = $request->health_status;
        $student->date_of_birth = $request->date_of_birth;
        $student->blood_type = $request->blood_type;
        $student->phone_number = $request->phone_number;
        $student->address = $request->address;

        $student->save();

        return response([
            'message' => "Étudiant mis à jour avec succès"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('delete', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce Étudiant'
            ], 401);
        }

        if (!Student::find($id)->delete()) {
            return response()->json([
                'message' => 'Étudiant non trouvé pour la suppression'
            ], 404);
        }

        return response()->json([
            'message' => 'Étudiant supprimé avec succès'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', 'min:8', function ($attribute, $old_password, $fail) {
                if (!Hash::check($old_password, auth('student')->user()->password)) {
                    $fail($attribute, 'Ancien mot de passe incorrect');
                }
            }],
            'new_password' => [
                'required',
                'min:8',
                'confirmed',
                Rule::notIn([$request->old_password]),
            ],
        ], [
            'new_password.not_in' => 'Le nouveau mot de passe doit être différent du mot de passe actuel',
        ]);

        $student = $request->user('student');
        $student->password = Hash::make($request->new_password);
        $student->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function renewPassword($id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('renewPassword', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de rêinitialiser le mot de passe ce étudiant'
            ], 401);
        }

        $student = Student::find($id);
        $newPassword = Random::generate(8);
        $student->password = Hash::make($newPassword);
        $student->save();
        return response()->json([
            'code_massar' => $student->code_massar,
            'new_password' => $newPassword,
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function restore($id)
    {

        if (!Student::onlyTrashed()->find($id)) {
            return response()->json([
                'message' => 'Cet etudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('restore', Student::onlyTrashed()->find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de restaurer ce etudiant'
            ], 401);
        }


        if (!Student::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet etudiant non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet etudiant restaure avec succès'
        ]);
    }
    

    public function restoreAll()
    {
        if (!Student::onlyTrashed()->where('admin_id', request()->user()->id)->restore()) {
            return response()->json([
                'message' => 'Aucun etudiant non détruit'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les etudiants restaure avec succès'
        ]);
    }

    public function trash()
    {
        return response()->json(request()->user()->students()->onlyTrashed()->latest()->get());
    }


    // public function forceDelete($id)
    // {
    //     if (!Student::onlyTrashed()->find($id)) {
    //         return response()->json([
    //             'message' => 'Cet etudiant non détruit ou non trouvé'
    //         ], 404);
    //     }
    //     if (request()->user()->cannot('forceDelete', Student::onlyTrashed()->find($id))) {
    //         return response()->json([
    //             'message' => 'Vous n\'avez pas la permission de détruire ce etudiant'
    //         ], 401);
    //     }

    //     if (!Student::onlyTrashed()->find($id)->forceDelete()) {
    //         return response()->json([
    //             'message' => 'Cet etudiant non détruit'
    //         ], 404);
    //     }

    //     return response()->json([
    //         'message' => 'Cet etudiant détruit avec succès'
    //     ]);
    // }


}
