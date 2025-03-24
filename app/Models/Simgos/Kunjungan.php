<?php

namespace App\Models\Simgos;

use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    protected $connection = 'simgos_pendaftaran';

    protected $table = 'kunjungan';

    protected $casts = [
        'MASUK' => 'datetime'
    ];
}
