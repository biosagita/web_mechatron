import { PageDetailClient } from '@/components/shared';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PageDetailPage({ params }: Props) {
  const { slug } = await params;

  return <PageDetailClient slug={slug} />;
}
