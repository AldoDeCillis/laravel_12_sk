import ConfirmModal from '@/components/confirm-modal';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Crea Galleria', href: '/gallery/create' },
];

interface ExistingPhoto {
    id: number;
    file_name: string;
    url: string;
}

const Create: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Gestione del drag & drop
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setPhotos((prev) => [...prev, ...files]);
        setIsDragging(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setPhotos((prev) => [...prev, ...Array.from(files)]);
        }
    };

    // Rimozione di una foto temporanea
    const removePhoto = (index: number) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    // Rimozione di tutte le foto temporanee
    const removeAllPhotos = () => {
        setPhotos([]);
    };

    // Funzione di submit: crea un FormData e invia i dati via Inertia
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        photos.forEach((photo) => {
            formData.append('photos[]', photo);
        });

        router.post('/gallery', formData, {
            onSuccess: () => {
                // eventuale logica di successo
            },
            onError: (err) => {
                setErrors(err as { [key: string]: string });
            },
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Crea Galleria" />
            <div className="flex h-auto flex-col md:h-[calc(100vh-121px)] md:flex-row">
                {/* Colonna Sinistra: Anteprime delle immagini */}
                <div className="w-full overflow-y-auto bg-white p-6 md:w-1/2">
                    <div className="mb-6 flex items-center justify-between">
                        {photos.length > 0 && (
                            <button
                                className="flex items-center space-x-2 rounded-xl bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
                                onClick={() => setShowDeleteAllModal(true)}
                            >
                                <i className="fa-regular fa-trash"></i>
                                <span>Elimina Tutti</span>
                            </button>
                        )}
                    </div>

                    {/* Grid delle immagini */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {/* Immagini già caricate */}
                        {existingPhotos.length > 0 &&
                            existingPhotos.map((photo) => (
                                <div
                                    key={`existing-${photo.id}`}
                                    className="group relative transform overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow transition-all duration-200 hover:-translate-y-1 hover:border-gray-500"
                                >
                                    <img alt={photo.file_name} className="h-48 w-full object-cover" src={photo.url} />
                                    <div className="bg-white p-4">
                                        <p className="truncate text-sm text-gray-600">{photo.file_name}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <button
                                                className="rounded-lg bg-red-500 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
                                                onClick={() => {
                                                    // Logica per confermare la cancellazione della foto esistente
                                                    // Ad esempio: setShowDeleteModal(true) con id della foto da eliminare
                                                }}
                                            >
                                                <i className="fa-regular fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {/* Immagini temporary (nuove) */}
                        {photos.map((photo, index) => (
                            <div
                                key={`temp-${index}`}
                                className="group relative transform overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow transition-all duration-200 hover:-translate-y-1 hover:border-gray-500"
                            >
                                <img alt="Preview" className="h-48 w-full object-cover" src={URL.createObjectURL(photo)} />
                                <div className="bg-white p-4">
                                    <p className="truncate text-sm text-gray-600">{photo.name}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{(photo.size / 1024).toFixed(2)} KB</span>
                                        <button
                                            className="rounded-lg bg-red-500 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
                                            onClick={() => removePhoto(index)}
                                        >
                                            <i className="fa-regular fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Colonna Destra: Area di Drop e Azioni */}
                <div className="relative flex w-full flex-col space-y-4 bg-white p-6 md:w-1/2">
                    <div>
                        <Label htmlFor="title">Titolo</Label>
                        <Input
                            type="title"
                            id="title"
                            autoComplete="off"
                            placeholder="Es. example@example.com"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <Label htmlFor="description">Descrizione</Label>
                        <Textarea
                            id="description"
                            placeholder="Inserisci il contenuto della comunicazione"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Area di drop */}
                    <div
                        className={`relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border-4 border-dashed transition-all duration-200 ${
                            isDragging ? 'border-secondary-500 bg-secondary-50 scale-[0.99]' : 'hover:border-secondary-500 border-gray-200'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input accept="image/*" className="hidden" multiple type="file" ref={fileInputRef} onChange={handleFileChange} />
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                            <div className="p-6 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                                    <i className="fa-regular fa-cloud-arrow-up text-4xl text-gray-600"></i>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-700">
                                    {isDragging ? 'Rilascia per caricare' : 'Trascina qui i tuoi file'}
                                </h3>
                                <p className="text-gray-500">oppure clicca per selezionarli</p>
                                <div className="mt-6 flex justify-center space-x-4">
                                    <span className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700">JPG</span>
                                    <span className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700">PNG</span>
                                    <span className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700">GIF</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {errors.photos && <div className="mt-1 text-sm text-red-600">{errors.photos}</div>}

                    {/* Modali di conferma */}
                    {showDeleteModal && (
                        <ConfirmModal
                            onCancel={() => setShowDeleteModal(false)}
                            onConfirm={() => {
                                // Implementa la logica per eliminare una foto specifica
                                setShowDeleteModal(false);
                            }}
                            message="Sei sicuro di voler eliminare questo file?"
                            title="Conferma Eliminazione"
                        />
                    )}

                    {showDeleteAllModal && (
                        <ConfirmModal
                            onCancel={() => setShowDeleteAllModal(false)}
                            onConfirm={() => {
                                removeAllPhotos();
                                setShowDeleteAllModal(false);
                            }}
                            message="Sei sicuro di voler eliminare tutti i file?"
                            title="Elimina Tutti i File"
                        />
                    )}

                    {/* Pulsanti di azione */}
                    <div className="mt-6 flex items-center justify-between">
                        <button
                            className="flex items-center space-x-2 rounded-xl bg-gray-200 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                            onClick={() => setPhotos([])}
                        >
                            <i className="fa-regular fa-xmark"></i>
                            <span>Annulla</span>
                        </button>
                        <button
                            className="bg-secondary-600 hover:bg-secondary-500 flex transform items-center space-x-2 rounded-xl px-6 py-3 text-white transition-all duration-200 hover:scale-105"
                            onClick={handleSubmit}
                        >
                            <span>
                                {/* Se la galleria esiste, puoi cambiare il testo (Aggiorna Files) */ false ? 'Aggiorna Files' : 'Carica Files'}
                            </span>
                            <i className="fa-regular fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
};

export default Create;
