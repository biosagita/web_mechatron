'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';

export default function PartnerSchools() {
  const { partnerBanner } = useContent();

  if (!partnerBanner) {
    return null;
  }

  return (
    <section id="partners" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Sekolah Mitra Kami</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Bekerjasama dengan berbagai sekolah terbaik untuk menghadirkan pendidikan robotika berkualitas
          </p>
        </div>

        {/* Single Banner Image */}
        <div className="flex justify-center">
          <img
            src={partnerBanner}
            alt="Sekolah Mitra Mechatron"
            className="max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
