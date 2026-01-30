'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Testimoni</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Apa kata orang tua dan siswa tentang Mechatron
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote size={18} className="text-white" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-slate-600 mb-6 italic leading-relaxed">
                "{testimonial.message}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                {testimonial.photo ? (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
