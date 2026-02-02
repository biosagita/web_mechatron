'use client';

import { useState, useRef } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Upload, X, Loader2, Image as ImageIcon, Plus } from 'lucide-react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
}

export default function MultiImageUpload({
  value = [],
  onChange,
  folder = 'uploads',
  label = 'Upload Images',
  accept = 'image/*',
  maxSize = 5,
  maxFiles = 10,
  className = '',
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxFiles) {
      setError(`Maksimal ${maxFiles} file`);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    const newUrls: string[] = [];
    const totalFiles = files.length;
    let completedFiles = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          setError(`File "${file.name}" terlalu besar. Maksimal ${maxSize}MB`);
          continue;
        }

        // Generate unique filename
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}_${i}_${safeName}`;
        const storageRef = ref(storage, `${folder}/${fileName}`);

        // Upload file
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              const totalProgress = ((completedFiles + fileProgress / 100) / totalFiles) * 100;
              setProgress(Math.round(totalProgress));
            },
            (error) => {
              console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              newUrls.push(downloadURL);
              completedFiles++;
              resolve();
            }
          );
        });
      }

      onChange([...value, ...newUrls]);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Gagal upload beberapa file. Silakan coba lagi.');
    } finally {
      setUploading(false);
      setProgress(0);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async (index: number) => {
    const urlToRemove = value[index];

    // Try to delete from storage if it's a Firebase Storage URL
    if (urlToRemove.includes('firebasestorage.googleapis.com')) {
      try {
        const storageRef = ref(storage, urlToRemove);
        await deleteObject(storageRef);
      } catch (err) {
        console.log('Could not delete file from storage:', err);
      }
    }

    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  const handleAddUrl = () => {
    const url = prompt('Masukkan URL gambar:');
    if (url && url.trim()) {
      onChange([...value, url.trim()]);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-900">
          {label}
        </label>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Add Button */}
        {value.length < maxFiles && !uploading && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <Plus className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Tambah</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="border border-gray-300 rounded-lg p-3">
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
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || value.length >= maxFiles}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Upload size={16} />
          Upload Files
        </button>
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={value.length >= maxFiles}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Plus size={16} />
          Tambah URL
        </button>
      </div>

      <p className="text-xs text-gray-400">
        {value.length}/{maxFiles} gambar • Maksimal {maxSize}MB per file
      </p>
    </div>
  );
}
