'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FileUploadProps {
  onUploadSuccess: (downloadURL: string, fileName: string) => void;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  label?: string;
}

export function FileUpload({
  onUploadSuccess,
  maxSize = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'],
  label = 'Upload File'
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError('Tipe file tidak diizinkan');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Ukuran file maksimal ${maxSize}MB`);
      return;
    }

    setIsUploading(true);
    try {
      // Create unique file name
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `uploads/${fileName}`);

      // Upload file
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update state
      setUploadedFile({ name: file.name, url: downloadURL });
      onUploadSuccess(downloadURL, file.name);

      console.log('File uploaded successfully:', downloadURL);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Gagal mengupload file. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      
      <div className="flex items-center gap-4">
        {!uploadedFile ? (
          <label className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-dashed border-orange-300 rounded-lg cursor-pointer hover:border-orange-500 transition bg-orange-50">
            <div className="text-center">
              <Upload className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">
                {isUploading ? 'Mengupload...' : 'Klik untuk memilih atau drag & drop'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Max {maxSize}MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
              accept={allowedTypes.join(',')}
            />
          </label>
        ) : (
          <div className="flex-1 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">{uploadedFile.name}</p>
                <p className="text-xs text-green-600">Upload berhasil</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-red-100 rounded transition"
              type="button"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
