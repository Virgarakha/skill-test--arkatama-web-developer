<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\TravController;
use App\Http\Controllers\TravelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('signin', [AuthController::class, 'signin']);
        Route::post('signup', [AuthController::class, 'signup']);
    });

    Route::apiResource('penumpang', TravelController::class);
    Route::apiResource('travel', TravController::class);
});

