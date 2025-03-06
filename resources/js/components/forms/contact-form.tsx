import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('');

        try {
            // Simula invio del form
            await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate server request
            setSubmissionStatus('Form inviato con successo!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmissionStatus("Errore nell'invio del form. Riprova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="border-secondary-500 rounded-sm border p-8 shadow-lg">
            <h2 className="text-secondary-500 mb-6 text-3xl font-bold">Scrivici</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-secondary-500 block" htmlFor="name">
                        Nome
                    </label>
                    <input
                        className="focus:ring-secondary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2"
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-secondary-500 block" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="focus:ring-secondary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2"
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-secondary-500 block" htmlFor="message">
                        Richiesta
                    </label>
                    <textarea
                        className="focus:ring-secondary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2"
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="border-secondary-500 hover:bg-secondary-500 hover:text-primary-700 inline-flex items-center rounded-lg border px-6 py-3 text-center text-slate-50 transition-all duration-200"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Invio...' : 'Invia Richiesta'}
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                </button>
            </form>
            {submissionStatus && <div className="mt-4 text-center text-gray-300">{submissionStatus}</div>}
        </div>
    );
};

export default ContactForm;
