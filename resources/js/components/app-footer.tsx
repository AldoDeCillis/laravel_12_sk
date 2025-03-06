import React from 'react';

const AppFooter: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <hr />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-4">
                    {/* About Company */}
                    <div className="md:flex md:flex-col md:items-center">
                        <h3 className="mb-4 text-xl font-bold">
                            Tesoro SRL
                            <span className="bg-secondary-500 block h-1 w-10"></span>
                        </h3>
                        <p className="text-gray-400">
                            L’impresa ha partecipato ed è beneficiaria dell’Avviso Innoprocess- Interventi di supporto a soluzioni ICT nei processi
                            produttivi delle PMI
                        </p>
                        <img alt="Accredited Business" className="mt-4 bg-white" src="/assets/logo.png" />
                        <img alt="Accredited Business" className="mt-2" src="/assets/regione.jpg" />
                    </div>

                    {/* Useful Links */}
                    <div className="md:flex md:flex-col md:items-center">
                        <h3 className="mb-4 text-xl font-bold">
                            Quick Menù
                            <span className="bg-secondary-500 block h-1 w-10"></span>
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a className="text-gray-400 transition-colors hover:text-white" href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 transition-colors hover:text-white" href="/about-us">
                                    Chi Siamo
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 transition-colors hover:text-white" href="/news">
                                    News
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 transition-colors hover:text-white" href="/contacts">
                                    Contattaci
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-400 transition-colors hover:text-white" href="/login">
                                    Login Dipendenti
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:flex md:flex-col md:items-center">
                        <h3 className="mb-4 text-xl font-bold">
                            Contatti
                            <span className="bg-secondary-500 block h-1 w-10"></span>
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <i className="fa-regular fa-location-dot text-secondary-500"></i> via dei Gladioli 6 70026
                            </li>
                            <li>Modugno (BA)</li>
                            <li>
                                <i className="fa-regular fa-envelope text-secondary-500"></i> EMAIL: info@tesorosrl.it
                            </li>
                            <li>
                                <i className="fa-regular fa-envelope text-secondary-500"></i> PEC: tesoro@legalmail.it
                            </li>
                            <li>
                                <i className="fa-regular fa-phone text-secondary-500"></i> 0808494352
                            </li>
                        </ul>
                    </div>

                    {/* Powered by */}
                    <div className="md:flex md:flex-col md:items-center">
                        <h3 className="mb-4 text-xl font-bold">
                            Powered by
                            <span className="bg-secondary-500 block h-1 w-10"></span>
                        </h3>
                        <img alt="aulab" className="mt-4 h-14" src="/assets/logo_aulab.png" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} <span className="text-secondary-500">Tesoro SRL </span>- Tutti i diritti riservati - P.IVA
                    06773170722 - Privacy policy | Cookie policy
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
