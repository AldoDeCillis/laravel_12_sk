<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function home()
    {
        $customer_logos = collect(File::files(public_path('assets/customers')))
            ->map(fn ($file) => asset('assets/customers/'.$file->getFilename()));

        return Inertia::render('welcome', compact('customer_logos'));
    }

    public function aboutUs()
    {
        return Inertia::render('about-us');
    }

    public function projects()
    {
        return Inertia::render('projects');
    }

    public function news()
    {
        return Inertia::render('news');
    }

    public function contacts()
    {
        return Inertia::render('contacts');
    }
}
