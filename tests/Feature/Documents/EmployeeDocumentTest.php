<?php

use App\Livewire\EmployeeDocumentCreate;
use App\Livewire\EmployeeDocumentIndex;
use App\Models\Category;
use App\Models\EmployeeDocument;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('prevents unauthorized employees from accessing private documents via Livewire', function () {
    $owner = User::factory()->create()->assignRole('employee');
    $otherUser = User::factory()->create()->assignRole('employee');
    $paySlipCategory = Category::where('name', 'Pay Slip')->first();

    $document = EmployeeDocument::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $paySlipCategory->id,
    ]);

    // L'utente che NON è il proprietario prova ad accedere e deve essere bloccato
    Livewire::actingAs($otherUser)
        ->test(EmployeeDocumentIndex::class)
        ->call('openModal', $document->id)
        ->assertForbidden();

    Livewire::actingAs($owner)
        ->test(EmployeeDocumentIndex::class)
        ->call('openModal', $document->id)
        ->assertOk();
});

it('prevents employees without create permission from adding a document', function () {
    $user = User::factory()->create()->assignRole('employee');

    Livewire::actingAs($user)
        ->test(EmployeeDocumentCreate::class)
        ->call('saveDocument')
        ->assertForbidden();
});

it('allows an admin to upload a document via Livewire', function () {
    Storage::fake('private'); // Simula il filesystem di Spatie Media Library

    $user = User::factory()->create()->assignRole('admin');
    $fakeFile = UploadedFile::fake()->create('test.pdf', 100); // Crea un file finto di 100KB

    $fileName = $fakeFile->getClientOriginalName();
    $filePath = $fakeFile->storeAs('employee-documents', $fileName, 'private');

    Livewire::actingAs($user)
        ->test(EmployeeDocumentCreate::class)
        ->set('selectedEmployee', $user->id)
        ->set('documentCategory', 1)
        ->set('documentTitle', 'Test Document')
        ->set('documentDescription', 'This is a test document.')
        ->call('saveDocument');

    // Verifica che il documento sia stato creato
    $document = EmployeeDocument::latest()->first();
    expect($document)->not->toBeNull();

    // Verifica che il file sia stato memorizzato
    Storage::disk('private')->assertExists("employee-documents/{$fileName}");
});

it('allows an admin or the owner to delete a document and make sure that the file from the private storage is deleted as well', function () {
    $admin = User::factory()->create()->assignRole('admin');
    $owner = User::factory()->create()->assignRole('employee');

    $document = EmployeeDocument::factory()->create([
        'user_id' => $owner->id,
    ]);

    Livewire::actingAs($admin)
        ->test(EmployeeDocumentIndex::class)
        ->call('destroy', $document->id)
        ->assertOk();

    Storage::disk('private')->assertMissing($document->file_path);

    $document = EmployeeDocument::factory()->create([
        'user_id' => $owner->id,
    ]);

    Livewire::actingAs($owner)
        ->test(EmployeeDocumentIndex::class)
        ->call('destroy', $document->id)
        ->assertOk();

    Storage::disk('private')->assertMissing($document->file_path);
});
