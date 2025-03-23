<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RolesRequest;
use App\Http\Resources\Admin\RolesResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index(): Response
    {
        $roles = Role::query()
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

        return inertia('Admin/Roles/Index', [
            'roles' => RolesResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Roles',
                'subtitle' => 'Menampilkan semua data role',
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
        return inertia('Admin/Roles/Create', [
            'page_settings' => [
                'title' => 'Tambah Role',
                'subtitle' => 'Buat role baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.roles.store'),
            ]
        ]);
    }

    public function store(RolesRequest $request)
    {
        try {
            Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            flashMessage(MessageType::CREATED->message('role'));
            return to_route('admin.roles.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }

    public function edit(Role $role): Response
    {
        return inertia('Admin/Roles/Edit', [
            'role' => $role,
            'page_settings' => [
                'title' => 'Edit Role',
                'subtitle' => 'Edit role disini, Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.roles.update', $role),
            ]
        ]);
    }

    public function update(Role $role, RolesRequest $request): RedirectResponse
    {
        try {
            $role->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name
            ]);
            flashMessage(MessageType::UPDATED->message('role'));
            return to_route('admin.roles.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }

    public function destroy(Role $role): RedirectResponse
    {
        // dd($role);
        try {
            $role->delete();
            flashMessage(MessageType::DELETED->message('role'));
            return to_route('admin.roles.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }
}
