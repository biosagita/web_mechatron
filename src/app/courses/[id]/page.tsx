import { CourseDetailClient } from '@/components/shared';

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static params for static export
export async function generateStaticParams(): Promise<{ id: string }[]> {
  // Placeholder - actual data fetched client-side
  return [{ id: 'placeholder' }];
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;

  return <CourseDetailClient courseId={id} />;
}
