<?php

namespace App\Http\Controllers;

use App\Models\Habitacion;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HabitacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($hotelId)
    {
        $hotel = Hotel::find($hotelId);

        if (!$hotel) {
            return response()->json(['message' => 'Hotel no encontrado'], 404);
        }

        return response()->json($hotel->habitaciones); // Relación con `habitaciones`
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $hotelId)
    {
        $hotel = Hotel::find($hotelId);

        if (!$hotel) {
            return response()->json(['message' => 'Hotel no encontrado'], 404);
        }

        $request->validate([
            'numero' => 'required|string|max:255',
            'tipo' => 'nullable|string|max:255',
            'precio_por_noche' => 'required|numeric',
        ]);

        $habitacion = Habitacion::create([
            'hotel_id' => $hotelId,
            'numero' => $request->numero,
            'tipo' => $request->tipo,
            'precio_por_noche' => $request->precio_por_noche
        ]);

        return response()->json($habitacion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($hotelId, $habitacionId)
    {
        $habitacion = Habitacion::where('hotel_id', $hotelId)->find($habitacionId);

        if (!$habitacion) {
            return response()->json(['message' => 'Habitación no encontrada'], 404);
        }

        $habitacion->delete();

        return response()->json(['message' => 'Habitación eliminada'], 200);
    }
}
