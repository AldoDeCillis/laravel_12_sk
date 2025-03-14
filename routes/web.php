<?php

use App\Http\Controllers\CommunicationController;
use App\Http\Controllers\EmployeeDocumentController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\UserController;
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

    // Dipendenti
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');

    // Documenti dipendenti
    Route::get('/employee-documents', [EmployeeDocumentController::class, 'index'])->name('employee-documents.index');
    Route::get('/employee-document/create', [EmployeeDocumentController::class, 'create'])->name('employee-document.create');
    Route::post('/employee-document', [EmployeeDocumentController::class, 'store'])->name('employee-document.store');
    Route::post('/chunked-upload', [EmployeeDocumentController::class, 'chunkUpload']);
    Route::get('/employee-document/{document}/serve', [EmployeeDocumentController::class, 'serveFile'])->name('employee-document.serveFile');

    // Comunicazioni
    Route::get('/communications', [CommunicationController::class, 'index'])->name('communication.index');
    Route::get('/communication/create', [CommunicationController::class, 'create'])->name('communication.create');
    Route::post('/communication', [CommunicationController::class, 'store'])->name('communication.store');

    // Gallerie Fotografiche
    Route::get('/galleries', [GalleryController::class, 'index'])->name('gallery.index');
    Route::get('/gallery/create', [GalleryController::class, 'create'])->name('gallery.create');
    Route::post('/gallery', [GalleryController::class, 'store'])->name('gallery.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
