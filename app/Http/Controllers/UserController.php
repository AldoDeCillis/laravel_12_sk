<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\FilterRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(protected FilterRepository $filterRepository) {}

    public function index()
    {
        $employees = User::query();
        $employees = $this->filterRepository->searchEmployee($employees, request('searchQuery'));
        $employees = $employees->latest()->paginate(10);

        return Inertia::render('user/index', [
            'employees' => $employees,
        ]);
    }

    public function create()
    {
        return Inertia::render('user/create');
    }

    public function store()
    {
        // Validazione
        $validated = request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users'],
        ]);

        // Salva la comunicazione
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(Str::random(8)),
        ]);

        // Assign role
        $user->assignRole('employee');

        // Genera un token di reset della password per l'utente, indispensabile per la notifica
        $token = Password::getRepository()->create($user);

        // Invia la notifica di reset della password
        $user->sendPasswordResetNotification($token);

        return redirect()->route('user.index');
    }
}
