<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AbsenceRequest extends FormRequest
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
        if ($this->is_excused === 'true') {
            return [
                'reason' => 'required|string|max:255',
                'is_excused' => 'required|in:true,false',
            ];
        }
        return [
            'reason' => 'nullable|string|max:255',
            'is_excused' => 'required|in:true,false',
        ];
    }
}
