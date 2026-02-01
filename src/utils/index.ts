/**
 * Utility functions for Mechatron Website
 * 
 * This file contains reusable helper functions used throughout the application.
 */

// ============================================
// SLUG UTILITIES
// ============================================

/**
 * Generate URL-friendly slug from title
 * @param title - The title to convert to slug
 * @returns URL-friendly slug string
 * @example generateSlug("Hello World!") // returns "hello-world"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Find news item by its slug
 * @param news - Array of news items
 * @param slug - Slug to search for
 * @returns NewsItem or undefined
 */
export function findNewsBySlug<T extends { title: string }>(news: T[], slug: string): T | undefined {
  return news.find(item => generateSlug(item.title) === slug);
}

/**
 * Find any item by its slug
 * @param items - Array of items with title property
 * @param slug - Slug to search for
 * @returns Item or undefined
 */
export function findBySlug<T extends { title: string }>(items: T[], slug: string): T | undefined {
  return items.find(item => generateSlug(item.title) === slug);
}

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Format date to Indonesian locale
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export function formatDateID(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Format date to short format
 * @param dateString - Date string to format
 * @returns Formatted date string (DD/MM/YYYY)
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns Current date string
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// YOUTUBE UTILITIES
// ============================================

/**
 * Extract YouTube video ID from URL
 * @param url - YouTube URL
 * @returns Video ID or null
 */
export function getYouTubeId(url: string): string | null {
  const match = url?.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Get YouTube embed URL from video ID
 * @param videoId - YouTube video ID
 * @returns Embed URL
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Check if string is valid URL
 * @param str - String to check
 * @returns Boolean
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is valid email
 * @param email - Email to validate
 * @returns Boolean
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if string is valid phone number (Indonesian format)
 * @param phone - Phone number to validate
 * @returns Boolean
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[8][0-9]{8,11}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Sort array by order property
 * @param items - Array of items with order property
 * @returns Sorted array
 */
export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

/**
 * Filter array by category
 * @param items - Array of items with category property
 * @param category - Category to filter by (empty string returns all)
 * @returns Filtered array
 */
export function filterByCategory<T extends { category: string }>(items: T[], category: string): T[] {
  if (!category) return items;
  return items.filter(item => item.category === category);
}

// ============================================
// IMAGE UTILITIES
// ============================================

/**
 * Get placeholder image URL
 * @param width - Image width
 * @param height - Image height
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(width: number = 400, height: number = 300): string {
  return `https://placehold.co/${width}x${height}/1f2937/9ca3af?text=No+Image`;
}

/**
 * Get initials from name (for avatar fallback)
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
