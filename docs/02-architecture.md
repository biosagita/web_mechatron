# Architecture

Dokumentasi arsitektur dan struktur proyek Mechatron Website.

## 🏗️ Project Structure

```
mechatron/
├── docs/                           # Documentation
├── public/
│   └── images/                     # Static images
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── admin/                  # Admin panel
│   │   │   ├── courses/           # Course management
│   │   │   ├── gallery/           # Gallery management
│   │   │   ├── login/             # Admin login
│   │   │   ├── news/              # News management
│   │   │   ├── pages/             # Page builder
│   │   │   ├── partners/          # Partner management
│   │   │   ├── registrations/     # Registration management
│   │   │   ├── schedule/          # Schedule management
│   │   │   ├── testimonials/      # Testimonial management
│   │   │   └── page.tsx           # Dashboard
│   │   ├── courses/[id]/          # Course detail page
│   │   ├── news/                   # News listing
│   │   │   └── [slug]/            # News detail page
│   │   ├── pages/[slug]/          # Custom pages
│   │   ├── register/              # Public registration
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Homepage
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                 # React Components
│   │   ├── admin/                  # Admin-only components
│   │   │   ├── AdminLayout.tsx    # Admin wrapper
│   │   │   ├── NewsEditor.tsx     # News WYSIWYG editor
│   │   │   ├── FileUpload.tsx     # File uploader
│   │   │   ├── RichTextEditor.tsx # TipTap editor
│   │   │   └── index.ts           # Exports
│   │   │
│   │   ├── landing/               # Public page components
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   ├── Hero.tsx           # Hero section
│   │   │   ├── Features.tsx       # Features section
│   │   │   ├── Courses.tsx        # Courses section
│   │   │   ├── Gallery.tsx        # Gallery section
│   │   │   ├── Schedule.tsx       # Schedule section
│   │   │   ├── News.tsx           # News section
│   │   │   ├── Testimonials.tsx   # Testimonials
│   │   │   ├── PartnerSchools.tsx # Partners section
│   │   │   ├── Footer.tsx         # Footer
│   │   │   └── index.ts           # Exports
│   │   │
│   │   ├── shared/                # Shared components
│   │   │   ├── ProtectedRoute.tsx # Auth guard
│   │   │   ├── PageRenderer.tsx   # Dynamic page renderer
│   │   │   ├── PageDetailClient.tsx
│   │   │   ├── NewsDetailClient.tsx
│   │   │   ├── CourseDetailClient.tsx
│   │   │   └── index.ts           # Exports
│   │   │
│   │   └── index.ts               # Main exports
│   │
│   ├── context/                   # React Context
│   │   ├── AuthContext.tsx        # Authentication state
│   │   └── ContentContext.tsx     # Content/data state
│   │
│   ├── hooks/                     # Custom Hooks
│   │   ├── useLocalStorage.ts     # LocalStorage hook
│   │   ├── useMediaQuery.ts       # Responsive hooks
│   │   └── index.ts               # Exports
│   │
│   ├── lib/                       # Libraries
│   │   └── firebase.ts            # Firebase initialization
│   │
│   ├── types/                     # TypeScript Types
│   │   └── index.ts               # All type definitions
│   │
│   └── utils/                     # Utility Functions
│       └── index.ts               # Helper functions
│
├── .env.local                     # Environment variables
├── firebase.json                  # Firebase config
├── firestore.rules                # Security rules
├── next.config.ts                 # Next.js config
├── tailwind.config.ts             # Tailwind config
└── tsconfig.json                  # TypeScript config
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      FIREBASE                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   Auth   │  │ Firestore │  │ Storage  │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
└───────┼─────────────┼─────────────┼────────────────────────┘
        │             │             │
        ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                     CONTEXT LAYER                            │
│  ┌─────────────────┐     ┌─────────────────┐               │
│  │   AuthContext   │     │  ContentContext  │               │
│  │  - user state   │     │  - news, gallery │               │
│  │  - login/logout │     │  - courses, etc  │               │
│  └────────┬────────┘     └────────┬────────┘               │
└───────────┼───────────────────────┼────────────────────────┘
            │                       │
            ▼                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                           │
│                                                              │
│   Landing Components      Admin Components     Shared        │
│   ┌────────────────┐     ┌──────────────┐   ┌──────────┐   │
│   │ Navbar, Hero   │     │ AdminLayout  │   │Protected │   │
│   │ Features, etc  │     │ NewsEditor   │   │ Route    │   │
│   └────────────────┘     └──────────────┘   └──────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                      PAGE LAYER (App Router)                 │
│                                                              │
│   /                    /admin/*              /news/*         │
│   /courses/*           /pages/*              /register       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🗃️ Firestore Collections

| Collection | Description | Documents |
|------------|-------------|-----------|
| `news` | Berita/artikel | NewsItem |
| `gallery` | Galeri foto | GalleryItem |
| `schedule` | Jadwal kelas | ScheduleItem |
| `courses` | Daftar kursus | CourseItem |
| `testimonials` | Testimoni | TestimonialItem |
| `registrations` | Pendaftaran | RegistrationItem |
| `pages` | Custom pages | CustomPage |
| `settings` | Site settings | SiteSettings |

## 🔐 Authentication Flow

```
User → /admin/login
        │
        ▼
   Firebase Auth
        │
        ├─── Success → AuthContext.setUser()
        │                    │
        │                    ▼
        │              Redirect to /admin
        │
        └─── Failure → Show error message
```

## 📦 Import Patterns

### Components
```typescript
// Landing components
import { Navbar, Hero, Features } from '@/components/landing';

// Admin components
import { AdminLayout, NewsEditor } from '@/components/admin';

// Shared components
import { ProtectedRoute, PageRenderer } from '@/components/shared';

// Or import all
import { Navbar, AdminLayout, ProtectedRoute } from '@/components';
```

### Hooks
```typescript
import { useContent, useAuth } from '@/hooks';
import { useLocalStorage, useMediaQuery, useIsMobile } from '@/hooks';
```

### Utils
```typescript
import { 
  generateSlug, 
  formatDateID, 
  truncateText,
  getYouTubeId 
} from '@/utils';
```

### Types
```typescript
import type { 
  NewsItem, 
  CourseItem, 
  PageSection,
  CustomPage 
} from '@/types';
```

## 🎨 Styling Conventions

1. **Tailwind CSS** - Utility-first styling
2. **Dark mode admin** - `bg-gray-900` based palette
3. **Light mode landing** - `bg-white` based palette
4. **Orange accent** - `orange-500/600` for CTAs

---

Next: [Components →](./03-components.md)
