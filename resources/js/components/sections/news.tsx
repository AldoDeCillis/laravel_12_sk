import React from 'react';

const News: React.FC = () => {
    // Simulazione di un array di notizie per il rendering
    const news = [
        {
            title: 'Titolo News 1',
            description: 'Breve descrizione della news con alcune informazioni rilevanti...',
            date: new Date().toLocaleDateString(),
            imageUrl: 'https://picsum.photos/400/300',
        },
        {
            title: 'Titolo News 2',
            description: 'Breve descrizione della news con alcune informazioni rilevanti...',
            date: new Date().toLocaleDateString(),
            imageUrl: 'https://picsum.photos/400/300',
        },
        {
            title: 'Titolo News 3',
            description: 'Breve descrizione della news con alcune informazioni rilevanti...',
            date: new Date().toLocaleDateString(),
            imageUrl: 'https://picsum.photos/400/300',
        },
    ];

    return (
        <section className="bg-slate-50 pt-10 pb-28">
            <div className="relative flex items-center justify-center py-20">
                {/* Sfondo del testo grande */}
                <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
                    <h1 className="text-primary-600 text-5xl font-extrabold tracking-widest uppercase opacity-15 sm:text-7xl md:text-8xl">
                        Gli ultimi
                    </h1>
                </div>

                {/* Testo in primo piano */}
                <div className="relative z-10 flex translate-y-14 flex-col items-start justify-start px-4 sm:px-0">
                    <h2 className="text-primary-600 relative text-3xl font-extrabold tracking-wide uppercase sm:text-5xl md:text-6xl">
                        <span className="relative inline-block">
                            <span className="bg-secondary-500 absolute inset-x-0 bottom-0 -z-10 h-4"></span>
                            Aggiornamenti
                        </span>
                    </h2>
                    <p className="text-primary-600 mt-4 text-sm sm:text-lg">Rimani aggiornato con le ultime notizie.</p>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {news.map((newsItem, index) => (
                        <div key={index} className="overflow-hidden rounded-sm bg-white shadow-lg">
                            <img alt={newsItem.title} className="h-48 w-full object-cover" src={newsItem.imageUrl} />
                            <div className="p-6">
                                <div className="mb-2 text-sm text-gray-600">{newsItem.date}</div>
                                <h3 className="mb-2 text-xl font-bold">{newsItem.title}</h3>
                                <p className="mb-4 text-gray-600">{newsItem.description}</p>
                                <a className="text-secondary-600 hover:text-secondary-700 inline-flex items-center font-medium" href="#">
                                    Leggi di più
                                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
