<?php

use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontController::class, 'home'])->name('home');
Route::get('/about-us', [FrontController::class, 'aboutUs'])->name('about-us');
Route::get('/news', [FrontController::class, 'news'])->name('news');
Route::get('/contacts', [FrontController::class, 'contacts'])->name('contacts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
