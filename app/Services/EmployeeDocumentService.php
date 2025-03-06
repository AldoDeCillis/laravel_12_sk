<?php

namespace App\Services;

use App\Models\EmployeeDocument;
use Exception;
use Illuminate\Support\Facades\Storage;

class EmployeeDocumentService
{
    /**
     * Salva un documento per un employee.
     *
     * @param  array  $data  Array di dati contenente:
     *                       - category_id (opzionale)
     *                       - user_id (ID dell'employee)
     *                       - title (string) -> da usare come nome del file (spazi sostituiti con underscore)
     *                       - description (string|null)
     *                       - file (istanza di \Illuminate\Http\File)
     *                       - file_extension (estensione del file)
     * @return EmployeeDocument
     */
    public function storeDocument(array $data)
    {
        if (! isset($data['file'])) {
            throw new Exception('Nessun file fornito.');
        }

        $file = $data['file'];
        // Costruiamo il nome del file usando il titolo e l'estensione
        $fileName = str_replace(' ', '_', $data['title']);
        if (isset($data['file_extension']) && $data['file_extension']) {
            $fileName .= '.'.$data['file_extension'];
        }

        // Salva il file nel disco "private" nella cartella "employee-documents"
        $filePath = Storage::disk('private')->putFileAs('employee-documents', $file, $fileName);

        return EmployeeDocument::create([
            'category_id' => $data['category_id'] ?? null,
            'user_id' => $data['user_id'] ?? auth()->id(),
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'file_path' => $filePath,
        ]);
    }
}
