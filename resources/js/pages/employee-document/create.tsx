import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ChunkedUpload from '../../components/forms/chunked-upload';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Crea Documento Dipendente', href: '/employee-documents/create' },
];

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
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    totalPages: number;
    [key: string]: unknown; // Index signature per chiavi extra
}

const Create: React.FC = () => {
    const { props } = usePage<PageProps>();
    const employees = props.employees.data ?? [];
    const categories = props.categories ?? [];

    const [step, setStep] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

    // Campi del form
    const [documentCategory, setDocumentCategory] = useState<number | null>(null);
    const [documentTitle, setDocumentTitle] = useState('');
    const [documentDescription, setDocumentDescription] = useState('');

    // Ricerca
    const [searchQuery, setSearchQuery] = useState('');

    // Stato di caricamento
    const [isUploading, setIsUploading] = useState(false);

    // Errori
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Esempio: ricarica la pagina con searchQuery in query string
    useEffect(() => {
        router.get('/employee-documents/create', { searchQuery }, { preserveState: true, replace: true });
    }, [searchQuery]);

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

    const handleUploadComplete = (uploadedFileName: string) => {
        console.log('[Create] handleUploadComplete -> File caricato:', uploadedFileName);
        saveDocument(uploadedFileName);
    };

    const saveDocument = (uploadedFileName: string) => {
        if (!documentTitle || !documentCategory || !selectedEmployee) {
            alert('Titolo, categoria e dipendente sono obbligatori.');
            return;
        }

        router.post(
            '/employee-documents',
            {
                category_id: documentCategory,
                user_id: selectedEmployee,
                title: documentTitle,
                description: documentDescription,
                file: uploadedFileName,
                file_extension: uploadedFileName.split('.').pop(),
            },
            {
                onSuccess: (page) => {
                    console.log('[Create] store onSuccess ->', page);
                    window.location.href = '/dashboard';
                },
                onError: (errs) => {
                    console.error('[Create] store onError ->', errs);
                    setErrors(errs as Record<string, string>);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                {step === 1 ? (
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">Seleziona Dipendente</h2>
                        <input
                            type="text"
                            placeholder="Cerca un dipendente per nome o email..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            className="mb-4 w-full rounded-md border p-2"
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {employees.map((emp) => (
                                <button
                                    key={emp.id}
                                    onClick={() => handleSelectEmployee(emp.id)}
                                    className="group hover:border-secondary-200 hover:bg-secondary-100 flex items-center space-x-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="bg-secondary-100 text-secondary-600 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="group-hover:text-primary-600 font-medium text-slate-900 transition-colors">{emp.name}</h3>
                                        <p className="text-sm text-slate-500">{emp.email}</p>
                                    </div>
                                    <div className="text-primary-500 transform opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handlePreviousStep}
                            className="text-primary-600 hover:text-primary-500 mb-4 inline-flex items-center text-sm font-medium"
                        >
                            <svg
                                className="mr-1 h-4 w-4 transform transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            Torna alla selezione del dipendente
                        </button>

                        <div className="mb-8 flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="bg-secondary-100 text-secondary-600 flex h-14 w-14 items-center justify-center rounded-xl">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Carica il documento</h2>
                                <p className="mt-1 text-sm text-slate-600">
                                    Stai caricando il documento per{' '}
                                    <span className="text-secondary-700 font-medium">
                                        {employees.find((emp) => emp.id === selectedEmployee)?.name || ''}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <form
                            className="space-y-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
                                <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                                    <div className="w-full md:w-1/2">
                                        <Label htmlFor="documentTitle">
                                            Titolo <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            required
                                            id="documentTitle"
                                            autoComplete="off"
                                            value={documentTitle}
                                            onChange={(e) => {
                                                setDocumentTitle(e.target.value);
                                            }}
                                            placeholder="Es. Busta Paga Febbraio 2025"
                                        />
                                        <InputError message={(errors as any)?.title} />
                                    </div>

                                    <div className="w-full md:w-1/2">
                                        <Label>
                                            Categoria <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={documentCategory ? String(documentCategory) : ''}
                                            onValueChange={(val) => {
                                                // converto la string in number
                                                const parsed = parseInt(val, 10);
                                                setDocumentCategory(isNaN(parsed) ? null : parsed);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleziona una categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat.id} value={String(cat.id)}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={(errors as any)?.category_id} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="documentDescription">Descrizione</Label>
                                    <Textarea
                                        id="documentDescription"
                                        placeholder="Inserisci una breve descrizione del documento"
                                        value={documentDescription}
                                        onChange={(e) => {
                                            setDocumentDescription(e.target.value);
                                        }}
                                    />
                                    <InputError message={(errors as any)?.description} />
                                </div>

                                <div>
                                    <Label>
                                        File <span className="text-red-500">*</span>
                                    </Label>
                                    <ChunkedUpload
                                        documentTitle={documentTitle || 'default'}
                                        dstPath="employee-documents/"
                                        setUploading={(uploading) => {
                                            setIsUploading(uploading);
                                        }}
                                    />
                                    <InputError message={(errors as any)?.file} />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                {isUploading ? (
                                    <button
                                        className="focus:ring-secondary-500 inline-flex cursor-not-allowed items-center rounded-xl bg-gray-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                        disabled
                                        type="submit"
                                    >
                                        <svg className="text-secondary-500 mr-2 h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                                            <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor"></path>
                                        </svg>
                                        Caricamento in corso...
                                    </button>
                                ) : (
                                    <button
                                        className="bg-secondary-600 hover:bg-secondary-500 focus:ring-secondary-500 inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                        type="submit"
                                        onClick={() => {
                                            // Al termine dell'upload chunk, handleUploadComplete(...) chiamerà saveDocument
                                            handleUploadComplete('default');
                                        }}
                                    >
                                        Carica il Documento
                                        <svg
                                            className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Create;
