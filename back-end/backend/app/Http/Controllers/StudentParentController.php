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
            return response([
                'message' => 'Les identifiants fournis sont incorrects'
            ], 422);
        }

        $studentParent->last_login_date = date('Y-m-d H:i:s');
        $studentParent->save();

        return response([
            'token' => $studentParent->createToken('StudentParent', ['student_parent'])->plainTextToken
        ], 200);
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
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $newStudentParent->profile_picture = '/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
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
        ], 200);
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
        return response()->json($request->user('admin')->student_parents()->latest()->get());
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

        return response()->json(StudentParent::find($id));
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

        // if (!Hash::check($request->old_password, $admin->password)) {
        //     return response()->json([
        //         'message' => 'oldPassword not correct' // message if oldPassword not correct
        //     ]);
        // }

        if ($request->profile_picture) {
            Storage::delete($studentParent->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg", file_get_contents($request->profile_picture));
            $studentParent->profile_picture = '/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . ".jpg";
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
}
