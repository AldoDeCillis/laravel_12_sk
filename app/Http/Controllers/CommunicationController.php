<?php

namespace App\Http\Controllers;

use App\Models\Communication;
use App\Models\User;
use App\Repositories\FilterRepository;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class CommunicationController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected FilterRepository $filterRepository) {}

    public function index()
    {
        $communications = Communication::query()
            ->with('user');

        $this->filterRepository->searchCommunication($communications, request('searchQuery'));
        $communications = $communications->latest()->paginate(10);

        return Inertia::render('communication/index', ['communications' => $communications]);
    }

    public function create()
    {
        $employees = $this->filterRepository->searchEmployee(User::query(), request('searchQuery'))->paginate(12);

        return Inertia::render('communication/create', [
            'employees' => $employees,
        ]);
    }

    public function store()
    {
        // Autorizzazione
        $this->authorize('create', Communication::class);

        // Validazione
        $validated = request()->validate([
            'user_id' => 'nullable',
            'title' => 'required',
            'content' => 'required',
            'type' => 'required',
        ]);

        // Salva la comunicazione
        Communication::create($validated);

        // Notifica l'utente

        return to_route('communication.index')->with('success', 'Comunicazione creata con successo');
    }
}
