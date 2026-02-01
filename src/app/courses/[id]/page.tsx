import { ReactNode } from 'react';
import { CourseDetailClient } from '@/components/shared';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;

  return <CourseDetailClient courseId={id} />;
}
