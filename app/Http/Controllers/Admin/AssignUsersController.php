<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignUsersRequest;
use App\Http\Resources\Admin\AssignUsersResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AssignUsersController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(
                'id',
                'email',
                'username',
            )
            ->when(request()->search, function ($query, $search) {
                $query->whereAny([
                    'email',
                    'username',
                ], 'ILIKE', '%' . $search . '%');
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->with('permissions')
            ->paginate(request()->perPage ?? 10)
            ->withQueryString();

        return inertia('Admin/AssignUsers/Index', [
            'users' => AssignUsersResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Masukan Role',
                'subtitle' => 'Menampilkan semua data role yang dimasukan',
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

    public function edit(User $user): Response
    {
        return inertia('Admin/AssignUsers/Edit', [
            'page_settings' => [
                'title' => 'Edit Role Permission',
                'subtitle' => 'Edit role permission disini, Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-users.update', $user),
            ],
            'user' => $user->load('roles'),
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ])
        ]);
    }

    public function update(AssignUsersRequest $request, User $user): RedirectResponse
    {
        // dump($request->all());
        try {
            $user->syncRoles($request->roles);
            flashMessage("Berhasilkan update role ke pengguna {$user->name}");
            return to_route('admin.assign-users.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.assign-users.index');
        }
    }
}
