<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id', 
        'numero', 
        'tipo', 
        'precio_por_noche'
    ];

    // Establecemos la relacion con hotel
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    // Establecemos la relacion con huesped
    public function huespedes() {
        return $this->hasMany(Huesped::class);
    }
}
