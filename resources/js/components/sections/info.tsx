import { Link } from '@inertiajs/react';
import React from 'react';

const Info: React.FC = () => {
    return (
        <section className="relative flex h-[700px] bg-slate-50">
            {/* Sfondo principale */}
            <div
                className="bg-site-filtered hidden basis-[30%] md:block"
                style={{
                    backgroundImage: 'url(/assets/site-bg.jpeg)',
                }}
            ></div>
            <div className="bg-site h-screen w-full md:h-auto md:basis-[70%]" style={{ backgroundImage: 'url(/assets/site-bg.jpeg)' }}></div>

            {/* Box con il testo */}
            <div className="absolute top-1/2 left-1/2 w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6 md:top-[20%] md:left-[10%] md:h-[450px] md:w-[600px] md:translate-x-0 md:translate-y-0">
                <div className="border-secondary-500 bg-primary-800 absolute inset-0 border-2 opacity-90"></div>
                <div className="relative z-10 grid grid-cols-1 items-start gap-6 p-6 sm:p-8">
                    <h1 className="text-strong-shadow text-secondary-500 mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">Chi siamo</h1>
                    <p className="text-gray-300">
                        La TESORO srl è una azienda che opera nel settore della sicurezza stradale da 10 anni con esperienza trentennale.
                        Specializzata nella progettazione ed installazione di segnaletica verticale, orizzontale e complementare, cordoli in
                        conglomerato bituminoso, arredo urbano, alla fornitura e posa in opera di barriere metalliche di sicurezza (guard-rail),
                        barriere paramassi, varchi e di pannelli fonoassorbenti.
                    </p>
                    <div>
                        <Link
                            className="border-secondary-500 hover:bg-secondary-500 hover:text-primary-700 inline-flex items-center rounded-lg border px-6 py-3 text-center text-slate-50 transition-all duration-200"
                            href="/projects"
                        >
                            Scopri di più
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;
