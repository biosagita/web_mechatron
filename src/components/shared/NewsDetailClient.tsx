'use client';

import { Navbar, Footer } from '@/components/landing';
import { useContent } from '@/context/ContentContext';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { findNewsBySlug } from '@/utils';
import PageRenderer from './PageRenderer';

interface NewsDetailClientProps {
  slug: string;
}

export function NewsDetailClient({ slug: propSlug }: NewsDetailClientProps) {
  const { news, getPageBySlug, loading: contextLoading } = useContent();
  const router = useRouter();
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [customPage, setCustomPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actualSlug, setActualSlug] = useState<string>(propSlug);

  // Get actual slug from URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const slugFromUrl = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
      if (slugFromUrl && slugFromUrl !== 'placeholder') {
        setActualSlug(slugFromUrl);
      }
    }
  }, []);

  useEffect(() => {
    // Wait for context and actual slug
    if (contextLoading) return;
    if (actualSlug === 'placeholder') return;
    if (!news || news.length === 0) return;

    console.log('[NewsDetail] Looking for news with slug:', actualSlug);
    const found = findNewsBySlug(news, actualSlug);
    console.log('[NewsDetail] Found news:', found);
    setCurrentNews(found);

    // Check if news has custom page
    if (found && found.pageSlug) {
      console.log('[NewsDetail] Looking for page with slug:', found.pageSlug);
      const page = getPageBySlug(found.pageSlug);
      console.log('[NewsDetail] Found page:', page);
      setCustomPage(page);
    }

    setIsLoading(false);
  }, [news, actualSlug, getPageBySlug, contextLoading]);

  if (isLoading || contextLoading) {
    return (
      <main className="bg-white">
        <Navbar />
        <div className="min-h-screen py-20 bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!currentNews) {
    return (
      <main className="bg-white">
        <Navbar />
        <div className="min-h-screen py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Berita Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">Berita yang Anda cari tidak tersedia.</p>
            <Link href="/news">
              <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                Kembali ke Semua Berita
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // If custom page exists, render it instead
  if (customPage && customPage.sections?.length > 0) {
    return (
      <>
        <Navbar />
        <PageRenderer sections={customPage.sections} />
        <Footer />
      </>
    );
  }  return (
    <main className="bg-white">
      <Navbar />
      <article className="min-h-screen py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Navigation */}
          <div className="mb-8">
            <Link href="/news" className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition">
              <ArrowLeft size={18} className="mr-2" />
              Kembali ke Semua Berita
            </Link>
          </div>

          {/* Featured Image */}
          {currentNews.image && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={currentNews.image} 
                alt={currentNews.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                {currentNews.category}
              </span>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={16} className="text-cyan-500" />
                <span>{currentNews.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {currentNews.title}
            </h1>
            <p className="text-xl text-gray-600">{currentNews.excerpt}</p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              dangerouslySetInnerHTML={{ __html: currentNews.content }}
              className="leading-relaxed text-gray-700"
            />
          </div>

          {/* Share Section */}
          <div className="border-t border-b border-gray-200 py-8 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Bagikan Berita Ini</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const url = `${window.location.origin}/news/${actualSlug}`;
                  navigator.share?.({ title: currentNews.title, url }) || navigator.clipboard.writeText(url);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <Share2 size={18} />
                Bagikan
              </button>
            </div>
          </div>

          {/* Related News */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Berita Lainnya</h3>
            <div className="space-y-4">
              {news
                .filter((item: any) => item.id !== currentNews.id)
                .slice(0, 3)
                .map((item: any) => {
                  const itemSlug = item.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
                  return (
                    <Link key={item.id} href={`/news/${itemSlug}`}>
                      <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <h4 className="font-semibold text-slate-900 hover:text-orange-600 transition">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2">{item.date}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link href="/news">
              <button className="px-8 py-3 border-2 border-orange-300 text-orange-600 font-semibold rounded-lg hover:border-orange-500 hover:bg-orange-50 transition">
                Lihat Semua Berita
              </button>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
