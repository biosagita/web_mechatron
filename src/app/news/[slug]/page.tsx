import { NewsDetailClient } from '@/components/shared';

// Generate static params for static export
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Placeholder - actual data fetched client-side
  return [{ slug: 'placeholder' }];
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <NewsDetailClient slug={slug} />;
}
