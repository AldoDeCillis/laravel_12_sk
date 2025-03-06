import ContactForm from '@/components/forms/contact-form';
import React from 'react';

const Contacts: React.FC = () => {
    return (
        <section className="bg-primary-800 pb-16">
            <div className="relative flex items-center justify-center py-20">
                {/* Sfondo del testo grande */}
                <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
                    <h1 className="text-primary-400 text-5xl font-extrabold tracking-widest uppercase opacity-35 sm:text-7xl md:text-8xl">
                        Contatti
                    </h1>
                </div>

                {/* Testo in primo piano */}
                <div className="relative z-10 flex translate-y-14 flex-col items-start justify-start px-4 sm:px-0">
                    <h2 className="relative mt-10 text-3xl font-extrabold tracking-wide text-slate-50 uppercase sm:text-5xl md:mt-0 md:text-6xl">
                        <span className="relative inline-block">
                            <span className="bg-secondary-500 absolute inset-x-0 bottom-0 -z-10 h-4"></span>
                            Contatti
                        </span>
                    </h2>
                    <p className="mt-4 text-sm text-gray-300 sm:text-lg">
                        Per qualsiasi informazione e richieste, non esitare a contattarci tramite l'apposito form.
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-100">Informazioni di Contatto</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                <strong>Tesoro S.r.l.</strong>
                                <br />
                                2^ Trav. a destra di via dell'Artigianato s.n.c.
                                <br />
                                Z.I. ASI - 70026 Modugno (BA)
                            </p>
                            <p>
                                <strong>Tel.:</strong> 080 849 43 52
                                <br />
                                <strong>Fax:</strong> 080 455 05 65
                            </p>
                            <p>
                                <strong>Mail:</strong>{' '}
                                <a className="text-secondary-500" href="mailto:info@tesorosrl.it">
                                    info@tesorosrl.it
                                </a>
                                <br />
                                <strong>Pec:</strong>{' '}
                                <a className="text-secondary-500" href="mailto:tesoro@legalmail.it">
                                    tesoro@legalmail.it
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Form di contatto */}
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default Contacts;
