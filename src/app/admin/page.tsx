'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin';
import { ProtectedRoute } from '@/components/shared';
import { useContent } from '@/context/ContentContext';
import { FileText, Image, Calendar, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { news, gallery, schedule } = useContent();

  const stats = [
    {
      icon: <FileText size={24} />,
      label: 'Total Berita',
      value: news.length,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      icon: <Image size={24} />,
      label: 'Proyek Galeri',
      value: gallery.length,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      icon: <Calendar size={24} />,
      label: 'Jadwal Kelas',
      value: schedule.length,
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Total Siswa',
      value: '500+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang di Admin Panel</h2>
            <p className="text-gray-600">Kelola semua konten website Mechatron dari sini</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className={`flex items-center justify-between`}>
                  <div>
                    <p className={`text-gray-600 text-sm mb-1`}>{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.textColor} p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent News */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Berita Terbaru</h3>
              <div className="space-y-3">
                {news.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-cyan-500 transition"
                  >
                    <p className="text-sm text-gray-600">{item.date}</p>
                    <p className="text-slate-900 font-semibold text-sm line-clamp-2">{item.title}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded font-semibold">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/admin/news"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition text-center"
                >
                  + Tambah Berita Baru
                </a>
                <a
                  href="/admin/gallery"
                  className="block p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition text-center"
                >
                  + Tambah Proyek Galeri
                </a>
                <a
                  href="/admin/schedule"
                  className="block p-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition text-center"
                >
                  + Tambah Jadwal Kelas
                </a>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
