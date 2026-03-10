'use client';

import { useContent } from '@/context/ContentContext';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EventPopup() {
    const { popup, news } = useContent();
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!popup || !popup.isActive || !popup.image) return;

        // Check date range
        const now = new Date();
        if (popup.startDate && new Date(popup.startDate) > now) return;
        if (popup.endDate && new Date(popup.endDate) < now) return;

        // Check if already dismissed in this session
        const dismissed = sessionStorage.getItem('popup_dismissed');
        if (dismissed === popup.image) return; // Same popup already dismissed

        // Show popup with a slight delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, [popup]);

    const handleClose = () => {
        setIsVisible(false);
        if (popup?.image) {
            sessionStorage.setItem('popup_dismissed', popup.image);
        }
    };

    const handleClick = () => {
        if (popup?.newsSlug) {
            // Find the news item to get its slug for URL
            const newsItem = news.find(n => n.id === popup.newsSlug);
            if (newsItem) {
                const slug = newsItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                router.push(`/news/${slug}`);
            }
        }
        handleClose();
    };

    if (!isVisible || !popup) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={handleClose}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-popIn pointer-events-none">
                <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                        aria-label="Tutup popup"
                    >
                        <X className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* Image */}
                    <div
                        className={popup.newsSlug ? 'cursor-pointer' : ''}
                        onClick={popup.newsSlug ? handleClick : undefined}
                    >
                        <img
                            src={popup.image}
                            alt={popup.title || 'Event'}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Title + CTA */}
                    {(popup.title || popup.newsSlug) && (
                        <div className="p-4">
                            {popup.title && (
                                <h3 className="text-lg font-bold text-slate-900">{popup.title}</h3>
                            )}
                            {popup.newsSlug && (
                                <button
                                    onClick={handleClick}
                                    className="mt-2 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition"
                                >
                                    Baca Selengkapnya →
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-popIn {
          animation: popIn 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
