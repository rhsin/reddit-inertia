<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])
    ->get('/dashboard', [HomeController::class, 'dashboard'])
    ->name('dashboard');

Route::resources([
    'groups' => GroupController::class,
    'posts' => PostController::class,
    'users' => UserController::class
]);

Route::get('/dailyposts', [HomeController::class, 'dailyposts']);

Route::post('/attach', [HomeController::class, 'attachGroup']);

Route::post('/detach', [HomeController::class, 'detachGroup']);

