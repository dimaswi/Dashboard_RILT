<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class RawatJalanController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/RawatJalan/Index', [
            'page_settings' => [
                'title' => 'Dashboard Rawat Jalan',
                'subtitle' => 'Menampilkan semua data Rawat Jalan',
            ],
        ]);
    }
}
