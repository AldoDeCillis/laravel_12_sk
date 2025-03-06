<?php

namespace App\Services;

class ChunkUploadService
{
    protected string $tempDirectory;

    public function __construct()
    {
        $this->tempDirectory = storage_path('app/private/documents-tmp');
        if (!is_dir($this->tempDirectory)) {
            mkdir($this->tempDirectory, 0777, true);
        }
    }

    /**
     * Append the chunk content to a temporary file.
     *
     * @param string $documentTitle
     * @param string $fileExtension
     * @param string $chunkContent
     * @return string Full path of the temporary file.
     */
    public function appendChunk(string $documentTitle, string $fileExtension, string $chunkContent): string
    {
        $fileName = str_replace(' ', '_', $documentTitle) . '.' . $fileExtension;
        $filePath = $this->tempDirectory . DIRECTORY_SEPARATOR . $fileName;

        if (!file_exists($filePath)) {
            file_put_contents($filePath, '');
        }

        file_put_contents($filePath, $chunkContent, FILE_APPEND);

        return $filePath;
    }

    /**
     * Cleanup (delete) the temporary file.
     *
     * @param string $filePath
     * @return void
     */
    public function cleanupTempFile(string $filePath): void
    {
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
}
