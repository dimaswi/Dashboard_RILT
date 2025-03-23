<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Http\Requests\Admin\AssignPermissionsRequest;
use App\Http\Resources\Admin\AssignPermissionsResource;
use App\Http\Resources\Admin\RolesResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AssignPermissionController extends Controller
{
    public function index(): Response
    {
        $assign_permissions = Role::query()
            ->select(
                'id',
                'name',
                'guard_name',
            )
            ->when(request()->search, function ($query, $search) {
                $query->whereAny('name', 'ILIKE', '%' . $search . '%');
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->with('permissions')
            ->paginate(request()->perPage ?? 10)
            ->withQueryString();

        return inertia('Admin/AssignPermissions/Index', [
            'assign_permissions' => AssignPermissionsResource::collection($assign_permissions)->additional([
                'meta' => [
                    'has_pages' => $assign_permissions->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Masukan Permission',
                'subtitle' => 'Menampilkan semua data permission yang dimasukan',
            ],
            'state' => [
                'page' => request()->page ?? '',
                'search' => request()->search ?? '',
                'load' => request()->load ?? '',
                'field' => request()->field ?? '',
                'direction' => request()->direction ?? '',
            ]
        ]);
    }

    public function edit(Role $role): Response
    {
        return inertia('Admin/AssignPermissions/Edit', [
            'page_settings' => [
                'title' => 'Edit Role Permission',
                'subtitle' => 'Edit role permission disini, Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-permissions.update', $role),
            ],
            'role' => $role->load('permissions'),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ])
        ]);
    }

    public function update(AssignPermissionsRequest $request, Role $role): RedirectResponse
    {
        // dump($request->all());
        try {
            $role->syncPermissions($request->permissions);
            flashMessage("Berhasilkan update permission ke role {$role->name}");
            return to_route('admin.assign-permissions.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.assign-permissions.index');
        }
    }
}
