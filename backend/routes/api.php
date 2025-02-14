<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;

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
