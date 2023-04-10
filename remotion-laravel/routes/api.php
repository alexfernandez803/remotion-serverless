<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RenderController;
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
//Route::get('renders', [RenderController::class, 'index']);
//Route::middleware('auth:sanctum')->post('renders', [RenderController::class, 'render']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/renders', [RenderController::class, 'render']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
