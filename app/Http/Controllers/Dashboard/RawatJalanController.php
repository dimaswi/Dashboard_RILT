<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Simgos\Kunjungan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class RawatJalanController extends Controller
{
    public function index(): Response
    {
        if (request()->ruangan == 'All') {
            $harian = Kunjungan::query()
                ->whereDate('MASUK', Carbon::today())
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->get();
            $mingguan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->get();
            $bulanan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->get();
            $tahunan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->get();
            $gender = Kunjungan::query()
                ->leftJoin('pendaftaran.pendaftaran', 'pendaftaran.pendaftaran.NOMOR', '=', 'pendaftaran.kunjungan.NOPEN')
                ->leftJoin('master.pasien', 'pendaftaran.pendaftaran.NORM', '=', 'master.pasien.NORM')
                ->whereIn('pendaftaran.kunjungan.RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->select(
                    DB::raw("MONTHNAME(pendaftaran.kunjungan.MASUK) as bulan"),
                    DB::raw("pendaftaran.kunjungan.MASUK as tanggal"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN = 1 THEN 1 ELSE NULL END) as men"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN <> 1 THEN 1 ELSE NULL END) as women"),
                )
                ->orderBy('pendaftaran.kunjungan.MASUK', 'desc')
                ->groupBy(DB::raw("DATE_FORMAT(pendaftaran.kunjungan.MASUK, '%m-%Y')"))
                ->limit(10)
                ->get();
            $umur = Kunjungan::query()
                ->leftJoin('pendaftaran.pendaftaran', 'pendaftaran.pendaftaran.NOMOR', '=', 'pendaftaran.kunjungan.NOPEN')
                ->leftJoin('master.pasien', 'pendaftaran.pendaftaran.NORM', '=', 'master.pasien.NORM')
                ->whereIn('pendaftaran.kunjungan.RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->select(
                    DB::raw("MONTHNAME(pendaftaran.kunjungan.MASUK) as bulan"),
                    DB::raw("pendaftaran.kunjungan.MASUK as tanggal"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) < 17 THEN 1 ELSE NULL END) as young"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) > 17 AND TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) < 50 THEN 1 ELSE NULL END) as adult"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) > 50 THEN 1 ELSE NULL END) as aged"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN <> 1 THEN 1 ELSE NULL END) as women"),
                )
                ->orderBy('pendaftaran.kunjungan.MASUK', 'desc')
                ->groupBy(DB::raw("DATE_FORMAT(pendaftaran.kunjungan.MASUK, '%m-%Y')"))
                ->limit(10)
                ->get();
            $new_weekly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->where('pendaftaran.kunjungan.BARU', 1)
                ->get();
            $old_weekly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->where('pendaftaran.kunjungan.BARU', 0)
                ->get();
            $new_monthly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->where('pendaftaran.kunjungan.BARU', 1)
                ->get();
            $old_monthly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->whereIn('RUANGAN', ['111010401', '111010501', '111010601', '111010701', '113010101'])
                ->where('pendaftaran.kunjungan.BARU', 0)
                ->get();
        } else {
            $harian = Kunjungan::query()
                ->whereDate('MASUK', Carbon::today())
                ->where('RUANGAN', request()->ruangan)
                ->get();
            $mingguan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->where('RUANGAN', request()->ruangan)
                ->get();
            $bulanan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->where('RUANGAN', request()->ruangan)
                ->get();
            $tahunan = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])
                ->where('RUANGAN', request()->ruangan)
                ->get();
            $gender = Kunjungan::query()
                ->leftJoin('pendaftaran.pendaftaran', 'pendaftaran.pendaftaran.NOMOR', '=', 'pendaftaran.kunjungan.NOPEN')
                ->leftJoin('master.pasien', 'pendaftaran.pendaftaran.NORM', '=', 'master.pasien.NORM')
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->select(
                    DB::raw("MONTHNAME(pendaftaran.kunjungan.MASUK) as bulan"),
                    DB::raw("pendaftaran.kunjungan.MASUK as tanggal"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN = 1 THEN 1 ELSE NULL END) as men"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN <> 1 THEN 1 ELSE NULL END) as women"),
                )
                ->orderBy('pendaftaran.kunjungan.MASUK', 'desc')
                ->groupBy(DB::raw("DATE_FORMAT(pendaftaran.kunjungan.MASUK, '%m-%Y')"))
                ->limit(10)
                ->get();
            $umur = Kunjungan::query()
                ->leftJoin('pendaftaran.pendaftaran', 'pendaftaran.pendaftaran.NOMOR', '=', 'pendaftaran.kunjungan.NOPEN')
                ->leftJoin('master.pasien', 'pendaftaran.pendaftaran.NORM', '=', 'master.pasien.NORM')
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->select(
                    DB::raw("MONTHNAME(pendaftaran.kunjungan.MASUK) as bulan"),
                    DB::raw("pendaftaran.kunjungan.MASUK as tanggal"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) < 17 THEN 1 ELSE NULL END) as young"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) > 17 AND TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) < 50 THEN 1 ELSE NULL END) as adult"),
                    DB::raw("COUNT(CASE WHEN TIMESTAMPDIFF(YEAR, master.pasien.TANGGAL_LAHIR, CURDATE()) > 50 THEN 1 ELSE NULL END) as aged"),
                    DB::raw("COUNT(CASE WHEN master.pasien.JENIS_KELAMIN <> 1 THEN 1 ELSE NULL END) as women"),
                )
                ->orderBy('pendaftaran.kunjungan.MASUK', 'desc')
                ->groupBy(DB::raw("DATE_FORMAT(pendaftaran.kunjungan.MASUK, '%m-%Y')"))
                ->limit(10)
                ->get();
            $new_weekly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->where('pendaftaran.kunjungan.BARU', 1)
                ->get();
            $old_weekly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->where('pendaftaran.kunjungan.BARU', 0)
                ->get();
            $new_monthly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->where('pendaftaran.kunjungan.BARU', 1)
                ->get();
            $old_monthly = Kunjungan::query()
                ->whereBetween('MASUK', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->where('pendaftaran.kunjungan.RUANGAN', request()->ruangan)
                ->where('pendaftaran.kunjungan.BARU', 0)
                ->get();
        }


        return inertia('Dashboard/RawatJalan/Index', [
            'page_settings' => [
                'title' => 'Dashboard Rawat Jalan',
                'subtitle' => 'Menampilkan semua data Rawat Jalan',
            ],
            'page_stat' => [
                'harian' => $harian->count(),
                'mingguan' => $mingguan->count(),
                'bulanan' => $bulanan->count(),
                'tahunan' => $tahunan->count(),
                'new_weekly' => $new_weekly->count(),
                'old_weekly' => $old_weekly->count(),
                'new_monthly' => $new_monthly->count(),
                'old_monthly' => $old_monthly->count(),
            ],
            'state' => [
                'ruangan' => request()->ruangan ?? 'All',
            ],
            'genderChartConfig' => [
                'men' => [
                    'label' => 'Laki - Laki',
                    'color' => 'hsl(var(--chart-1))'
                ],
                'women' => [
                    'label' => 'Perempuan',
                    'color' => 'hsl(var(--chart-2))'
                ]
            ],
            'genderChartData' => $gender,
            'ageChartConfig' => [
                'young' => [
                    'label' => 'Anak',
                    'color' => 'hsl(var(--chart-1))'
                ],
                'adult' => [
                    'label' => 'Dewasa',
                    'color' => 'hsl(var(--chart-2))'
                ],
                'aged' => [
                    'label' => 'Lansia',
                    'color' => 'hsl(var(--chart-3))'
                ]
            ],
            'ageChartData' => $umur,
        ]);
    }
}
