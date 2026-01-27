# 🔥 Firebase Setup Guide untuk Mechatron

## Langkah 1: Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a new project"
3. Masukkan nama project: `mechatron`
4. Pilih lokasi: Indonesia (atau lokasi terdekat)
5. Klik "Create project" dan tunggu sampai selesai

## Langkah 2: Setup Authentication

1. Di sidebar, klik **Authentication**
2. Klik **Get Started**
3. Pilih **Email/Password** sebagai metode login
4. Aktifkan "Email/Password"
5. Klik **Save**

## Langkah 3: Setup Firestore Database

1. Di sidebar, klik **Firestore Database**
2. Klik **Create Database**
3. Pilih **Start in production mode**
4. Pilih lokasi: `asia-southeast1` (atau `multi-region`)
5. Klik **Create**
6. Buat collection baru:
   - Nama: `registrations`
   - Klik **Auto ID** untuk ID dokumen
   - Tambahkan field pertama:
     - Field name: `namaAnak` (string)
     - Value: `Test User`
   - Klik **Save**

## Langkah 4: Update Security Rules (Firestore)

1. Di Firestore, buka tab **Rules**
2. Ganti dengan rules berikut:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own registrations
    match /registrations/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Admin dapat read/write semua
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
  }
}
```

3. Klik **Publish**

## Langkah 5: Setup Cloud Storage

1. Di sidebar, klik **Storage**
2. Klik **Get Started**
3. Mulai dalam production mode
4. Pilih lokasi: `asia-southeast1`
5. Klik **Done**
6. Buka tab **Rules** dan ganti dengan:

```storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read for authenticated users
    match /uploads/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 50 * 1024 * 1024; // 50MB limit
    }
  }
}
```

7. Klik **Publish**

## Langkah 6: Dapatkan Firebase Config

1. Di sidebar, klik ⚙️ **Project Settings**
2. Pilih tab **Service Accounts**
3. Klik **Go to API keys** atau scroll ke bawah
4. Copy informasi untuk Web app:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId
   - measurementId (optional)

## Langkah 7: Update `.env.local`

Ganti values di file `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

## Langkah 8: Test Koneksi Firebase

1. Jalankan dev server: `npm run dev`
2. Buka halaman pendaftaran: http://localhost:3000/register
3. Isi form dan submit
4. Cek di Firestore Console apakah data muncul di collection `registrations`

## Langkah 9: Deploy ke Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login ke Firebase:
```bash
firebase login
```

3. Inisialisasi Firebase di project:
```bash
firebase init hosting
```

Ketika ditanya:
- "What do you want to use as your public directory?" → `out`
- "Configure as a single-page app?" → `No`
- "Set up automatic builds and deploys?" → `Yes`

4. Build Next.js untuk production:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy
```

6. Ambil URL dari output dan share dengan users!

## Data Structure

### Registrations Collection

```
{
  namaAnak: string
  usiaAnak: string
  asalSekolah: string
  waAnak: string (nomor HP)
  program: string (beginner|intermediate|advanced|drone)
  namaOrangTua: string
  waOrangTua: string (nomor HP)
  tanggalDaftar: timestamp
  status: string (Baru|Hubungi|Trial|Konfirmasi)
}
```

## Troubleshooting

### "Permission denied" error
- Pastikan Firestore Rules sudah dipublish
- Pastikan user sudah authenticated (login dahulu di admin)

### Data tidak muncul di Firestore
- Cek di console browser untuk errors
- Pastikan Firebase config di `.env.local` sudah benar
- Restart dev server setelah update `.env.local`

### File terlalu besar saat upload
- Limit di set ke 50MB, ubah di Firestore Rules jika perlu

## Fitur Selanjutnya

Setelah Firebase siap, bisa tambahkan:
- Upload foto profil
- Upload video demo hasil project
- Real-time notification untuk admin
- Email notifications
- Generate PDF certificate
