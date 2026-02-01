# Deployment Guide

Panduan deploy Mechatron Website ke production.

## 🚀 Deployment Options

| Platform | Pros | Cons |
|----------|------|------|
| **Vercel** | Gratis, auto deploy, optimal untuk Next.js | - |
| **Firebase Hosting** | Integrated dengan Firebase services | Manual build |
| **Netlify** | Gratis, mudah setup | Perlu adapter |

## 📦 Vercel (Recommended)

### 1. Push ke GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect Vercel

1. Buka [Vercel](https://vercel.com)
2. "Import Project"
3. Connect GitHub repository
4. Pilih repository `mechatron`

### 3. Configure Environment

Di Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Deploy

Klik "Deploy" - Vercel akan auto-build dan deploy.

### 5. Custom Domain (Optional)

1. Settings → Domains
2. Add domain: `mechatron.com`
3. Configure DNS di domain registrar

---

## 🔥 Firebase Hosting

### 1. Build Project

```bash
npm run build
```

### 2. Configure Firebase

Edit `firebase.json`:
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 3. Export Static

Tambah di `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
};
```

### 4. Build & Export

```bash
npm run build
```

### 5. Deploy

```bash
firebase deploy --only hosting
```

---

## 🔄 CI/CD dengan GitHub Actions

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## ✅ Pre-deployment Checklist

### Code Quality
- [ ] `npm run lint` - No errors
- [ ] `npm run build` - Build successful
- [ ] Test all pages manually

### Security
- [ ] Environment variables set
- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] Remove console.log statements

### Content
- [ ] All placeholder content replaced
- [ ] Images optimized
- [ ] Links working

### SEO
- [ ] Meta tags set
- [ ] Open Graph images
- [ ] Sitemap generated

---

## 📊 Post-deployment

### Monitor
- Check Vercel Analytics
- Firebase Console → Usage
- Google Search Console

### Maintenance
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🐛 Troubleshooting

### Build Failed
```
Error: Build failed
```
**Solution:**
1. Check build logs
2. Run `npm run build` locally
3. Fix TypeScript/ESLint errors

### 404 on Refresh
**Solution:**
Configure rewrites/redirects untuk SPA routing.

### Environment Variables Not Working
**Solution:**
1. Pastikan prefix `NEXT_PUBLIC_`
2. Redeploy setelah add env vars
3. Clear Vercel cache

### Slow Performance
**Solution:**
1. Enable caching
2. Optimize images
3. Use CDN
4. Enable compression

---

Next: [API Reference →](./07-api-reference.md)
