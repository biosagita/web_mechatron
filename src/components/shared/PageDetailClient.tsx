'use client';

import { useContent } from '@/context/ContentContext';
import PageRenderer from './PageRenderer';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PageDetailClientProps {
  slug: string;
}

export default function PageDetailClient({ slug }: PageDetailClientProps) {
  const { getPageBySlug } = useContent();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPage = getPageBySlug(slug);
    setPage(foundPage);
    setLoading(false);
  }, [slug, getPageBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="text-white text-2xl mb-4">Page Not Found</div>
        <p className="text-gray-400 mb-6">Halaman dengan slug "{slug}" tidak ditemukan</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Back to Home
        </Link>
      </div>
    );
  }

  return <PageRenderer sections={page.sections} />;
}
