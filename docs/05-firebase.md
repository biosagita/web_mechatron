# Firebase Configuration

Panduan setup dan konfigurasi Firebase untuk Mechatron Website.

## 🔥 Overview

Mechatron menggunakan Firebase untuk:
- **Authentication** - Login admin
- **Firestore** - Database NoSQL
- **Storage** - File/image storage
- **Hosting** - Web hosting (opsional)

## 📋 Setup Firebase Project

### 1. Buat Project

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik "Create Project"
3. Masukkan nama project: `mechatron-web`
4. Enable/disable Google Analytics (opsional)
5. Klik "Create Project"

### 2. Enable Services

#### Authentication
1. Sidebar → Authentication → Get Started
2. Sign-in method → Email/Password → Enable

#### Firestore
1. Sidebar → Firestore Database → Create Database
2. Pilih "Start in test mode" (untuk development)
3. Pilih lokasi region terdekat

#### Storage
1. Sidebar → Storage → Get Started
2. Pilih "Start in test mode"

### 3. Get Configuration

1. Project Settings (gear icon)
2. Scroll ke "Your apps"
3. Klik "Web" icon (</>) 
4. Register app dengan nickname
5. Copy configuration

## 🔧 Environment Setup

Buat file `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mechatron-web.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mechatron-web
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mechatron-web.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxx
```

## 🔐 Firestore Security Rules

Deploy rules di `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read untuk semua konten
    match /news/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /schedule/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /courses/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /testimonials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /registrations/{document=**} {
      allow read: if request.auth != null;
      allow write: if true; // Allow public registration
    }
    
    match /pages/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /partners/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Deploy:
```bash
firebase deploy --only firestore:rules
```

## 📦 Storage Rules

Deploy rules di `storage.rules`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Deploy:
```bash
firebase deploy --only storage
```

## 🗄️ Database Collections

### news
```typescript
{
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;       // HTML content
  image?: string;        // Image URL
  pageSlug?: string;     // Link to custom page
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### gallery
```typescript
{
  id: string;
  title: string;
  category: string;
  image: string;
}
```

### schedule
```typescript
{
  id: string;
  name: string;
  level: string;
  time: string;
  capacity: string;
  location: string;
}
```

### courses
```typescript
{
  id: string;
  title: string;
  highlight: string;
  ageGroup: string;
  tools: string;
  details: string;
  image?: string;
  pageSlug?: string;     // Link to custom page
}
```

### testimonials
```typescript
{
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;        // 1-5
  photo?: string;
}
```

### registrations
```typescript
{
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

### pages
```typescript
{
  id: string;
  title: string;
  slug: string;
  courseId?: string;
  sections: PageSection[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## 🛠️ Firebase CLI Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init

# Deploy semua
firebase deploy

# Deploy specific
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only hosting

# Start emulators
firebase emulators:start

# View logs
firebase functions:log
```

## 🐛 Troubleshooting

### Permission Denied
```
FirebaseError: Missing or insufficient permissions
```
**Solution:**
1. Check Firestore rules
2. Deploy rules: `firebase deploy --only firestore:rules`
3. Pastikan user authenticated untuk write operations

### Offline/Connection Error
```
[code=unavailable]: The operation could not be completed
```
**Solution:**
1. Check internet connection
2. Verify Firebase config
3. Restart dev server

### Auth Error
```
auth/invalid-email
```
**Solution:**
1. Pastikan email format valid
2. Check apakah email sudah terdaftar

## 🔄 Data Migration

### Export Data
```javascript
// Di Firebase Console → Firestore → Export
// Atau gunakan CLI
firebase firestore:export gs://[bucket]/backup
```

### Import Data
```javascript
firebase firestore:import gs://[bucket]/backup
```

---

Next: [Deployment →](./06-deployment.md)
