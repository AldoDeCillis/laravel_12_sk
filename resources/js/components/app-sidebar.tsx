// File: src/components/AppSidebar.tsx
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, Plus } from 'lucide-react';
import AppLogo from './app-logo';

const admin = {
    user: {
        role: 'admin',
    },
};

const mainNavItems: NavItem[] = [
    admin && {
        title: 'Nuovo Documento',
        url: '/employee-documents/create',
        icon: Plus,
    },
    admin && {
        title: 'Nuova Comunicazione',
        url: '/employee-documents/create',
        icon: Plus,
    },
].filter(Boolean) as NavItem[];

// Modifica qui i dati per Repository e Documentation
const footerNavItems: NavItem[] = [
    {
        title: 'Nuovo Repository',
        url: 'https://nuovo-repository-link.com',
        icon: Folder,
    },
    {
        title: 'Nuova Documentation',
        url: 'https://nuova-documentation-link.com',
        icon: BookOpen,
    },
];

interface AppSidebarProps {
    extraContent?: React.ReactNode;
}

export function AppSidebar({ extraContent }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                {/* Se abbiamo extraContent, lo inseriamo qui */}
                {extraContent && <div className="p-6">{extraContent}</div>}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
