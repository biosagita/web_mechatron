# API Reference

Referensi lengkap untuk types, hooks, dan utilities.

## 📋 Types

Import dari `@/types`:

```typescript
import type { 
  NewsItem, 
  GalleryItem, 
  ScheduleItem,
  CourseItem,
  TestimonialItem,
  RegistrationItem,
  PageSection,
  CustomPage,
  SectionType,
  PageSectionData
} from '@/types';
```

### NewsItem

```typescript
interface NewsItem {
  id: string;
  date: string;              // Format: YYYY-MM-DD
  title: string;
  excerpt: string;           // Short description
  category: string;          // e.g., "Pengumuman", "Event"
  content: string;           // HTML content
  image?: string;            // Image URL
  pageSlug?: string;         // Link to custom page
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

### GalleryItem

```typescript
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image?: string;
}
```

### ScheduleItem

```typescript
interface ScheduleItem {
  id: string;
  name: string;              // Class name
  level: string;             // e.g., "Beginner", "Advanced"
  time: string;              // e.g., "Sabtu, 09:00-11:00"
  capacity: string;          // e.g., "10 siswa"
  location: string;          // e.g., "Lab A"
}
```

### CourseItem

```typescript
interface CourseItem {
  id: string;
  title: string;
  highlight: string;         // Short tagline
  ageGroup: string;          // e.g., "7-12 tahun"
  tools: string;             // e.g., "Arduino, LEGO"
  details: string;           // Full description
  image?: string;
  pageId?: string;
  pageSlug?: string;         // Link to custom page
}
```

### TestimonialItem

```typescript
interface TestimonialItem {
  id: string;
  name: string;
  role: string;              // e.g., "Orang Tua Siswa"
  message: string;
  rating: number;            // 1-5
  photo?: string;
}
```

### RegistrationItem

```typescript
interface RegistrationItem {
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
```

### PageSection

```typescript
type SectionType = 
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

interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  data: PageSectionData;
}
```

### CustomPage

```typescript
interface CustomPage {
  id: string;
  courseId?: string;
  title: string;
  slug: string;
  sections: PageSection[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

---

## 🪝 Hooks

Import dari `@/hooks`:

```typescript
import { 
  useContent, 
  useAuth,
  useLocalStorage,
  useMediaQuery,
  useIsMobile,
  useIsDesktop
} from '@/hooks';
```

### useContent

Content management hook.

```typescript
const {
  // News
  news,
  addNews,
  updateNews,
  deleteNews,
  
  // Gallery
  gallery,
  addGallery,
  updateGallery,
  deleteGallery,
  
  // Schedule
  schedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  
  // Courses
  courses,
  addCourse,
  updateCourse,
  deleteCourse,
  
  // Testimonials
  testimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  
  // Registrations
  registrations,
  addRegistration,
  updateRegistration,
  deleteRegistration,
  
  // Pages
  pages,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug,
  getPageByCourseId,
  
  // Loading state
  loading,
} = useContent();
```

### useAuth

Authentication hook.

```typescript
const {
  user,              // Current user or null
  login,             // (email, password) => Promise
  logout,            // () => Promise
  loading,           // Loading state
} = useAuth();
```

### useLocalStorage

Persist state to localStorage.

```typescript
const [value, setValue] = useLocalStorage<T>(key, initialValue);

// Example
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### useMediaQuery

Responsive design hook.

```typescript
const matches = useMediaQuery('(min-width: 768px)');

// Predefined
const isMobile = useIsMobile();    // < 768px
const isTablet = useIsTablet();    // 768px - 1024px
const isDesktop = useIsDesktop();  // > 1024px
```

---

## 🔧 Utilities

Import dari `@/utils`:

```typescript
import {
  // Slug
  generateSlug,
  findNewsBySlug,
  findBySlug,
  
  // Date
  formatDateID,
  formatDateShort,
  getCurrentDate,
  
  // String
  truncateText,
  capitalizeFirst,
  
  // YouTube
  getYouTubeId,
  getYouTubeEmbedUrl,
  
  // Validation
  isValidUrl,
  isValidEmail,
  isValidPhone,
  
  // Array
  sortByOrder,
  filterByCategory,
  
  // Image
  getPlaceholderImage,
  getInitials,
} from '@/utils';
```

### Slug Utilities

```typescript
// Generate slug from title
generateSlug("Hello World!")  // "hello-world"

// Find by slug
const news = findNewsBySlug(newsArray, "hello-world");
const item = findBySlug(items, "my-item");
```

### Date Utilities

```typescript
// Indonesian format
formatDateID("2026-02-01")  // "1 Februari 2026"

// Short format
formatDateShort("2026-02-01")  // "01/02/2026"

// Current date
getCurrentDate()  // "2026-02-01"
```

### String Utilities

```typescript
// Truncate
truncateText("Long text here", 10)  // "Long text..."

// Capitalize
capitalizeFirst("hello")  // "Hello"
```

### YouTube Utilities

```typescript
// Extract video ID
getYouTubeId("https://youtube.com/watch?v=abc123")  // "abc123"

// Get embed URL
getYouTubeEmbedUrl("abc123")  // "https://www.youtube.com/embed/abc123"
```

### Validation Utilities

```typescript
isValidUrl("https://example.com")  // true
isValidEmail("test@email.com")     // true
isValidPhone("08123456789")        // true
```

### Array Utilities

```typescript
// Sort by order property
sortByOrder(sections)  // Sorted array

// Filter by category
filterByCategory(gallery, "Robotics")  // Filtered array
```

### Image Utilities

```typescript
// Placeholder image
getPlaceholderImage(400, 300)  // URL string

// Get initials
getInitials("John Doe")  // "JD"
```

---

## 🔥 Firebase Functions

Firebase config di `@/lib/firebase`:

```typescript
import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';

// Get all documents
const snapshot = await getDocs(collection(db, 'news'));

// Add document
await addDoc(collection(db, 'news'), data);

// Update document
await updateDoc(doc(db, 'news', id), data);

// Delete document
await deleteDoc(doc(db, 'news', id));

// Query with filter
const q = query(
  collection(db, 'news'),
  where('category', '==', 'Event'),
  orderBy('date', 'desc')
);
```

---

## 📁 File Structure

```
src/
├── types/
│   └── index.ts           # All type definitions
├── hooks/
│   ├── index.ts           # Hook exports
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
├── utils/
│   └── index.ts           # Utility functions
├── lib/
│   └── firebase.ts        # Firebase initialization
└── context/
    ├── AuthContext.tsx    # Auth provider
    └── ContentContext.tsx # Content provider
```

---

*Documentation generated February 2026*
