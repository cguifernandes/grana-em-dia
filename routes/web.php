<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', [HomeController::class, 'index']);

Route::middleware('guest')->group(function () {
  Route::get('/register', [RegisterController::class, 'index'])->name("register");
  Route::post('/register', [RegisterController::class, 'store'])->name("register.store");
  
  Route::get('/login', [LoginController::class, 'index'])->name("login");
  Route::post('/login', [LoginController::class, 'store'])->name("login.store");
});
