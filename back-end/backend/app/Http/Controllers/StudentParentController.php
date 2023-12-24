<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class StudentParentController extends Controller
{


    public function login(Request $request)
    {

        $request->validate([
            'cin' => 'required',
            'password' => 'required',
        ]);

        $studentParent = StudentParent::where('cin', $request->cin)->first();
        if (!$studentParent || !Hash::check($request->password, $studentParent->password)) {
            return response([
                'message' => 'Les identifiants fournis sont incorrects'
            ], 401);
        }

        $studentParent->last_login_date = date('Y-m-d H:i:s');
        $studentParent->save();

        return response([
            'token' => $studentParent->createToken('StudentParent')->plainTextToken
        ], 200);
    }

    public function store(Request $request)
    {


        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:super_admins,email',
            'cin' => 'required|string|unique:super_admins,cin',
            'password' => 'required|string|min:8|confirmed',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|string|max:10|unique:super_admins,phone_number',
            'address' => 'nullable|string|max:255',
        ]);

        $newStudentParent = new StudentParent();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/parent_students/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newStudentParent->profile_picture = '/picture_profiles/parent_students/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $newStudentParent->profile_picture = $request->profile_picture;
        $newStudentParent->first_name = $request->first_name;
        $newStudentParent->last_name = $request->last_name;
        $newStudentParent->gender = $request->gender;
        $newStudentParent->email = $request->email;
        $newStudentParent->cin = $request->cin;
        $newStudentParent->password = Hash::make($request->password);
        $newStudentParent->health_status = $request->health_status;
        $newStudentParent->date_of_birth = $request->date_of_birth;
        $newStudentParent->blood_type = $request->blood_type;
        $newStudentParent->phone_number = $request->phone_number;
        $newStudentParent->address = $request->address;
        $newStudentParent->admin_id = $request->user()->id;
        $newStudentParent->save();

        return response([
            'message' => "Parent d'élève créé avec succès"
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
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentParent $studentParent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $studentParent)
    {
        //
    }
}
