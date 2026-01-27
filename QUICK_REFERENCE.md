# 🗂️ Firebase Integration Quick Reference Card

## 🎯 One-Minute Summary

**Apa yang sudah dikerjakan:**
- ✅ Firebase setup code (src/lib/firebase.ts)
- ✅ Firestore integration (ContentContext.tsx)
- ✅ Form async support
- ✅ File upload component
- ✅ 8 documentation files

**Apa yang tinggal:**
1. Setup Firebase Console (15 min)
2. Update .env.local
3. npm run dev & test
4. firebase deploy
5. Done! 🎉

**Total time:** ~35 minutes

---

## 📋 Firebase Console Setup Checklist

```bash
# 1. Create Project
☐ Go to console.firebase.google.com
☐ Click "Create Project"
☐ Name: "mechatron"
☐ Wait for creation

# 2. Setup Authentication
☐ Click Authentication
☐ Enable Email/Password
☐ Save

# 3. Setup Firestore
☐ Click Firestore Database
☐ Create Database
☐ Mode: Production
☐ Region: asia-southeast1
☐ Wait...

# 4. Create Collection
☐ Click Collection
☐ Name: "registrations"
☐ Auto ID for document
☐ Add any field (e.g., namaAnak: "Test")
☐ Save

# 5. Setup Storage
☐ Click Storage
☐ Get Started
☐ Mode: Production
☐ Region: asia-southeast1
☐ Done

# 6. Copy Config
☐ Project Settings ⚙️
☐ Web app section
☐ Copy all 7 values
☐ Paste to .env.local
```

---

## 🔧 Environment Setup

```bash
# File: .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

---

## ⌨️ Command Reference

```bash
# Development
npm run dev                    # Start dev server
Ctrl+C                        # Stop server

# Build & Deploy
npm run build                 # Build for production
firebase login                # Login to Firebase
firebase init hosting         # Configure hosting
firebase deploy               # Deploy to internet

# Testing
npm install                   # Install dependencies
npm test                      # Run tests (if available)
```

---

## 🔗 Important Links

```
Firebase Console:
https://console.firebase.google.com

Project Settings:
https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general

Firestore:
https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore

Storage:
https://console.firebase.google.com/project/YOUR_PROJECT_ID/storage

Hosting:
https://console.firebase.google.com/project/YOUR_PROJECT_ID/hosting

Public Website:
https://YOUR_PROJECT_ID.web.app
```

---

## 📁 Key Files

```
src/lib/firebase.ts
├─ Initialize Firebase SDK
├─ Connect to: Auth, Firestore, Storage
└─ Needs: .env.local values

src/context/ContentContext.tsx
├─ Firestore database operations
├─ Load registrations on app start
└─ addRegistration(), updateRegistration(), deleteRegistration()

src/app/register/page.tsx
├─ Student registration form
├─ Async submission
└─ Success modal

src/app/admin/registrations/page.tsx
├─ Admin dashboard
├─ List all registrations
└─ Edit/Delete functionality

src/components/FileUpload.tsx
├─ Upload photos/videos
├─ Save to Cloud Storage
└─ Return download URL

.env.local
└─ Firebase configuration (MUST CREATE)
```

---

## ✅ Testing Checklist

```
Local Testing:
☐ npm run dev starts without error
☐ Homepage loads (localhost:3000)
☐ Registration page loads
☐ Form validation works
☐ Submit button disabled when loading
☐ Success modal appears
☐ No console errors (F12)

Firestore Testing:
☐ Buka Firebase Console
☐ Firestore → registrations collection
☐ Check new document created
☐ Verify all fields present

Admin Testing:
☐ Login: admin@mechatron.id / Mechatron123!
☐ Admin dashboard loads
☐ /admin/registrations shows count > 0
☐ Can see registration data
☐ Can edit status
☐ Can delete registration

Production Testing:
☐ npm run build succeeds
☐ firebase deploy succeeds
☐ Public URL accessible
☐ Registration works
☐ Data in Firestore (public)
```

---

## 🐛 Common Issues & Fixes

```
Issue: "NEXT_PUBLIC_FIREBASE_API_KEY is undefined"
Fix:   Update .env.local and restart dev server

Issue: "Permission denied in Firestore"
Fix:   Check Firestore Rules are published

Issue: "Data not appearing in admin page"
Fix:   Check Firestore Console has collection

Issue: "File upload fails"
Fix:   Check Storage Rules are published

Issue: "Build failed"
Fix:   Delete node_modules, npm install, try again

Issue: "Localhost:3000 won't load"
Fix:   Port 3000 in use? Kill process or change port
```

---

## 📊 File Upload Limits

```
Default Limits:
├─ Max size: 10 MB
├─ File types: images (jpg, png) + video (mp4)
└─ Can customize in FileUpload component

Storage Quota (Free Tier):
├─ Total: 5 GB
└─ Per file: 5 GB

Firestore Quota (Free Tier):
├─ Reads: 50K/day
├─ Writes: 50K/day
└─ Storage: 1 GB
```

---

## 🔐 Security Rules

```firestore
// Firestore Rules Template
registrations collection:
  - Read: Authenticated only
  - Write: Authenticated only
  - Delete: Authenticated only

news/gallery/schedule:
  - Read: Public (anyone)
  - Write: Authenticated only
```

```storage
// Storage Rules Template
uploads folder:
  - Read: Authenticated only
  - Write: Authenticated only (max 50MB)
```

---

## 📊 Database Schema

```
Firestore Collections:
├── registrations
│   └── Document (auto-generated ID)
│       ├── namaAnak: string
│       ├── usiaAnak: string
│       ├── asalSekolah: string
│       ├── waAnak: string
│       ├── program: string
│       ├── namaOrangTua: string
│       ├── waOrangTua: string
│       ├── tanggalDaftar: timestamp
│       └── status: "Baru"|"Hubungi"|"Trial"|"Konfirmasi"
│
├── news (future)
├── gallery (future)
└── schedule (future)

Cloud Storage:
└── /uploads/
    ├── photos
    └── videos
```

---

## 🎯 Workflow

```
Developer (You)
    ↓
┌─────────────────────┐
│ 1. Setup Firebase   │
│    (15 min)         │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ 2. Update .env      │
│    (2 min)          │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ 3. Test locally     │
│    (10 min)         │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ 4. Deploy           │
│    (5 min)          │
└──────────┬──────────┘
           ↓
       PUBLIC URL!
       🎉 Success
```

---

## 📞 When to Read Which File

```
Feeling Lost?
→ INDEX.md (documentation overview)

Quick Setup?
→ QUICK_START.md (5 min, step by step)

Firebase Questions?
→ FIREBASE_SETUP.md (Firebase Console guide)

Deploy Questions?
→ DEPLOYMENT_GUIDE.md (Hosting guide)

System Design?
→ ARCHITECTURE_DIAGRAMS.md (diagrams)

Troubleshooting?
→ FIREBASE_INTEGRATION_CHECKLIST.md

Project Overview?
→ FIREBASE_README.md

Need Details?
→ FIREBASE_INTEGRATION_SUMMARY.md

Complete Setup?
→ SETUP_INSTRUCTIONS.md
```

---

## 🎬 Action Items

**TODAY:**
- [ ] Read QUICK_START.md (5 min)
- [ ] Create Firebase project (15 min)
- [ ] Update .env.local (2 min)

**TOMORROW:**
- [ ] npm run dev & test (10 min)
- [ ] Check Firestore has data
- [ ] Deploy with firebase (5 min)

**RESULT:**
- Website live on internet! 🚀
- Public URL ready to share
- Admin dashboard working
- Data persisting in Firestore

---

## 📈 Success Metrics

```
✅ Firebase project created
✅ Configuration values in .env.local
✅ npm run dev works
✅ Website loads on localhost:3000
✅ Form submission works
✅ Data in Firestore
✅ Admin page shows data
✅ firebase deploy succeeds
✅ Website accessible on public URL
✅ No console errors
```

---

## 💻 System Requirements

```
✅ Node.js (v14+)
✅ npm or yarn
✅ Firebase account (free)
✅ Git (optional)
✅ VS Code (optional, any editor works)
✅ Internet connection
✅ Web browser (Chrome/Firefox/Safari)
```

---

## 🎓 Learning Outcomes

After completing this:

You will know:
✅ How to create Firebase project
✅ How to connect Next.js to Firebase
✅ How to use Firestore database
✅ How to deploy website to internet
✅ How to manage registration data
✅ How to upload files

You will have:
✅ Live website on internet
✅ Working registration system
✅ Admin dashboard
✅ Firestore database
✅ Cloud storage setup

---

## 🚀 Quick Commands Cheat Sheet

```bash
# Setup
npm install firebase
npm run dev

# Configure
# Edit .env.local with Firebase values
# Restart terminal

# Test
curl localhost:3000
# OR open browser to localhost:3000

# Deploy
npm run build
firebase init hosting
firebase deploy

# Cleanup
rm -rf node_modules
npm install
```

---

## 🎁 Bonus Features Ready

- ✅ File upload component
- ✅ Form validation
- ✅ Loading indicators
- ✅ Error handling
- ✅ Security rules
- ✅ Admin protection
- ✅ Real-time sync
- ✅ Responsive design

---

## ⏱️ Time Breakdown

```
Reading time:       5 min (QUICK_START.md)
Firebase setup:     15 min (Firebase Console)
Config update:      2 min (.env.local)
Local testing:      10 min (npm run dev)
Building:           2 min (npm run build)
Deployment:         5 min (firebase deploy)
Verification:       5 min (check website)
────────────────────────────
TOTAL TIME:         ~44 minutes
```

---

**Status:** ✅ Ready to Launch!

**Next Step:** 👉 Read `QUICK_START.md`

**Estimated Time:** 30-45 minutes to live website

---

*Quick Reference v1.0*  
*Last Updated: 26 January 2026*
