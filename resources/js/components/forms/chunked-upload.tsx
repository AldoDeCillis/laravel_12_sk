import axios from 'axios';
import React, { useRef, useState } from 'react';

interface ChunkedUploadProps {
    documentTitle: string;
    dstPath: string;
    setUploading: (uploading: boolean) => void;
}

const ChunkedUpload: React.FC<ChunkedUploadProps> = ({ documentTitle, dstPath, setUploading }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');

    // Dimensione chunk (2MB)
    const chunkSize = 2 * 1024 * 1024;

    // Gestisce l'upload di un file suddiviso in chunk
    const handleFileUpload = async (file: File) => {
        setUploading(true);

        const totalChunks = Math.ceil(file.size / chunkSize);
        let uploadedChunks = 0;
        setUploadedFileName('');

        // Se non hai un documentTitle, costruiscine uno di default
        const effectiveTitle = documentTitle || file.name.replace(/\.[^/.]+$/, '').replace(/ /g, '_');
        const ext = file.name.split('.').pop() || 'pdf';

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('chunkIndex', i.toString());
            formData.append('totalChunks', totalChunks.toString());
            formData.append('documentTitle', effectiveTitle);
            formData.append('dstPath', dstPath);

            if (i === 0) {
                formData.append('fileExtension', ext);
            }

            console.log(`[ChunkedUpload] Inviando chunk: ${i + 1}/${totalChunks}`, {
                chunkIndex: i,
                start,
                end,
                chunkSize: chunk.size,
            });

            try {
                // Se hai bisogno dei cookie o del token CSRF, aggiungi:
                // withCredentials: true,
                // e un eventuale header 'X-CSRF-TOKEN': ...
                await axios.post('/chunked-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    },
                    withCredentials: true,
                });

                uploadedChunks++;
                const percentage = Math.floor((uploadedChunks / totalChunks) * 100);
                setProgress(percentage);
            } catch (error) {
                console.error(`[ChunkedUpload] ERRORE caricando chunk ${i + 1}/${totalChunks}`, error);
                setUploading(false);
                return;
            }
        }

        setUploadedFileName(file.name);
        setUploading(false);
    };

    // Cambio file con l'input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            handleFileUpload(file);
        }
    };

    // Gestione drag & drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            handleFileUpload(file);
        }
    };

    return (
        <div
            className="mt-4"
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
            }}
            onDrop={handleDrop}
        >
            <div
                className={`mt-1 flex justify-center rounded-xl border-2 ${
                    dragOver ? 'border-secondary-500' : 'border-slate-200'
                } hover:border-secondary-500 bg-white px-6 py-10 transition-colors duration-200`}
            >
                <div className="text-center">
                    {progress > 0 && progress < 100 ? (
                        // Se stiamo caricando (0 < progress < 100)
                        <div className="flex flex-col items-center">
                            <svg className="text-secondary-500 h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                                <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor"></path>
                            </svg>
                            <p className="text-secondary-600 mt-2 text-sm">Caricamento in corso... {progress}%</p>
                        </div>
                    ) : progress === 100 ? (
                        // Upload completato, mostra un messaggio
                        <div className="flex flex-col items-center">
                            <p className="mb-2 text-sm text-green-600">Upload completato al 100%!</p>
                            {uploadedFileName && (
                                <p className="text-sm text-slate-600">
                                    <strong>File caricato:</strong> {uploadedFileName}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                            <div className="mt-4 flex flex-col text-sm text-slate-600">
                                <label className="text-secondary-700 focus-within:ring-secondary-500 hover:text-secondary-500 relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none">
                                    <span>Carica il documento</span>
                                    <input type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} />
                                </label>
                                <p className="pl-1">o trascina qui</p>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">PDF, DOC, DOCX up to 10MB</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChunkedUpload;
