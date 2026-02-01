'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { NewsItem, useContent } from '@/context/ContentContext';
import { addDoc, updateDoc, collection, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface NewsEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (news: NewsItem) => void;
  editingNews?: NewsItem | null;
}

export function NewsEditor({ isOpen, onClose, onSave, editingNews }: NewsEditorProps) {
  const { pages } = useContent();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update form when editingNews changes
  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title || '');
      setExcerpt(editingNews.excerpt || '');
      setCategory(editingNews.category || '');
      setContent(editingNews.content || '');
      setImage(editingNews.image || '');
      setPageSlug(editingNews.pageSlug || '');
    } else {
      // Reset form when creating new news
      setTitle('');
      setExcerpt('');
      setCategory('');
      setContent('');
      setImage('');
      setPageSlug('');
    }
  }, [editingNews, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !excerpt.trim() || !content.trim() || !category.trim()) {
      alert('Semua field wajib diisi!');
      return;
    }

    setIsLoading(true);

    try {
      const newsData = {
        title,
        excerpt,
        category,
        content,
        image,
        pageSlug: pageSlug || undefined,
        date: new Date().toLocaleDateString('id-ID'),
        updatedAt: Timestamp.now(),
      };

      if (editingNews?.id) {
        // Update existing news
        const newsRef = doc(db, 'news', editingNews.id);
        await updateDoc(newsRef, newsData);
        onSave({ ...editingNews, ...newsData });
        alert('Berita berhasil diupdate!');
      } else {
        // Add new news
        const newsRef = await addDoc(collection(db, 'news'), {
          ...newsData,
          createdAt: Timestamp.now(),
        });
        onSave({
          id: newsRef.id,
          ...newsData,
        });
        alert('Berita berhasil ditambahkan!');
      }

      // Reset form
      setTitle('');
      setExcerpt('');
      setCategory('');
      setContent('');
      setImage('');
      setPageSlug('');
      onClose();
    } catch (error: any) {
      console.error('Error saving news:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Gagal menyimpan berita';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Akses ditolak. Periksa Firestore Rules atau login Anda.';
      } else if (error.message?.includes('PERMISSION_DENIED')) {
        errorMessage = 'Akses ditolak. Periksa Firestore Rules.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Judul Berita *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900"
              disabled={isLoading}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Ringkasan Singkat *
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat untuk preview (max 200 karakter)"
              maxLength={200}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">{excerpt.length}/200</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Kategori *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900"
              disabled={isLoading}
            >
              <option value="">Pilih Kategori</option>
              <option value="Prestasi">Prestasi</option>
              <option value="Workshop">Workshop</option>
              <option value="Beasiswa">Beasiswa</option>
              <option value="Event">Event</option>
              <option value="Pengumuman">Pengumuman</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              URL Gambar (Opsional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900"
              disabled={isLoading}
            />
          </div>

          {/* Custom Page */}
          {pages && pages.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Custom Page (Opsional)
              </label>
              <select
                value={pageSlug}
                onChange={(e) => setPageSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900"
                disabled={isLoading}
              >
                <option value="">-- Pilih Custom Page --</option>
                {pages.map((page) => (
                  <option key={page.slug} value={page.slug}>
                    {page.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rich Text Content */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Konten Berita *
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-slate-900 font-semibold rounded-lg hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : editingNews ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
