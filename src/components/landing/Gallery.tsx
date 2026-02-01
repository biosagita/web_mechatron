'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Gallery() {
  const { gallery } = useContent();

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proyek Siswa</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lihat kreativitas dan inovasi siswa-siswa Mechatron
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((project) => (
            <div
              key={project.id}
              className="h-64 rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all hover:scale-105 border-4 border-transparent hover:border-orange-400 relative"
            >
              {/* Background Image */}
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-2 bg-orange-500/70 px-3 py-1 rounded-full inline-block">{project.category}</p>
                  <h3 className="text-2xl font-bold drop-shadow">{project.title}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="white" className="drop-shadow" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
