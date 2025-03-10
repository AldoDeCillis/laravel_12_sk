<?php

namespace App\Services;

class ChunkUploadService
{
    protected string $tempDirectory;

    public function __construct()
    {
        // Cartella per i file temporanei
        $this->tempDirectory = storage_path('app/private/documents-tmp');
        if (! is_dir($this->tempDirectory)) {
            mkdir($this->tempDirectory, 0777, true);
        }
    }

    /**
     * Append the chunk content to a temporary file.
     *
     * @return string Percorso completo del file temporaneo.
     */
    public function appendChunk(string $documentTitle, ?string $fileExtension, string $chunkContent): string
    {
        $ext = $fileExtension;
        $fileName = str_replace(' ', '_', $documentTitle).'.'.$ext;
        $filePath = $this->tempDirectory.DIRECTORY_SEPARATOR.$fileName;

        if (! file_exists($filePath)) {
            file_put_contents($filePath, '');
        }

        file_put_contents($filePath, $chunkContent, FILE_APPEND);

        return $filePath;
    }
}
