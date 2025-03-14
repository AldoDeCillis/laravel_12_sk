import { Input } from '@/components/ui/input';
import AppSidebarLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

interface AccessLog {
    id: number;
    user?: any[]; // Modifica questo tipo in base alla struttura dei dati utente, se necessario
    loggable_type: string;
    loggable_id: number;
    type: string;
    created_at: string;
}

interface PageProps {
    auth: { user: any };
    accessLogs: {
        data: AccessLog[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Log di accesso', href: '/access-logs' },
];

export default function Index() {
    const { props } = usePage<PageProps>();
    const accessLogs = props.accessLogs || {
        data: [],
        links: [],
        current_page: 1,
        last_page: 1,
    };

    console.log(props);

    // Filtri per ricerca
    const [searchQuery, setSearchQuery] = useState('');

    // Aggiorna i dati quando searchQuery cambia
    useEffect(() => {
        const currentPage = accessLogs.current_page;
        router.get('/access-logs', { searchQuery, page: currentPage }, { preserveState: true, replace: true });
    }, [searchQuery]);

    // Contenuto extra da inserire nella sidebar (input di ricerca)
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
            <Head title="Log di Accesso" />
            <div className="flex h-full w-full">
                {/* Vista Desktop */}
                <div className="hidden h-[calc(100vh-5rem)] w-full flex-col md:flex">
                    <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">ID Loggato</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {accessLogs.data.length === 0 ? (
                                    <tr>
                                        <td className="px-6 py-10 text-center" colSpan={3}>
                                            <div className="flex flex-col items-center">
                                                <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
                                                <p className="text-slate-500">Nessun documento trovato</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    accessLogs.data.map((log) => (
                                        <tr key={log.id} className="hover:bg-secondary-100 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <i className="fa-regular fa-file-lines text-secondary-500 mr-3"></i>
                                                    <div className="text-sm font-medium text-slate-900">{log.loggable_type}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-500">{log.loggable_id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-500">{log.created_at}</div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginazione */}
                    <div className="border-t border-slate-200 p-4">
                        <div className="flex justify-center">
                            {accessLogs.links.map((link, index) => (
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
                    {accessLogs.data.length === 0 ? (
                        <div className="py-8 text-center">
                            <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
                            <p className="text-slate-500">Nessun documento trovato</p>
                        </div>
                    ) : (
                        accessLogs.data.map((log) => (
                            <div key={log.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <div className="space-y-4 p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-secondary-100 flex h-10 w-10 items-center justify-center rounded-xl">
                                            <i className="fa-regular fa-file-lines text-secondary-600"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900">{log.loggable_type}</h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 text-sm">
                                        <div>
                                            <span className="font-medium">ID: </span>
                                            {log.loggable_id}
                                        </div>
                                        <div>
                                            <span className="font-medium">Data: </span>
                                            {log.created_at}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div className="p-4">
                        <div className="flex justify-center">
                            {accessLogs.links.map((link, index) => (
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
        </AppSidebarLayout>
    );
}
