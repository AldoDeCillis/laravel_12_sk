import ConfirmModal from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { BreadcrumbItem, Gallery, Media } from '../../types/index';

interface GalleriesData {
    data: Gallery[];
    links: [{ url: string | null; label: string; active: boolean }];
    current_page: number;
    last_page: number;
}

interface GalleryIndexProps {
    galleries: GalleriesData;
    // eventuali query iniziali possono essere passate in props
    view?: 'grid' | 'list';
    searchQuery?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Le mie gallerie',
        href: '/galleries',
    },
];

const Index: React.FC<GalleryIndexProps> = ({ galleries: initialGalleries, view: initialView = 'grid', searchQuery: initialSearchQuery = '' }) => {
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
    const [view, setView] = useState<'grid' | 'list'>(initialView);
    const [galleries, setGalleries] = useState<GalleriesData>(initialGalleries);

    // Stati per la gestione della visualizzazione dei modali e della galleria/media selezionati
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
    const [showMediaGrid, setShowMediaGrid] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [showMediaViewer, setShowMediaViewer] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                '/galleries',
                { searchQuery, view },
                {
                    preserveState: true,
                    replace: true,
                    onSuccess: (page) => {
                        // Assumiamo che i dati aggiornati siano in page.props.galleries
                        // setGalleries(page.props.galleries);
                    },
                },
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, view]);

    const handleToggleView = () => {
        setView((prev) => (prev === 'grid' ? 'list' : 'grid'));
    };

    const handleViewGallery = (gallery: Gallery) => {
        setSelectedGallery(gallery);
        setShowMediaGrid(true);
    };

    const closeMediaGrid = () => {
        setShowMediaGrid(false);
        setSelectedGallery(null);
        setSelectedMedia(null);
    };

    const handleViewMedia = (mediaId: number) => {
        if (selectedGallery && selectedGallery.media) {
            const media = selectedGallery.media.find((m) => m.id === mediaId);
            if (media) {
                setSelectedMedia(media);
                setShowMediaViewer(true);
            }
        }
    };

    const closeMediaViewer = () => {
        setShowMediaViewer(false);
        setSelectedMedia(null);
    };

    const handleEdit = (galleryId: number) => {
        router.visit(`/gallery/edit/${galleryId}`);
    };

    const deleteGallery = () => {
        if (selectedGallery) {
            router.delete(`/gallery/${selectedGallery.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedGallery(null);
                    setShowMediaGrid(false);
                },
            });
        }
    };

    const confirmDelete = (gallery: Gallery) => {
        setSelectedGallery(gallery);
        setShowDeleteModal(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Le tue Gallerie" />
            <div className="h-auto bg-gray-50 py-12 md:h-[calc(100vh-4rem)]">
                <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-gray-900">Le tue Gallerie</h2>
                                <p className="text-gray-600">Gestisci e organizza le tue raccolte di immagini</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
                                    title={view === 'grid' ? 'Visualizza come lista' : 'Visualizza come griglia'}
                                    onClick={handleToggleView}
                                >
                                    <i className={`fa-regular ${view === 'grid' ? 'fa-list' : 'fa-grid-2'} text-gray-600`}></i>
                                </button>
                                <Link
                                    href="/gallery/create"
                                    className="bg-secondary-600 hover:bg-secondary-500 flex transform items-center gap-2 rounded-xl px-6 py-3 text-white transition-all duration-200 hover:scale-105"
                                >
                                    <i className="fa-regular fa-plus"></i>
                                    <span>Nuova Galleria</span>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <input
                                    className="focus:border-secondary-500 focus:ring-secondary-500 w-full rounded-xl border-gray-300 bg-gray-50 py-3 pr-4 pl-12"
                                    placeholder="Cerca gallerie..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="fa-regular fa-search absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>
                    </div>

                    <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
                        {galleries.data.length > 0 ? (
                            galleries.data.map((gallery: Gallery) => (
                                <div
                                    key={gallery.id}
                                    className={
                                        view === 'grid'
                                            ? 'group transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
                                            : 'group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md'
                                    }
                                    onClick={() => handleViewGallery(gallery)}
                                >
                                    {view === 'grid' ? (
                                        <>
                                            <div className="relative h-48">
                                                {gallery.media && gallery.media.length > 0 ? (
                                                    <img
                                                        alt={gallery.title}
                                                        className="h-full w-full object-cover"
                                                        src={gallery.media[0].original_url}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                                        <i className="fa-regular fa-images text-4xl text-gray-400"></i>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                            </div>
                                            <div className="p-6">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3 className="text-xl font-semibold text-gray-900">{gallery.title}</h3>
                                                    <span className="text-sm text-gray-500">{gallery.media_count} media</span>
                                                </div>
                                                {gallery.description && (
                                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{gallery.description}</p>
                                                )}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{new Date(gallery.created_at).toLocaleDateString()}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="text-secondary-600 rounded-lg p-2 transition-colors duration-200 hover:bg-red-50"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(gallery.id);
                                                            }}
                                                        >
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            className="rounded-lg p-2 text-red-500 transition-colors duration-200 hover:bg-red-50"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                confirmDelete(gallery);
                                                            }}
                                                        >
                                                            <i className="fa-regular fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center p-4">
                                            <div className="h-20 w-20 flex-shrink-0">
                                                {gallery.firstMediaUrl ? (
                                                    <img
                                                        alt={gallery.title}
                                                        className="h-full w-full rounded-lg object-cover"
                                                        src={gallery.firstMediaUrl}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                                                        <i className="fa-regular fa-images text-2xl text-gray-400"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-900">{gallery.title}</h3>
                                                    <span className="text-sm text-gray-500">{gallery.media_count} media</span>
                                                </div>
                                                {gallery.description && (
                                                    <p className="mt-1 line-clamp-1 text-sm text-gray-600">{gallery.description}</p>
                                                )}
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{new Date(gallery.created_at).toLocaleDateString()}</span>
                                                    <button
                                                        className="text-secondary-600 rounded-lg p-2 transition-colors duration-200 hover:bg-red-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(gallery.id);
                                                        }}
                                                    >
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                    <button
                                                        className="rounded-lg p-2 text-red-500 transition-colors duration-200 hover:bg-red-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmDelete(gallery);
                                                        }}
                                                    >
                                                        <i className="fa-regular fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <div className="rounded-xl bg-white py-12 text-center shadow-sm">
                                    <div className="mb-4">
                                        <i className="fa-regular fa-face-frown text-4xl text-gray-400"></i>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium text-gray-900">Nessuna galleria trovata</h3>
                                    <p className="text-gray-600">Inizia creando la tua prima galleria di immagini</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 text-center">
                        {galleries.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={link.active ? 'text-secondary-600 mx-1 font-bold' : 'hover:text-secondary-600 mx-1 text-slate-600'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>

                    {/* Media Grid Modal */}
                    {showMediaGrid && selectedGallery && (
                        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
                            <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white" onClick={closeMediaGrid}>
                                {/* Modal Header */}
                                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{selectedGallery.title}</h3>
                                        <p className="mt-1 text-gray-600">{selectedGallery.media_count} media</p>
                                    </div>
                                    <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100" onClick={closeMediaGrid}>
                                        <i className="fa-regular fa-xmark text-xl"></i>
                                    </button>
                                </div>

                                {/* Media Grid */}
                                <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {selectedGallery.media &&
                                            selectedGallery.media.map((media: Media) => (
                                                <div
                                                    key={media.id}
                                                    className="group aspect-square cursor-pointer overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                                                    onClick={() => handleViewMedia(media.id)}
                                                >
                                                    <img
                                                        alt={media.file_name}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        src={media.original_url}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Media Viewer Modal */}
                    {showMediaViewer && selectedMedia && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
                            <button
                                className="absolute top-4 right-4 text-white transition-colors duration-200 hover:text-gray-300"
                                onClick={closeMediaViewer}
                            >
                                <i className="fa-regular fa-xmark text-2xl"></i>
                            </button>
                            <img alt={selectedMedia.file_name} className="max-h-[90vh] max-w-full object-contain" src={selectedMedia.original_url} />
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <ConfirmModal
                            onCancel={() => setShowDeleteModal(false)}
                            onConfirm={deleteGallery}
                            message="Sei sicuro di voler eliminare questa galleria? Questa azione non può essere annullata."
                            title="Conferma Eliminazione"
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
