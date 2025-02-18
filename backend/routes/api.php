<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\HabitacionController;

Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
    });

// middleware('auth:sanctum') → Protege la ruta para que solo usuarios autenticados puedan usarla
// [HotelController::class, 'store'] → Llama al método store de HotelController, que se encargará de guardar el hotel en la base de datos.
Route::middleware('auth:sanctum')->post('/hoteles', [HotelController::class, 'store']);
Route::middleware('auth:sanctum')->get('/hoteles', [HotelController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/hoteles/{id}', [HotelController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/hoteles/{hotelId}/habitaciones', [HabitacionController::class, 'index']);
Route::middleware('auth:sanctum')->post('/hoteles/{hotelId}/habitaciones', [HabitacionController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/hoteles/{hotelId}/habitaciones/{habitacionId}', [HabitacionController::class, 'destroy']);

