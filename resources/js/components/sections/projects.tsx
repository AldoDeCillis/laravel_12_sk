import React from 'react';

interface ProjectCardProps {
    description: string;
    image: string;
    title: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ description, image, title }) => {
    return (
        <div className="group border-secondary-500 relative overflow-hidden rounded-sm border shadow-lg">
            <img
                alt={`${title} ${image}`}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={image} // Usa il percorso immagine relativo
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute right-0 bottom-0 left-0 translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-secondary-500 mb-2 text-xl font-bold">{title}</h3>
                    <p className="mb-4 text-gray-200">{description}</p>
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <section className="bg-primary-800 pb-16">
            <div className="relative flex items-center justify-center py-20">
                {/* Sfondo del testo grande */}
                <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
                    <h1 className="text-primary-400 text-5xl font-extrabold tracking-widest uppercase opacity-35 sm:text-7xl md:text-8xl">
                        I nostri ultimi
                    </h1>
                </div>

                {/* Testo in primo piano */}
                <div className="relative z-10 flex translate-y-14 flex-col items-start justify-start px-4 sm:px-0">
                    <h2 className="relative mt-10 text-3xl font-extrabold tracking-wide text-slate-50 uppercase sm:text-5xl md:mt-0 md:text-6xl">
                        <span className="relative inline-block">
                            <span className="bg-secondary-500 absolute inset-x-0 bottom-0 -z-10 h-4"></span>
                            Lavori
                        </span>
                    </h2>
                    <p className="mt-4 text-sm text-gray-300 sm:text-lg">
                        Esplora i nostri ultimi progetti e scopri come abbiamo realizzato soluzioni su misura per i nostri clienti.
                    </p>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <ProjectCard
                        description="Installazione di barriere di sicurezza su ponte con relativa segnaletica"
                        image="assets/barriere/barriera_4.jpg"
                        title="Barriere di sicurezza per ponti"
                    />
                    <ProjectCard
                        description="L'intervento include la posa di segnaletica verticale e orizzontale ad alta visibilità e l'utilizzo di materiali resistenti per una lunga durata nel tempo."
                        image="assets/segnaletica_complementare/sc_3.jpg"
                        title="Rotatorie con segnaletica integrata"
                    />
                    <ProjectCard
                        description="Intervento di posa in opera di guard-rail metallici di ultima generazione, progettati per garantire la massima sicurezza stradale."
                        image="assets/barriere/barriera_5.jpg"
                        title="Guard-rails"
                    />
                    <ProjectCard
                        description="Realizzazione e posizionamento di segnaletica complementare ad alta visibilità accompagnata da barriere stradali resistenti"
                        image="assets/segnaletica_complementare/sc_2.jpg"
                        title="Segnaletica complementare per la sicurezza stradale"
                    />
                    <ProjectCard
                        description="Installazione di delimitatori stradali giallo-neri per guidare il traffico in condizioni di curve strette, migliorando la visibilità e la sicurezza dei conducenti."
                        image="assets/segnaletica_complementare/sc_4.jpg"
                        title="Delimitatori stradali e segnaletica per curve"
                    />
                    <ProjectCard
                        description="Progettazione e realizzazione di una pista ciclabile dedicata, caratterizzata da un manto stradale rosso ad alta visibilità. L’intervento include l’applicazione di segnaletica orizzontale"
                        image="assets/segnaletica_verticale_orizzontale/svo_4.jpeg"
                        title="Pista ciclabile sicura con segnaletica orizzontale"
                    />
                </div>
            </div>
        </section>
    );
};

export default Projects;
