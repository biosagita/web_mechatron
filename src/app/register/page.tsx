'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function RegisterPage() {
  const { addRegistration } = useContent();
  
  const [formData, setFormData] = useState({
    namaAnak: '',
    usiaAnak: '',
    asalSekolah: '',
    waAnak: '',
    program: '',
    namaOrangTua: '',
    waOrangTua: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.namaAnak.trim()) newErrors.namaAnak = 'Nama anak harus diisi';
    if (!formData.usiaAnak) newErrors.usiaAnak = 'Usia anak harus diisi';
    if (!formData.asalSekolah.trim()) newErrors.asalSekolah = 'Asal sekolah harus diisi';
    if (!formData.program) newErrors.program = 'Program harus dipilih';
    if (!formData.namaOrangTua.trim()) newErrors.namaOrangTua = 'Nama orang tua harus diisi';
    if (!formData.waOrangTua.trim()) newErrors.waOrangTua = 'Nomor WhatsApp orang tua harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted, validating...');
    console.log('Form data:', formData);
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Prepare registration data without ID (Firestore will generate it)
        const registrationData = {
          namaAnak: formData.namaAnak,
          usiaAnak: formData.usiaAnak,
          asalSekolah: formData.asalSekolah,
          waAnak: formData.waAnak,
          program: formData.program,
          namaOrangTua: formData.namaOrangTua,
          waOrangTua: formData.waOrangTua,
          tanggalDaftar: new Date().toLocaleDateString('id-ID'),
          status: 'Baru' as const,
        };
        
        console.log('Validation passed, saving registration:', registrationData);
        
        // Save to Firestore via context
        await addRegistration(registrationData as any);
        
        console.log('Registration saved to Firestore');
        setSubmitted(true);
        setShowModal(true);
        
        // Auto close modal and reset after 5 seconds
        setTimeout(() => {
          setShowModal(false);
          setSubmitted(false);
          setFormData({
            namaAnak: '',
            usiaAnak: '',
            asalSekolah: '',
            waAnak: '',
            program: '',
            namaOrangTua: '',
            waOrangTua: '',
          });
        }, 5000);
      } catch (error) {
        console.error('Error submitting registration:', error);
        setErrors({ submit: 'Gagal menyimpan pendaftaran. Silakan coba lagi.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Validation failed, errors:', errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-8 transition">
          <ArrowLeft size={20} />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSubmitted(false);
                  setFormData({
                    namaAnak: '',
                    usiaAnak: '',
                    asalSekolah: '',
                    waAnak: '',
                    program: '',
                    namaOrangTua: '',
                    waOrangTua: '',
                  });
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="bg-gradient-to-b from-green-50 to-white p-8 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-4 shadow-lg">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6 rounded-full"></div>

                {/* Message */}
                <div className="space-y-4">
                  <p className="text-lg text-slate-700">
                    Atas nama <span className="font-bold text-orange-600">{formData.namaAnak}</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Data pendaftaran Anda telah kami terima. Tim admin Mechatron akan segera menghubungi Anda melalui WhatsApp untuk informasi lebih lanjut dan mengatur jadwal kelas trial gratis.
                  </p>
                  
                  {/* Highlight Box */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">📱 Nomor yang kami hubungi:</span>
                      <br />
                      {formData.waOrangTua}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSubmitted(false);
                    setFormData({
                      namaAnak: '',
                      usiaAnak: '',
                      asalSekolah: '',
                      waAnak: '',
                      program: '',
                      namaOrangTua: '',
                      waOrangTua: '',
                    });
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mt-6"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Daftar Sekarang</h1>
          <p className="text-lg text-slate-600">
            Bergabunglah dengan Mechatron Robotic School dan wujudkan mimpi Anda di bidang robotika!
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="text-green-500" size={24} />
              <h3 className="text-xl font-bold text-green-700">Pendaftaran Berhasil!</h3>
            </div>
            <div className="text-xl text-slate-600">
              Terima kasih {formData.namaAnak}! Data Anda telah kami terima. Tim Mechatron akan menghubungi Anda melalui WhatsApp dalam 24 jam untuk informasi lebih lanjut dan kelas trial gratis.
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Data Anak */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-orange-300">
                📋 Data Anak
              </h3>
              
              {/* Row 1: Nama Anak & Usia Anak */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Nama Anak */}
                <div>
                  <label htmlFor="namaAnak" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nama Anak <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="namaAnak"
                    name="namaAnak"
                    value={formData.namaAnak}
                    onChange={handleChange}
                    placeholder="Contoh: Ahmad Rizki"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 placeholder-slate-400 ${
                      errors.namaAnak 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                    }`}
                  />
                  {errors.namaAnak && <p className="text-red-600 text-sm mt-1">{errors.namaAnak}</p>}
                </div>

                {/* Usia Anak */}
                <div>
                  <label htmlFor="usiaAnak" className="block text-sm font-semibold text-slate-900 mb-2">
                    Usia Anak <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="number"
                    id="usiaAnak"
                    name="usiaAnak"
                    value={formData.usiaAnak}
                    onChange={handleChange}
                    placeholder="Contoh: 12"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 placeholder-slate-400 ${
                      errors.usiaAnak 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                    }`}
                  />
                  {errors.usiaAnak && <p className="text-red-600 text-sm mt-1">{errors.usiaAnak}</p>}
                </div>
              </div>

              {/* Row 2: Asal Sekolah & WA Anak */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Asal Sekolah */}
                <div>
                  <label htmlFor="asalSekolah" className="block text-sm font-semibold text-slate-900 mb-2">
                    Asal Sekolah <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="asalSekolah"
                    name="asalSekolah"
                    value={formData.asalSekolah}
                    onChange={handleChange}
                    placeholder="Contoh: SMP Negeri 1 Jakarta"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 placeholder-slate-400 ${
                      errors.asalSekolah 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                    }`}
                  />
                  {errors.asalSekolah && <p className="text-red-600 text-sm mt-1">{errors.asalSekolah}</p>}
                </div>

                {/* WA Anak (Opsional) */}
                <div>
                  <label htmlFor="waAnak" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nomor WhatsApp Anak <span className="text-gray-500 text-xs">(Opsional)</span>
                  </label>
                  <input
                    type="tel"
                    id="waAnak"
                    name="waAnak"
                    value={formData.waAnak}
                    onChange={handleChange}
                    placeholder="08xx xxxx xxxx"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500 outline-none transition text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Row 3: Pilih Program */}
              <div className="mt-6">
                <label htmlFor="program" className="block text-sm font-semibold text-slate-900 mb-2">
                  Pilih Program <span className="text-orange-600">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 ${
                    errors.program 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                  }`}
                >
                  <option value="">-- Pilih Program --</option>
                  <option value="beginner">🤖 Beginner Robotics (Pemula)</option>
                  <option value="intermediate">💻 Intermediate Programming (Menengah)</option>
                  <option value="advanced">⚙️ Advanced Robotics (Lanjutan)</option>
                  <option value="drone">🚁 Drone & UAV (Spesialis)</option>
                </select>
                {errors.program && <p className="text-red-600 text-sm mt-1">{errors.program}</p>}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Section 2: Data Orang Tua */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-cyan-300">
                👨‍👩‍👧 Data Orang Tua/Wali
              </h3>

              {/* Row 1: Nama Orang Tua & WA Orang Tua */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Nama Orang Tua */}
                <div>
                  <label htmlFor="namaOrangTua" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nama Orang Tua/Wali <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="namaOrangTua"
                    name="namaOrangTua"
                    value={formData.namaOrangTua}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 placeholder-slate-400 ${
                      errors.namaOrangTua 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                    }`}
                  />
                  {errors.namaOrangTua && <p className="text-red-600 text-sm mt-1">{errors.namaOrangTua}</p>}
                </div>

                {/* WA Orang Tua */}
                <div>
                  <label htmlFor="waOrangTua" className="block text-sm font-semibold text-slate-900 mb-2">
                    Nomor WhatsApp Orang Tua <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="waOrangTua"
                    name="waOrangTua"
                    value={formData.waOrangTua}
                    onChange={handleChange}
                    placeholder="08xx xxxx xxxx"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition outline-none text-slate-900 placeholder-slate-400 ${
                      errors.waOrangTua 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 bg-white hover:border-orange-300 focus:border-orange-500'
                    }`}
                  />
                  {errors.waOrangTua && <p className="text-red-600 text-sm mt-1">{errors.waOrangTua}</p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Info Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">📝 Catatan:</span> Data Anda akan digunakan untuk proses pendaftaran dan tim Mechatron akan menghubungi melalui WhatsApp orang tua dalam 24 jam untuk kelas trial gratis!
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitted || isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? 'Pendaftaran Berhasil ✓' : isLoading ? 'Sedang Mengirim...' : 'Daftar Sekarang'}
              </button>
              <Link href="/" className="flex-1 border-2 border-slate-300 text-slate-900 py-3 px-6 rounded-lg font-semibold text-lg hover:border-orange-500 hover:text-orange-600 transition text-center">
                Batal
              </Link>
            </div>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Pertanyaan Umum</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Berapa biaya pendaftaran?</h4>
              <p className="text-slate-600">Gratis! Anda hanya perlu mendaftar di formulir ini dan kami akan menghubungi Anda untuk menjelaskan detail program dan biaya kelas.</p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Apakah ada kelas trial gratis?</h4>
              <p className="text-slate-600">Ya! Setiap calon siswa mendapatkan satu sesi kelas trial gratis sebelum memutuskan untuk mendaftar menjadi member.</p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Usia berapa yang bisa mendaftar?</h4>
              <p className="text-slate-600">Program kami terbuka untuk anak usia 8-25 tahun dengan berbagai level dari pemula hingga lanjutan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
