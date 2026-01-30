import { NewsDetailClient } from '@/components/NewsDetailClient';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <NewsDetailClient slug={slug} />;
}
