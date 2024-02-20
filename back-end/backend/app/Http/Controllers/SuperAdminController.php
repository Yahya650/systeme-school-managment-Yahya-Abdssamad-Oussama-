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
