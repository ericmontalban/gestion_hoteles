<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Hotel::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     * Método para guardar un hotel en la base de datos
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255|unique:hotels,direccion',
            'telefono' => 'nullable|string|max:20|unique:hotels,telefono',
            'email' => 'nullable|email|max:255|unique:hotels,email',
            'sitioWeb' => 'nullable|url|max:255|unique:hotels,sitioWeb',
        ]);

        try {
            $hotel = Hotel::create($request->all());
            return response()->json($hotel, 201);
        } catch (\Exception $e) {  //Captura errores de duplicado en telefono, email y sitio web
            return response()->json(['message' => 'Error al crear el hotel: ' . $e->getMessage()], 400);
        }
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
    public function destroy(string $id)
    {
        $hotel = Hotel::find($id); // Busca el hotel en la base de datos

        if (!$hotel) {
            return response()->json(['message' => 'Hotel no encontrado'], 404);
        }

        $hotel->delete();
        return response()->json(['message' => 'Hotel eliminado correctamente'], 200);
    }
}
