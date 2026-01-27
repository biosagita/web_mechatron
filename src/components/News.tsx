import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function News() {
  const news = [
    {
      date: '25 Januari 2025',
      title: 'Mechatron Raih Juara 1 Kompetisi Robotika Nasional',
      excerpt: 'Tim siswa Mechatron berhasil memenangkan kompetisi robotika nasional 2025 dengan proyek inovatif.',
      category: 'Prestasi',
    },
    {
      date: '20 Januari 2025',
      title: 'Workshop Gratis: Intro to Robotics dengan Arduino',
      excerpt: 'Kami mengadakan workshop gratis untuk calon siswa yang ingin mengenal dunia robotika.',
      category: 'Workshop',
    },
    {
      date: '15 Januari 2025',
      title: 'Peluncuran Program Beasiswa untuk Siswa Berprestasi',
      excerpt: 'Mechatron menyediakan program beasiswa penuh untuk siswa dengan prestasi akademik terbaik.',
      category: 'Beasiswa',
    },
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Berita & Pengumuman</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Update terbaru dari Mechatron Robotic School
          </p>
        </div>

        <div className="space-y-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar size={16} className="text-cyan-500" />
                    <span className="text-sm text-slate-600">{item.date}</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.excerpt}</p>
                </div>
                <button className="flex items-center space-x-2 text-orange-600 font-semibold hover:text-orange-700 transition whitespace-nowrap mt-4 md:mt-0">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-orange-300 text-orange-600 font-semibold rounded-lg hover:border-orange-500 hover:bg-orange-50 transition">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
}
