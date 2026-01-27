# 🚀 Quick Start - Firebase + Firestore + Storage

## 5 Langkah Setup Cepat

### 1. Buat Firebase Project
```
firebaseapp.com → Create Project → "mechatron"
```

### 2. Copy Firebase Config
Firebase Console → Project Settings → Copy config values

### 3. Paste ke .env.local
```bash
# File: .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
# ... (copy semua values)
```

### 4. Restart Dev Server
```bash
Ctrl+C
npm run dev
```

### 5. Test
- Buka http://localhost:3000/register
- Submit form
- Check Firestore Console → registrations collection

✅ **Done! Data sekarang di Firestore!**

---

## Deploy ke Internet (Firebase Hosting)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Follow prompts... answer:
# public directory: out
# single-page app: No
npm run build
firebase deploy
```

**URL Website Anda:** Copy dari output `Hosting URL`

---

## Dokumentasi Lengkap

- **Setup Firebase Detail:** `FIREBASE_SETUP.md`
- **Deployment Detail:** `DEPLOYMENT_GUIDE.md`
- **Checklist:** `FIREBASE_INTEGRATION_CHECKLIST.md`

---

## Fitur Sudah Siap

✅ Firestore Database untuk data registrations
✅ Cloud Storage untuk upload foto/video (FileUpload component)
✅ Async form submission (loading state)
✅ Admin panel untuk manage data
✅ Error handling & validation

---

**Total time:** ~30 menit (15 min setup Firebase + 10 min test + 5 min deploy)

**Questions?** Check markdown files above! 📄
