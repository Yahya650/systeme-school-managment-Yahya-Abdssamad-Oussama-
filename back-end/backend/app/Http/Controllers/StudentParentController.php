<?php

namespace App\Http\Controllers;

use Nette\Utils\Random;
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
            return response(['message' => 'Les identifiants fournis sont incorrects', 'errors' => ['cin' => 'Les identifiants fournis sont incorrects']], 422);
        }

        $studentParent->last_login_date = now('Africa/Casablanca');
        $studentParent->save();

        return response([
            'token' => $studentParent->createToken('StudentParent', ['student_parent'])->plainTextToken
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:student_parents,email',
            'cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:student_parents,cin',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => 'required|min:10|string|max:10|unique:student_parents,phone_number',
            'address' => 'nullable|string|max:255',
        ]);


        $password = Random::generate(8);

        $newStudentParent = new StudentParent();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $newStudentParent->profile_picture = 'picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $newStudentParent->profile_picture = $request->profile_picture;
        $newStudentParent->first_name = $request->first_name;
        $newStudentParent->last_name = $request->last_name;
        $newStudentParent->gender = $request->gender;
        $newStudentParent->email = $request->email;
        $newStudentParent->cin = $request->cin;
        $newStudentParent->password = Hash::make($password);
        $newStudentParent->health_status = $request->health_status;
        $newStudentParent->date_of_birth = $request->date_of_birth;
        $newStudentParent->blood_type = $request->blood_type;
        $newStudentParent->phone_number = $request->phone_number;
        $newStudentParent->address = $request->address;
        $newStudentParent->admin_id = $request->user('admin')->id;
        $newStudentParent->save();

        return response([
            'cin' => $request->cin,
            'password' => $password,
            'message' => "Cet parent d'éléve créé avec succès"
        ], 201);
    }

    public function logout(Request $request)
    {
        try {
            $request->user('student_parent')->tokens()->delete();
            return response([
                'message' => 'Déconnexion réussie'
            ], 200);
        } catch (\Throwable $th) {
            return response([
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function index(Request $request)
    {
        return StudentParent::all(); // hadi t9dar t7ayd 7it l2ab ymkan ykon 3ndo wlado klla wa7d ki9ra f niveau scolaire mkhtalf donc ghadi nib students wkla student m3a l parent dyalo
    }


    public function show($id)
    {

        if (!StudentParent::find($id)) {
            return response()->json([
                'message' => 'Cet parent d\'éléve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('view', StudentParent::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce parent'
            ], 401);
        }

        return response()->json(StudentParent::find($id)->with('students')->get());
    }


    public function update(Request $request, $id)
    {

        if (!StudentParent::find($id)) {
            return response()->json([
                'message' => 'Cet parent d\'éléve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('update', StudentParent::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce parent'
            ], 401);
        }

        $request->validate([
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'gender' => ['required', Rule::in(['male', 'female'])],
                'email' => ['required', 'email', Rule::unique('student_parents', 'email')->ignore($id)],
                'cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('student_parents', 'cin')->ignore($id)],
                'health_status' => 'nullable|string|max:255',
                'date_of_birth' => 'required|date',
                'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
                'phone_number' => ['required', 'string', 'size:10', Rule::unique('student_parents', 'phone_number')->ignore($id)],
                'address' => 'nullable|string|max:255',
            ]);

        $studentParent = StudentParent::find($id);

        if ($request->profile_picture) {
            Storage::delete('public/' . $studentParent->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $studentParent->profile_picture = 'picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
        }

        $studentParent->first_name = $request->first_name;
        $studentParent->last_name = $request->last_name;
        $studentParent->gender = $request->gender;
        $studentParent->email = $request->email;
        $studentParent->cin = $request->cin;
        $studentParent->health_status = $request->health_status;
        $studentParent->date_of_birth = $request->date_of_birth;
        $studentParent->blood_type = $request->blood_type;
        $studentParent->phone_number = $request->phone_number;
        $studentParent->address = $request->address;

        $studentParent->save();

        return response([
            'message' => "Cet parent d\'éléve mis à jour avec succès"
        ], 200);
    }


    public function destroy($id)
    {

        if (!StudentParent::find($id)) {
            return response()->json([
                'message' => 'Cet parent d\'éléve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('delete', StudentParent::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce parent'
            ], 401);
        }

        if (!StudentParent::find($id)->delete()) {
            return response()->json([
                'message' => 'Cet parent d\'éléve non trouvé pour la suppression'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet parent d\'éléve supprimé avec succès'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', 'min:8', function ($attribute, $old_password, $fail) {
                if (!Hash::check($old_password, auth('student_parent')->user()->password)) {
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

        $studentParent = $request->user('student_parent');
        $studentParent->password = Hash::make($request->new_password);
        $studentParent->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function renewPassword($id)
    {
        if (!StudentParent::find($id)) {
            return response()->json([
                'message' => 'Cet parent d\'eleve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('renewPassword', StudentParent::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de rêinitialiser le mot de passe ce parent'
            ], 401);
        }

        $studentParent = StudentParent::find($id);
        $newPassword = Random::generate(8);
        $studentParent->password = Hash::make($newPassword);
        $studentParent->save();
        return response()->json([
            'email' => $studentParent->email,
            'cin' => $studentParent->cin,
            'new_password' => $newPassword,
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }


    public function restore($id)
    {
        if (!StudentParent::onlyTrashed()->find($id)) {
            return response()->json([
                'message' => 'Cet parent d\'eleve non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('restore', StudentParent::onlyTrashed()->find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de restaurer ce parent'
            ], 401);
        }


        if (!StudentParent::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet parent d\'eleve non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet parent d\'eleve restaure avec succès'
        ]);
    }

    public function restoreAll()
    {
        if (!StudentParent::onlyTrashed()->where('admin_id', request()->user()->id)->restore()) {
            return response()->json([
                'message' => 'Aucun parent d\'eleve non détruit'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les parents d\'eleve restaure avec succès'
        ]);
    }

    public function trash()
    {
        return response()->json(request()->user()->student_parents()->onlyTrashed()->latest()->get());
    }

    // public function forceDelete($id)
    // {
    //     if (!StudentParent::onlyTrashed()->find($id)) {
    //         return response()->json([
    //             'message' => 'Cet parent d\'eleve non détruit ou non trouvé'
    //         ], 404);
    //     }
    //     if (request()->user()->cannot('forceDelete', StudentParent::onlyTrashed()->find($id))) {
    //         return response()->json([
    //             'message' => 'Vous n\'avez pas la permission de détruire ce parent d\'eleve'
    //         ], 401);
    //     }

    //     if (!StudentParent::onlyTrashed()->find($id)->forceDelete()) {
    //         return response()->json([
    //             'message' => 'Cet parent d\'eleve non détruit'
    //         ], 404);
    //     }

    //     return response()->json([
    //         'message' => 'Cet parent d\'eleve détruit avec succès'
    //     ]);
    // }


}
