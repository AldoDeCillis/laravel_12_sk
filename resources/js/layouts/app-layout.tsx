import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    sidebarExtra?: ReactNode;
}

export default ({ children, breadcrumbs, sidebarExtra, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate sidebarExtra={sidebarExtra} breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
