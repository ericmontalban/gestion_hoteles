<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    // Permitir la asignación masiva solo en estos campos
    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'sitioWeb',
    ];
}
