<?php

use App\Livewire\CommunicationIndex;
use App\Livewire\EmployeeDocumentIndex;
use App\Models\AccessLog;
use App\Models\Communication;
use App\Models\EmployeeDocument;
use App\Models\User;
use Livewire\Livewire;

it('logs first access by employee to the private document', function () {
    $employee = User::factory()->create()->assignRole('employee');
    $document = EmployeeDocument::factory()->create([
        'user_id' => $employee->id,
    ]);

    $this->actingAs($employee);

    // Simula la visualizzazione del documento nel componente Livewire
    Livewire::test(EmployeeDocumentIndex::class)
        ->call('logFirstAccess', $employee, $document->id); // Chiamata a un metodo Livewire

    expect(
        AccessLog::where('user_id', $employee->id)
            ->where('loggable_id', $document->id)
            ->exists()
    )->toBeTrue();
});

it('logs first access by employee to the private communication', function () {
    $employee = User::factory()->create()->assignRole('employee');
    $communication = Communication::factory()->create([
        'user_id' => $employee->id,
    ]);
    $this->actingAs($employee);
    Livewire::test(CommunicationIndex::class)
        ->call('logFirstAccess', $employee, $communication->id);

    expect(
        AccessLog::where('user_id', $employee->id)
            ->where('loggable_id', $communication->id)
            ->exists()
    )->toBeTrue();
});
