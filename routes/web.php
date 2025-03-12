<?php

use App\Http\Controllers\CommunicationController;
use App\Http\Controllers\EmployeeDocumentController;
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

    // Documenti dipendenti
    Route::get('/employee-documents', [EmployeeDocumentController::class, 'index'])->name('employee-documents.index');
    Route::get('/employee-documents/create', [EmployeeDocumentController::class, 'create'])->name('employee-documents.create');
    Route::post('/employee-documents', [EmployeeDocumentController::class, 'store'])->name('employee-documents.store');
    Route::get('/employee-documents/{document}/serve', [EmployeeDocumentController::class, 'serveFile'])->name('employee-documents.serveFile');
    Route::post('/chunked-upload', [EmployeeDocumentController::class, 'chunkUpload']);

    // Comunicazioni
    Route::get('/communications', [CommunicationController::class, 'index'])->name('communication.index');
    Route::get('/communications/create', [CommunicationController::class, 'create'])->name('communications.create');
    Route::post('/communications', [CommunicationController::class, 'store'])->name('communications.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
