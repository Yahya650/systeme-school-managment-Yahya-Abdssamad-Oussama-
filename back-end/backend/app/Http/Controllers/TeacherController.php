<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Nette\Utils\Random;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\TeacherClasseCourse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{

    public function login(Request $request)
    {

        $request->validate([
            'cin_email' => 'required|string',
            'password' => 'required',
        ]);

        if ($teacher = Teacher::where('email', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $teacher->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else if ($teacher = Teacher::where('cin', $request->cin_email)->first()) {
            if (!Hash::check($request->password, $teacher->password)) {
                return response(['message' => 'Le mot de passe est incorrect', 'errors' => ['password' => ['Le mot de passe est incorrect']]], 422);
            }
        } else {
            return response(['message' => 'Les identifiants fournis sont incorrects', 'errors' => ['cin_email' => 'Les identifiants fournis sont incorrects']], 422);
        }
        $teacher->last_login_date = now('Africa/Casablanca');
        $teacher->save();

        return response([
            'token' => $teacher->createToken('Teacher', ['teacher'])->plainTextToken
        ], 200);
    }

    public function store(Request $request)
    {

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:teachers,email',
            'cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:teachers,cin',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', Rule::unique('teachers', 'phone_number')],
            'address' => 'nullable|string|max:255',
        ]);


        $password = Random::generate(8);

        $newTeacher = new Teacher();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $newTeacher->profile_picture = 'picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $newTeacher->first_name = $request->first_name;
        $newTeacher->last_name = $request->last_name;
        $newTeacher->gender = $request->gender;
        $newTeacher->email = $request->email;
        $newTeacher->cin = $request->cin;
        $newTeacher->password = Hash::make($password);
        $newTeacher->health_status = $request->health_status;
        $newTeacher->date_of_birth = $request->date_of_birth;
        $newTeacher->blood_type = $request->blood_type;
        $newTeacher->phone_number = $request->phone_number;
        $newTeacher->address = $request->address;
        $newTeacher->super_admin_id = $request->user('super_admin')->id;
        $newTeacher->save();

        return response([
            'cin' => $request->cin,
            'email' => $request->email,
            'password' => $password,
            'message' => "Enseignant créé avec succès"
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user('teacher')->tokens()->delete();
        return response([
            'message' => 'Déconnexion réussie'
        ], 200);
    }


    public function index()
    {
        return response()->json(Teacher::latest()->paginate(5));
    }

    public function updatePictureProfile(Request $request, $id)
    {
        // Find the teacher by ID
        $teacher = Teacher::find($id);
        if (!$teacher) {
            return response()->json([
                'message' => 'Enseignant non trouvé'
            ], 404);
        }

        // Validate the incoming request
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($teacher->profile_picture) {
            Storage::disk('public')->delete($teacher->profile_picture);
        }

        // Store the profile picture in the storage
        $imagePath = 'picture_profiles/teacher/' . $teacher->cin . '-' . $teacher->last_name . "_" . $teacher->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        // Update the teacher's profile picture URL
        $teacher->profile_picture = $imagePath;

        // Save the updated teacher data
        if (!$teacher->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de la photo de profile'
            ]);
        }

        return response()->json([
            'message' => "Photo de profile mise à jour avec succès"
        ], 200);
    }


    public function show($id)
    {
        if (!Teacher::find($id)) {
            return response()->json([
                'message' => 'Enseignant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('view', Teacher::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce enseignant'
            ], 401);
        }

        return response()->json(Teacher::with(['classes', 'courses', 'exercises.course', 'exercises.classes'])->find($id));
    }

    public function updateProfile(Request $request)
    {
        $teacher = $request->user('teacher');

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('teachers', 'email')->ignore($teacher->id)],
            'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('teachers', 'cin')->ignore($teacher->id)],
            'health_status' => 'nullable|in:good,bad,middle',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', Rule::unique('teachers', 'phone_number')->ignore($teacher->id)],
            'address' => 'nullable|string|max:255',
        ]);


        if ($request->profile_picture) {
            Storage::delete('public/' . $teacher->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $teacher->profile_picture = 'picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $teacher->first_name = $request->first_name;
        $teacher->last_name = $request->last_name;
        $teacher->gender = $request->gender;
        $teacher->email = $request->email;
        $teacher->cin = $request->cin;
        $teacher->health_status = $request->health_status;
        $teacher->date_of_birth = $request->date_of_birth;
        $teacher->blood_type = $request->blood_type;
        $teacher->phone_number = $request->phone_number;
        $teacher->address = $request->address;

        if (!$teacher->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de profile'
            ]);
        }

        return response([
            'message' => "profile mis à jour avec succès"
        ], 200);
    }

    public function updatePictureProfileAuth(Request $request)
    {
        $teacher = $request->user('teacher');

        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($teacher->profile_picture) {
            Storage::disk('public')->delete($teacher->profile_picture);
        }

        $imagePath = 'picture_profiles/teacher/' . $teacher->cin . '-' . $teacher->last_name . "_" . $teacher->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        $teacher->profile_picture = $imagePath;
        $teacher->save();

        return response()->json([
            'message' => "Photo de profile mise à jour avec succès"
        ], 200);
    }


    public function update(Request $request, $id)
    {

        if (!Teacher::find($id)) {
            return response()->json([
                'message' => 'Enseignant non trouvé'
            ], 404);
        }


        if (request()->user()->cannot('update', Teacher::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce enseignant'
            ], 401);
        }


        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('teachers', 'email')->ignore($id)],
            'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('teachers', 'cin')->ignore($id)],
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', Rule::unique('teachers', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
        ]);

        $teacher = Teacher::find($id);

        if ($request->profile_picture) {
            Storage::delete('public/' . $teacher->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." .  $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $teacher->profile_picture = 'picture_profiles/teacher/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." .  $request->profile_picture->extension();
        }

        $teacher->first_name = $request->first_name;
        $teacher->last_name = $request->last_name;
        $teacher->gender = $request->gender;
        $teacher->email = $request->email;
        $teacher->cin = $request->cin;
        $teacher->health_status = $request->health_status;
        $teacher->date_of_birth = $request->date_of_birth;
        $teacher->blood_type = $request->blood_type;
        $teacher->phone_number = $request->phone_number;
        $teacher->address = $request->address;

        $teacher->save();

        return response([
            'message' => "Enseignant mis à jour avec succès"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (!Teacher::find($id)) {
            return response()->json([
                'message' => 'Enseignant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('delete', Teacher::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce enseignant'
            ], 401);
        }

        if (!Teacher::find($id)->delete()) {
            return response()->json([
                'message' => 'Enseignant non trouvé pour la suppression'
            ], 404);
        }

        return response()->json([
            'message' => 'Enseignant supprimé avec succès'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', 'min:8', function ($attribute, $old_password, $fail) {
                if (!Hash::check($old_password, auth('teacher')->user()->password)) {
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

        $teacher = $request->user('teacher');
        $teacher->password = Hash::make($request->new_password);
        $teacher->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }


    public function renewPassword($id)
    {
        if (!Teacher::find($id)) {
            return response()->json([
                'message' => 'Cet enseignant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('renewPassword', Teacher::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de rêinitialiser le mot de passe ce enseignant'
            ], 401);
        }

        $newPassword = Random::generate(8);
        $teacher = Teacher::find($id);
        $teacher->password = Hash::make($newPassword);
        $teacher->save();
        return response()->json([
            'email' => $teacher->email,
            'cin' => $teacher->cin,
            'password' => $newPassword,
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function restore($id)
    {

        if (!Teacher::onlyTrashed()->find($id)) {
            return response()->json([
                'message' => 'Cet enseignant d\'eleve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('restore', Teacher::onlyTrashed()->find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de restaurer ce enseignant'
            ], 401);
        }

        if (!Teacher::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet enseignant d\'eleve non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet enseignant d\'eleve restaure avec succès'
        ]);
    }

    public function restoreAll()
    {
        if (!Teacher::onlyTrashed()->where('super_admin_id', request()->user()->id)->restore()) {
            return response()->json([
                'message' => 'Aucun enseignant d\'eleve non détruit'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les enseignants d\'eleve restaure avec succès'
        ]);
    }

    public function trash()
    {
        return response()->json(Teacher::onlyTrashed()->latest()->paginate(10));
    }


    public function restoreSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun enseignant sélectionné'
            ], 404);
        }

        // Ensure all selected teachers exist and are trashed
        $teachers = Teacher::onlyTrashed()->whereIn('id', $request->ids)->get();
        if ($teachers->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains enseignants sélectionnés n\'existent pas ou ne sont pas détruits'
            ], 404);
        }

        // Restore selected teachers
        foreach ($teachers as $teacher) {
            $teacher->restore();
        }

        return response()->json([
            'message' => 'Tous les enseignants sélectionnés ont été restaurés avec succès'
        ]);
    }

    public function deleteSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun enseignant sélectionné'
            ], 404);
        }

        // Ensure all selected teachers exist
        $teachers = Teacher::whereIn('id', $request->ids)->get();
        if ($teachers->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains enseignants sélectionnés n\'existent pas ou ne sont pas supprimés'
            ], 404);
        }

        // delete selected teachers
        foreach ($teachers as $teacher) {
            $teacher->delete();
        }

        return response()->json([
            'message' => 'Tous les enseignants sélectionnés ont été supprimés avec succès'
        ]);
    }

    public function attachTeacherToClasse(Request $request, $idclasse)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        if (request()->user()->cannot('attachTeacherToClasse', Teacher::find($request->teacher_id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission d\'ajouter un enseignant à une classe'
            ], 401);
        }


        if (!TeacherClasseCourse::where('classe_id', $idclasse)->where('course_id', $request->course_id)->where('teacher_id', null)->update(['teacher_id' => $request->teacher_id])) {
            return response()->json([
                'message' => 'Enseignant non ajouté à la classe avec succès ou course deja ajoutée un enseignant'
            ], 500);
        }

        return response()->json([
            'message' => 'Enseignant ajouté à la classe avec succès'
        ]);
    }
}
