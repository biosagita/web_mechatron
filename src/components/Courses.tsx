'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export default function Courses() {
  const { courses } = useContent();

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <section id="courses" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-slate-900">
              Program Kursus Kami
            </h2>
            <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dari pemula hingga lanjutan, kami memiliki program untuk setiap aspiring engineer
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500 p-6 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-orange-600 font-semibold text-sm mb-3">{course.highlight}</p>
                
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {course.ageGroup}
                  </span>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {course.tools}
                  </span>
                </div>
              </div>

              <div className="flex-grow mb-4">
                <p className="text-sm text-slate-600 leading-relaxed">{course.details}</p>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                <Link href={`/courses/${course.id}`} className="block">
                  Pelajari Lebih Lanjut
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
