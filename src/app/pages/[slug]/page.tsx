import { PageDetailClient } from '@/components/shared';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for static export
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Placeholder - actual data fetched client-side
  return [{ slug: 'placeholder' }];
}

export default async function PageDetailPage({ params }: Props) {
  const { slug } = await params;

  return <PageDetailClient slug={slug} />;
}
