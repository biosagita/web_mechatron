'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, ImageUpload } from '@/components/admin';
import { ProtectedRoute } from '@/components/shared';
import { useContent } from '@/context/ContentContext';
import { Save } from 'lucide-react';

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
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                folder="partners"
                label="Gambar Banner Sekolah Mitra"
                maxSize={10}
              />

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
              <li>• Ukuran yang disarankan: lebar 1200px, format PNG/JPG</li>
              <li>• Kosongkan jika tidak ingin menampilkan section sekolah mitra</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
