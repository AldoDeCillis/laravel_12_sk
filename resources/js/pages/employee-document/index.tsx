import ConfirmModal from '@/components/confirm-modal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Category, Document, User } from '../../types/index';
import { useSidebar } from '@/components/ui/sidebar';

interface PageProps {
  auth: User[];
  documents: {
    data: Document[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    current_page: number;
    last_page: number;
  };
  categories: Category[];
  [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Documenti', href: '/employee-documents' },
];

// COMPONENTE SIDEBAR EXTRA CHE ADATTA IL CONTENUTO ALLO STATO DELLA SIDEBAR
function SidebarExtra({
  categories,
  searchQuery,
  setSearchQuery,
  categoryId,
  setCategoryId,
}: {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryId: number | '';
  setCategoryId: (value: number | '') => void;
}) {
  const { state } = useSidebar();

  if (state === 'collapsed') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <button title="Cerca" className="p-2">
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
        <button title="Categorie" className="p-2">
          <i className="fa-solid fa-filter"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder="Cerca..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400">
          <i className="fa-regular fa-magnifying-glass"></i>
        </div>
      </div>
      <Select
        value={categoryId === '' ? '' : String(categoryId)}
        onValueChange={(e) => setCategoryId(e === '' ? '' : Number(e))}
      >
        <SelectTrigger className="w-full">
          <div className="flex items-center justify-between">
            <span>
              {categoryId === ''
                ? 'Tutte le categorie'
                : categories.find((cat) => cat.id === categoryId)?.name}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="mt-1 w-full">
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function Index() {
  const { props } = usePage<PageProps>();
  const { documents, categories } = props;

  // Filtri per ricerca e categoria
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');

  // Modal state
  const [showDocModal, setShowDocModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDocumentId, setConfirmDocumentId] = useState<number | null>(null);

  // Aggiorna i dati quando searchQuery o categoryId cambiano
  useEffect(() => {
    const currentPage = props.documents.current_page;
    router.get(
      '/employee-documents',
      { searchQuery, categoryId: categoryId === '' ? '' : categoryId, page: currentPage },
      { preserveState: true, replace: true },
    );
  }, [searchQuery, categoryId]);

  // Funzioni per modali
  const openDocModal = (doc: Document) => {
    setSelectedDoc(doc);
    setShowDocModal(true);
    router.post('/access-log', { user_id: doc.user ? doc.user.id : null, loggable_type: 'Employee Document', loggable_id: doc.id });
  };

  const closeDocModal = () => {
    setShowDocModal(false);
    setSelectedDoc(null);
  };

  const openConfirmModal = (docId: number) => {
    setConfirmDocumentId(docId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setConfirmDocumentId(null);
    setShowConfirmModal(false);
  };

  const deleteDocument = () => {
    if (!confirmDocumentId) return;
    router.delete(`/employee-document/${confirmDocumentId}`, {
      onSuccess: () => {
        closeConfirmModal();
      },
      onError: (errors) => {
        console.error('Errore nella cancellazione:', errors);
      },
    });
  };

  return (
    <AppSidebarLayout
      breadcrumbs={breadcrumbs}
      sidebarExtra={
        <SidebarExtra
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      }
    >
      <Toaster />
      <Head title="Lista Documenti" />
      <div className="flex h-full w-full">
        {/* Vista Desktop */}
        <div className="hidden h-[calc(100vh-5rem)] w-full flex-col md:flex">
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Documento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Dipendente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-slate-500 uppercase">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {documents.data.length === 0 ? (
                  <tr>
                    <td className="px-6 py-10 text-center" colSpan={5}>
                      <div className="flex flex-col items-center">
                        <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
                        <p className="text-slate-500">Nessun documento trovato</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  documents.data.map((doc) => (
                    <tr key={doc.id} className="hover:bg-secondary-100 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <i className="fa-regular fa-file-lines text-secondary-500 mr-3"></i>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{doc.title}</div>
                            <div className="text-sm text-slate-500">{doc.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-secondary-100 flex h-8 w-8 items-center justify-center rounded-full">
                            <i className="fa-regular fa-user text-secondary-600"></i>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-slate-900">{doc.user?.name ?? 'N/D'}</div>
                            <div className="text-sm text-slate-500">{doc.user?.email ?? 'N/D'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{doc.created_at_formatted ?? ''}</td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary-200 text-secondary-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-[7pt] font-medium">
                          {doc.category?.name ?? 'N/D'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-secondary-600 hover:text-secondary-500"
                            title="Visualizza"
                            onClick={() => openDocModal(doc)}
                          >
                            <i className="fa-regular fa-eye"></i>
                          </button>
                          {doc.can_delete && (
                            <button
                              className="text-red-600 hover:text-red-500"
                              title="Elimina"
                              onClick={() => openConfirmModal(doc.id)}
                            >
                              <i className="fa-regular fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-200 p-4">
            <div className="flex justify-center">
              {documents.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={link.active ? 'text-secondary-600 mx-1 font-bold' : 'hover:text-secondary-600 mx-1 text-slate-600'}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Vista Mobile */}
        <div className="mx-auto flex max-w-[90rem] flex-col space-y-4 px-4 pt-4 md:hidden">
          {documents.data.length === 0 ? (
            <div className="py-8 text-center">
              <i className="fa-regular fa-folder-open mb-4 text-4xl text-slate-400"></i>
              <p className="text-slate-500">Nessun documento trovato</p>
            </div>
          ) : (
            documents.data.map((doc) => (
              <div key={doc.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="space-y-4 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-secondary-100 flex h-10 w-10 items-center justify-center rounded-xl">
                      <i className="fa-regular fa-file-lines text-secondary-600"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{doc.title}</h3>
                      <p className="text-sm text-slate-500">{doc.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Dipendente</p>
                      <p className="font-medium">{doc.user?.name ?? 'N/D'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Data</p>
                      <p className="font-medium">{doc.created_at_formatted ?? ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-800 inline-flex items-center rounded-xl border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium">
                      {doc.category?.name ?? 'N/D'}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button className="text-secondary-600 hover:text-secondary-500" onClick={() => openDocModal(doc)}>
                        <i className="fa-regular fa-eye"></i>
                      </button>
                      {doc.can_delete && (
                        <button className="text-red-600 hover:text-red-500" onClick={() => openConfirmModal(doc.id)}>
                          <i className="fa-regular fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="p-4">
            <div className="flex justify-center">
              {documents.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={link.active ? 'text-secondary-600 mx-1 font-bold' : 'hover:text-secondary-600 mx-1 text-slate-600'}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal per visualizzare il documento */}
      {showDocModal && selectedDoc && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">{selectedDoc.title}</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeDocModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 60px)' }}>
              {selectedDoc.description && <p className="mb-4 text-sm text-gray-600">{selectedDoc.description}</p>}
              <div className="rounded-lg border border-gray-200">
                <iframe className="h-[600px] w-full md:h-[calc(90vh-160px)]" frameBorder="0" src={`/employee-document/${selectedDoc.id}/serve`} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal per la conferma di eliminazione */}
      {showConfirmModal && (
        <ConfirmModal
          title="Conferma eliminazione"
          message="Sei sicuro di voler eliminare questo documento?"
          confirmText="Elimina"
          cancelText="Annulla"
          onCancel={closeConfirmModal}
          onConfirm={deleteDocument}
        />
      )}
    </AppSidebarLayout>
  );
}
