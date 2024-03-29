<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Nette\Utils\Random;
use App\Models\Responsible;
use App\Models\SchoolLevel;
use Illuminate\Http\Request;
use App\Helpers\HashidsHelper;
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
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else if ($admin = Admin::where('cin', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $admin->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else {
            return response(['message' => 'Les identifiants fournis sont incorrects', 'errors' => ['cin_email' => 'Les identifiants fournis sont incorrects']], 422);
        }

        $admin->last_login_date = now('Africa/Casablanca');
        $admin->save();

        return response([
            'token' => $admin->createToken('Admin', ['admin', 'can-crud_students', 'can-crud_student_parents'])->plainTextToken
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
            'cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:admins,cin',
            'health_status' => 'nullable|in:good,bad,middle',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', Rule::unique('admins', 'phone_number')],
            'address' => 'nullable|string|max:255',
            'responsibility' => 'required|array',
        ]);


        $password = Random::generate(8);
        $newAdmin = new Admin();
        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newAdmin->profile_picture = 'picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
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
        $newAdmin->super_admin_id = $request->user('super_admin')->id;
        $newAdmin->save();

        // loop for school levels
        for ($i = 0; $i < count($request->responsibility); $i++) {
            if (!SchoolLevel::find($request->responsibility[$i]['school_level_id']) || !in_array('financial' || 'educational', $request->responsibility[$i]['types'])) {
                return response()->json([
                    'message' => "Le niveau scolaire n'existe pas ou le type n'est pas correct"
                ], 404);
            }
            $newAdmin->school_levels()->attach($request->responsibility[$i]['school_level_id'], ['types' => json_encode($request->responsibility[$i]['types'])]);
        }

        return response([
            'cin' => $request->cin,
            'email' => $request->email,
            'password' => $password,
            'message' => "Administrateur créé avec succès"
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user('admin')->tokens()->delete();
        return response([
            'message' => 'Déconnexion réussie'
        ], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Admin::latest()->paginate(5));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        if (!Admin::find($id)) {
            return response()->json([
                'message' => 'Administrateur non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('view', Admin::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce administrateur'
            ], 401);
        }

        return response()->json(Admin::with(['school_levels', 'reports.student', 'examRecords.student'])->find($id));
    }

    public function updatePictureProfile(Request $request, $id)
    {
        // Find the admin by ID
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json([
                'message' => 'Administrateur non trouvé'
            ], 404);
        }

        // Validate the incoming request
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($admin->profile_picture) {
            Storage::disk('public')->delete($admin->profile_picture);
        }

        // Store the profile picture in the storage
        $imagePath = 'picture_profiles/admin/' . $admin->cin . '-' . $admin->last_name . "_" . $admin->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        // Update the admin's profile picture URL
        $admin->profile_picture = $imagePath;

        // Save the updated admin data
        if (!$admin->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de la photo de profil'
            ]);
        }

        return response()->json([
            'message' => "Photo de profil mise à jour avec succès"
        ], 200);
    }

    public function updatePictureProfileAuth(Request $request)
    {
        $admin = $request->user('admin');

        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($admin->profile_picture) {
            Storage::disk('public')->delete($admin->profile_picture);
        }

        $imagePath = 'picture_profiles/admin/' . $admin->cin . '-' . $admin->last_name . "_" . $admin->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        $admin->profile_picture = $imagePath;
        $admin->save();

        return response()->json([
            'message' => "Photo de profile mise à jour avec succès"
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        if (!Admin::find($id)) {
            return response()->json([
                'message' => 'Administrateur non trouvé'
            ], 404);
        }


        if (request()->user()->cannot('update', Admin::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce administrateur'
            ], 401);
        }

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('admins', 'email')->ignore($id)],
            'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('admins', 'cin')->ignore($id)],
            'health_status' => 'nullable|in:good,bad,middle',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', Rule::unique('admins', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
            'responsibility' => 'array',
        ]);

        $admin = Admin::find($id);

        if ($request->profile_picture) {
            Storage::delete('public/' . $admin->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $admin->profile_picture = 'picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $admin->first_name = $request->first_name;
        $admin->last_name = $request->last_name;
        $admin->gender = $request->gender;
        $admin->email = $request->email;
        $admin->cin = $request->cin;
        $admin->health_status = $request->health_status;
        $admin->date_of_birth = $request->date_of_birth;
        $admin->blood_type = $request->blood_type;
        $admin->phone_number = $request->phone_number;
        $admin->address = $request->address;

        if (!$admin->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'administrateur'
            ]);
        }

        Responsible::where('admin_id', $admin->id)->delete();
        // loop for school levels
        for ($i = 0; $i < count($request->responsibility); $i++) {
            if (!SchoolLevel::find($request->responsibility[$i]['school_level_id']) || !in_array('financial' || 'educational', $request->responsibility[$i]['types'])) {
                return response()->json([
                    'message' => "Le niveau scolaire n'existe pas ou le type n'est pas correct ou le niveau scolaire ne doit pas être de type 'financial' ou 'educational'"
                ], 404);
            }
            $admin->school_levels()->attach($request->responsibility[$i]['school_level_id'], ['types' => json_encode($request->responsibility[$i]['types'])]);
        }

        return response([
            'message' => "Administrateur mis à jour avec succès"
        ], 200);
    }
    public function updateProfile(Request $request)
    {

        $admin = $request->user('admin');

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('admins', 'email')->ignore($admin->id)],
            'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('admins', 'cin')->ignore($admin->id)],
            'health_status' => 'nullable|in:good,bad,middle',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', Rule::unique('admins', 'phone_number')->ignore($admin->id)],
            'address' => 'nullable|string|max:255',
        ]);


        if ($request->profile_picture) {
            Storage::delete('public/' . $admin->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $admin->profile_picture = 'picture_profiles/admin/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $admin->first_name = $request->first_name;
        $admin->last_name = $request->last_name;
        $admin->gender = $request->gender;
        $admin->email = $request->email;
        $admin->cin = $request->cin;
        $admin->health_status = $request->health_status;
        $admin->date_of_birth = $request->date_of_birth;
        $admin->blood_type = $request->blood_type;
        $admin->phone_number = $request->phone_number;
        $admin->address = $request->address;

        if (!$admin->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de profile'
            ]);
        }

        return response([
            'message' => "profile mis à jour avec succès"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (!Admin::find($id)) {
            return response()->json([
                'message' => 'Administrateur non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('delete', Admin::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce administrateur'
            ], 401);
        }


        if (!Admin::find($id)->delete()) {
            return response()->json([
                'message' => 'Administrateur non trouvé pour la suppression'
            ], 404);
        }

        return response()->json([
            'message' => 'Administrateur supprimé avec succès'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', 'min:8', function ($attribute, $old_password, $fail) {
                if (!Hash::check($old_password, auth('admin')->user()->password)) {
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

        $admin = $request->user('admin');
        $admin->password = Hash::make($request->new_password);
        $admin->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }


    public function renewPassword($id)
    {
        if (!Admin::find($id)) {
            return response()->json([
                'message' => 'Cet administrateur non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('renewPassword', Admin::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de rêinitialiser le mot de passe ce administrateur'
            ], 401);
        }

        $admin = Admin::find($id);
        $newPassword = Random::generate(8);
        $admin->password = Hash::make($newPassword);
        $admin->save();
        return response()->json([
            'email' => $admin->email,
            'cin' => $admin->cin,
            'password' => $newPassword,
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function restore($id)
    {
        if (!Admin::onlyTrashed()->find($id)) {
            return response()->json([
                'message' => 'Cet administrateur non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('restore', Admin::onlyTrashed()->find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de restaurer ce administrateur'
            ], 401);
        }

        if (!Admin::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet administrateur non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet administrateur restaure avec succès'
        ]);
    }


    public function restoreAll()
    {
        if (!Admin::onlyTrashed()->where('super_admin_id', request()->user()->id)->restore()) {
            return response()->json([
                'message' => 'Aucun administrateur non détruit'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les administrateurs restaure avec succès'
        ]);
    }

    public function trash()
    {
        return response()->json(Admin::onlyTrashed()->latest()->paginate(10));
    }

    public function restoreSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun administrateur sélectionné'
            ], 404);
        }

        // Ensure all selected admins exist and are trashed
        $admins = Admin::onlyTrashed()->whereIn('id', $request->ids)->get();
        if ($admins->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains administrateurs sélectionnés n\'existent pas ou ne sont pas détruits'
            ], 404);
        }

        // Restore selected admins
        foreach ($admins as $admin) {
            $admin->restore();
        }

        return response()->json([
            'message' => 'Tous les administrateurs sélectionnés ont été restaurés avec succès'
        ]);
    }

    public function deleteSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun administrateur sélectionné'
            ], 404);
        }

        // Ensure all selected admins exist
        $admins = Admin::whereIn('id', $request->ids)->get();
        if ($admins->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains administrateurs sélectionnés n\'existent pas ou ne sont pas supprimés'
            ], 404);
        }

        // delete selected admins
        foreach ($admins as $admin) {
            $admin->delete();
        }

        return response()->json([
            'message' => 'Tous les administrateurs sélectionnés ont été supprimés avec succès'
        ]);
    }


    public function search(Request $request)
    {
        $cin = $request->cin;
        $first_name = $request->first_name;
        $phone_number = $request->phone_number;
        $type = $request->type;

        $adminsQuery = Admin::query()->withTrashed();

        if ($cin) $adminsQuery->where('cin', 'like', '%' . $cin . '%');
        if ($first_name) $adminsQuery->where('first_name', 'like', '%' . $first_name . '%');
        if ($phone_number) $adminsQuery->where('phone_number', 'like', '%' . $phone_number . '%');

        $admins = $adminsQuery->get();

        if ($type === "deleted") {
            $deletedAdmins = $admins->filter(function ($admin) {
                return $admin->deleted_at !== null;
            });
            return response()->json([
                'data' => $deletedAdmins->values(),
                'current_page' => 1, // Assuming it's always the first page for deleted Admins
                'per_page' => 0,
                'total' => 0,
                'last_page' => 0 // Assuming it's always the last page for deleted Admins
            ]);
        }

        return response()->json([
            'data' => $admins,
            'current_page' => 1, // Assuming it's always the first page for normal Admins
            'per_page' => 0,
            'total' => 0,
            'last_page' => 0 // Assuming it's always the last page for normal Admins
        ]);
    }
}
