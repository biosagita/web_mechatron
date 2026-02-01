/**
 * Type definitions for Mechatron Website
 * 
 * This file contains all TypeScript interfaces used throughout the application.
 * Organized by feature/domain for easy maintenance.
 */

// ============================================
// NEWS TYPES
// ============================================

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  image?: string;
  pageSlug?: string;
  createdAt?: any;
  updatedAt?: any;
}

// ============================================
// GALLERY TYPES
// ============================================

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image?: string;
}

// ============================================
// SCHEDULE TYPES
// ============================================

export interface ScheduleItem {
  id: string;
  name: string;
  level: string;
  time: string;
  capacity: string;
  location: string;
}

// ============================================
// REGISTRATION TYPES
// ============================================

export interface RegistrationItem {
  id: string;
  namaAnak: string;
  usiaAnak: string;
  asalSekolah: string;
  waAnak: string;
  program: string;
  namaOrangTua: string;
  waOrangTua: string;
  tanggalDaftar: string;
  status: 'Baru' | 'Hubungi' | 'Trial' | 'Konfirmasi';
}

// ============================================
// TESTIMONIAL TYPES
// ============================================

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  photo?: string;
}

// ============================================
// COURSE TYPES
// ============================================

export interface CourseItem {
  id: string;
  title: string;
  highlight: string;
  ageGroup: string;
  tools: string;
  details: string;
  image?: string;
  pageId?: string;
  pageSlug?: string;
}

// ============================================
// PAGE BUILDER TYPES
// ============================================

export type SectionType = 
  | 'hero' 
  | 'features' 
  | 'cta' 
  | 'gallery' 
  | 'text' 
  | 'image' 
  | 'text-image' 
  | 'image-grid' 
  | 'stats' 
  | 'testimonial' 
  | 'two-column' 
  | 'cards' 
  | 'video' 
  | 'divider' 
  | 'spacer';

export interface PageSectionData {
  // Common
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  content?: string;
  
  // Buttons
  buttonText?: string;
  buttonLink?: string;
  buttonText2?: string;
  buttonLink2?: string;
  
  // Hero / CTA
  badge?: string;
  backgroundImage?: string;
  
  // Text-Image
  imagePosition?: 'left' | 'right';
  
  // Image Grid
  images?: string[];
  columns?: number;
  
  // Stats / Features / Cards
  items?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    number?: string;
    label?: string;
    image?: string;
    link?: string;
  }> | string[];
  
  // Testimonial
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  
  // Two Column
  leftTitle?: string;
  leftContent?: string;
  leftImages?: string[];
  rightTitle?: string;
  rightContent?: string;
  rightImages?: string[];
  
  // Video
  url?: string;
  
  // Image
  caption?: string;
  
  // Divider
  style?: 'normal' | 'thick';
  color?: string;
  
  // Spacer
  height?: number;
}

export interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  data: PageSectionData;
}

export interface CustomPage {
  id: string;
  courseId?: string;
  title: string;
  slug: string;
  sections: PageSection[];
  createdAt?: any;
  updatedAt?: any;
}

// ============================================
// PARTNER SCHOOL TYPES
// ============================================

export interface PartnerSchool {
  id: string;
  name: string;
  logo: string;
  location?: string;
}

// ============================================
// SETTINGS TYPES
// ============================================

export interface SiteSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialYoutube?: string;
}
