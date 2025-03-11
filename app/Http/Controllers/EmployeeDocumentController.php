<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\EmployeeDocument;
use App\Repositories\FilterRepository;
use App\Services\ChunkUploadService;
use App\Services\EmployeeDocumentService;
use App\Services\NotificationService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmployeeDocumentController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected FilterRepository $filterRepository) {}

    public function index()
    {
        $this->authorize('viewAny', EmployeeDocument::class);

        $categories = Category::all();
        if (request()->has('category')) {
            $category = Category::where('name', request()->get('category'))->first();
            if ($category) {
                $initCategory = $category->id;
            }
        }

        $documents = EmployeeDocument::query()
            ->with('user', 'category')
            ->ownRecords(auth()->user());

        $this->filterRepository->searchEmployeeDocuments($documents, request('searchQuery'));
        $this->filterRepository->filterCategory($documents, request('categoryId'));

        $documents = $documents->latest()->paginate(10);

        return Inertia::render('employee-document/index',
            ['initCategory' => $initCategory ?? null, 'categories' => $categories, 'documents' => $documents]);
    }

    public function create(FilterRepository $filterRepository)
    {
        $employees = $filterRepository->searchEmployee(request('searchQuery'))
            ->paginate(10)
            ->withQueryString();

        $categories = Category::all();

        return Inertia::render('employee-document/create', [
            'employees' => $employees,
            'categories' => $categories,
            'totalPages' => $employees->lastPage(),
        ]);
    }

    public function store(Request $request, EmployeeDocumentService $documentService, NotificationService $notificationService)
    {
        // Autorizzazione
        $this->authorize('create', EmployeeDocument::class);

        // Validazione
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'file' => 'required',
        ]);

        // Recupera il file path dalla sessione
        $filePath = session()->get('uploaded_file_path');
        if (! $filePath || ! file_exists($filePath)) {
            Log::error('EmployeeDocumentController: File not found in session.', ['filePath' => $filePath]);

            return back()->withErrors(['file' => 'Il file non è stato caricato correttamente.']);
        }

        try {
            $uploadedFile = new File($filePath);
        } catch (\Exception $e) {
            Log::error('EmployeeDocumentController: Error creating File instance.', ['error' => $e->getMessage()]);

            return back()->withErrors(['file' => 'Errore durante la creazione del file.']);
        }

        // Salva il documento
        try {
            $documentService->storeDocument([
                'category_id' => $data['category_id'],
                'user_id' => $data['user_id'],
                'title' => $data['title'],
                'description' => $data['description'] ?? '',
                'file' => $uploadedFile,
                'file_extension' => pathinfo($filePath, PATHINFO_EXTENSION),
            ]);
        } catch (\Exception $e) {
            Log::error('EmployeeDocumentController: Error saving document.', ['error' => $e->getMessage()]);

            return back()->withErrors(['file' => 'Errore durante il salvataggio del documento.']);
        }

        // Esempio di notifica email
        /*
        $employee = User::find($data['user_id']);
        $notificationService->sendMail(
            $employee->email,
            new EmployeeDocumentCreated($data['title'], $employee->name)
        );
        */

        // Cleanup
        session()->forget('uploaded_file_path');

        return redirect()->route('employee-documents.index')
            ->with('success', 'Documento creato correttamente');

    }

    // Endpoint unico per i chunk: appende i chunk e, se è l'ultimo, sposta il file e salva in sessione
    public function chunkUpload(Request $request, ChunkUploadService $chunkService)
    {
        $request->validate([
            'chunk' => 'required|file',
            'chunkIndex' => 'required|integer',
            'totalChunks' => 'required|integer',
            'documentTitle' => 'required|string',
            'dstPath' => 'required|string',
            'fileExtension' => 'nullable|string',
        ]);

        $chunkContent = file_get_contents($request->file('chunk')->getRealPath());
        $documentTitle = $request->input('documentTitle');
        $ext = $request->input('fileExtension');

        // 1) Appendo il chunk al file temporaneo
        $tempFilePath = $chunkService->appendChunk($documentTitle, $ext, $chunkContent);

        // 2) Se siamo all'ultimo chunk, sposto il file nella cartella finale e salvo in sessione
        if ($request->input('chunkIndex') + 1 == $request->input('totalChunks')) {
            $destinationPath = storage_path('app/private/'.rtrim($request->input('dstPath'), '/'));
            if (! is_dir($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            $fileName = $documentTitle.'.'.($request->input('fileExtension') ?: 'pdf');
            $destinationFile = $destinationPath.DIRECTORY_SEPARATOR.$fileName;

            Log::debug('ChunkUpload: Moving file', ['from' => $tempFilePath, 'to' => $destinationFile]);

            try {
                if (! file_exists($tempFilePath)) {
                    Log::error('ChunkUpload: Temp file does not exist', ['tempFilePath' => $tempFilePath]);

                    return response()->json(['error' => 'File temporaneo non trovato.'], 500);
                }

                \File::move($tempFilePath, $destinationFile);
                session()->put('uploaded_file_path', $destinationFile);
            } catch (\Exception $e) {
                Log::error('chunkUpload: Error moving file.', ['error' => $e->getMessage()]);

                return response()->json(['error' => 'Errore durante lo spostamento del file.'], 500);
            }
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
