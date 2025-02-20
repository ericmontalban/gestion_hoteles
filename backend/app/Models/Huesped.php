<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Huesped extends Model
{
    use HasFactory;

    protected $fillable = [
        'habitacion_id',
        'nombre',
        'apellido',
        'dniPasaporte',
        'fecha_check_in',
        'fecha_check_out'
    ];

    // Establecemos la relación con Habitacion
    public function habitacion() {
        return $this->belongsTo(Habitacion::class);
    }  
}
