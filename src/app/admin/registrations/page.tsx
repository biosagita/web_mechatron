'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent, RegistrationItem } from '@/context/ContentContext';
import { ProtectedRoute } from '@/components/shared';

export default function RegistrationsPage() {
  const { registrations, updateRegistration, deleteRegistration } = useContent();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<RegistrationItem>>({});

  console.log('RegistrationsPage rendered, registrations:', registrations);

  const programNames: Record<string, string> = {
    beginner: 'Beginner Robotics',
    intermediate: 'Intermediate Programming',
    advanced: 'Advanced Robotics',
    drone: 'Drone & UAV',
  };

  const statusColors: Record<string, string> = {
    Baru: 'bg-blue-100 text-blue-700',
    Hubungi: 'bg-yellow-100 text-yellow-700',
    Trial: 'bg-purple-100 text-purple-700',
    Konfirmasi: 'bg-green-100 text-green-700',
  };

  const handleEdit = (item: RegistrationItem) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSaveEdit = (id: string) => {
    if (editingId === id && editData) {
      updateRegistration(id, editData as RegistrationItem);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleStatusChange = (id: string, newStatus: RegistrationItem['status']) => {
    const item = registrations.find(r => r.id === id);
    if (item) {
      updateRegistration(id, { ...item, status: newStatus });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-orange-50 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-slate-900">Pendaftaran Siswa Baru</h1>
            <Link href="/admin" className="text-orange-600 hover:text-orange-700 font-medium">
              ← Kembali ke Dashboard
            </Link>
          </div>
          <p className="text-slate-600">
            Total Pendaftaran: <span className="font-bold text-orange-600">{registrations.length}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
            <p className="text-sm text-slate-600">Baru</p>
            <p className="text-2xl font-bold text-orange-600">
              {registrations.filter(r => r.status === 'Baru').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p className="text-sm text-slate-600">Hubungi</p>
            <p className="text-2xl font-bold text-yellow-600">
              {registrations.filter(r => r.status === 'Hubungi').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-cyan-500">
            <p className="text-sm text-slate-600">Trial</p>
            <p className="text-2xl font-bold text-cyan-600">
              {registrations.filter(r => r.status === 'Trial').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-sm text-slate-600">Konfirmasi</p>
            <p className="text-2xl font-bold text-green-600">
              {registrations.filter(r => r.status === 'Konfirmasi').length}
            </p>
          </div>
        </div>

        {/* Registrations List */}
        {registrations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-slate-600 text-lg">Belum ada pendaftaran</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Header */}
                <div
                  onClick={() => toggleExpanded(item.id)}
                  className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{item.namaAnak}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-slate-600">
                      <p>👤 Orang Tua: {item.namaOrangTua}</p>
                      <p>📱 WA: {item.waOrangTua}</p>
                      <p>📅 {item.tanggalDaftar}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition">
                    {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedId === item.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Nama Anak</p>
                        <p className="text-slate-900 font-medium">{item.namaAnak}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Usia</p>
                        <p className="text-slate-900 font-medium">{item.usiaAnak} tahun</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Asal Sekolah</p>
                        <p className="text-slate-900 font-medium">{item.asalSekolah}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">WA Anak</p>
                        <p className="text-slate-900 font-medium">{item.waAnak || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Program</p>
                        <p className="text-slate-900 font-medium">{programNames[item.program]}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Nama Orang Tua</p>
                        <p className="text-slate-900 font-medium">{item.namaOrangTua}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Nomor WA Orang Tua</p>
                        <a
                          href={`https://wa.me/62${item.waOrangTua.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium underline"
                        >
                          {item.waOrangTua}
                        </a>
                      </div>
                    </div>

                    {/* Status Buttons */}
                    <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-slate-900 mb-3">Ubah Status:</p>
                      <div className="flex flex-wrap gap-2">
                        {(['Baru', 'Hubungi', 'Trial', 'Konfirmasi'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(item.id, status)}
                            className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                              item.status === status
                                ? `${statusColors[status]}`
                                : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition text-sm"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRegistration(item.id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition text-sm"
                      >
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
