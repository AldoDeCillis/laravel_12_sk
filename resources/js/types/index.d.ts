import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Employee {
    id: number;
    name: string;
    email: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Document {
    id: number;
    title: string;
    description: string;
    created_at_formatted: string;
    user?: { id: number; name: string; email: string };
    category?: { id: number; name: string };
    file_path: string;
    expiration_date: string;
    created_at: string;
    updated_at: string;
    can_delete: boolean;
}

export interface Communication {
    id: number;
    user?: { id: number; name: string; email: string };
    title: string;
    type?: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface Media {
    id: number;
    file_name: string;
    original_url: string;
}

interface Gallery {
    id: number;
    title: string;
    description?: string;
    media_count: number;
    created_at: string;
    firstMediaUrl?: string;
    media?: Media[];
}
