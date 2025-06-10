<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\ReportsController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/categories', [CategoriesController::class, 'index'])->name('category');
    Route::post('/categories', [CategoriesController::class, 'store'])->name('category.store');
    Route::put('/categories/{category}', [CategoriesController::class, 'update'])->name('category.update');
    Route::delete('/categories/{category}', [CategoriesController::class, 'destroy'])->name('category.destroy');

    Route::get('/transactions', [TransactionsController::class, 'index'])->name('transactions');
    Route::post('/transactions', [TransactionsController::class, 'store'])->name('transaction.store');
    Route::put('/transactions/{transaction}', [TransactionsController::class, 'update'])->name('transaction.update');
    Route::delete('/transactions/{transaction}', [TransactionsController::class, 'destroy'])->name('transaction.destroy');

    Route::get('/reports', [ReportsController::class, 'index'])->name('reports');
});

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
});