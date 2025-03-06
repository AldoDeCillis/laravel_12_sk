import React, { useEffect } from 'react';
import Swiper from 'swiper';

const HeroCarousel: React.FC = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    return () => swiper.destroy();
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[100vh] overflow-hidden sm:h-[600px] md:h-[800px]">
        <div className="absolute inset-0 z-0">
          <div className="swiper-container h-full">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img
                  alt="Hero_1"
                  className="h-full w-full object-cover"
                  src="/assets/carousel_1.jpeg"
                />
              </div>
              <div className="swiper-slide">
                <img
                  alt="Hero_2"
                  className="h-full w-full object-cover"
                  src="/assets/carousel_2.jpeg"
                />
              </div>
              <div className="swiper-slide">
                <img
                  alt="Hero_3"
                  className="h-full w-full object-cover"
                  src="/assets/carousel_3.jpeg"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10 bg-black/50"></div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white sm:ml-16 sm:text-left lg:ml-32">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              <span className="text-secondary-500">Sicurezza Stradale</span> su Misura
            </h1>
            <p className="mb-8 text-lg sm:text-xl">
              Da oltre 30 anni, progettiamo e installiamo soluzioni all'avanguardia per la viabilità sicura
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                className="inline-block rounded-lg border border-secondary-500 px-6 py-3 text-center transition-all duration-200 hover:bg-secondary-500 hover:text-black"
                href="/projects"
              >
                I nostri progetti
              </a>
              <a
                className="inline-block rounded-lg border border-white px-6 py-3 text-center transition-all duration-200 hover:bg-white hover:text-black"
                href="/contacts"
              >
                Contattaci
              </a>
            </div>
          </div>
        </div>

        <div className="swiper-pagination absolute bottom-4 left-1/2 z-30 transform"></div>
      </div>
    </div>
  );
};

export default HeroCarousel;
