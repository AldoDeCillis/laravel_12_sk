import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type CardAction = {
  href: string;
  icon: string; // Classe dell'icona, es. "fa-regular fa-upload"
  label: string;
  variant: 'primary' | 'secondary';
};

type DashboardCardData = {
  title: string;
  icon: string; // Classe dell'icona di background
  actions: CardAction[];
};

const dashboardCards: DashboardCardData[] = [
  {
    title: 'Documenti Dipendenti',
    icon: 'fa-regular fa-file-signature',
    actions: [
      {
        href: '/crea-documento-dipendente',
        icon: 'fa-regular fa-upload',
        label: 'Carica Documento',
        variant: 'primary',
      },
      {
        href: '/documenti-dipendenti',
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
        href: '/crea-comunicazione',
        icon: 'fa-regular fa-plus',
        label: 'Crea Comunicazione',
        variant: 'primary',
      },
      {
        href: '/comunicazioni',
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
        href: '/crea-galleria',
        icon: 'fa-regular fa-plus',
        label: 'Aggiungi Immagini',
        variant: 'primary',
      },
      {
        href: '/galleria',
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
        href: '/crea-dipendente',
        icon: 'fa-regular fa-plus',
        label: 'Aggiungi Dipendente',
        variant: 'primary',
      },
      {
        href: '/lista-dipendenti',
        icon: 'fa-regular fa-list',
        label: 'Gestisci Dipendenti',
        variant: 'secondary',
      },
    ],
  },
  {
    title: 'Log Accessi',
    icon: 'fa-regular fa-list-check',
    actions: [], // Nessuna azione definita
  },
];

interface DashboardCardProps {
  card: DashboardCardData;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ card }) => {
  return (
    <div className="group relative flex h-64 w-full transform flex-col items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 shadow-lg transition duration-300 hover:scale-105 hover:border-secondary-500">
      <i
        className={`${card.icon} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-9xl opacity-10 transition duration-300 group-hover:text-secondary-700`}
      ></i>
      <h2 className="relative z-10 mb-4 text-xl font-semibold text-primary-700">{card.title}</h2>
      {card.actions.length > 0 && (
        <div className="relative z-10 flex flex-col space-y-3">
          {card.actions.map((action, idx) => {
            const bgClass =
              action.variant === 'primary' ? 'bg-secondary-600' : 'bg-secondary-100';
            const textClass =
              action.variant === 'primary' ? 'text-white' : 'text-secondary-600';
            const hoverBgClass =
              action.variant === 'primary' ? 'hover:bg-secondary-500' : 'hover:bg-secondary-200';
            return (
              <a
                key={idx}
                href={action.href}
                className={`inline-flex items-center justify-center rounded-lg ${bgClass} px-4 py-2 text-sm font-medium ${textClass} transition duration-300 ${hoverBgClass}`}
              >
                <i className={`${action.icon} mr-2`}></i>
                {action.label}
              </a>
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
        <div className="grid grid-cols-1 gap-6 bg-gray-200 bg-opacity-25 p-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8 lg:p-8 xl:grid-cols-3">
          {dashboardCards.map((card, idx) => (
            <DashboardCard key={idx} card={card} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
