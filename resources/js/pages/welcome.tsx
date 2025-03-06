import React from 'react';
import AppLayout from '../layouts/app/app-header-layout';
import HeroCarousel from '@/components/sections/hero-carousel';

const Welcome: React.FC = () => {
  return (
    <AppLayout>
      <HeroCarousel />
    </AppLayout>
  );
};

export default Welcome;
