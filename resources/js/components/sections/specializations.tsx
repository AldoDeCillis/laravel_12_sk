import React from 'react';
import SpecializationCard from '../specialization-card';

const Specializations: React.FC = () => {
    return (
        <section className="pt-0 pb-28 md:pt-10">
            <div className="relative flex items-center justify-center py-20">
                <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
                    <h1 className="text-primary-600 text-5xl font-extrabold tracking-widest uppercase opacity-15 sm:text-7xl md:text-8xl">
                        Le nostre
                    </h1>
                </div>

                <div className="relative z-10 flex translate-y-14 flex-col items-start justify-start px-4 sm:px-0">
                    <h2 className="text-primary-600 relative text-3xl font-extrabold tracking-wide uppercase sm:text-5xl md:text-6xl">
                        <span className="relative inline-block">
                            <span className="bg-secondary-500 absolute inset-x-0 bottom-0 -z-10 h-4"></span>
                            Specializzazioni
                        </span>
                    </h2>
                    <p className="text-primary-600 mt-4 text-sm sm:text-lg">
                        Scopri le nostre competenze e servizi, progettati per soddisfare le esigenze dei nostri clienti.
                    </p>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                    <SpecializationCard
                        description="Fornitura e posa in opera di barriere metalliche di sicurezza (guard-rail), barriere paramassi, varchi e di pannelli fonoassorbenti e altro."
                        icon="fa-road-barrier"
                        title="Barriere di sicurezza"
                    />
                    <SpecializationCard
                        description="Progettazione ed installazione di segnaletica complementare per garantire sicurezza e migliorare la gestione del traffico in aree sensibili."
                        icon="fa-traffic-cone"
                        title="Segnaletica complementare"
                    />
                    <SpecializationCard
                        description="Progettazione ed installazione di segnaletica verticale e orizzontale per una viabilità più chiara e una migliore organizzazione del traffico."
                        icon="fa-octagon-exclamation"
                        title="Segnaletica verticale e orizzontale"
                    />
                    <SpecializationCard
                        description="È il processo di applicazione di un rivestimento protettivo su pavimentazioni a base di asfalto per fornire uno strato di protezione."
                        icon="fa-road"
                        title="Rivestimento manto stradale"
                    />
                    <SpecializationCard
                        description="Progettazione e realizzazione di parcheggi ottimizzati per la sicurezza, la comodità e una migliore gestione degli spazi urbani."
                        icon="fa-square-parking"
                        title="Parcheggi"
                    />
                    <SpecializationCard
                        description="Manutenzione preventiva e riparazioni per strade e infrastrutture stradali, assicurando la sicurezza e la durata nel tempo."
                        icon="fa-user-helmet-safety"
                        title="Manutenzione stradale"
                    />
                </div>
            </div>
        </section>
    );
};

export default Specializations;
