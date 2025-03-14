<?php

namespace App\Http\Controllers;

use App\Models\PhotoGallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = PhotoGallery::with('media')->paginate(12);

        return Inertia::render('gallery/index', [
            'galleries' => $galleries,
        ]);
    }

    public function create()
    {
        return Inertia::render('gallery/create');
    }

    public function store()
    {
        // Validation
        request()->validate([
            'photos' => 'required|array|min:1',
            'photos.*' => 'image|max:4048',
            'title' => 'nullable',
            'description' => 'nullable',
        ]);

        // Create gallery
        $container = PhotoGallery::firstOrCreate(
            ['title' => request()->input('title') ?: 'Media generali'],
            ['description' => request()->input('description') ?? '']
        );

        foreach (request()->file('photos') as $photo) {
            $path = $photo->getPathName();

            if (! file_exists($path)) {
                session()->flash('error', "Il file non esiste: {$path}");

                continue;
            }

            $container->addMedia($path)
                ->usingFileName($photo->getClientOriginalName())
                ->toMediaCollection('images', 'media');
        }

        return redirect()->route('gallery.index');
    }
}
