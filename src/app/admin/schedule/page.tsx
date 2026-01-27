'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useContent, ScheduleItem } from '@/context/ContentContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ScheduleAdmin() {
  const { schedule, addSchedule, updateSchedule, deleteSchedule } = useContent();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScheduleItem>({
    id: '',
    name: '',
    level: 'Pemula',
    time: '',
    capacity: '',
    location: '',
  });

  const levels = ['Pemula', 'Menengah', 'Lanjutan', 'Spesialis'];

  const handleOpenForm = (item?: ScheduleItem) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({
        id: '',
        name: '',
        level: 'Pemula',
        time: '',
        capacity: '',
        location: '',
      });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.time || !formData.capacity || !formData.location) {
      alert('Harap isi semua field!');
      return;
    }

    if (editingId) {
      updateSchedule(editingId, formData);
    } else {
      addSchedule({
        ...formData,
        id: Date.now().toString(),
      });
    }

    setIsFormOpen(false);
    setFormData({
      id: '',
      name: '',
      level: 'Pemula',
      time: '',
      capacity: '',
      location: '',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
      deleteSchedule(id);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kelola Jadwal Kelas</h2>
              <p className="text-gray-600 mt-1">Tambah, edit, dan hapus jadwal kelas</p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus size={20} />
            <span>Jadwal Baru</span>
          </button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 border border-gray-200 max-h-[90vh] overflow-y-auto shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {editingId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Nama Kelas
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Contoh: Beginner Robotics"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-900 text-sm font-semibold mb-2">
                      Kapasitas
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                      placeholder="Contoh: 15 Siswa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Jadwal (Hari & Waktu)
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Contoh: Senin & Rabu, 15:00-17:00"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 text-sm font-semibold mb-2">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                    placeholder="Contoh: Lab A"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    {editingId ? 'Update Jadwal' : 'Tambah Jadwal'}
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

        {/* Schedule List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schedule.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.name}</h3>
                  <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                    {item.level}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(item)}
                    className="text-blue-600 hover:text-blue-700 p-2 bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700 p-2 bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold text-slate-900">Jadwal:</span> {item.time}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Kapasitas:</span> {item.capacity}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Lokasi:</span> {item.location}
                </p>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                Kelola Peserta
              </button>
            </div>
          ))}
        </div>

        {schedule.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada jadwal kelas. Tambahkan jadwal pertama Anda!</p>
          </div>
        )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
