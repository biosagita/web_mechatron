# Quick Start Guide

Panduan memulai development Mechatron Website.

## 📋 Prerequisites

- **Node.js** v18+ 
- **npm** atau **yarn**
- **Git**
- Account **Firebase** (untuk backend)

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/biosagita/web_mechatron.git
cd mechatron
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> 💡 Dapatkan kredensial dari [Firebase Console](https://console.firebase.google.com) → Project Settings → Web App

### 4. Setup Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login ke Firebase
firebase login

# Initialize (pilih Firestore, Storage, Hosting)
firebase init
```

### 5. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 6. Run Development Server

```bash
npm run dev
```

Buka http://localhost:3000

## 🔐 Admin Access

### First-Time Setup

1. Buka Firebase Console → Authentication
2. Enable "Email/Password" sign-in method
3. Add user manually atau gunakan signup flow

### Login Admin

1. Buka http://localhost:3000/admin/login
2. Masukkan email dan password
3. Akses dashboard admin

## 📁 File Structure Overview

```
src/
├── app/                    # Pages (App Router)
│   ├── page.tsx           # Homepage
│   └── admin/             # Admin pages
├── components/
│   ├── landing/           # Public components
│   ├── admin/             # Admin components
│   └── shared/            # Shared components
├── context/               # State management
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── utils/                 # Helper functions
```

## 🧪 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Production build
npm run start           # Start production server

# Firebase
firebase deploy         # Deploy to Firebase Hosting
firebase emulators:start # Start local emulators

# Linting
npm run lint            # Run ESLint
```

## ❓ Troubleshooting

### Firebase Connection Error

1. Pastikan internet terhubung
2. Cek kredensial di `.env.local`
3. Restart dev server

### Permission Denied

1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Check rules di `firestore.rules`

### Component Not Found

Setelah reorganisasi, pastikan import path benar:
```typescript
// Landing components
import { Navbar, Hero } from '@/components/landing';

// Admin components  
import { AdminLayout } from '@/components/admin';

// Shared components
import { ProtectedRoute } from '@/components/shared';
```

---

Next: [Architecture →](./02-architecture.md)
