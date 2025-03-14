// File: src/components/AppSidebar.tsx
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { File, Speech } from 'lucide-react';
import AppLogo from './app-logo';

const admin = {
    user: {
        role: 'admin',
    },
};

const mainNavItems: NavItem[] = [
    admin && {
        title: 'Nuovo Documento',
        url: '/employee-document/create',
        icon: File,
    },
    admin && {
        title: 'Nuova Comunicazione',
        url: '/employee-document/create',
        icon: Speech,
    },
].filter(Boolean) as NavItem[];

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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
