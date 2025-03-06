<?php

namespace App\Http\Controllers;

use App\Models\EmployeeDocument;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class EmployeeDocumentController extends Controller
{
    use AuthorizesRequests;

    public function serveFile(EmployeeDocument $document)
{
    $this->authorize('view', $document);

    if (! Storage::disk('private')->exists($document->file_path)) {
        abort(404, 'File not found.');
    }

    $filePath = storage_path("app/private/{$document->file_path}");
    $contentType = Storage::disk('private')->mimeType($document->file_path);

    return response()->file($filePath, [
        'Content-Type' => $contentType,
        'Content-Disposition' => 'inline; filename="' . basename($document->file_path) . '"',
    ]);
}

}
