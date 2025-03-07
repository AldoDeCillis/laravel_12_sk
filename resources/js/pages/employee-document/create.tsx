import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import ChunkedUpload from '../../components/forms/chunked-upload';

// Definisci i tipi se non li hai già in un file types.ts
interface Employee {
  id: number;
  name: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface PageProps {
  employees: Employee[];
  categories: Category[];
  totalPages: number;
}

const Create: React.FC = () => {
  // Ottieni i dati iniziali passati dal controller via Inertia
  const { props } = usePage<PageProps>();
  const { employees, categories } = props;

  // Stati del wizard
  const [step, setStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [documentCategory, setDocumentCategory] = useState<number | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  // Se usi la paginazione via Inertia, il cambio pagina verrebbe gestito via link; qui semplifichiamo.
  // const [page, setPage] = useState(1);

  // Passo 1: Selezione dipendente
  const handleSelectEmployee = (id: number) => {
    setSelectedEmployee(id);
    setStep(2);
  };

  const handlePreviousStep = () => {
    setDocumentTitle('');
    setDocumentCategory(null);
    setDocumentDescription('');
    setSelectedEmployee(null);
    setStep(1);
  };

  // Callback chiamata dal componente ChunkedUpload al termine del caricamento a chunk.
  const handleUploadComplete = (uploadedFilePath: string) => {
    saveDocument(uploadedFilePath);
  };

  // Salva il documento chiamando Inertia.post (questo invia i dati al backend)
  const saveDocument = (uploadedFilePath: string) => {
    if (!documentTitle || !documentCategory) {
      alert('Il titolo e la categoria sono obbligatori.');
      return;
    }
    Inertia.post('/employee-documents', {
      category_id: documentCategory,
      user_id: selectedEmployee,
      title: documentTitle,
      description: documentDescription,
      file: uploadedFilePath,
      file_extension: uploadedFilePath.split('.').pop(),
    }, {
      onSuccess: () => {
        // Puoi aggiungere un flash message nel backend o redirect
        window.location.href = '/dashboard';
      },
      onError: (errors) => {
        console.error(errors);
        alert('Errore durante il salvataggio del documento.');
      },
    });
  };

  return (
    <div className="p-4">
      {step === 1 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Seleziona Dipendente</h2>
          <input
            type="text"
            placeholder="Cerca un dipendente per nome o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employees
              .filter(emp =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(emp => (
                <button
                  key={emp.id}
                  onClick={() => handleSelectEmployee(emp.id)}
                  className="group flex items-center space-x-4 rounded-xl border p-4 transition-all duration-200 hover:border-secondary-200 hover:bg-secondary-100 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-medium text-slate-900 transition-colors group-hover:text-primary-600">{emp.name}</h3>
                    <p className="text-sm text-slate-500">{emp.email}</p>
                  </div>
                  <div className="transform text-primary-500 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </button>
              ))}
          </div>
          {/* Se hai bisogno di paginazione, puoi utilizzare link Inertia o componenti personalizzati */}
        </div>
      ) : (
        <div>
          <button onClick={handlePreviousStep} className="mb-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
            <svg className="mr-1 h-4 w-4 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            Torna alla selezione del dipendente
          </button>

          <div className="mb-8 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-100 text-secondary-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Carica il documento</h2>
              <p className="mt-1 text-sm text-slate-600">
                Stai caricando il documento per{" "}
                <span className="font-medium text-secondary-700">
                  {employees.find(emp => emp.id === selectedEmployee)?.name || ''}
                </span>
              </p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); /* Il submit finale avviene al termine dell'upload */ }}>
            <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
              <div className="flex flex-col space-y-6 md:flex-row md:space-x-6">
                <div className="w-full md:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Titolo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Es. Busta_Paga_Febbraio_2025"
                    className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-secondary-500 focus:ring-secondary-500"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-secondary-500 focus:ring-secondary-500"
                    value={documentCategory || ''}
                    onChange={(e) => setDocumentCategory(Number(e.target.value))}
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Descrizione</label>
                <textarea
                  placeholder="Inserisci una breve descrizione del documento"
                  className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-secondary-500 focus:ring-secondary-500"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  File <span className="text-red-500">*</span>
                </label>
                <ChunkedUpload
                  documentTitle={documentTitle || "default"}
                  dstPath="employee-documents/"
                  onUploadComplete={handleUploadComplete}
                  setUploading={setIsUploading}
                />
              </div>
            </div>

            <div className="flex justify-end">
              {isUploading ? (
                <button
                  className="inline-flex cursor-not-allowed items-center rounded-xl bg-gray-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
                  disabled
                  type="submit"
                >
                  <svg className="mr-2 h-6 w-6 animate-spin text-secondary-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor"></path>
                  </svg>
                  Caricamento in corso...
                </button>
              ) : (
                <button
                  className="inline-flex items-center rounded-xl bg-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
                  type="submit"
                  onClick={() => {
                    // Il submit finale avviene al termine dell'upload; la funzione saveDocument viene chiamata da ChunkedUpload
                  }}
                >
                  Carica il Documento
                  <svg className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Create;
