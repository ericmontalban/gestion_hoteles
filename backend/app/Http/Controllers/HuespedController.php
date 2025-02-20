<?php

namespace App\Http\Controllers;

use App\Models\Habitacion;
use App\Models\Huesped;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HuespedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($hotelId, $habitacionId)
    {   
        $habitacion = Habitacion::find($habitacionId);
        if (!$habitacion) return response()->json(['message' => 'Habitación no encontrada'], 404);

        return response()->json($habitacion->huespedes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $habitacionId)
    {
         $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'dniPasaporte' => 'required|string|max:255',
            'fecha_check_in' => 'required|date',
            'fecha_check_out' => 'required|date|after:fecha_check_in',
        ]);

        // Crear una nueva instancia del modelo Huesped
        $huesped = new Huesped();

        // Llenar el modelo con los datos del request
        $huesped->fill($request->all());

        // Asignar manualmente el habitacion_id porque no viene en el request
        $huesped->habitacion_id = $habitacionId;

        // Guardar el modelo en la base de datos
        $huesped->save();

        // Retornar la respuesta con el objeto creado y el código 201 (CREATED)
        return response()->json($huesped, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
    public function destroy($habitacionId, $huespedId)
    {   
        // Filtra los huéspedes para que solo se busquen dentro de la habitación especificada
        // SELECT * FROM huespeds WHERE habitacion_id = $habitacionId;
        // Luego dentro de esos huespedes filtra por el id del huesped
        $huesped = Huesped::where('habitacion_id', $habitacionId)->find($huespedId);
        if (!$huesped)  {
            return response()->json(['message' => 'Huésped no encontrado'], 404);
        }

        $huesped->delete();
        return response()->json(['message' => 'Huésped eliminado'], 200);
    }
}
