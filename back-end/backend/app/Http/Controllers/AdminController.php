<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Nette\Utils\Random;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{


    public function login(Request $request)
    {

        $request->validate([
            'cin_email' => 'required|string',
            'password' => 'required',
        ]);

        if ($admin = Admin::where('email', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $admin->password)) {
                return response([
                    'message' => 'Le mot de passe est incorrecte'
                ], 401);
            }
        } else if ($admin = Admin::where('cin', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $admin->password)) {
                return response([
                    'message' => 'Le mot de passe est incorrect'
                ], 401);
            }
        } else {
            return response([
                'message' => 'Les identifiants fournis sont incorrects'
            ], 401);
        }

        $admin->last_login_date = date('Y-m-d H:i:s');
        $admin->save();

        return response([
            'token' => $admin->createToken('Admin', ['admin', 'can-crud_students', 'can-crud_parent_students'])->plainTextToken
        ], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:admins,email',
            'cin' => 'required|string|unique:admins,cin',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|string|max:10|unique:admins,phone_number',
            'address' => 'nullable|string|max:255',
        ]);

        $password = Random::generate(8);

        $newAdmin = new Admin();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newAdmin->profile_picture = '/picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $newAdmin->first_name = $request->first_name;
        $newAdmin->last_name = $request->last_name;
        $newAdmin->gender = $request->gender;
        $newAdmin->email = $request->email;
        $newAdmin->cin = $request->cin;
        $newAdmin->password = Hash::make($password);
        $newAdmin->health_status = $request->health_status;
        $newAdmin->date_of_birth = $request->date_of_birth;
        $newAdmin->blood_type = $request->blood_type;
        $newAdmin->phone_number = $request->phone_number;
        $newAdmin->address = $request->address;
        $newAdmin->super_admin_id = $request->user()->id;

        $newAdmin->save();

        return response([
            'email' => $request->email,
            'password' => $password,
            'message' => "Administrateur créé avec succès"
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
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
