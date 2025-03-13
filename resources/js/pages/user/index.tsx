import ConfirmModal from '@/components/confirm-modal';
import { Input } from '@/components/ui/input';
import AppSidebarLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Employee } from '../../types/index';

interface PageProps {
    auth: { user: any };
    employees: {
        data: Employee[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Dipendenti', href: '/users' },
];

export default function Index() {
    const { props } = usePage<PageProps>();
    const { employees } = props;

    console.log(props);

    // Filtri per ricerca e tipo
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmId, setConfirmId] = useState<number | null>(null);

    // Aggiorna i dati quando searchQuery o type cambiano
    useEffect(() => {
        const currentPage = props.employees.current_page;
        router.get('/users', { searchQuery, page: currentPage }, { preserveState: true, replace: true });
    }, [searchQuery]);

    const openConfirmModal = (employeeId: number) => {
        setConfirmId(employeeId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setConfirmId(null);
        setShowConfirmModal(false);
    };

    const deleteUser = () => {
        if (!confirmId) return;
        router.delete(`/employee-employees/${confirmId}`, {
            onSuccess: () => {
                closeConfirmModal();
            },
            onError: (errors) => {
                console.error('Errore nella cancellazione:', errors);
            },
        });
    };

    // Contenuto extra da inserire nella sidebar dinamicamente:
    const sidebarExtra = (
        <div className="space-y-6">
            <div className="relative">
                <Input placeholder="Cerca..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
                    <i className="fa-regular fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    );

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} sidebarExtra={sidebarExtra}>
            <Toaster />
            <Head title="Lista Dipendenti" />
            <div className="flex h-full w-full">
                {/* Vista Desktop */}
                <div className="hidden h-[calc(100vh-5rem)] w-full flex-col md:flex">
                    {/* Area scrollabile: contiene la tabella */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Azioni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {employees.data.length === 0 ? (
                                    <tr>
                                        <td className="px-6 py-10 text-center" colSpan={5}>
                                            <div className="flex flex-col items-center">
                                                <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
                                                <p className="text-slate-500">Nessun documento trovato</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    employees.data.map((employee) => (
                                        <tr key={employee.id} className="hover:bg-secondary-100 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <i className="fa-regular fa-file-lines text-secondary-500 mr-3"></i>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-900">{employee.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="bg-secondary-100 flex h-8 w-8 items-center justify-center rounded-full">
                                                        <i className="fa-regular fa-user text-secondary-600"></i>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm text-slate-500">{employee.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        className="text-red-600 hover:text-red-500"
                                                        title="Elimina"
                                                        onClick={() => {
                                                            openConfirmModal(employee.id);
                                                        }}
                                                    >
                                                        <i className="fa-regular fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Area fissa: ad esempio, per la paginazione */}
                    <div className="border-t border-slate-200 p-4">
                        <div className="flex justify-center">
                            {employees.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={link.active ? 'text-secondary-600 mx-1 font-bold' : 'hover:text-secondary-600 mx-1 text-slate-600'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vista Mobile: Card */}
                <div className="mx-auto flex max-w-[90rem] flex-col space-y-4 px-4 pt-4 md:hidden">
                    {employees.data.length === 0 ? (
                        <div className="py-8 text-center">
                            <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
                            <p className="text-slate-500">Nessun documento trovato</p>
                        </div>
                    ) : (
                        employees.data.map((employee) => (
                            <div key={employee.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <div className="space-y-4 p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-secondary-100 flex h-10 w-10 items-center justify-center rounded-xl">
                                            <i className="fa-regular fa-file-lines text-secondary-600"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900">{employee.name}</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-slate-500">Dipendente</p>
                                            <p className="font-medium">{employee.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button className="text-red-600 hover:text-red-500" onClick={() => openConfirmModal(employee.id)}>
                                                <i className="fa-regular fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="p-4">
                        <div className="flex justify-center">
                            {employees.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={link.active ? 'text-secondary-600 mx-1 font-bold' : 'hover:text-secondary-600 mx-1 text-slate-600'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Conferma Eliminazione */}
            {showConfirmModal && (
                <ConfirmModal
                    title="Conferma eliminazione"
                    message="Sei sicuro di voler eliminare questo documento?"
                    confirmText="Elimina"
                    cancelText="Annulla"
                    onCancel={closeConfirmModal}
                    onConfirm={deleteUser}
                />
            )}
        </AppSidebarLayout>
    );
}
