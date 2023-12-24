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
            'password' => 'required|string|min:8',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|string|max:10|unique:students,phone_number',
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
        $newStudent->classe_id = $request->classe_id;
        $newStudent->parent_id = $request->parent_id;
        $newStudent->admin_id = $request->user()->id;
        $newStudent->save();

        return response([
            'code_massar' => $request->code_massar,
            'password' => $password,
            'message' => "Super Admin created successfully"
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
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
