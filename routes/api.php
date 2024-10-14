<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route::apiResource('/users', UserController::class);
});

// Route::get('/test', function () {
//     return response()->json(['message' => 'API connected successfully']);
// });

Route::get('/signup', function () {
        return response()->json(['message' => 'API SIGNUP CONNECTED']);
    });

// Route::post('/signup', [AuthController::class, 'signup']); // get ang nagwowork instead of post?
Route::post('/login', [AuthController::class, 'login']);

