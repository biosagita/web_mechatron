# 🤖 Mechatron - Website Kursus Robotik

Website modern untuk kursus robotik dengan sistem CMS admin lengkap.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-10-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

- **Landing Page** - Hero, Features, Courses, Gallery, Testimonials
- **Page Builder** - 15 jenis section untuk halaman custom
- **Admin Dashboard** - CRUD untuk semua konten
- **Authentication** - Login admin dengan Firebase
- **File Upload** - Upload gambar ke Firebase Storage
- **Rich Text Editor** - TipTap editor untuk konten

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/your-repo/mechatron.git
cd mechatron

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local dengan Firebase credentials

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── admin/        # Admin dashboard pages
│   ├── news/         # News pages
│   └── [slug]/       # Dynamic pages
├── components/
│   ├── landing/      # Public website components
│   ├── admin/        # Admin-only components
│   └── shared/       # Shared components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
└── lib/              # Firebase config
```

## 📖 Documentation

Dokumentasi lengkap ada di folder [`docs/`](./docs/):

| Doc | Deskripsi |
|-----|-----------|
| [Quick Start](./docs/01-quick-start.md) | Setup awal project |
| [Architecture](./docs/02-architecture.md) | Struktur & arsitektur |
| [Components](./docs/03-components.md) | Daftar komponen |
| [Page Builder](./docs/04-page-builder.md) | Panduan page builder |
| [Firebase](./docs/05-firebase.md) | Konfigurasi Firebase |
| [Deployment](./docs/06-deployment.md) | Panduan deploy |
| [API Reference](./docs/07-api-reference.md) | Types, hooks, utils |

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Auth**: Firebase Authentication
- **Styling**: Tailwind CSS
- **Editor**: TipTap
- **Icons**: Lucide React

## 🔐 Admin Access

```
URL: /admin/login
Default: Setup via Firebase Console
```

## 📝 License

MIT License - Feel free to use for your own projects.
