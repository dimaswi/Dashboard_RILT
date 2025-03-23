<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionsRequest;
use App\Http\Resources\Admin\PermissionsResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    public function index(): Response
    {
        $permissons = Permission::query()
            ->select(
                'id',
                'name',
                'guard_name',
                'created_at',
            )
            ->when(request()->search, function ($query, $search) {
                $query->whereAny([
                    'name',
                    'guard_name'
                ], 'ILIKE', '%' . $search . '%');
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->perPage ?? 10)
            ->withQueryString();

        return inertia('Admin/Permissions/Index', [
            'permissions' => PermissionsResource::collection($permissons)->additional([
                'meta' => [
                    'has_pages' => $permissons->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Permissions',
                'subtitle' => 'Menampilkan semua data permission',
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

    public function create(): Response
    {
        return inertia('Admin/Permissions/Create', [
            'page_settings' => [
                'title' => 'Tambah Permission',
                'subtitle' => 'Buat permission baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.permissions.store'),
            ]
        ]);
    }

    public function store(PermissionsRequest $request)
    {
        try {
            Permission::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            flashMessage(MessageType::CREATED->message('Permission'));
            return to_route('admin.permissions.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }

    public function edit(Permission $permission): Response
    {
        return inertia('Admin/Permissions/Edit', [
            'permission' => $permission,
            'page_settings' => [
                'title' => 'Edit Permission',
                'subtitle' => 'Edit permission disini, Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.permissions.update', $permission),
            ]
        ]);
    }

    public function update(Permission $permission, PermissionsRequest $request): RedirectResponse
    {
        try {
            $permission->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            flashMessage(MessageType::UPDATED->message('Permission'));
            return to_route('admin.permissions.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        // dd($permission);
        try {
            $permission->delete();
            flashMessage(MessageType::DELETED->message('Permission'));
            return to_route('admin.permissions.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }
}
