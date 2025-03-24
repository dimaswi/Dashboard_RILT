<?php

namespace Database\Seeders;

use App\Models\RouteAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class RouteAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_role = Role::firstOrCreate(['name' => 'admin']);
        $kanit_role = Role::firstOrCreate(['name' => 'kepala-unit']);

        $uniqueRoutes = collect(Route::getRoutes())
        ->map(fn($route) => $route->getName())
        ->unique();

        $filteredRoutes = $uniqueRoutes->filter(fn($name) => Str::startsWith($name, 'admin.') || Str::startsWith($name, 'profile.') || $name === 'dashboard');

        // echo($filteredRoutes);

        foreach ($filteredRoutes as $route => $value) {
            RouteAccess::create([
                'route_name' => $value,
                'role_id' => $admin_role->id,
                'permission_id' => null,
            ]);
        };

        $kepala_unit_prefixes = [
            'admin.rawat-jalans.index'
        ];

        $kepala_unit_routes = collect(Route::getRoutes())->filter(function ($route) use ($kepala_unit_prefixes) {
            return in_array($route->getName(), ['dashboard', 'profile']) ||
            collect($kepala_unit_prefixes)->contains(function($prefix) use ($route) {
                return str_starts_with($route->getName(), $prefix);
            });
        });

        // echo($kepala_unit_routes);

        foreach ($kepala_unit_routes as $route) {
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $kanit_role->id,
                'permission_id' => null,
            ]);
        };
    }
}
