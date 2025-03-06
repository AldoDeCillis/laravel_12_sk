import Header from '@/components/header';
import GuestLayout from '@/layouts/app/guest-header-layout';
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <GuestLayout>
            {/* Hero Section for About Us */}
            <Header bgImage="assets/clean_road.jpg">
                <h1 className="text-4xl font-bold text-white md:text-5xl">Chi Siamo</h1>
            </Header>

            {/* About Us Section */}
            <section className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div>
                        <img alt="Chi Siamo" className="rounded-lg shadow-lg" src="assets/about-us_2.jpg" />
                    </div>
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Chi Siamo</h2>
                        <p className="leading-relaxed text-gray-600">
                            La TESORO srl, con sede sociale a Modugno (Bari) 2° trav a destra di via dell’Artigianato n.c., è una azienda che opera
                            nel settore della sicurezza stradale da ormai 10 anni, con esperienza trentennale. Specializzata nella progettazione ed
                            installazione di segnaletica verticale, orizzontale e complementare, cordoli in conglomerato bituminoso, arredo urbano,
                            alla fornitura e posa in opera di barriere metalliche di sicurezza (guard-rail), barriere paramassi, varchi e di pannelli
                            fonoassorbenti.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            L’Azienda è inoltre ufficialmente iscritta ed abilitata all’operatività sul MePA, il Mercato Elettronico della Pubblica
                            Amministrazione. Dispone di un magazzino per la segnaletica verticale, un parco mezzi efficiente e personale altamente
                            qualificato. Il tutto è gestito da metodologie e criteri operativi fissati da Manuale di Qualità.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            La TESORO srl è in possesso della certificazione di qualità SOA n°55195/3/00 del 24/10/2013 per le seguenti categorie e
                            classifiche:
                        </p>
                        <ul className="mt-2 list-inside list-disc text-gray-600">
                            <li>Categoria OG3 e classifica III – BIS (Strade, autostrade, viadotti, ferrovie, ecc);</li>
                            <li>Categoria OS10 e classifica III (Segnaletica stradale non luminosa);</li>
                            <li>Categoria OS12-A classifica IV bis (Barriere e protezioni stradali).</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div className="order-2 md:order-1">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">La Nostra Storia</h2>
                        <p className="leading-relaxed text-gray-600">
                            Da piccola impresa familiare a leader nel settore della sicurezza stradale, il nostro percorso è stato segnato da
                            innovazione, dedizione e crescita continua.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <img alt="La Nostra Storia" className="rounded-lg shadow-lg" src="assets/about-us_3.jpg" />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default AboutUs;
