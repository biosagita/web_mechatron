'use client';

import React, { useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoId = '1ofgOps5CYQDAX1e-3lwfhLRFYhARUUyz';

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-orange-50 text-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                🤖 Selamat Datang di Masa Depan Robotika
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Mechatron Robotic <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">School</span>
              </h1>
              <p className="text-xl text-slate-700 leading-relaxed">
                Sekolah robotika terdepan yang mempersiapkan generasi inovator untuk menghadapi tantangan teknologi masa depan. Belajar, berkreasi, dan bersaing di tingkat internasional.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105">
                <span>Daftar Sekarang</span>
                <ArrowRight size={20} />
              </Link>
              <button onClick={() => setIsVideoOpen(true)} className="flex items-center justify-center space-x-2 border-2 border-cyan-400 text-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition">
                <Play size={20} />
                <span>Lihat Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-300">
              <div>
                <p className="text-3xl font-bold text-orange-500">1000+</p>
                <p className="text-slate-600 text-sm">Happy Student</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-500">50+</p>
                <p className="text-slate-600 text-sm">Partnership</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">10+</p>
                <p className="text-slate-600 text-sm">Program</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-cyan-400 rounded-3xl opacity-10 blur-3xl"></div>
            <div className="relative flex items-center justify-center h-full">
              {/* Floating Elements */}
              <div className="absolute w-32 h-32 bg-orange-400 rounded-3xl opacity-20 animate-pulse" style={{ top: '20%', left: '10%' }}></div>
              <div className="absolute w-40 h-40 bg-cyan-400 rounded-full opacity-20 animate-pulse" style={{ bottom: '20%', right: '10%', animationDelay: '0.5s' }}></div>
              
              {/* Center Circle */}
              <div className="relative w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-6xl">🤖</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-8">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Mechatron Robotic School</h3>
              <button onClick={() => setIsVideoOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://drive.google.com/file/d/${videoId}/preview`}
                title="Mechatron Video"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
