import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const HeroCarousel: React.FC = () => {
    return (
        <div className="relative">
            <div className="relative h-[100vh] overflow-hidden sm:h-[600px] md:h-[800px]">
                <div className="absolute inset-0 z-0">
                    <Swiper
                        loop={true}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}" style="background-color: var(--color-secondary-500);"></span>`;
                            },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img alt="Hero_1" className="h-full w-full object-cover" src="/assets/carousel_1.jpeg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img alt="Hero_2" className="h-full w-full object-cover" src="/assets/carousel_2.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img alt="Hero_3" className="h-full w-full object-cover" src="/assets/carousel_3.jpg" />
                        </SwiperSlide>
                    </Swiper>
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
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <a
                                className="border-secondary-500 hover:bg-secondary-500 inline-block rounded-lg border px-6 py-3 text-center transition-all duration-200 hover:text-black"
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

                {/* La pagination ora è gestita direttamente da Swiper */}
            </div>
        </div>
    );
};

export default HeroCarousel;
