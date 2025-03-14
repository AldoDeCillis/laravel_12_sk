import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type CardAction = {
    href: string;
    icon: string | null;
    label: string | null;
    variant: 'primary' | 'secondary' | null;
};

type DashboardCardData = {
    title: string;
    icon: string;
    actions: CardAction[];
};

const dashboardCards: DashboardCardData[] = [
    {
        title: 'Documenti Dipendenti',
        icon: 'fa-regular fa-file-signature',
        actions: [
            {
                href: 'employee-document/create',
                icon: 'fa-regular fa-upload',
                label: 'Carica Documento',
                variant: 'primary',
            },
            {
                href: 'employee-documents/',
                icon: 'fa-regular fa-list',
                label: 'Lista Documenti',
                variant: 'secondary',
            },
        ],
    },
    {
        title: 'Documenti Cantieri',
        icon: 'fa-regular fa-excavator',
        actions: [
            {
                href: '#',
                icon: 'fa-regular fa-upload',
                label: 'Carica Documento',
                variant: 'primary',
            },
            {
                href: '#',
                icon: 'fa-regular fa-list',
                label: 'Lista Documenti',
                variant: 'secondary',
            },
        ],
    },
    {
        title: 'Comunicazioni Dipendenti',
        icon: 'fa-regular fa-bullhorn',
        actions: [
            {
                href: 'communication/create',
                icon: 'fa-regular fa-plus',
                label: 'Crea Comunicazione',
                variant: 'primary',
            },
            {
                href: 'communications/',
                icon: 'fa-regular fa-list',
                label: 'Lista Comunicazioni',
                variant: 'secondary',
            },
        ],
    },
    {
        title: 'Gestione Media',
        icon: 'fa-regular fa-photo-film',
        actions: [
            {
                href: '/gallery/create',
                icon: 'fa-regular fa-plus',
                label: 'Aggiungi Immagini',
                variant: 'primary',
            },
            {
                href: '/galleries',
                icon: 'fa-regular fa-list',
                label: 'Gestisci Immagini',
                variant: 'secondary',
            },
        ],
    },
    {
        title: 'Gestione Utenze',
        icon: 'fa-regular fa-user',
        actions: [
            {
                href: '/user/create',
                icon: 'fa-regular fa-plus',
                label: 'Aggiungi Dipendente',
                variant: 'primary',
            },
            {
                href: '/users',
                icon: 'fa-regular fa-list',
                label: 'Gestisci Dipendenti',
                variant: 'secondary',
            },
        ],
    },
    {
        title: 'Log Accessi',
        icon: 'fa-regular fa-list-check',
        actions: [
            {
                href: '/access-logs',
                icon: null,
                label: null,
                variant: null,
            },
        ],
    },
];

interface DashboardCardProps {
    card: DashboardCardData;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ card }) => {
    return (
        <div className="group hover:border-secondary-500 relative flex h-64 w-full transform flex-col items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 shadow-lg transition duration-300 hover:scale-105">
            <i
                className={`${card.icon} group-hover:text-secondary-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-9xl opacity-10 transition duration-300`}
            ></i>
            <h2 className="text-primary-700 relative z-10 mb-4 text-xl font-semibold">{card.title}</h2>
            {card.actions.length > 0 && (
                <div className="relative z-10 flex flex-col space-y-3">
                    {card.actions.map((action, idx) => {
                        const bgClass = action.variant === 'primary' ? 'bg-secondary-600' : 'bg-secondary-100';
                        const textClass = action.variant === 'primary' ? 'text-white' : 'text-secondary-600';
                        const hoverBgClass = action.variant === 'primary' ? 'hover:bg-secondary-500' : 'hover:bg-secondary-200';
                        return (
                            <Link
                                href={action.href}
                                className={`inline-flex items-center justify-center rounded-lg ${bgClass} px-4 py-2 text-sm font-medium ${textClass} transition duration-300 ${hoverBgClass}`}
                                key={idx}
                            >
                                <i className={`${action.icon} mr-2`}></i>
                                {action.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="bg-opacity-25 grid grid-cols-1 gap-6 bg-gray-200 p-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8 lg:p-8 xl:grid-cols-3">
                    {dashboardCards.map((card, idx) => (
                        <DashboardCard key={idx} card={card} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
