'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin';
import { ProtectedRoute } from '@/components/shared';
import { useContent, TestimonialItem } from '@/context/ContentContext';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';

export default function TestimonialsAdmin() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useContent();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialItem>({
    id: '',
    name: '',
    role: '',
    message: '',
    rating: 5,
    photo: '',
  });

  const handleOpenForm = (item?: TestimonialItem) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({
        id: '',
        name: '',
        role: '',
        message: '',
        rating: 5,
        photo: '',
      });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.message) {
      alert('Harap isi semua field!');
      return;
    }

    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial({
        ...formData,
        id: Date.now().toString(),
      });
    }

    setIsFormOpen(false);
    setFormData({
      id: '',
      name: '',
      role: '',
      message: '',
      rating: 5,
      photo: '',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kelola Testimoni</h2>
              <p className="text-gray-600 mt-1">Tambah, edit, dan hapus testimoni siswa/orang tua</p>
            </div>
            <button
              onClick={() => handleOpenForm()}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              <Plus size={20} />
              <span>Testimoni Baru</span>
            </button>
          </div>

          {/* Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-200 max-h-[90vh] overflow-y-auto shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {editingId ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                      placeholder="Masukkan nama"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Foto (URL)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={formData.photo || ''}
                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                        className="flex-1 px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                        placeholder="Masukkan URL foto (opsional)"
                      />
                      {formData.photo && (
                        <img
                          src={formData.photo}
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ada foto, akan ditampilkan inisial nama</p>
                  </div>

                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Peran
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                      aria-label="Pilih Peran"
                    >
                      <option value="">Pilih Peran</option>
                      <option value="Orang Tua Siswa">Orang Tua Siswa</option>
                      <option value="Siswa">Siswa</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Testimoni
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition resize-none"
                      placeholder="Masukkan testimoni"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none transition-transform hover:scale-110"
                          title={`Rating ${star} bintang`}
                        >
                          <Star
                            size={28}
                            className={star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-slate-900 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      {editingId ? 'Simpan Perubahan' : 'Tambah Testimoni'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                {/* Header with actions */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {testimonial.photo ? (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenForm(testimonial)}
                      className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition"
                      title="Edit testimoni"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Hapus testimoni"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-slate-600 text-sm italic">"{testimonial.message}"</p>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Belum Ada Testimoni</h3>
              <p className="text-gray-600 mb-4">Tambahkan testimoni pertama untuk ditampilkan di website</p>
              <button
                onClick={() => handleOpenForm()}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                <Plus size={20} />
                <span>Tambah Testimoni</span>
              </button>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
