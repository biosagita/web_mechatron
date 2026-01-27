'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-slate-900 sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="Mechatron Logo" className="h-12" />
            </Link>
         

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#home" className="hover:text-orange-500 transition font-medium">
              Beranda
            </Link>
            <Link href="#features" className="hover:text-orange-500 transition font-medium">
              Tentang
            </Link>
            <Link href="#gallery" className="hover:text-orange-500 transition font-medium">
              Galeri
            </Link>
            <Link href="#schedule" className="hover:text-orange-500 transition font-medium">
              Jadwal
            </Link>
            <Link href="#news" className="hover:text-orange-500 transition font-medium">
              Berita
            </Link>
          </div>

          {/* CTA Button */}
          <Link href="/register" className="hidden md:block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
            Daftar Sekarang
              </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-gray-200">
            <Link href="#home" className="block hover:text-orange-500 transition py-2 font-medium">
              Beranda
            </Link>
            <Link href="#features" className="block hover:text-orange-500 transition py-2 font-medium">
              Tentang
            </Link>
            <Link href="#gallery" className="block hover:text-orange-500 transition py-2 font-medium">
              Galeri
            </Link>
            <Link href="#schedule" className="block hover:text-orange-500 transition py-2 font-medium">
              Jadwal
            </Link>
            <Link href="#news" className="block hover:text-orange-500 transition py-2 font-medium">
              Berita
            </Link>
            <Link href="/register" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold mt-3 block text-center">
              Daftar Sekarang
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
