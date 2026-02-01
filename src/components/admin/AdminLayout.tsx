'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  BookOpen, 
  LogOut,
  ChevronDown,
  UserCheck,
  MessageSquare,
  Building2,
  Layers
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
      router.push('/admin/login');
    }
  };

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Pendaftaran Siswa',
      href: '/admin/registrations',
      icon: <UserCheck size={20} />,
    },
    {
      label: 'Kelola Berita',
      href: '/admin/news',
      icon: <FileText size={20} />,
    },
    {
      label: 'Kelola Galeri',
      href: '/admin/gallery',
      icon: <ImageIcon size={20} />,
    },
    {
      label: 'Kelola Kursus',
      href: '/admin/courses',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Page Builder',
      href: '/admin/pages',
      icon: <Layers size={20} />,
    },
    {
      label: 'Kelola Testimoni',
      href: '/admin/testimonials',
      icon: <MessageSquare size={20} />,
    },
    {
      label: 'Sekolah Mitra',
      href: '/admin/partners',
      icon: <Building2 size={20} />,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white text-slate-900 transition-all duration-300 flex flex-col border-r border-gray-200 shadow-md`}>
        {/* Logo */}
        <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            MR
          </div>
          {sidebarOpen && <span className="font-bold text-lg text-slate-900">Mechatron</span>}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'hover:bg-gray-100 text-slate-700'
              }`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {sidebarOpen && user && (
            <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 font-semibold">LOGGED IN AS</p>
              <p className="text-sm text-slate-900 font-semibold truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-all font-semibold"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg hover:bg-gray-100 text-slate-700 transition-all"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white text-slate-900 p-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Kelola konten Mechatron Robotic School</p>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

