<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RouteAccessRequest extends FormRequest
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
        return [
            'route_name' => [
                'required'
            ],
            'role_name' => [
                'nullable',
                'exists:roles,name'
            ],
            'permission_name' => [
                'nullable',
                'exists:permission,name'
            ]
        ];
    }

    public function attributes()
    {
        return [
            'route_name' => 'Rute',
            'role' => 'Role',
            'permission' => 'Permission',
        ];
    }
}
