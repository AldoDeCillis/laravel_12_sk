<?php

namespace App\Http\Controllers;

use App\Models\Communication;
use App\Repositories\FilterRepository;
use Inertia\Inertia;

class CommunicationController extends Controller
{
    public function __construct(protected FilterRepository $filterRepository) {}

    public function index()
    {
        $communications = Communication::query();
        $this->filterRepository->searchCommunication($communications, request('searchQuery'));
        $communications = $communications->latest()->paginate(10);

        return Inertia::render('communication/index', ['communications' => $communications]);
    }

    public function create()
    {
        $employees = $this->filterRepository->searchEmployee(request('searchQuery'))->paginate(12);

        return Inertia::render('communication/create', [
            'employees' => $employees,
        ]);
    }
}
