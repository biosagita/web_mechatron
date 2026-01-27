'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useContent, GalleryItem } from '@/context/ContentContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function GalleryAdmin() {
  const { gallery, addGallery, updateGallery, deleteGallery } = useContent();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GalleryItem>({
    id: '',
    title: '',
    category: '',
    color: 'bg-blue-500',
  });

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const handleOpenForm = (item?: GalleryItem) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({
        id: '',
        title: '',
        category: '',
        color: 'bg-blue-500',
      });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert('Harap isi semua field!');
      return;
    }

    if (editingId) {
      updateGallery(editingId, formData);
    } else {
      addGallery({
        ...formData,
        id: Date.now().toString(),
      });
    }

    setIsFormOpen(false);
    setFormData({
      id: '',
      title: '',
      category: '',
      color: 'bg-blue-500',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      deleteGallery(id);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kelola Galeri Proyek</h2>
              <p className="text-gray-600 mt-1">Tambah, edit, dan hapus proyek siswa</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus size={20} />
            <span>Proyek Baru</span>
          </button>
        </div>

        {/* Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-200 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Judul Proyek
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Contoh: Robot Penjelajah"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Contoh: Autonomous Robot"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Warna
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`h-10 rounded-lg border-2 transition ${
                          formData.color === color
                            ? 'border-white'
                            : 'border-transparent'
                        } ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    {editingId ? 'Update Proyek' : 'Tambah Proyek'}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className={`${item.color} h-64 rounded-lg shadow-lg overflow-hidden group relative`}
            >
              <div className="w-full h-full flex flex-col justify-between p-6 text-white">
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-2">{item.category}</p>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>

                {/* Action Buttons on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition rounded-lg">
                  <button
                    onClick={() => handleOpenForm(item)}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    <Edit2 size={18} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    <Trash2 size={18} />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada proyek. Tambahkan proyek pertama Anda!</p>
          </div>
        )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
