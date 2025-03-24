<?php

namespace App\Http\Middleware;

use App\Models\RouteAccess;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class DynamicRoleAndPermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $routeName = Route::currentRouteName();

        $routeAccesses = RouteAccess::query()->where('route_name', $routeName)->get();

        if ($routeAccesses->isNotEmpty()) {
            $isAuthorize = false;

            foreach ($routeAccesses as $routeAccess) {
                $role = $routeAccess->role_id ? Role::find($routeAccess->role_id) : null;
                $perimission = $routeAccess->permission_id ? Permission::find($routeAccess->permission_id) : null;

                if (($role && auth()->user()->hasRole($role->name)) || ($perimission && auth()->user()->can($perimission->name))) {
                    $isAuthorize = true;
                    break;
                }
            }

            if ($isAuthorize) {
                return $next($request);
            } else {
                throw UnauthorizedException::forRolesOrPermissions(
                    $routeAccesses->pluck('role_id')->filter()->map(function ($roleID) {
                        return Role::find($roleID)->name;
                    })->all(),
                    $routeAccesses->pluck('permission_id')->filter()->map(function ($permissionID) {
                        return Permission::find($permissionID)->name;
                    })->all()
                );
            }

        } else {
            throw UnauthorizedException::forRolesOrPermissions([], []);
        }

        return $next($request);
    }
}
