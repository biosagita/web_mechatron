# 🗺️ Firebase Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     MECHATRON WEBSITE                        │
│                   (Next.js + React)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   ┌─────────────┐          ┌─────────────────┐
   │  Frontend   │          │ ContentContext  │
   │  Components │          │ (State + API)   │
   └──────┬──────┘          └────────┬────────┘
          │                          │
          │        ┌────────────────┴────────────────┐
          │        │                                 │
          ▼        ▼                                 ▼
     ┌─────────────────────────────────────────────────────┐
     │         Firebase SDK                                │
     │  (src/lib/firebase.ts)                              │
     └─────────────┬────────────────┬────────┬───────────┘
                   │                │        │
        ┌──────────┴─┐      ┌───────┴──┐   ┌┴──────────┐
        │            │      │          │   │           │
        ▼            ▼      ▼          ▼   ▼           ▼
   ┌─────────┐  ┌────────┐ ┌──────┐  ┌──┐ ┌───────┐ ┌────┐
   │Firestore│  │Storage │ │Auth  │  │DB│ │ Rules │ │Log │
   │Database │  │(Photos)│ │Users │  │  │ │       │ │    │
   │         │  │        │ │      │  │  │ │       │ │    │
   └────┬────┘  └───┬────┘ └──┬───┘  │  │ │       │ │    │
        │           │         │      │  │ │       │ │    │
        └─────┬─────┴────┬────┘      │  │ │       │ │    │
              │          │           │  │ │       │ │    │
              ▼          ▼           ▼  │ │       │ │    │
        ┌─────────────────────────────────────────────────┐
        │        FIREBASE SERVICES                        │
        │    (Backend as a Service - BaaS)                │
        └─────────────────────────────────────────────────┘
              │          │           │  │ │       │ │    │
              └─────┬────┴───────────┴──┴─┴───────┴─┴────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
   ┌─────────┐            ┌──────────┐
   │ Internet│            │   Admin  │
   │ & Mobil │            │ Dashboard│
   └─────────┘            └──────────┘
```

---

## Data Flow Diagram

### Registration Submission Flow

```
Student Fill Form
        │
        ▼
    Validation
   (Client-side)
        │
        ├─ Error? ─Yes─► Show Error Message
        │                      │
        │                      ▼
        │                  User fixes
        │                      │
        │                      └──┐
        │                         │
        │                         ▼
        │◄────────────────────────┘
        │
        No
        │
        ▼
  Show Loading
  "Sedang Mengirim..."
        │
        ▼
  Call addRegistration()
        │
        ▼
Firebase SDK
        │
        ▼
  Send to Firestore
        │
        ├─ Success ──► Save in DB ──► Return ID
        │
        ├─ Error ────► Show Error Message
        │
        ▼
Update Context State
        │
        ▼
Show Success Modal
"Atas nama [nama] berhasil..."
        │
        ├─ Auto close after 5s
        │
        ▼
Reset Form
        │
        ▼
Data appears in
Admin Dashboard
(auto refresh)
```

---

## Admin Dashboard Data Flow

```
Admin open page
        │
        ▼
ComponentProvider loads
        │
        ▼
useEffect hook triggers
        │
        ▼
loadRegistrationsFromFirestore()
        │
        ▼
Query Firestore collection
        │
        ▼
Get all registration documents
        │
        ▼
Update React state
        │
        ▼
Components re-render
with fresh data
        │
        ├─► Display count
        ├─► Show stat cards
        ├─► List registrations
        │
        ▼
User can Edit/Delete
        │
        ├─ Click Edit ──► updateRegistration()
        │
        ├─ Click Delete ─► deleteRegistration()
        │
        ▼
Changes saved to Firestore
        │
        ▼
State updated
        │
        ▼
UI reflects changes
immediately
```

---

## File Upload Flow

```
User select file
        │
        ▼
FileUpload Component
        │
        ▼
Validate:
├─ File type?
├─ File size?
└─ Check requirements
        │
        ├─ Invalid ──► Show Error
        │
        No
        │
        ▼
Show "Uploading..."
        │
        ▼
Create unique filename
(timestamp + name)
        │
        ▼
Upload to
Cloud Storage
        │
        │
        ├─ Success ──► Get download URL
        │
        ├─ Error ────► Show Error message
        │
        ▼
Save URL to state
        │
        ▼
Show "Upload Berhasil ✓"
        │
        ▼
Return URL to form
(for registration)
        │
        ▼
Save with registration
to Firestore
```

---

## Real-time Sync Architecture

```
┌──────────────────────┐
│   Multiple Admins    │
│   Connected to Web   │
└──────────────────────┘
        │    │    │
        │    │    │
        ▼    ▼    ▼
  Admin 1  Admin 2  Admin 3
  Dashboard Dashboard Dashboard
        │    │    │
        │    │    │
        └────┼────┘
             │
             ▼
        Firestore
        Real-time
        Listener
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
  Admin 1  Admin 2  Admin 3
  
  [Auto-update jika ada changes!]
  
Setup dengan: onSnapshot() hook
```

---

## Security Rules Flow

```
Client Make Request
        │
        ▼
Firebase Check:
├─ Is user authenticated?
│   └─ No ──► Deny Access
│
├─ Check Firestore Rules
│   ├─ Can read?
│   ├─ Can write?
│   └─ Can delete?
│
├─ Check Storage Rules
│   ├─ File size OK?
│   ├─ File type OK?
│   └─ User authorized?
│
└─ File size limit?
        │
        ├─ Approved ──► Proceed
        │
        └─ Denied ────► Return Error
```

---

## Database Schema

```
FIRESTORE
├── Collections
│   ├── registrations
│   │   ├── Document 1
│   │   │   ├── namaAnak: "Budi"
│   │   │   ├── usiaAnak: "12"
│   │   │   ├── asalSekolah: "SD Negeri 1"
│   │   │   ├── program: "beginner"
│   │   │   ├── status: "Baru"
│   │   │   ├── tanggalDaftar: timestamp
│   │   │   └── [more fields...]
│   │   │
│   │   └── Document 2
│   │       └── [similar structure]
│   │
│   ├── news (future)
│   │   └── [documents]
│   │
│   ├── gallery (future)
│   │   └── [documents]
│   │
│   └── schedule (future)
│       └── [documents]
│
└── (other collections)

CLOUD STORAGE
├── /uploads
│   ├── 1705050600123_photo.jpg
│   ├── 1705050603456_video.mp4
│   └── [more files...]
```

---

## Component Interaction

```
┌──────────────────────────────┐
│  App Layout (app.tsx)        │
│  └─ AuthProvider             │
│     └─ ContentProvider       │
│        └─ Other Providers    │
└──────────┬───────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌────────┐   ┌───────────┐
│Public  │   │  Admin    │
│Routes  │   │  Routes   │
│        │   │           │
│├─ /    │   │├─ /admin  │
│├─ /...│   │├─ /login  │
│└─ /... │   │├─ /regs  │
│        │   │└─ /...   │
└────────┘   └───────────┘
```

---

## Local Development Setup

```
Developer Machine
├── Code Editor (VS Code)
├── Node.js / npm
├── Git
├── Next.js Dev Server
│   └─ Localhost:3000
└── Firebase Emulator (optional)
    └─ Test offline
```

---

## Production Deployment

```
┌────────────────┐
│  Git (GitHub)  │
│   Repository   │
└────────┬───────┘
         │
         ▼
┌────────────────┐     ┌─────────────────┐
│ Firebase       │────▶│ Auto Build &    │
│ Console        │     │ Deploy Pipeline │
└────────────────┘     └────────┬────────┘
                                │
                                ▼
                        ┌──────────────┐
                        │Firebase      │
                        │Hosting CDN   │
                        │              │
                        │web.app URL   │
                        └──────────────┘
                                │
                                ▼
                        ┌──────────────┐
                        │  Global      │
                        │  Users       │
                        │  (Internet)  │
                        └──────────────┘
```

---

## Environment Configuration

```
Development                Production
│                          │
├─ .env.local (git ignore) ├─ Firebase Console
│  ├─ Dev Firebase config  │  ├─ Production DB
│  ├─ npm run dev          │  ├─ Auto scaling
│  ├─ Localhost:3000       │  └─ CDN worldwide
│  └─ Hot reload           │
│                          │
└─ Local testing           └─ Live website
   offline OK                 24/7 available
```

---

## Scaling Architecture (Future)

```
Current:              After Growth:
│                     │
Firebase Standard  → Firebase Premium
├─ 50K read/day      ├─ Unlimited
├─ 50K write/day     ├─ Auto scaling
├─ 5GB storage       ├─ TB storage
└─ ~$25/month        └─ Pay as you go


       Further:      Enterprise:
       │             │
     Multi-region → Global distribution
       ├─ Load      ├─ Multiple regions
       │  balancer  ├─ Replication
       └─ 99.99%    └─ 99.999%
         uptime       uptime
```

---

## Key Takeaways

✅ **Serverless Architecture** - No server to manage
✅ **Real-time Sync** - Data updates instantly
✅ **Automatic Scaling** - Handle growth automatically
✅ **Built-in Security** - Authentication & Rules
✅ **Global CDN** - Fast delivery worldwide
✅ **Easy Monitoring** - Dashboard & Logs
✅ **Backup Included** - Daily automatic backups

---

*Last updated: 26 January 2026*
