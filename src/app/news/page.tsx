'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContent } from '@/context/ContentContext';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { generateSlug } from '@/lib/slugUtils';

const ITEMS_PER_PAGE = 10;

export default function NewsPage() {
  const { news } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedNews, setPaginatedNews] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (news && news.length > 0) {
      const total = Math.ceil(news.length / ITEMS_PER_PAGE);
      setTotalPages(total);

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPaginatedNews(news.slice(startIndex, endIndex));
    }
  }, [news, currentPage]);

  return (
    <main className="bg-white">
      <Navbar />
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Berita & Pengumuman
            </h1>
            <p className="text-xl text-slate-600">
              Update terbaru dari Mechatron Robotic School
            </p>
          </div>

          {paginatedNews && paginatedNews.length > 0 ? (
            <div className="space-y-6">
              {paginatedNews.map((item) => {
                const slug = generateSlug(item.title);
                return (
                  <Link key={item.id} href={`/news/${slug}`}>
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500 cursor-pointer">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} className="text-cyan-500" />
                              <span className="text-sm text-slate-600">{item.date}</span>
                            </div>
                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                              {item.category}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-orange-600 transition">
                            {item.title}
                          </h2>
                          <p className="text-slate-600 leading-relaxed">{item.excerpt}</p>
                        </div>
                        <div className="flex items-center text-orange-600 font-semibold whitespace-nowrap mt-4 md:mt-0">
                          <span>Baca</span>
                          <ArrowRight size={18} className="ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Belum ada berita.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded font-semibold transition ${
                      currentPage === page
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/">
              <button className="px-8 py-3 border-2 border-orange-300 text-orange-600 font-semibold rounded-lg hover:border-orange-500 hover:bg-orange-50 transition">
                Kembali ke Beranda
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
