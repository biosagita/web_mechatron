'use client';

import { PageSection } from '@/context/ContentContext';
import { ReactNode } from 'react';

interface PageRendererProps {
  sections: PageSection[];
  courseData?: any;
}

export default function PageRenderer({ sections, courseData }: PageRendererProps) {
  const renderSection = (section: PageSection): ReactNode => {
    switch (section.type) {
      case 'hero':
        return (
          <div key={section.id} className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
            <div className="text-center max-w-4xl px-8">
              <h1 className="text-5xl font-bold mb-4">{section.data.title}</h1>
              <p className="text-xl opacity-90">{section.data.description}</p>
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={section.id} className="py-16 px-8 max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              {section.data.content?.split('\n').map((paragraph: string, idx: number) => (
                paragraph.trim() && <p key={idx} className="mb-4 text-gray-300 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={section.id} className="py-12 px-8 max-w-4xl mx-auto">
            <img
              src={section.data.image || ''}
              alt={section.data.description || 'Section image'}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        );

      case 'cta':
        return (
          <div key={section.id} className="py-16 px-8 bg-blue-600 flex justify-center">
            <a
              href={section.data.buttonLink || '#'}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              {section.data.buttonText || 'Learn More'}
            </a>
          </div>
        );

      case 'features':
        return (
          <div key={section.id} className="py-16 px-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.isArray(section.data.items) &&
                section.data.items.map((feature: any, idx: number) => (
                  <div key={idx} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{feature.title}</h4>
                        {feature.description && <p className="text-gray-300 text-sm mt-1">{feature.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div key={section.id} className="py-16 px-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Gallery items would go here */}
              <div className="bg-gray-800 p-6 rounded text-center text-gray-400">
                Gallery section (load from context)
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {sections.sort((a, b) => a.order - b.order).map(renderSection)}
    </div>
  );
}
