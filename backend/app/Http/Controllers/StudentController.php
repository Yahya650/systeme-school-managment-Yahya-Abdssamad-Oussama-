<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\ExamRecord;
use App\Models\MonthlyFee;
use App\Models\Student;
use Nette\Utils\Random;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Validation\Rule;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

        $student->last_login_date = now('Africa/Casablanca');
        $student->save();

        return response([
            'token' => $student->createToken('Student', ['student'])->plainTextToken
        ]);
    }

    public function storeWithParent(Request $request)
    {
        $request->validate([
            // validate student data
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => ['required', Rule::in(['male', 'female'])],
            'email' => 'required|email|unique:students,email',
            'cin' => 'nullable|string|regex:/^[A-Z]{1,2}\d+$/|unique:students,cin',
            'code_massar' => 'required|string|unique:students,code_massar|regex:/^[A-Z]\d{9}$/',
            'health_status' => 'nullable|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['nullable', Rule::unique('students', 'phone_number')],
            'address' => 'nullable|string|max:255',
            'monthly_fee' => 'required|numeric',
            'classe_id' => 'required|exists:classes,id',

            // validate parent data
            'parent_profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'parent_first_name' => 'required|string|max:255',
            'parent_last_name' => 'required|string|max:255',
            'parent_gender' => ['required', Rule::in(['male', 'female'])],
            'parent_email' => 'required|email|unique:student_parents,email',
            'parent_cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:student_parents,cin',
            'parent_health_status' => 'nullable|string|max:255',
            'parent_date_of_birth' => 'required|date|before:today',
            'parent_blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'parent_phone_number' => 'required|unique:student_parents,phone_number',
            'parent_address' => 'nullable|string|max:255',
        ]);

        if ((int) Classe::find($request->classe_id)->number_etud_max < (int) Classe::find($request->classe_id)->number_etud + 1) {
            return response()->json(['message' => 'Le nombre maximum d\'Étudiants dans cette classe est déjà atteint'], 409);
        }

        $password = Random::generate(8);

        do {
            $parent_password = Random::generate(8);
        } while ($parent_password == $password);

        $newStudent = new Student();
        $newStudentParent = new StudentParent();

        if ($request->parent_profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $newStudentParent->profile_picture = 'picture_profiles/student_parents/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }
        if ($request->profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->parent_profile_picture));
            $newStudent->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        $newStudentParent->profile_picture = $request->parent_profile_picture;
        $newStudentParent->first_name = $request->parent_first_name;
        $newStudentParent->last_name = $request->parent_last_name;
        $newStudentParent->gender = $request->parent_gender;
        $newStudentParent->email = $request->parent_email;
        $newStudentParent->cin = $request->parent_cin;
        $newStudentParent->password = Hash::make($parent_password);
        $newStudentParent->health_status = $request->parent_health_status;
        $newStudentParent->date_of_birth = $request->parent_date_of_birth;
        $newStudentParent->blood_type = $request->parent_blood_type;
        $newStudentParent->phone_number = $request->parent_phone_number;
        $newStudentParent->address = $request->parent_address;
        $newStudentParent->admin_id = $request->user('admin')->id;
        $newStudentParent->save();

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
        $newStudent->student_parent_id = $newStudentParent->id;
        $newStudent->admin_id = $request->user('admin')->id;
        $newStudent->save();
        Classe::find($request->classe_id)->update(['number_etud' => Classe::find($request->classe_id)->number_etud + 1]);
        $newMonthlyFee = new MonthlyFee();
        $newMonthlyFee->student_id = $newStudent->id;
        $newMonthlyFee->amount = $request->monthly_fee;
        $newMonthlyFee->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $newMonthlyFee->save();

        return response([
            'code_massar' => $request->code_massar,
            'email' => $request->email,
            'password' => $password,
            'cin' => $request->parent_cin,
            'parent_password' => $parent_password,
            'message' => "Étudiant et Parent créé avec succès",
        ], 201);
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
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['nullable', Rule::unique('students', 'phone_number')],
            'address' => 'nullable|string|max:255',
            'student_parent_id' => 'required|exists:student_parents,id',
            'monthly_fee' => 'required|numeric',
            'classe_id' => 'required|exists:classes,id',
        ]);

        if ((int) Classe::find($request->classe_id)->number_etud_max < (int) Classe::find($request->classe_id)->number_etud + 1) {
            return response()->json(['message' => 'Le nombre maximum d\'Étudiants dans cette classe est déjà atteint'], 409);
        }

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
        Classe::find($request->classe_id)->update(['number_etud' => Classe::find($request->classe_id)->number_etud + 1]);
        $newMonthlyFee = new MonthlyFee();
        $newMonthlyFee->student_id = $newStudent->id;
        $newMonthlyFee->amount = $request->monthly_fee;
        $newMonthlyFee->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $newMonthlyFee->save();

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
        // Eager load the necessary relationships and retrieve the latest students
        $students = $request->user('admin')->school_levels()
            ->wherePivot('types', 'like', '%educational%')
            ->with(['classe_types.classes.students'])
            ->get()
            ->flatMap(function ($schoolLevel) {
                return $schoolLevel->classe_types->flatMap(function ($classeType) {
                    return $classeType->classes->flatMap(function ($classe) {
                        return $classe->students;
                    });
                });
            })
            ->sortByDesc('created_at');

        $currentPage = Paginator::resolveCurrentPage('page');
        $perPage = 8;

        // Paginate the collection
        $studentsPaginated = $students->forPage($currentPage, $perPage);

        return response()->json([
            'data' => $studentsPaginated->values(),
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


        if (request()->user()->cannot('view', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de voir ce Étudiant'
            ], 401);
        }

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
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['nullable', 'string', Rule::unique('students', 'phone_number')->ignore($id)],
            'monthly_fee' => ['required'],
            'address' => 'nullable|string|max:255',
            'student_parent_id' => 'required|exists:student_parents,id',
            'classe_id' => 'required|exists:classes,id',
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
        if ($student->classe_id !== $request->classe_id) {
            if (($student->classe->classeType->id !== Classe::find($request->classe_id)->classeType->id) || ($student->classe->filiere_id !== Classe::find($request->classe_id)->filiere_id)) {
                ExamRecord::where('student_id', $student->id)->delete();
            }
            $classe = Classe::find($request->classe_id);
            $classe->number_etud += 1;
            $classe->save();
            $classe2 = Classe::find($student->classe_id);
            $classe2->number_etud -= 1;
            $classe2->save();
        }
        $student->classe_id = $request->classe_id;
        $student->student_parent_id = $request->student_parent_id;
        $student->save();

        $newMonthlyFee = MonthlyFee::where('student_id', $student->id)->first();
        $newMonthlyFee->amount = (float) $request->monthly_fee;
        $newMonthlyFee->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $newMonthlyFee->save();

        return response([
            'message' => "Étudiant mis à jour avec succès"
        ], 200);
    }

    public function updateWithParent(Request $request, $id)
    {

        $student = Student::find($id);
        $parent = StudentParent::find($student->parent->id);

        if (!$student || !$parent) {
            return response()->json([
                'message' => 'Étudiant ou Parent non trouvé'
            ], 404);
        }

        // khas wa7d mn l2abna2 dyal parent ikon dimna hadok lli mklaf bihom dak ladmin lli bgha ydir l'action 3lih (ghadi nzidha fl policies dyal studentParent)
        if (request()->user()->cannot('update', $student) || request()->user()->cannot('update', StudentParent::find($parent->id))) {
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
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['nullable', 'string', Rule::unique('students', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
            'monthly_fee' => 'required|numeric',
            'classe_id' => 'required|exists:classes,id',

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
            'parent_phone_number' => ['required', 'string', Rule::unique('student_parents', 'phone_number')->ignore($parent->id)],
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
        if ($student->classe_id !== $request->classe_id) {
            if (($student->classe->classeType->id !== Classe::find($request->classe_id)->classeType->id) || ($student->classe->filiere_id !== Classe::find($request->classe_id)->filiere_id)) {
                ExamRecord::where('student_id', $student->id)->delete();
            }
            $classe = Classe::find($request->classe_id);
            $classe->number_etud += 1;
            $classe->save();
            $classe2 = Classe::find($student->classe_id);
            $classe2->number_etud -= 1;
            $classe2->save();
        }
        $student->classe_id = $request->classe_id;
        $student->save();

        $newMonthlyFee = MonthlyFee::where('student_id', $student->id)->first();
        $newMonthlyFee->amount = (float) $request->monthly_fee;
        $newMonthlyFee->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $newMonthlyFee->save();

        return response([
            'message' => "Étudiant et Parent mis à jour avec succès"
        ], 200);
    }

    public function updateWithCreateParent(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'message' => 'Étudiant non trouvé'
            ], 404);
        }

        // khas wa7d mn l2abna2 dyal parent ikon dimna hadok lli mklaf bihom dak ladmin lli bgha ydir l'action 3lih (ghadi nzidha fl policies dyal studentParent)
        if (request()->user()->cannot('update', Student::find($id))) {
            return response()->json([
                'message' => 'Vous n\'avez pas la permission de modifier ce Étudiant'
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
            'date_of_birth' => 'required|date|before:today',
            'blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'phone_number' => ['nullable', 'string', Rule::unique('students', 'phone_number')->ignore($id)],
            'address' => 'nullable|string|max:255',
            'classe_id' => 'required|exists:classes,id',
            'monthly_fee' => 'required|numeric',

            // validate parent data
            'parent_profile_picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'parent_first_name' => 'required|string|max:255',
            'parent_last_name' => 'required|string|max:255',
            'parent_gender' => ['required', Rule::in(['male', 'female'])],
            'parent_email' => 'required|email|unique:student_parents,email',
            'parent_cin' => 'required|regex:/^[A-Z]{1,2}\d+$/|unique:student_parents,cin',
            'parent_health_status' => 'nullable|string|max:255',
            'parent_date_of_birth' => 'required|date|before:today',
            'parent_blood_type' => ['nullable', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'parent_phone_number' => 'required|unique:student_parents,phone_number',
            'parent_address' => 'nullable|string|max:255',
        ]);

        $parent = new StudentParent();

        if ($request->profile_picture) {
            Storage::delete('public/' . $student->profile_picture);
            Storage::disk('local')->put('public/picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension(), file_get_contents($request->profile_picture));
            $student->profile_picture = 'picture_profiles/student/' . $request->cin . '_' . $request->last_name . "-" . $request->first_name . "." . $request->profile_picture->extension();
        }

        if ($request->parent_profile_picture) {
            Storage::disk('local')->put('public/picture_profiles/student_parents/' . $request->parent_cin . '_' . $request->parent_last_name . "-" . $request->parent_first_name . $request->parent_profile_picture->extension(), file_get_contents($request->parent_profile_picture));
            $parent->parent_profile_picture = 'picture_profiles/student_parents/' . $request->parent_cin . '_' . $request->parent_last_name . "-" . $request->parent_first_name . $request->parent_profile_picture->extension();
        }

        $parent_password = Str::random(8);

        $parent->first_name = $request->parent_first_name;
        $parent->last_name = $request->parent_last_name;
        $parent->gender = $request->parent_gender;
        $parent->email = $request->parent_email;
        $parent->cin = $request->parent_cin;
        $parent->health_status = $request->parent_health_status;
        $parent->date_of_birth = $request->parent_date_of_birth;
        $parent->blood_type = $request->parent_blood_type;
        $parent->phone_number = $request->parent_phone_number;
        $parent->password = Hash::make($parent_password);
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
        if ($student->classe_id !== $request->classe_id) {
            if (($student->classe->classeType->id !== Classe::find($request->classe_id)->classeType->id) || ($student->classe->filiere_id !== Classe::find($request->classe_id)->filiere_id)) {
                ExamRecord::where('student_id', $student->id)->delete();
            }
            $classe = Classe::find($request->classe_id);
            $classe->number_etud += 1;
            $classe->save();
            $classe2 = Classe::find($student->classe_id);
            $classe2->number_etud -= 1;
            $classe2->save();
        }
        $student->classe_id = $request->classe_id;
        $student->student_parent_id = $parent->id;
        $student->save();

        $newMonthlyFee = MonthlyFee::where('student_id', $student->id)->first();
        $newMonthlyFee->amount = (float) $request->monthly_fee;
        $newMonthlyFee->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $newMonthlyFee->save();

        return response([
            'message' => "Étudiant mis à jour et parent enregistre avec succès",
            'cin' => $request->parent_cin,
            'password' => $parent_password
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student = Student::find($id);

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

        Classe::find($student->classe_id)->update(['number_etud' => Classe::find($student->classe_id)->number_etud - 1]);

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

        Classe::find(Student::onlyTrashed()->find($id)->classe_id)->update(['number_etud' => Classe::find(Student::onlyTrashed()->find($id)->classe_id)->number_etud + 1]);

        if (!Student::onlyTrashed()->find($id)->restore()) {
            return response()->json([
                'message' => 'Cet etudiant non trouvé pour la restauration'
            ], 404);
        }

        return response()->json([
            'message' => 'Cet etudiant restaure avec succès'
        ]);
    }


    // public function restoreAll()
    // {
    //     if (!Student::onlyTrashed()->where('admin_id', request()->user()->id)->restore()) {
    //         return response()->json([
    //             'message' => 'Aucun etudiant non détruit'
    //         ], 404);
    //     }

    //     return response()->json([
    //         'message' => 'Tous les etudiants restaure avec succès'
    //     ]);
    // }

    public function restoreSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun étudiant sélectionné'
            ], 404);
        }

        // Ensure all selected students exist and are trashed
        $students = Student::onlyTrashed()->whereIn('id', $request->ids)->get();
        foreach ($students as $student) {
            $classe = Classe::find($student->classe_id);
            $classe->number_etud += 1;
            $classe->save();
            $student->restore();
        }

        if ($students->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains étudiants sélectionnés n\'existent pas ou ne sont pas détruits'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les étudiants sélectionnés ont été restaurés avec succès'
        ]);
    }

    public function deleteSelect(Request $request)
    {
        if (count($request->ids) === 0) {
            return response()->json([
                'message' => 'Aucun étudiant sélectionné'
            ], 404);
        }

        // Ensure all selected students exist
        $students = Student::whereIn('id', $request->ids)->get();
        foreach ($students as $student) {
            $classe = Classe::find($student->classe_id);
            $classe->number_etud -= 1;
            $classe->save();
            $student->delete();
        }

        if ($students->count() !== count($request->ids)) {
            return response()->json([
                'message' => 'Certains étudiants sélectionnés n\'existent pas ou ne sont pas supprimés'
            ], 404);
        }

        return response()->json([
            'message' => 'Tous les étudiants sélectionnés ont été supprimés avec succès'
        ]);
    }


    public function trash(Request $request)
    {
        // Eager load the necessary relationships and retrieve the latest trashed students
        $students = $request->user('admin')->school_levels()
            ->with('classe_types.classes.students')
            ->get()
            ->flatMap(function ($schoolLevel) {
                return $schoolLevel->classe_types->flatMap(function ($classeType) {
                    return $classeType->classes->flatMap(function ($classe) {
                        return $classe->students()->onlyTrashed()->get();
                    });
                });
            })
            ->sortByDesc('deleted_at');

        $currentPage = Paginator::resolveCurrentPage('page');
        $perPage = 10;

        // Paginate the collection
        $studentsPaginated = $students->forPage($currentPage, $perPage);

        return response()->json([
            'data' => $studentsPaginated->values(), // Resetting the keys of the collection
            'current_page' => $currentPage,
            'per_page' => $perPage,
            'total' => $students->count(),
            'last_page' => ceil($students->count() / $perPage)
        ]);
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


    public function search(Request $request)
    {
        $code_massar = $request->code_massar;
        $parent_id = $request->parent_id;
        $classe_id = $request->classe_id;
        $type = $request->type;

        $studentsQuery = Student::query()->withTrashed();

        if ($code_massar) $studentsQuery->where('code_massar', 'like', '%' . $code_massar . '%');
        if ($parent_id) $studentsQuery->where('student_parent_id', 'like', '%' . $parent_id . '%');
        if ($classe_id) $studentsQuery->where('classe_id', 'like', '%' . $classe_id . '%');

        $students = $studentsQuery->get();

        if ($type === "deleted") {
            $deletedStudents = $students->filter(function ($student) {
                return $student->deleted_at !== null;
            });
            return response()->json([
                'data' => $deletedStudents->values(),
                'current_page' => 1, // Assuming it's always the first page for deleted students
                'per_page' => 0,
                'total' => 0,
                'last_page' => 0 // Assuming it's always the last page for deleted students
            ]);
        }

        return response()->json([
            'data' => $students,
            'current_page' => 1, // Assuming it's always the first page for normal students
            'per_page' => 0,
            'total' => 0,
            'last_page' => 0 // Assuming it's always the last page for normal students
        ]);
    }
}
