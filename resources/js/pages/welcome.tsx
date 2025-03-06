import Contacts from '@/components/sections/contacts';
import HeroCarousel from '@/components/sections/hero-carousel';
import Info from '@/components/sections/info';
import LogoCarousel from '@/components/sections/logo-carousel';
import News from '@/components/sections/news';
import Projects from '@/components/sections/projects';
import Specializations from '@/components/sections/specializations';
import React from 'react';
import GuestLayout from '../layouts/app/guest-header-layout';

const Welcome: React.FC<{ customer_logos: string[] }> = ({ customer_logos }) => {
    return (
        <GuestLayout>
            <HeroCarousel />
            <Specializations />
            <Info />
            <Projects />
            <LogoCarousel customerLogos={customer_logos} />
            <Contacts />
            <News />
        </GuestLayout>
    );
};

export default Welcome;
