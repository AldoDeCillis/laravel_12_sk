import React, { useRef, useState } from 'react';
import axios from 'axios';

interface ChunkedUploadProps {
  documentTitle: string;
  dstPath: string;
  onUploadComplete: (uploadedFilePath: string) => void;
  setUploading: (uploading: boolean) => void;
}

const ChunkedUpload: React.FC<ChunkedUploadProps> = ({
  documentTitle,
  dstPath,
  onUploadComplete,
  setUploading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const chunkSize = 2 * 1024 * 1024; // 2MB per chunk

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    setUploading(true);
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;

    // Carica ogni chunk con una chiamata API
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', i.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('documentTitle', documentTitle);
      formData.append('dstPath', dstPath);
      if (i === 0) {
        const ext = file.name.split('.').pop() || '';
        formData.append('fileExtension', ext);
      }
      try {
        await axios.post('/api/chunked-upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedChunks++;
        setProgress(Math.floor((uploadedChunks / totalChunks) * 100));
      } catch (error) {
        console.error(`Errore nel caricamento del chunk ${i + 1}`, error);
        setUploading(false);
        return;
      }
    }
    setUploading(false);
    onUploadComplete(file.name);
  };

  return (
    <div className="mt-4">
      <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white px-6 py-10 transition-colors duration-200 hover:border-secondary-500">
        <div className="text-center">
          {progress > 0 ? (
            <div className="flex flex-col items-center">
              <svg className="h-6 w-6 animate-spin text-secondary-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor"></path>
              </svg>
              <p className="mt-2 text-sm text-secondary-600">Caricamento in corso... {progress}%</p>
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
                <label className="relative cursor-pointer rounded-md font-medium text-secondary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary-500 focus-within:ring-offset-2 hover:text-secondary-500">
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
