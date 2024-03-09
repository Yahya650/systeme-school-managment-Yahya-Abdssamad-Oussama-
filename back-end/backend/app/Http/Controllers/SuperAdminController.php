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
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else if ($superAdmin = SuperAdmin::where('cin', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $superAdmin->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else {
            return response(['message' => 'Les identifiants fournis sont incorrects', 'errors' => ['cin_email' => 'Les identifiants fournis sont incorrects']], 422);
        }

        $superAdmin->last_login_date = now('Africa/Casablanca');
        $superAdmin->save();

        return response([
            'token' => $superAdmin->createToken('SuperAdmin', ['super_admin', 'can-crud_teachers', 'can-crud_admins'])->plainTextToken
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

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required'],
            'new_password' => ['required', 'min:8', 'confirmed'],
        ]);

        $superAdmin = $request->user('super_admin');
        if (!Hash::check($request->old_password, $superAdmin->password)) {
            return response()->json(['message' => 'L\'ancien mot de passe est incorrect', 'errors' => ['old_password' => 'L\'ancien mot de passe est incorrect']], 422);
        }

        if (Hash::check($request->new_password, $superAdmin->password)) {
            return response()->json(['message' => 'Le nouveau mot de passe doit être différent de l\'ancien.', 'errors' => ['new_password' => 'Le nouveau mot de passe doit être différent de l\'ancien.']], 422);
        }

        $superAdmin->password = Hash::make($request->new_password);
        $superAdmin->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
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
    public function update(Request $request)
    {
        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email'],
            'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/'],
            'health_status' => 'nullable|in:good,bad,middle',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string'],
            'address' => 'nullable|string|max:255',
        ]);

        $superAdmin = $request->user('super_admin');

        if ($request->profile_picture) {
            Storage::delete('public/' . $superAdmin->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/superAdmin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $superAdmin->profile_picture = 'picture_profiles/superAdmin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $superAdmin->first_name = $request->first_name;
        $superAdmin->last_name = $request->last_name;
        $superAdmin->gender = $request->gender;
        $superAdmin->email = $request->email;
        $superAdmin->cin = $request->cin;
        $superAdmin->health_status = $request->health_status;
        $superAdmin->date_of_birth = $request->date_of_birth;
        $superAdmin->blood_type = $request->blood_type;
        $superAdmin->phone_number = $request->phone_number;
        $superAdmin->address = $request->address;

        if (!$superAdmin->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de profile'
            ]);
        }

        return response([
            'message' => "profile mis à jour avec succès"
        ], 200);
    }

    public function updatePictureProfile(Request $request)
    {
        $superAdmin = $request->user('super_admin');

        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($superAdmin->profile_picture) {
            Storage::disk('public')->delete($superAdmin->profile_picture);
        }

        $imagePath = 'picture_profiles/super_admin/' . $superAdmin->cin . '-' . $superAdmin->last_name . "_" . $superAdmin->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        $superAdmin->profile_picture = $imagePath;
        $superAdmin->save();

        return response()->json([
            'message' => "Photo de profile mise à jour avec succès"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuperAdmin $superAdmin)
    {
        //
    }
}
