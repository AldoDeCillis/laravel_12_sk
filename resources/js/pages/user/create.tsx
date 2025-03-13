import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppSidebarLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface FormErrors {
    name?: string;
    email?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Crea Dipendente', href: '/users' },
];

const Create: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.post(
            '/user',
            { name, email },
            {
                onSuccess: () => {
                    //
                },
                onError: (err) => {
                    setErrors(err as { [key: string]: string });
                },
            },
        );
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Crea Dipendente" />
            <div className="min-h-screen">
                <div className="mx-auto max-w-[90rem] px-4 pb-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
                            <div className="p-8">
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
                                        <h2 className="text-2xl font-bold text-slate-900">Inserisci un nuovo dipendente</h2>
                                    </div>
                                </div>

                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
                                        <div className="flex space-x-6">
                                            <div className="basis-1/2">
                                                <Label htmlFor="name">
                                                    Nome <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    autoComplete="off"
                                                    placeholder="Es. Mario Rossi"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <InputError message={errors.name} />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="email">
                                                E-mail <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                autoComplete="off"
                                                placeholder="Es. example@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            className="bg-secondary-600 hover:bg-secondary-500 focus:ring-secondary-500 inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                            type="submit"
                                        >
                                            Inserisci Dipendente
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
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default Create;
