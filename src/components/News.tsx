'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { NewsItem } from '@/context/ContentContext';
import { generateSlug } from '@/lib/slugUtils';

export default function News() {
  const { news } = useContent();
  const [topNews, setTopNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Ambil 3 berita terakhir
    if (news && news.length > 0) {
      setTopNews(news.slice(0, 3));
    }
  }, [news]);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Berita & Pengumuman</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Update terbaru dari Mechatron Robotic School
          </p>
        </div>

        {topNews && topNews.length > 0 ? (
          <div className="space-y-6">
            {topNews.map((item) => {
              const slug = generateSlug(item.title);
              return (
                <Link key={item.id} href={`/news/${slug}`}>
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Calendar size={16} className="text-cyan-500" />
                          <span className="text-sm text-slate-600">{item.date}</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 hover:text-orange-600 transition">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.excerpt}</p>
                      </div>
                      <button className="flex items-center space-x-2 text-orange-600 font-semibold hover:text-orange-700 transition whitespace-nowrap mt-4 md:mt-0">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada berita.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/news">
            <button className="px-8 py-3 border-2 border-orange-300 text-orange-600 font-semibold rounded-lg hover:border-orange-500 hover:bg-orange-50 transition">
              Lihat Semua Berita
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
