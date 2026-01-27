'use client';

import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 text-slate-900 py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-4 text-orange-600">Mechatron</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Sekolah robotika terdepan untuk mengembangkan generasi inovator di bidang robotika dan teknologi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-orange-500 transition">Beranda</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Program</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Galeri</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Kontak</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-orange-500" />
                <span>+62 xxx xxx xxxx</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-orange-500" />
                <span>info@mechatron.id</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-orange-500 mt-1" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/mechatron_robotic" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-2 rounded-lg hover:shadow-lg transition text-white">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/6281234800485" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-lg hover:bg-green-600 transition text-white">
                <MessageCircle size={20} />
              </a>
              <a href="mailto:mechatron.depok@gmail.com" className="bg-orange-100 p-2 rounded-lg hover:bg-orange-500 hover:text-white transition text-orange-600">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-600">© 2025 Mechatron Robotic School. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-600">
            <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
