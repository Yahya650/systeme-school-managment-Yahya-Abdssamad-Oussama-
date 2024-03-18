<?php

namespace App\Http\Requests;

use App\Models\Exam;
use Illuminate\Foundation\Http\FormRequest;

class ExamRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (!Exam::find($this->exam_id)) {
            return [
                'mark' => 'required|numeric',
                'image' => 'nullable|mimes:pdf,png,jpg,jpeg|max:2048',
                'comment' => 'nullable|max:255',
                'student_id' => 'required|exists:students,id',
                'exam_id' => 'required|exists:exams,id'
            ];
        }
        if ((int) Exam::find($this->exam_id)->passing_marks === 10) {
            return [
                'mark' => 'required|numeric|between:0,20',
                'image' => 'nullable|mimes:pdf,png,jpg,jpeg|max:2048',
                'comment' => 'nullable|max:255',
                'student_id' => 'required|exists:students,id',
                'exam_id' => 'required|exists:exams,id'
            ];
        } else {
            return [
                'mark' => 'required|numeric|between:0,10',
                'image' => 'nullable|mimes:pdf,png,jpg,jpeg|max:2048',
                'comment' => 'nullable|max:255',
                'student_id' => 'required|exists:students,id',
                'exam_id' => 'required|exists:exams,id'
            ];
        }
    }
}
