'use client';

import { useContent } from '@/context/ContentContext';
import PageRenderer from './PageRenderer';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CourseDetailClientProps {
  courseId: string;
}

export default function CourseDetailClient({ courseId }: CourseDetailClientProps) {
  const { courses, getPageBySlug } = useContent();
  const [course, setCourse] = useState<any>(null);
  const [customPage, setCustomPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === courseId);
    setCourse(foundCourse);

    if (foundCourse) {
      // Check both courseId link and pageSlug
      let page = null;
      if (foundCourse.pageSlug) {
        page = getPageBySlug(foundCourse.pageSlug);
      }
      setCustomPage(page);
    }

    setLoading(false);
  }, [courseId, courses, getPageBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="text-white text-2xl mb-4">Course Not Found</div>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Back to Home
        </Link>
      </div>
    );
  }

  // If custom page exists, render it
  if (customPage && customPage.sections?.length > 0) {
    return <PageRenderer sections={customPage.sections} courseData={course} />;
  }

  // Default course detail page
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-2xl opacity-90">{course.highlight}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {course.image && (
          <div className="mb-12">
            <img src={course.image} alt={course.title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Age Group</h3>
                <p className="text-gray-300">{course.ageGroup}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400">Tools & Technologies</h3>
                <p className="text-gray-300">{course.tools}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-gray-300 leading-relaxed">{course.details}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Courses
          </Link>
          <button className="px-8 py-3 border border-blue-600 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition">
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
