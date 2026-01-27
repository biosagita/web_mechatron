# 🚀 Deployment Guide - Firebase Hosting

## Prerequisites
- Firebase Account (sudah dibuat)
- Firebase Project (sudah setup)
- Node.js installed
- Git (optional)

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

## Step 2: Login to Firebase

```bash
firebase login
```

Browser akan terbuka, login dengan akun Google yang sama dengan Firebase project.

## Step 3: Configure Next.js untuk Firebase Hosting

Jalankan di terminal (di folder project):

```bash
firebase init hosting
```

Ketika ditanya pertanyaan:

```
? What do you want to use as your public directory? 
→ out

? Configure as a single-page app (rewrite all urls to /index.html)?
→ No

? Set up automatic builds and deploys with GitHub?
→ No (atau Yes jika mau auto-deploy dari GitHub)

? File out/404.html already exists. Overwrite?
→ Yes

? File out/index.html already exists. Overwrite?
→ No
```

## Step 4: Update next.config.js

Pastikan `next.config.js` punya konfigurasi untuk static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

## Step 5: Build untuk Production

```bash
npm run build
```

Output akan tersimpan di folder `out/`

## Step 6: Deploy ke Firebase Hosting

```bash
firebase deploy
```

Tunggu sampai selesai. Output akan seperti:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/mechatron/overview
Hosting URL: https://mechatron-xxxxx.web.app
```

**Copy URL hosting Anda!** Itu adalah URL publik website Anda.

## Step 7: Verify Deployment

Buka URL yang diberikan di browser dan pastikan:
- ✅ Homepage loading dengan benar
- ✅ Bisa akses halaman register
- ✅ Bisa submit pendaftaran (data masuk ke Firestore)
- ✅ Admin dashboard bisa diakses dengan login

## Step 8: Setup Custom Domain (Optional)

Jika punya domain sendiri:

1. Di Firebase Console, buka **Hosting**
2. Klik **Connect domain**
3. Masukkan domain Anda
4. Follow instructions untuk setup DNS di domain provider
5. Wait sampai verified (biasanya 5-30 menit)

## Automatic Deployment dengan GitHub (Optional)

### Setup
1. Pastikan project sudah di GitHub
2. Di Firebase Console, buka Hosting
3. Klik **Connect repository**
4. Pilih GitHub repository
5. Pilih branch untuk auto-deploy (biasanya `main`)
6. Configure build settings:
   - Build command: `npm run build`
   - Public directory: `out`
7. Deploy

### Setelah setup
Setiap kali push ke branch tersebut, Firebase otomatis:
- Build project
- Run tests (jika ada)
- Deploy ke production

## Environment Variables untuk Production

Pastikan `.env.local` sudah ada dengan Firebase config yang benar.

> **Important:** Firebase config dianggap public karena di-prefix dengan `NEXT_PUBLIC_`, jadi aman untuk di-expose di frontend.

## Monitoring & Analytics

Setelah deploy, bisa monitoring di Firebase Console:

1. **Hosting**: Lihat traffic, performance
2. **Firestore**: Lihat data real-time, queries
3. **Storage**: Lihat file uploads
4. **Analytics**: (jika setup Google Analytics)

## Troubleshooting

### Error: "Build failed"
- Pastikan `npm run build` berjalan tanpa error di lokal
- Check logs di Firebase Console

### Error: "Cannot find module"
- Delete `node_modules` dan `out` folder
- Run `npm install` lagi
- Run `npm run build`

### Website tidak bisa akses Firestore
- Check `.env.local` sudah benar
- Check Firestore Rules sudah published
- Check di browser DevTools → Console untuk error

### Gambar tidak muncul
- Firebase Hosting hanya support file static
- Dynamic images harus dari URL (seperti from Firestore Storage)

## Redeploy ke Production

Setiap kali ada update:

```bash
# 1. Commit changes ke Git (optional)
git add .
git commit -m "Update features"

# 2. Build
npm run build

# 3. Deploy
firebase deploy
```

Atau jika pakai automatic deployment, just push to GitHub!

## Rollback (Jika ada error)

```bash
# Lihat history deploy
firebase hosting:channel:list

# Rollback ke versi sebelumnya
firebase hosting:rollback
```

## Environment Setup untuk Team

Jika ada team yang develop:

1. Install dependencies: `npm install`
2. Copy `.env.local` dari lead developer
3. Develop locally: `npm run dev`
4. Test before pushing: `npm run build`
5. Push to GitHub
6. Firebase otomatis deploy

---

**Selamat! Website Anda sudah live di Internet!** 🎉

URL hosting: **[Copy dari Firebase Deploy Output]**

Share URL ke calon siswa, orang tua, atau media sosial!
