'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useContent } from '@/context/ContentContext';
import { Image as ImageIcon, Save } from 'lucide-react';

export default function PartnerSchoolsAdmin() {
  const { partnerBanner, updatePartnerBanner } = useContent();
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setImageUrl(partnerBanner || '');
  }, [partnerBanner]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePartnerBanner(imageUrl);
      alert('Banner sekolah mitra berhasil disimpan!');
    } catch (error) {
      alert('Gagal menyimpan. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Kelola Sekolah Mitra</h2>
            <p className="text-gray-600 mt-1">Upload gambar banner yang berisi logo sekolah-sekolah mitra</p>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-900 text-sm font-semibold mb-2">
                  URL Gambar Banner
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 text-slate-900 rounded-lg border border-gray-300 focus:border-cyan-500 outline-none transition"
                  placeholder="Masukkan URL gambar banner (contoh: https://i.imgur.com/xxxxx.png)"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Upload gambar ke Imgur atau layanan hosting gambar lainnya, lalu paste URL-nya di sini.
                </p>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-slate-900 text-sm font-semibold mb-2">
                  Preview
                </label>
                <div className="bg-gray-100 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview Banner"
                      className="max-w-full max-h-[400px] object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon size={48} className="mx-auto mb-2" />
                      <p>Belum ada gambar</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                <Save size={20} />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Banner'}</span>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Buat desain banner dengan logo-logo sekolah mitra menggunakan Canva atau software desain lainnya</li>
              <li>• Upload ke <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="underline">Imgur</a> (gratis) lalu copy link gambar</li>
              <li>• Ukuran yang disarankan: lebar 1200px, format PNG/JPG</li>
              <li>• Kosongkan URL jika tidak ingin menampilkan section sekolah mitra</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
