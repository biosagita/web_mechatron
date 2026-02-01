# Components Documentation

Dokumentasi lengkap untuk semua komponen di Mechatron Website.

## 📁 Component Organization

```
components/
├── landing/     # Public page components
├── admin/       # Admin dashboard components
├── shared/      # Shared/reusable components
└── index.ts     # Central exports
```

---

## 🌐 Landing Components

### Navbar
Navigation bar dengan responsive mobile menu.

```tsx
import { Navbar } from '@/components/landing';

// Usage
<Navbar />
```

**Features:**
- Responsive hamburger menu
- Smooth scroll to sections
- "Daftar Sekarang" CTA button

---

### Hero
Banner utama homepage.

```tsx
import { Hero } from '@/components/landing';

<Hero />
```

**Features:**
- Animated background
- Main headline & subheadline
- CTA buttons

---

### Features
Section fitur/keunggulan.

```tsx
import { Features } from '@/components/landing';

<Features />
```

**Features:**
- Icon grid layout
- Hover animations

---

### Courses
Daftar program kursus.

```tsx
import { Courses } from '@/components/landing';

<Courses />
```

**Features:**
- Card-based layout
- Link to course detail
- Dynamic from Firestore

---

### Gallery
Galeri foto kegiatan.

```tsx
import { Gallery } from '@/components/landing';

<Gallery />
```

**Features:**
- Masonry grid
- Lightbox on click
- Category filter

---

### Schedule
Jadwal kelas.

```tsx
import { Schedule } from '@/components/landing';

<Schedule />
```

**Features:**
- Table layout
- Responsive

---

### News
Section berita terbaru.

```tsx
import { News } from '@/components/landing';

<News />
```

**Features:**
- Latest 3 news
- Link to news listing

---

### Testimonials
Testimoni pelanggan.

```tsx
import { Testimonials } from '@/components/landing';

<Testimonials />
```

**Features:**
- Star rating
- Photo avatar
- Carousel/grid

---

### PartnerSchools
Logo sekolah partner.

```tsx
import { PartnerSchools } from '@/components/landing';

<PartnerSchools />
```

---

### Footer
Footer dengan links & info.

```tsx
import { Footer } from '@/components/landing';

<Footer />
```

---

## 🔧 Admin Components

### AdminLayout
Wrapper layout untuk semua halaman admin.

```tsx
import { AdminLayout } from '@/components/admin';

export default function AdminPage() {
  return (
    <AdminLayout>
      {/* Page content */}
    </AdminLayout>
  );
}
```

**Features:**
- Sidebar navigation
- Header with logout
- Dark theme
- Responsive

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Page content |

---

### NewsEditor
Modal editor untuk berita dengan WYSIWYG.

```tsx
import { NewsEditor } from '@/components/admin';

<NewsEditor
  isOpen={true}
  onClose={() => setIsOpen(false)}
  editingNews={selectedNews}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Modal visibility |
| onClose | () => void | Close handler |
| editingNews | NewsItem \| null | News to edit (null for new) |

**Features:**
- TipTap rich text editor
- Image URL input
- Category selection
- Custom page linking

---

### FileUpload
Komponen upload file ke Firebase Storage.

```tsx
import { FileUpload } from '@/components/admin';

<FileUpload
  onUpload={(url) => setImageUrl(url)}
  folder="gallery"
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| onUpload | (url: string) => void | Callback with uploaded URL |
| folder | string | Storage folder path |

---

### RichTextEditor
TipTap-based WYSIWYG editor.

```tsx
import { RichTextEditor } from '@/components/admin';

<RichTextEditor
  content={content}
  onChange={setContent}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| content | string | HTML content |
| onChange | (html: string) => void | Change handler |

---

## 🔗 Shared Components

### ProtectedRoute
Auth guard untuk halaman yang memerlukan login.

```tsx
import { ProtectedRoute } from '@/components/shared';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {/* Protected content */}
      </AdminLayout>
    </ProtectedRoute>
  );
}
```

**Features:**
- Redirect to login if not authenticated
- Loading state while checking

---

### PageRenderer
Render dynamic page sections dari Page Builder.

```tsx
import { PageRenderer } from '@/components/shared';

<PageRenderer 
  sections={page.sections}
  courseData={course}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| sections | PageSection[] | Array of sections |
| courseData | any | Optional course data |

**Supported Section Types:**
- `hero` - Hero banner dengan buttons
- `text-image` - Text + Image side by side
- `image-grid` - Grid gambar
- `stats` - Statistik angka
- `testimonial` - Single testimonial
- `two-column` - 2 kolom fleksibel
- `cards` - Card grid
- `video` - YouTube embed
- `features` - Feature list
- `cta` - Call to action
- `text` - Text block
- `image` - Single image
- `gallery` - Gallery from context
- `divider` - Separator line
- `spacer` - Empty space

---

### NewsDetailClient
Client component untuk halaman detail berita.

```tsx
import { NewsDetailClient } from '@/components/shared';

<NewsDetailClient slug="berita-terbaru" />
```

**Features:**
- Render news content or custom page
- Share functionality
- Related news

---

### CourseDetailClient
Client component untuk halaman detail kursus.

```tsx
import { CourseDetailClient } from '@/components/shared';

<CourseDetailClient courseId="course-123" />
```

**Features:**
- Course info display
- Custom page fallback
- Registration CTA

---

### PageDetailClient
Client component untuk custom pages.

```tsx
import { PageDetailClient } from '@/components/shared';

<PageDetailClient slug="about-us" />
```

---

## 📥 Import Examples

```typescript
// Import specific components
import { Navbar, Hero } from '@/components/landing';
import { AdminLayout } from '@/components/admin';
import { ProtectedRoute } from '@/components/shared';

// Import from main index
import { 
  Navbar, 
  AdminLayout, 
  ProtectedRoute 
} from '@/components';

// Default export pattern
import Navbar from '@/components/landing/Navbar';
```

---

Next: [Page Builder →](./04-page-builder.md)
