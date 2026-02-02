'use client';

import { useState, useRef } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'uploads',
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5,
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File terlalu besar. Maksimal ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError('File harus berupa gambar atau video');
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}_${safeName}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // Upload file with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(prog));
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Gagal upload file. Silakan coba lagi.');
          setUploading(false);
        },
        async () => {
          // Upload completed, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onChange(downloadURL);
          setUploading(false);
          setProgress(0);
        }
      );
    } catch (err) {
      console.error('Upload error:', err);
      setError('Gagal upload file. Silakan coba lagi.');
      setUploading(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // Try to delete from storage if it's a Firebase Storage URL
    if (value.includes('firebasestorage.googleapis.com')) {
      try {
        const storageRef = ref(storage, value);
        await deleteObject(storageRef);
      } catch (err) {
        console.log('Could not delete file from storage:', err);
        // Continue anyway - file might not exist or be from external URL
      }
    }

    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-900">
          {label}
        </label>
      )}

      {/* Current Image Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {!value && !uploading && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Klik untuk upload atau drag & drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Maksimal {maxSize}MB
          </p>
        </div>
      )}

      {/* Progress Bar */}
      {uploading && (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% uploaded</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Manual URL Input (Optional) */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Atau masukkan URL gambar..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-900"
        />
        {!value && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <Upload size={16} />
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
