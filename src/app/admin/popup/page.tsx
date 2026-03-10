'use client';

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/shared';
import { AdminLayout, ImageUpload } from '@/components/admin';
import { useContent } from '@/context/ContentContext';
import { PopupData } from '@/context/ContentContext';
import { Bell, Save, Eye, EyeOff, Calendar, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export default function AdminPopupPage() {
    const { popup, updatePopup, news } = useContent();
    const [formData, setFormData] = useState<PopupData>({
        isActive: false,
        title: '',
        image: '',
        newsSlug: '',
        startDate: '',
        endDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    // Load existing popup data
    useEffect(() => {
        if (popup) {
            setFormData(popup);
        }
    }, [popup]);

    const handleSave = async () => {
        setLoading(true);
        setMessage('');
        try {
            await updatePopup(formData);
            setMessage('Popup berhasil disimpan!');
        } catch {
            setMessage('Error menyimpan popup');
        } finally {
            setLoading(false);
        }
    };

    // Check if popup is currently active based on dates
    const isCurrentlyActive = () => {
        if (!formData.isActive) return false;
        const now = new Date();
        if (formData.startDate && new Date(formData.startDate) > now) return false;
        if (formData.endDate && new Date(formData.endDate) < now) return false;
        return true;
    };

    return (
        <ProtectedRoute>
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <Bell className="w-6 h-6 text-blue-600" />
                                Popup Event
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Atur popup yang muncul di halaman utama saat ada event
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isCurrentlyActive()
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${isCurrentlyActive() ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                {isCurrentlyActive() ? 'Aktif' : 'Tidak Aktif'}
                            </span>
                        </div>
                    </div>

                    {message && (
                        <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Settings Form */}
                        <div className="space-y-5">
                            {/* Active Toggle */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Status Popup</h3>
                                        <p className="text-sm text-gray-500 mt-0.5">Aktifkan atau nonaktifkan popup</p>
                                    </div>
                                    <button
                                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${formData.isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                                        Judul Popup
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Workshop Robotika Gratis!"
                                        className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                                        <ImageIcon className="w-3 h-3 inline mr-1" /> Gambar Popup
                                    </label>
                                    <ImageUpload
                                        value={formData.image}
                                        onChange={(url) => setFormData({ ...formData, image: url })}
                                        folder="popup"
                                        label="Upload gambar popup"
                                    />
                                </div>

                                {/* Link to News */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                                        <LinkIcon className="w-3 h-3 inline mr-1" /> Arahkan ke Berita
                                    </label>
                                    <select
                                        value={formData.newsSlug}
                                        onChange={(e) => setFormData({ ...formData, newsSlug: e.target.value })}
                                        className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">— Pilih berita tujuan —</option>
                                        {news.map(n => (
                                            <option key={n.id} value={n.id}>
                                                {n.title}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Klik popup akan mengarahkan ke berita ini</p>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" /> Jadwal Tayang
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                                            Mulai
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                                            Berakhir
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">Kosongkan untuk popup tanpa batas waktu (selama isActive = ON)</p>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
                            </button>
                        </div>

                        {/* Live Preview */}
                        <div>
                            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-600" /> Preview Popup
                                </h3>

                                {/* Simulated popup preview */}
                                <div className="relative bg-black/50 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                                        {formData.image ? (
                                            <img src={formData.image} alt={formData.title} className="w-full h-auto" />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                                                <div className="text-center">
                                                    <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                                                    <p className="text-xs">Upload gambar popup</p>
                                                </div>
                                            </div>
                                        )}
                                        {formData.title && (
                                            <div className="p-4">
                                                <h4 className="text-sm font-bold text-slate-900">{formData.title}</h4>
                                                {formData.newsSlug && (
                                                    <p className="text-xs text-blue-600 mt-1">→ Klik untuk baca selengkapnya</p>
                                                )}
                                            </div>
                                        )}
                                        {/* Close button preview */}
                                        <div className="absolute top-10 right-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-gray-600 text-lg">✕</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-700">
                                        <strong>Info:</strong> Popup akan muncul saat pengunjung membuka website.
                                        Popup hanya muncul sekali per sesi (jika ditutup, tidak akan muncul lagi sampai sesi baru).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </ProtectedRoute>
    );
}
