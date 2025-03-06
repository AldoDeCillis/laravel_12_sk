import ContactForm from '@/components/forms/contact-form';
import Header from '@/components/header';
import GuestLayout from '@/layouts/app/guest-header-layout';
import React from 'react';

const Contacts: React.FC = () => {
    return (
        <GuestLayout>
            {/* Hero Section for About Us */}
            <Header bgImage="assets/clean_road.jpg">
                <h1 className="text-4xl font-bold text-white md:text-5xl">Contattaci</h1>
            </Header>
            <section className="bg-gray-50 py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div className="order-2 md:order-1">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Informazioni di Contatto</h2>
                        <p className="leading-relaxed text-gray-600">
                            <strong>Tesoro S.r.l.</strong>
                            <br />
                            2^ Trav. a destra di via dell'Artigianato s.n.c.
                            <br />
                            Z.I. ASI - 70026 Modugno (BA)
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            <strong>Tel.:</strong> 080 849 43 52
                            <br />
                            <strong>Fax:</strong> 080 455 05 65
                            <br />
                            <strong>Mail:</strong>{' '}
                            <a className="text-secondary-600" href="mailto:info@tesorosrl.it">
                                info@tesorosrl.it
                            </a>
                            <br />
                            <strong>Pec:</strong>{' '}
                            <a className="text-secondary-600" href="mailto:tesoro@legalmail.it">
                                tesoro@legalmail.it
                            </a>
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            <strong>Capitale sociale versato:</strong> € 200.000
                            <br />
                            <strong>Cod. Fiscale e P.IVA:</strong> 06773170722
                            <br />
                            <strong>C.C.I.A.A. REA BARI:</strong> 508878
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <iframe
                            className="h-96 w-full rounded-lg shadow-lg"
                            src="https://maps.google.com/maps?q=Tesoro%20Srl,%20Modugno,%20Bari&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-primary-800 py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <ContactForm />
                    <div>
                        <h2 className="text-secondary-600 mb-6 text-3xl font-bold">Supporto</h2>
                        <p className="text-secondary-600 leading-relaxed">
                            Il nostro team è sempre disponibile per rispondere alle tue domande e offrirti supporto. Compila il modulo e ti
                            risponderemo nel più breve tempo possibile.
                        </p>
                        <p className="text-secondary-600 mt-4 leading-relaxed">
                            Se hai bisogno di assistenza immediata, puoi contattarci telefonicamente o via email agli indirizzi indicati sopra.
                        </p>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Contacts;
