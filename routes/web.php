<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;


Route::middleware(['auth'])->group(function () {
  Route::get('/', [HomeController::class, 'index'])->name("home");

	Route::get('/profile', [ProfileController::class, 'index'])->name("profile");
	Route::put('/profile', [ProfileController::class, 'update'])->name("profile.update");
});

Route::middleware('guest')->group(function () {
  Route::get('/register', [RegisterController::class, 'index'])->name("register");
  Route::post('/register', [RegisterController::class, 'store'])->name("register.store");
  
  Route::get('/login', [LoginController::class, 'index'])->name("login");
  Route::post('/login', [LoginController::class, 'store'])->name("login.store");
});

Route::post('/logout', function () {
  Auth::logout();
  return redirect('/');
});