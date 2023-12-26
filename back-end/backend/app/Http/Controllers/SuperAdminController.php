<?php

namespace App\Http\Controllers;

use App\Models\SuperAdmin;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class SuperAdminController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'cin_email' => 'required',
            'password' => 'required',
        ]);
        if ($superAdmin = SuperAdmin::where('email', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $superAdmin->password)) {
                return response([
                    'message' => 'Le mot de passe est incorrecte'
                ], 422);
            }
        } else if ($superAdmin = SuperAdmin::where('cin', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $superAdmin->password)) {
                return response([
                    'message' => 'Le mot de passe est incorrect'
                ], 422);
            }
        } else {
            return response([
                'message' => 'Les identifiants fournis sont incorrects'
            ], 422);
        }
        
        $superAdmin->last_login_date = date('Y-m-d H:i:s');
        $superAdmin->save();
        
        return response([
            'token' => $superAdmin->createToken('SuperAdmin', ['super_admin', 'can-crud_teachers', 'can-crud_admins'])->plainTextToken
        ], 200);
    }

    public function register(Request $request)
    {

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:super_admins,email',
            'cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:super_admins,cin',
            'password' => 'required|string|min:8|confirmed',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|min:10|string|max:10|unique:super_admins,phone_number',
            'address' => 'nullable|string|max:255',
        ]);

        $newSuperAdmin = new SuperAdmin();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/super_admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newSuperAdmin->profile_picture = '/picture_profiles/super_admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $newSuperAdmin->first_name = $request->first_name;
        $newSuperAdmin->last_name = $request->last_name;
        $newSuperAdmin->gender = $request->gender;
        $newSuperAdmin->email = $request->email;
        $newSuperAdmin->cin = $request->cin;
        $newSuperAdmin->password = Hash::make($request->password);
        $newSuperAdmin->health_status = $request->health_status;
        $newSuperAdmin->date_of_birth = $request->date_of_birth;
        $newSuperAdmin->blood_type = $request->blood_type;
        $newSuperAdmin->phone_number = $request->phone_number;
        $newSuperAdmin->address = $request->address;
        $newSuperAdmin->save();

        return response([
            'message' => "Super administrateur créé avec succès"
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            $request->user('super_admin')->tokens()->delete();
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SuperAdmin $superAdmin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SuperAdmin $superAdmin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuperAdmin $superAdmin)
    {
        //
    }
}
