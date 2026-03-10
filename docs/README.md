# Mechatron Website Documentation

Dokumentasi lengkap untuk website Mechatron - Platform edukasi robotika dan teknologi.

## 📚 Daftar Isi

1. [Quick Start](./01-quick-start.md) - Cara memulai development
2. [Architecture](./02-architecture.md) - Struktur proyek dan arsitektur
3. [Components](./03-components.md) - Dokumentasi komponen
4. [Page Builder](./04-page-builder.md) - Panduan page builder
5. [Firebase](./05-firebase.md) - Konfigurasi Firebase
6. [Deployment](./06-deployment.md) - Panduan deployment
7. [API Reference](./07-api-reference.md) - Referensi API dan types

## 🚀 Quick Links

- **Development Server**: `npm run dev` → http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Firebase Console**: https://console.firebase.google.com

## 📁 Struktur Proyek

```
mechatron/
├── docs/                    # 📚 Dokumentasi
├── public/                  # 📁 Asset statis
│   └── images/             # Gambar
├── src/
│   ├── app/                # 📱 Next.js App Router
│   │   ├── admin/          # Admin pages
│   │   ├── courses/        # Course pages
│   │   ├── news/           # News pages
│   │   ├── pages/          # Custom pages
│   │   └── register/       # Registration
│   ├── components/         # 🧩 React Components
│   │   ├── admin/          # Admin components
│   │   ├── landing/        # Landing page components
│   │   └── shared/         # Shared components
│   ├── context/            # 🔄 React Context
│   ├── hooks/              # 🪝 Custom Hooks
│   ├── lib/                # 📦 Libraries (Firebase)
│   ├── types/              # 📋 TypeScript Types
│   └── utils/              # 🔧 Utility Functions
├── .env.local              # Environment variables
├── firebase.json           # Firebase config
└── firestore.rules         # Firestore rules
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Firebase | Backend (Auth, Firestore, Storage) |
| Lucide Icons | Icons |
| TipTap & DOMPurify | Rich Text Editor & XSS Protection |

## 🛡️ Security Features
- Firebase Authentication terintegrasi penuh
- Strict Firestore & Storage Security Rules
- Client-side XSS Protection (DOMPurify)

## 👥 Tim

- **Developer**: Mechatron Team
- **Repository**: https://github.com/biosagita/web_mechatron

---

*Last Updated: February 2026*
