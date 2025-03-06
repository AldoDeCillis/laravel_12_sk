<?php

namespace App\Console\Commands;

use App\Models\EmployeeDocument;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PurgeDeletedRecords extends Command
{
    protected $signature = 'purge:deleted-records';

    protected $description = 'Elimina definitivamente tutti i record soft-deleted e rimuove i file associati se presenti';

    /**
     * Elenco dei modelli da controllare.
     *
     * @var array
     */
    protected $models = [
        EmployeeDocument::class,
        // Aggiungi altri modelli qui
    ];

    public function handle()
    {
        foreach ($this->models as $modelClass) {
            $this->info("Elaborazione di: {$modelClass}");

            // Recupera tutti i record soft-deleted
            $records = $modelClass::onlyTrashed()->get();

            foreach ($records as $record) {
                // Se il modello ha un campo file_path e non è vuoto
                if (isset($record->file_path) && $record->file_path) {
                    // Verifica se il file esiste sullo storage
                    if (Storage::exists($record->file_path)) {
                        Storage::delete($record->file_path);
                        $this->info("File {$record->file_path} eliminato.");
                    }
                }

                // Elimina definitivamente il record
                $record->forceDelete();
                $this->info('Record eliminato definitivamente.');
            }
        }

        $this->info('Operazione completata con successo.');
    }
}
