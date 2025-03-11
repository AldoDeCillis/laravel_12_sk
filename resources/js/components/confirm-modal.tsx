import React from 'react';

interface ConfirmModalProps {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Un modal semplice per confermare un'azione (ad es. eliminare un record).
 * - `title` (opzionale) Titolo della finestra di dialogo
 * - `message` Messaggio principale
 * - `confirmText`, `cancelText` (opzionali) Testo dei bottoni
 * - `onConfirm`, `onCancel` callback quando l'utente conferma o annulla
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title = 'Conferma operazione',
    message,
    confirmText = 'Conferma',
    cancelText = 'Annulla',
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                    <button className="text-slate-400 hover:text-slate-600" onClick={onCancel}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    <p className="text-sm text-slate-600">{message}</p>
                </div>

                {/* Footer - Bottoni */}
                <div className="flex justify-end space-x-2 border-t border-slate-200 bg-slate-50 px-4 py-3">
                    <button
                        onClick={onCancel}
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:outline-none"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
