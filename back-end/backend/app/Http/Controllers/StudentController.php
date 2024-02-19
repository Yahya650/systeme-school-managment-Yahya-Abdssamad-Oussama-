<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentParent;
use Nette\Utils\Random;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Pagination\LengthAwarePaginator;

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
            return response(['message' => 'Les identifiants fournis sont incorrects', 'errors' => ['code_massar' => 'Les identifiants fournis sont incorrects']], 422);
        }

        $student->last_login_date = date('Y-m-d H:i:s');
        $student->save();

        return response([
            'token' => $student->createToken('Student', ['student'])->plainTextToken
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:students,email',
            'cin' => 'nullable|string|regex:/^[A-Z]{1,2}\d+$/|unique:students,cin',
            'code_massar' => 'required|string|unique:students,code_massar|regex:/^[A-Z]\d{9}$/',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'size:10', 'regex:/^(06|07)\d{8}$/', Rule::unique('students', 'phone_number')],
            'address' => 'nullable|string|max:255',
            'student_parent_id' => 'nullable|exists:student_parents,id',
            'classe_id' => 'required|exists:classes,id',
        ]);

        $password = Random::generate(8);

        $newStudent = new Student();

        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $newStudent->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
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
        $newStudent->student_parent_id = $request->student_parent_id;
        $newStudent->admin_id = $request->user('admin')->id;
        $newStudent->save();

        return response([
            'code_massar' => $request->code_massar,
            'password' => $password,
            'message' => "Étudiant créé avec succès"
        ], 201);
    }

    public function logout(Request $request)
    {
        try {
            $request->user('student')->tokens()->delete();
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
    public function index(Request $request)
    {
        $students = collect([]);

        // ila bghit njib gha hadok lli mkalf bihom educationnel 
        // foreach ($request->user('admin')->school_levels()->wherePivot('types', 'like', '%educational%')->get() as $school_level) {
        //     foreach ($school_level->classe_types as $classe_type) {
        //         foreach ($classe_type->classes as $classe) {
        //             $students = $students->merge($classe->students);
        //         }
        //     }
        // }

        foreach ($request->user('admin')->school_levels as $school_level) {
            foreach ($school_level->classe_types as $classe_type) {
                foreach ($classe_type->classes as $classe) {
                    $students = $students->merge($classe->students);
                }
            }
        }

        $currentPage = Paginator::resolveCurrentPage('page');
        $perPage = 8;
        $studentsPaginated = $students->forPage($currentPage, $perPage);

        return response()->json([
            'data' => $studentsPaginated->values(), // Resetting the keys of the collection
            'current_page' => $currentPage,
            'per_page' => $perPage,
            'total' => $students->count(),
            'last_page' => ceil($students->count() / $perPage)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }


        // comontit hadi dyal permission 7it ymkan ykon l etudiant makin f7ta chi 9ist so hadchi ghadi ykhalini man9darch n checki if student kin fl niveau lli mklaf bih l dak ladmin or not
        // if (request()->user()->cannot('view', Student::find($id))) {
        //     return response()->json([
        //         'message' => 'Vous n\'avez pas la permission de voir ce Étudiant'
        //     ], 401);
        // }

        return response()->json(Student::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('update', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce Étudiant'
            ], 401);
        }


        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('students', 'email')->ignore($id)],
            'cin' => ['nullable', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('students', 'cin')->ignore($id)],
            'code_massar' => ['required', 'string', Rule::unique('students', 'code_massar')->ignore($id), 'regex:/^[A-Z]\d{9}$/'],
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', 'size:10', Rule::unique('students', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
        ]);

        $student = Student::find($id);

        if ($request->profile_picture) {
            Storage::delete('public/' . $student->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $student->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $student->first_name = $request->first_name;
        $student->last_name = $request->last_name;
        $student->gender = $request->gender;
        $student->email = $request->email;
        $student->cin = $request->cin;
        $student->code_massar = $request->code_massar;
        $student->health_status = $request->health_status;
        $student->date_of_birth = $request->date_of_birth;
        $student->blood_type = $request->blood_type;
        $student->phone_number = $request->phone_number;
        $student->address = $request->address;

        $student->save();

        return response([
            'message' => "Étudiant mis à jour avec succès"
        ], 200);
    }
    public function updateWithParent(Request $request, $id)
    {
        $student = Student::find($id);
        $parent = Student::find($student->parent->id);

        if (!$student || !StudentParent::find($student->parent->id)) {
            return response()->json([
                'message' => 'Étudiant ou Parent non trouvé'
            ], 404);
        }

        // khas wa7d mn l2abna2 dyal parent ikon dimna hadok lli mklaf bihom dak ladmin lli bgha ydir l'action 3lih (ghadi nzidha fl policies dyal studentParent)
        if (request()->user()->cannot('update', Student::find($id)) || request()->user()->cannot('update', StudentParent::find($parent->id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce Étudiant ou ce Parent'
            ], 401);
        }

        $request->validate([
            // validate student data
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => ['required', 'email', Rule::unique('students', 'email')->ignore($id)],
            'cin' => ['nullable', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('students', 'cin')->ignore($id)],
            'code_massar' => ['required', 'string', Rule::unique('students', 'code_massar')->ignore($id), 'regex:/^[A-Z]\d{9}$/'],
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['required', 'string', 'size:10', Rule::unique('students', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',

            // validate parent data
            'parent_profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'parent_first_name' => 'required|string|max:255',
            'parent_last_name' => 'required|string|max:255',
            'parent_gender' => ['required', Rule::in(['male', 'female'])],
            'parent_email' => ['required', 'email', Rule::unique('student_parents', 'email')->ignore($parent->id)],
            'parent_cin' => ['required', 'regex:/^[A-Z]{1,2}\d+$/', Rule::unique('student_parents', 'cin')->ignore($parent->id)],
            'parent_health_status' => 'nullable|string|max:255',
            'parent_date_of_birth' => 'required|date',
            'parent_blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'parent_phone_number' => ['required', 'string', 'size:10', Rule::unique('student_parents', 'phone_number')->ignore($parent->id)],
            'parent_address' => 'nullable|string|max:255',
        ]);


        if ($request->profile_picture) {
            Storage::delete('public/' . $student->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $student->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        if ($request->parent_profile_picture) {
            Storage::delete('public/' . $parent->parent_profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->parent_cin . '_' . $request->parent_last_name . "-" . $request->parent_first_name . $request->parent_profile_picture->extension(), file_get_contents($request->parent_profile_picture));
            $parent->parent_profile_picture = 'picture_profiles/student_parents/' . $request->parent_cin . '_' . $request->parent_last_name . "-" . $request->parent_first_name . $request->parent_profile_picture->extension();
        }


        $parent->first_name = $request->parent_first_name;
        $parent->last_name = $request->parent_last_name;
        $parent->gender = $request->parent_gender;
        $parent->email = $request->parent_email;
        $parent->cin = $request->parent_cin;
        $parent->health_status = $request->parent_health_status;
        $parent->date_of_birth = $request->parent_date_of_birth;
        $parent->blood_type = $request->parent_blood_type;
        $parent->phone_number = $request->parent_phone_number;
        $parent->address = $request->parent_address;
        $parent->save();

        $student->first_name = $request->first_name;
        $student->last_name = $request->last_name;
        $student->gender = $request->gender;
        $student->email = $request->email;
        $student->cin = $request->cin;
        $student->code_massar = $request->code_massar;
        $student->health_status = $request->health_status;
        $student->date_of_birth = $request->date_of_birth;
        $student->blood_type = $request->blood_type;
        $student->phone_number = $request->phone_number;
        $student->address = $request->address;
        $student->save();

        return response([
            'message' => "Étudiant et Parent mis à jour avec succès"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('delete', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de supprimer ce Étudiant'
            ], 401);
        }

        if (!Student::find($id)->delete()) {
            return response()->json([
                'message' => 'Étudiant non trouvé pour la suppression'
            ], 404);
        }

        return response()->json([
            'message' => 'Étudiant supprimé avec succès'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => ['required', 'min:8', function ($attribute, $old_password, $fail) {
                if (!Hash::check($old_password, auth('student')->user()->password)) {
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

        $student = $request->user('student');
        $student->password = Hash::make($request->new_password);
        $student->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function renewPassword($id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('renewPassword', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de rêinitialiser le mot de passe ce étudiant'
            ], 401);
        }

        $student = Student::find($id);
        $newPassword = Random::generate(8);
        $student->password = Hash::make($newPassword);
        $student->save();
        return response()->json([
            'code_massar' => $student->code_massar,
            'password' => $newPassword,
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function restore($id)
    {

        if (!Student::onlyTrashed()->find($id)) {
            return response()->json([
                'message' => 'Cet etudiant non trouvé'
            ], 404);
        }

        if (request()->user()->cannot('restore', Student::onlyTrashed()->find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de restaurer ce etudiant'
            ], 401);
        }


        if (!Student::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet etudiant non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet etudiant restaure avec succès'
        ]);
    }


    public function restoreAll()
    {
        if (!Student::onlyTrashed()->where('admin_id', request()->user()->id)->restore()) {
            return response()->json([
                'message' => 'Aucun etudiant non détruit'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les etudiants restaure avec succès'
        ]);
    }

    public function trash()
    {
        return response()->json(request()->user()->students()->onlyTrashed()->latest()->get());
    }


    public function getStudentWithAllInfo($id)
    {
        if (!Student::find($id)) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }
        $student = Student::find($id);
        return response()->json($student->with('payments')->with('examRecords.exam')->with('reports')->with('absences.course.teacher')->with('classe.exercises.teachers.courses.time_table')->with('payments')->get());
    }


    public function updatePictureProfile(Request $request, $id)
    {
        // Find the student by ID
        $student = Student::find($id);
        if (!$student) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // Validate the incoming request
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($student->profile_picture) {
            Storage::disk('public')->delete($student->profile_picture);
        }

        // Store the profile picture in the storage
        $imagePath = 'picture_profiles/student/' . $student->code_massar . '-' . $student->last_name . "_" . $student->first_name . "-" . now()->timestamp . "." . $request->file('profile_picture')->extension();
        Storage::disk('public')->put($imagePath, file_get_contents($request->file('profile_picture')));

        // Update the student's profile picture URL
        $student->profile_picture = $imagePath;

        // Save the updated student data
        if (!$student->save()) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de la photo de profile'
            ]);
        }

        return response()->json([
            'message' => "Photo de profile mise à jour avec succès"
        ], 200);
    }
}
