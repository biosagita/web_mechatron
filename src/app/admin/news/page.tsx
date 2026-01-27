'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useContent, NewsItem } from '@/context/ContentContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function NewsAdmin() {
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsItem>({
    id: '',
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    title: '',
    excerpt: '',
    category: 'Prestasi',
  });

  const handleOpenForm = (item?: NewsItem) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({
        id: '',
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        title: '',
        excerpt: '',
        category: 'Prestasi',
      });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt) {
      alert('Harap isi semua field!');
      return;
    }

    if (editingId) {
      updateNews(editingId, formData);
    } else {
      addNews({
        ...formData,
        id: Date.now().toString(),
      });
    }

    setIsFormOpen(false);
    setFormData({
      id: '',
      date: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      title: '',
      excerpt: '',
      category: 'Prestasi',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      deleteNews(id);
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
              <p className="text-gray-600 mt-1">Tambah, edit, dan hapus berita/pengumuman</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus size={20} />
            <span>Berita Baru</span>
          </button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-200 max-h-[90vh] overflow-y-auto shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Masukkan judul berita"
                  />
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Ringkasan
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition resize-none"
                    placeholder="Masukkan ringkasan berita"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-slate-900 text-sm font-semibold mb-2">
                        Tanggal
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    />
                  </div>

                  <div>
                      <label className="block text-slate-900 text-sm font-semibold mb-2">
                        Kategori
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    >
                      <option>Prestasi</option>
                      <option>Workshop</option>
                      <option>Beasiswa</option>
                      <option>Pengumuman</option>
                      <option>Event</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    {editingId ? 'Update Berita' : 'Tambah Berita'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 bg-gray-200 text-slate-900 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleOpenForm(item)}
                          className="text-blue-600 hover:text-blue-700 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700 transition"
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
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada berita. Tambahkan berita pertama Anda!</p>
          </div>
        )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
