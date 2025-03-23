<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Enums\UserGender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class UserController extends Controller
{
    use HasFile;
    public function  Index()
    {
        $user = User::query()
            ->select(
                'id',
                'name',
                'username',
                'email',
                'phone',
                'avatar',
                'gender',
                'date_of_birth',
                'address',
                'created_at',
            )
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->latest('created_at')
            ->paginate( request()->load ?? 10)
            ->withQueryString();

            return inertia('Admin/Users/Index', [
                'users' => UserResource::collection($user)->additional([
                    'meta' => [
                        'has_pages' => $user->hasPages()
                    ]
                ]),
                'page_settings' => [
                    'title' => 'Pengguna',
                    'subtitle' => 'Menampilkan semua data pengguna',
                ],
                'state' => [
                    'page' => request()->page ?? '',
                    'search' => request()->search?? '',
                    'load' => request()->load ?? '',
                    'field' => request()->field ?? '',
                    'direction' => request()->direction ?? '',
                ]
            ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Users/Create', [
            'page_settings' => [
                'title' => 'Tambah User',
                'subtitle' => 'Buat user baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.users.store'),
            ],
            'genders' => UserGender::options()
        ]);
    }

    public function store(UserRequest $request)
    {
        // dd($request->all());
        try {
            User::create([
                'name' => $name = $request->name,
                'username' => usernameGenerator($name),
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'avatar' => $this->uploadFile($request, 'avatar' , 'users/'),
            ]);
            flashMessage(MessageType::CREATED->message('pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }

    public function edit(User $user): Response
    {
        return inertia('Admin/Users/Edit', [
            'user' => $user,
            'page_settings' => [
                'title' => 'Edit User',
                'subtitle' => 'Edit user disini, Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.users.update', $user),
            ],
            'genders' => UserGender::options()
        ]);
    }

    public function update(User $user, UserRequest $request): RedirectResponse
    {
        try {
            $user->update([
                'name' => $name = $request->name,
                'username' => $name !== $user->name ? usernameGenerator($name) : $user->name,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'avatar' => $this->updateFile($request, $user ,'avatar', 'users/'),
            ]);
            flashMessage(MessageType::UPDATED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            $this->deleteFile($user, 'avatar');
            $user->delete();
            flashMessage(MessageType::DELETED->message('Pengguna'));
            return to_route('admin.users.index');
        } catch (\Throwable $th) {
            flashMessage(MessageType::ERROR->message(error: $th->getMessage()), 'error');
            return to_route('admin.users.index');
        }
    }
}
