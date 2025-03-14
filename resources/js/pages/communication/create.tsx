import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { Employee } from '../../types/index';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Crea Comunicazione Dipendente', href: '/communication/create' },
];

interface PageProps {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
    };
    errors: { [key: string]: string };
    [key: string]: unknown;
}

const CommunicationCreate: React.FC = () => {
    const { props } = usePage<PageProps>();
    const initialEmployees = props.employees ? props.employees.data : [];

    // Stato del wizard a 2 step
    const [step, setStep] = useState<number>(1);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Stato per errori (client-side o backend)
    const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

    // Stato per la lista degli impiegati
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

    // Lista dei tipi di comunicazione
    const communicationTypes = ['Info', 'Public', 'Dispute'];

    useEffect(() => {
        router.get('/communication/create', { searchQuery }, { preserveState: true, replace: true });
        if (props.employees) {
            setEmployees(props.employees.data);
        }
    }, [searchQuery]);

    const previousStep = () => {
        setStep(1);
    };

    // Funzione per salvare la comunicazione
    const saveCommunication = (e: FormEvent) => {
        e.preventDefault();

        router.post(
            '/communication',
            { type, title, content, user_id: selectedEmployee },
            {
                onSuccess: () => {
                    console.log(selectedEmployee);
                    // Il backend imposta il flash message e redireziona alla dashboard
                },
                onError: (err) => {
                    setLocalErrors(err as { [key: string]: string });
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Head title="Crea Comunicazione" />
                {step === 1 ? (
                    <div>
                        <h2 className="mb-4 text-2xl font-bold text-slate-900">Seleziona Tipo di Comunicazione</h2>
                        <p className="mb-6 text-sm text-slate-600">Scegli il tipo di comunicazione da inviare</p>
                        <div className="mb-6 w-1/2">
                            <Label>Tipo Comunicazione</Label>
                            <Select
                                value={type}
                                onValueChange={(val) => {
                                    setType(val);
                                    if (val === 'Public') setStep(2);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communicationTypes.map((type, idx) => (
                                        <SelectItem key={idx} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={localErrors.communicationType} />
                        </div>
                        {type !== '' && type !== 'Public' && (
                            <div className="mb-6">
                                <div className="flex w-full flex-col md:flex-row">
                                    <div>
                                        <h2 className="mb-2 text-2xl font-bold text-slate-900">Seleziona Dipendente</h2>
                                        <p className="text-sm text-slate-600">Seleziona un dipendente a cui assegnare la comunicazione</p>
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            placeholder="Cerca un dipendente per nome o email..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="my-4 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {employees.map((emp) => (
                                        <button
                                            key={emp.id}
                                            onClick={() => {
                                                setSelectedEmployee(emp.id);
                                                setStep(2);
                                            }}
                                            className={`group hover:border-secondary-200 hover:bg-secondary-100 flex items-center space-x-4 rounded-xl border p-4 transition-all duration-200 ${
                                                selectedEmployee === emp.id ? 'border-secondary-500 bg-secondary-200' : ''
                                            }`}
                                        >
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
                                            <div className="flex-1">
                                                <h3 className="group-hover:text-primary-600 font-medium text-slate-900">{emp.name}</h3>
                                                <p className="text-sm text-slate-500">{emp.email}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {localErrors.selectedEmployee && <InputError message={localErrors.selectedEmployee} />}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button
                            className="text-primary-600 hover:text-primary-500 mb-8 inline-flex items-center text-sm font-medium"
                            onClick={previousStep}
                        >
                            <svg
                                className="mr-1 h-4 w-4 transform transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            Torna alla selezione del tipo
                        </button>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Assegna Comunicazione</h2>
                            <p className="text-sm text-slate-600">
                                {type !== 'Public'
                                    ? `Stai assegnando una comunicazione a ${employees.find((emp) => emp.id === selectedEmployee)?.name || ''}`
                                    : 'Stai creando una comunicazione pubblica per tutti gli utenti'}
                            </p>
                        </div>
                        <form className="space-y-8" onSubmit={saveCommunication}>
                            <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
                                <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                                    <div className="w-full md:w-1/2">
                                        <Label htmlFor="title">
                                            Titolo <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="title"
                                            autoComplete="off"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Es. Avviso lavori.."
                                        />
                                        {localErrors.title && <InputError message={localErrors.title} />}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="content">
                                        Contenuto <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Inserisci il contenuto della comunicazione"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    {localErrors.content && <InputError message={localErrors.content} />}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-secondary-600 hover:bg-secondary-500 focus:ring-secondary-500 inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2"
                                    type="submit"
                                >
                                    Crea Comunicazione
                                    <svg
                                        className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default CommunicationCreate;
