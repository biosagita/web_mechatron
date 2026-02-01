'use client';

import React, { useState } from 'react';
import { AdminLayout, NewsEditor } from '@/components/admin';
import { ProtectedRoute } from '@/components/shared';
import { useContent, NewsItem } from '@/context/ContentContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewsAdmin() {
  const { news } = useContent();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const handleOpenEditor = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
    } else {
      setEditingNews(null);
    }
    setIsEditorOpen(true);
  };

  const handleSave = (savedNews: NewsItem) => {
    // Data sudah tersimpan ke Firestore via NewsEditor component
    setIsEditorOpen(false);
    setEditingNews(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await deleteDoc(doc(db, 'news', id));
        alert('Berita berhasil dihapus');
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Gagal menghapus berita');
      }
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kelola Berita</h2>
              <p className="text-gray-600 mt-1">Tambah, edit, dan hapus berita/pengumuman dengan rich text editor</p>
            </div>
            <button
              onClick={() => handleOpenEditor()}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              <Plus size={20} />
              <span>Berita Baru</span>
            </button>
          </div>

          {/* News Editor Modal */}
          <NewsEditor
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSave}
            editingNews={editingNews}
          />

          {/* News List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Judul
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Custom Page
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-900 font-semibold line-clamp-2">{item.title}</p>
                          <p className="text-gray-600 text-sm line-clamp-1">{item.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-semibold">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.pageSlug ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                            {item.pageSlug}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleOpenEditor(item)}
                            className="text-blue-600 hover:text-blue-700 transition"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-700 transition"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {news.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-lg">Belum ada berita. Tambahkan berita pertama Anda!</p>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
