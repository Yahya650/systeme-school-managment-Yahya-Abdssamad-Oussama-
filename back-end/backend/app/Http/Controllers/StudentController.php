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
            ], 401);
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
            'cin' => 'nullable|string|unique:students,cin',
            'code_massar' => 'required|string|unique:students,code_massar|regex:/^[A-Z]\d{9}$/',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|min:10|string|max:10|unique:students,phone_number',
            'address' => 'nullable|string|max:255',
        ]);

        $password = Random::generate(8);

        $newStudent = new Student();


        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newStudent->profile_picture = '/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
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
        $newStudent->classe_id = 1;
        $newStudent->parent_id = 2;
        $newStudent->admin_id = $request->user()->id;
        $newStudent->save();

        return response([
            'code_massar' => $request->code_massar,
            'password' => $password,
            'message' => "Étudiant créé avec succès"
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
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
        return response()->json($request->user()->students()->latest()->get());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ]);
        }
        return response()->json(Student::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ]);
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
        // if (!Hash::check($request->old_password, $teacher->password)) {
        //     return response()->json([
        //         'message' => 'oldPassword not correct' // message if oldPassword not correct
        //     ]);
        // }

        if ($request->profile_picture) {
            Storage::delete($student->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $student->profile_picture = '/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
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
            ]);
        }

        if (!Student::find($id)->delete()) {
            return response()->json([
                'message' => 'Étudiant non trouvé pour la suppression'
            ]);
        }

        return response()->json([
            'message' => 'Étudiant supprimé avec succès'
        ]);
    }
}
