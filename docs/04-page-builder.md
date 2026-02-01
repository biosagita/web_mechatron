# Page Builder Documentation

Panduan lengkap menggunakan Page Builder untuk membuat custom pages.

## 🎯 Overview

Page Builder memungkinkan pembuatan halaman custom dengan berbagai section types tanpa coding. Cocok untuk:
- Landing page kursus
- Halaman promosi
- Halaman informasi
- Artikel dengan layout kustom

## 🚀 Akses Page Builder

1. Login ke admin: `/admin/login`
2. Buka menu **Page Builder** di sidebar
3. Atau akses langsung: `/admin/pages`

## 📝 Membuat Page Baru

### 1. Isi Informasi Dasar

| Field | Keterangan |
|-------|------------|
| **Title** | Judul halaman (wajib) |
| **Slug** | URL path, contoh: `robotics-junior` → `/pages/robotics-junior` |
| **Page Type** | Standalone, Linked to Course, atau Linked to News |

### 2. Pilih Page Type

- **Standalone**: Halaman mandiri, akses via `/pages/[slug]`
- **Linked to Course**: Muncul saat membuka course detail
- **Linked to News**: Muncul saat membuka news detail

### 3. Tambahkan Sections

Klik section type yang diinginkan lalu isi form.

---

## 🧩 Section Types

### 🎯 Hero Section
Banner utama dengan judul besar dan tombol CTA.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Badge | Label kecil di atas judul (opsional) |
| Title | Judul utama |
| Subtitle | Subtitle pendek |
| Description | Deskripsi lebih detail |
| Button 1 Text/Link | Tombol CTA utama |
| Button 2 Text/Link | Tombol sekunder (opsional) |
| Background Image | URL gambar background |

**Preview:**
```
┌──────────────────────────────────────┐
│           [BADGE]                    │
│       JUDUL UTAMA                    │
│         Subtitle                     │
│                                      │
│   [Button 1]   [Button 2]           │
└──────────────────────────────────────┘
```

---

### 📝 Text + Image
Kombinasi teks dan gambar berdampingan.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Badge | Label kecil |
| Title | Judul section |
| Content | Konten teks (multi paragraf) |
| Image URL | URL gambar |
| Image Position | Gambar di kiri/kanan |
| Button Text/Link | Tombol (opsional) |

**Preview:**
```
┌──────────────────────────────────────┐
│ [BADGE]                              │
│ Title              ┌──────────┐     │
│                    │          │     │
│ Paragraph 1        │  IMAGE   │     │
│ Paragraph 2        │          │     │
│                    └──────────┘     │
│ [Button]                             │
└──────────────────────────────────────┘
```

---

### 🖼️ Image Grid
Grid gambar untuk galeri atau portfolio.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Subtitle | Deskripsi |
| Images | URL gambar (satu per baris) |
| Columns | Jumlah kolom (2-4) |

**Input Format:**
```
https://example.com/img1.jpg
https://example.com/img2.jpg
https://example.com/img3.jpg
```

---

### 📊 Statistics
Tampilan angka statistik yang menarik.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Items | Format: `angka|label` per baris |

**Input Format:**
```
500+|Siswa Terdaftar
50+|Pengajar Profesional
100%|Tingkat Kepuasan
```

**Preview:**
```
┌──────────────────────────────────────┐
│         Pencapaian Kami              │
│                                      │
│   500+        50+        100%        │
│   Siswa     Pengajar    Kepuasan    │
└──────────────────────────────────────┘
```

---

### 💬 Testimonial
Kutipan testimoni dengan avatar.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Quote | Kutipan/testimoni |
| Author | Nama pemberi testimoni |
| Role | Jabatan/keterangan |
| Avatar URL | Foto (opsional) |

---

### 📰 Two Columns
Layout 2 kolom fleksibel.

**Fields untuk setiap kolom:**
- Title
- Content (multi paragraf)
- Images (multiple URLs)

---

### 🃏 Cards
Grid card untuk layanan/produk.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Subtitle | Deskripsi section |
| Items | JSON array of cards |
| Columns | Jumlah kolom |

**JSON Format:**
```json
[
  {
    "icon": "🤖",
    "title": "Robotika",
    "description": "Belajar membuat robot",
    "image": "https://...",
    "link": "/courses/robotics"
  }
]
```

---

### 🎬 Video
Embed video YouTube.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Subtitle | Deskripsi |
| YouTube URL | Link video YouTube |

**Supported formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

---

### ✅ Features List
Daftar fitur dengan ikon centang.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Subtitle | Deskripsi |
| Items | Satu item per baris, atau `judul|deskripsi` |

**Input Format:**
```
Pengajar Berpengalaman|Tim profesional bersertifikat
Kurikulum Terupdate|Materi selalu mengikuti perkembangan
Sertifikat Resmi
```

---

### 🚀 Call to Action
Section ajakan dengan tombol.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Headline CTA |
| Description | Penjelasan singkat |
| Button 1 Text/Link | Tombol utama |
| Button 2 Text/Link | Tombol sekunder |
| Background Image | Gambar background (opsional) |

---

### 📄 Text Block
Blok teks sederhana.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul (opsional) |
| Content | Konten teks multi paragraf |

---

### 🌄 Single Image
Gambar tunggal dengan caption.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul (opsional) |
| Image URL | URL gambar |
| Caption | Keterangan gambar |

---

### 🎨 Gallery (Context)
Galeri dari data yang sudah ada di sistem.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Title | Judul section |
| Description | Deskripsi |
| Category Filter | Filter berdasarkan kategori (opsional) |

---

### ➖ Divider
Garis pemisah antar section.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Style | Normal atau Thick |
| Color | Warna garis |

---

### ⬜ Spacer
Ruang kosong untuk spacing.

**Fields:**
| Field | Keterangan |
|-------|------------|
| Height | Tinggi dalam pixel |

---

## 🔗 Menghubungkan Page ke Konten

### Ke Course
1. Di Page Builder, pilih type "Linked to Course"
2. Pilih course target
3. Atau: Di `/admin/courses`, pilih custom page untuk course

### Ke News
1. Di `/admin/news`, edit berita
2. Pilih custom page dari dropdown
3. Berita akan menampilkan custom page instead of konten biasa

---

## 💡 Tips & Best Practices

1. **Urutan Section**
   - Mulai dengan Hero untuk impact
   - Akhiri dengan CTA

2. **Image Optimization**
   - Gunakan gambar yang sudah dioptimasi
   - Ukuran ideal: 1200x630px untuk hero

3. **Mobile First**
   - Semua section responsive
   - Preview di mobile sebelum publish

4. **Konsistensi**
   - Gunakan warna dan font yang konsisten
   - Badge untuk kategorisasi

---

## 🔍 Preview & Testing

1. Save page
2. Buka preview: `/pages/[slug]`
3. Test di berbagai device

---

Next: [Firebase →](./05-firebase.md)
