'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { CustomPage, PageSection, CourseItem } from '@/context/ContentContext';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Eye, X, ArrowLeft, Save, FileText, Layers } from 'lucide-react';
import { ImageUpload, MultiImageUpload } from '@/components/admin';
import PageRenderer from '@/components/shared/PageRenderer';

const SECTION_TYPES = [
  { value: 'hero', label: '🎯 Hero Section', description: 'Banner utama dengan judul, subtitle, dan tombol' },
  { value: 'text-image', label: '📝 Text + Image', description: 'Text di satu sisi dan gambar di sisi lain' },
  { value: 'image-grid', label: '🖼️ Image Grid', description: 'Kumpulan gambar dalam grid' },
  { value: 'stats', label: '📊 Statistics', description: 'Tampilan angka/statistik' },
  { value: 'testimonial', label: '💬 Testimonial', description: 'Kutipan testimoni' },
  { value: 'two-column', label: '📰 Two Columns', description: '2 kolom dengan konten fleksibel' },
  { value: 'cards', label: '🃏 Cards', description: 'Card-based layout' },
  { value: 'video', label: '🎬 Video', description: 'Embed video YouTube' },
  { value: 'features', label: '✅ Features List', description: 'Daftar fitur dengan icon' },
  { value: 'cta', label: '🚀 Call to Action', description: 'Section ajakan bertindak' },
  { value: 'text', label: '📄 Text Block', description: 'Blok teks sederhana' },
  { value: 'image', label: '🌄 Single Image', description: 'Gambar tunggal' },
  { value: 'gallery', label: '🎨 Gallery (Context)', description: 'Galeri dari data context' },
  { value: 'divider', label: '➖ Divider', description: 'Garis pemisah' },
  { value: 'spacer', label: '⬜ Spacer', description: 'Ruang kosong' },
] as const;

// ========== EXAMPLE PAGES ==========
const EXAMPLE_PAGES: Omit<CustomPage, 'id'>[] = [
  {
    title: 'Contoh: Landing Page Kursus',
    slug: 'contoh-landing-kursus',
    sections: [
      { id: 'ex-hero', type: 'hero', order: 1, data: { badge: 'MULAI BELAJAR', title: 'Robotics Beginner Class', subtitle: 'Kelas dasar robotika untuk pemula', description: 'Pelajari dasar-dasar robotika dan pemrograman Arduino dalam 12 sesi. Cocok untuk usia 8-14 tahun.', buttonText: 'Daftar Sekarang', buttonLink: '/register', buttonText2: 'Lihat Jadwal', buttonLink2: '#jadwal' } },
      { id: 'ex-text-image', type: 'text-image', order: 2, data: { badge: 'TENTANG KURSUS', title: 'Apa yang Akan Dipelajari?', content: 'Siswa akan mempelajari konsep dasar elektronika, pemrograman mikrokontroler Arduino, dan desain robot sederhana.\n\nMateri disusun secara bertahap dari teori hingga praktik langsung membuat robot yang bisa bergerak dan berinteraksi.', imagePosition: 'right', buttonText: 'Lihat Kurikulum', buttonLink: '/courses' } },
      { id: 'ex-stats', type: 'stats', order: 3, data: { title: 'Pencapaian Kursus Ini', items: [{ number: '200+', label: 'Siswa Lulus' }, { number: '96%', label: 'Tingkat Kepuasan' }, { number: '12', label: 'Sesi Pertemuan' }, { number: '3', label: 'Proyek Robot' }] } },
      { id: 'ex-features', type: 'features', order: 4, data: { title: 'Keunggulan Program', subtitle: 'Mengapa memilih kelas ini', items: [{ title: 'Pengajar Bersertifikat', description: 'Semua pengajar memiliki sertifikasi resmi di bidang robotika' }, { title: 'Peralatan Lengkap', description: 'Semua materials dan peralatan disediakan oleh Mechatron' }, { title: 'Kelas Kecil', description: 'Maksimal 12 siswa per kelas untuk perhatian optimal' }, { title: 'Sertifikat Kelulusan', description: 'Mendapatkan sertifikat resmi setelah menyelesaikan program' }] } },
      { id: 'ex-video', type: 'video', order: 5, data: { title: 'Video Profil Kelas', subtitle: 'Lihat suasana belajar di Mechatron', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } },
      { id: 'ex-testimonial', type: 'testimonial', order: 6, data: { quote: 'Anak saya sangat antusias setiap kali kelas robotika. Dalam 3 bulan sudah bisa membuat robot sendiri!', author: 'Ibu Sari', role: 'Orang tua siswa' } },
      { id: 'ex-cta', type: 'cta', order: 7, data: { title: 'Siap Bergabung?', description: 'Daftarkan anak Anda sekarang dan dapatkan kelas trial gratis!', buttonText: 'Daftar Sekarang', buttonLink: '/register', buttonText2: 'Hubungi Kami', buttonLink2: 'https://wa.me/6281234567890' } },
    ],
  },
  {
    title: 'Contoh: Profil Sekolah',
    slug: 'contoh-profil-sekolah',
    sections: [
      { id: 'ex2-hero', type: 'hero', order: 1, data: { badge: 'SELAMAT DATANG', title: 'Mechatron Robotic School', subtitle: 'Sekolah Robotika #1 di Indonesia', description: 'Membangun generasi inovator melalui pendidikan robotika berkualitas sejak 2015.', buttonText: 'Tentang Kami', buttonLink: '#tentang' } },
      { id: 'ex2-cards', type: 'cards', order: 2, data: { title: 'Program Unggulan', subtitle: 'Pilih program yang sesuai', columns: 3, items: [{ icon: '🤖', title: 'Robotics Beginner', description: 'Kelas dasar untuk usia 8-12 tahun' }, { icon: '💻', title: 'Coding & IoT', description: 'Pemrograman dan Internet of Things' }, { icon: '🚁', title: 'Drone Academy', description: 'Belajar membuat dan menerbangkan drone' }] } },
      { id: 'ex2-two-col', type: 'two-column', order: 3, data: { leftTitle: 'Visi Kami', leftContent: 'Menjadi lembaga pendidikan robotika terdepan yang menghasilkan generasi muda yang inovatif, kreatif, dan siap menghadapi era revolusi industri 4.0.', rightTitle: 'Misi Kami', rightContent: 'Menyediakan pendidikan robotika berkualitas tinggi yang terjangkau.\nMengembangkan kurikulum yang up-to-date sesuai perkembangan teknologi.\nMembina karakter dan soft skill melalui project-based learning.' } },
      { id: 'ex2-image-grid', type: 'image-grid', order: 4, data: { title: 'Galeri Kegiatan', subtitle: 'Dokumentasi aktivitas siswa kami', columns: 3, images: [] } },
      { id: 'ex2-text', type: 'text', order: 5, data: { title: 'Sejarah Singkat', content: 'Mechatron Robotic School didirikan pada tahun 2015 oleh sekelompok profesional di bidang teknologi dan pendidikan. Berawal dari sebuah ruang kelas kecil dengan 10 siswa, kini Mechatron telah berkembang menjadi salah satu sekolah robotika terbesar dengan ratusan siswa aktif.\n\nKami percaya bahwa setiap anak memiliki potensi untuk menjadi inovator. Dengan metode pembelajaran yang menyenangkan dan berbasis proyek, kami membantu siswa mengembangkan kemampuan problem-solving dan critical thinking.' } },
      { id: 'ex2-gallery', type: 'gallery', order: 6, data: { title: 'Hasil Karya Siswa', description: 'Proyek terbaik dari siswa-siswa kami' } },
      { id: 'ex2-divider', type: 'divider', order: 7, data: { style: 'thick', color: 'border-orange-500' } },
      { id: 'ex2-spacer', type: 'spacer', order: 8, data: { height: 40 } },
      { id: 'ex2-image', type: 'image', order: 9, data: { title: 'Fasilitas Kami', caption: 'Lab robotika dengan peralatan terbaru' } },
      { id: 'ex2-cta', type: 'cta', order: 10, data: { title: 'Kunjungi Kami', description: 'Ingin melihat langsung fasilitas dan suasana belajar di Mechatron?', buttonText: 'Jadwalkan Kunjungan', buttonLink: '/register' } },
    ],
  },
];

// ========== MAIN COMPONENT ==========
export default function AdminPages() {
  const { pages, addPage, updatePage, deletePage } = useContent();

  // View mode: 'list' (main page list with preview) or 'editor' (section editor with live preview)
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [selectedPageId, setSelectedPageId] = useState<string>('');
  const [editingId, setEditingId] = useState<string>('');
  const [formData, setFormData] = useState<Omit<CustomPage, 'id'>>({
    title: '',
    slug: '',
    sections: [],
  });
  const [newSection, setNewSection] = useState<Partial<PageSection>>({
    type: 'hero',
    data: {},
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const selectedPage = pages.find(p => p.id === selectedPageId);

  const toggleSectionExpand = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Load page data when editing
  useEffect(() => {
    if (editingId && editingId.length > 10) {
      const page = pages.find((p) => p.id === editingId);
      if (page) {
        setFormData({ title: page.title, slug: page.slug, sections: page.sections });
      }
    }
  }, [editingId, pages]);

  // Auto-select first page if none selected
  useEffect(() => {
    if (!selectedPageId && pages.length > 0) {
      setSelectedPageId(pages[0].id);
    }
  }, [pages, selectedPageId]);

  const handleAddSection = () => {
    if (!newSection.type) return;
    const section: PageSection = {
      id: Date.now().toString(),
      type: newSection.type as any,
      order: (formData.sections?.length || 0) + 1,
      data: newSection.data || {},
    };
    setFormData(prev => ({ ...prev, sections: [...(prev.sections || []), section] }));
    setNewSection({ type: 'hero', data: {} });
  };

  const handleRemoveSection = (id: string) => {
    setFormData(prev => ({ ...prev, sections: prev.sections?.filter(s => s.id !== id) || [] }));
  };

  const handleUpdateSectionData = (id: string, key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections?.map(s =>
        s.id === id ? { ...s, data: { ...s.data, [key]: value } } : s
      ),
    }));
  };

  const handleMoveSectionUp = (idx: number) => {
    if (idx === 0) return;
    setFormData(prev => {
      const sections = [...(prev.sections || [])];
      [sections[idx - 1], sections[idx]] = [sections[idx], sections[idx - 1]];
      return { ...prev, sections };
    });
  };

  const handleMoveSectionDown = (idx: number) => {
    if (idx >= (formData.sections?.length || 0) - 1) return;
    setFormData(prev => {
      const sections = [...(prev.sections || [])];
      [sections[idx], sections[idx + 1]] = [sections[idx + 1], sections[idx]];
      return { ...prev, sections };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!formData.title || !formData.slug) {
        setMessage('Title dan slug harus diisi');
        setLoading(false);
        return;
      }
      if (editingId && editingId.length > 10) {
        await updatePage(editingId, formData);
        setMessage('Page berhasil diupdate!');
      } else {
        const newId = await addPage(formData);
        setMessage('Page berhasil ditambahkan!');
        setEditingId(newId);
      }
    } catch {
      setMessage('Error menyimpan page');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus page ini?')) return;
    setLoading(true);
    try {
      await deletePage(id);
      setMessage('Page berhasil dihapus');
      setViewMode('list');
      setEditingId('');
      setSelectedPageId(pages.find(p => p.id !== id)?.id || '');
      setFormData({ title: '', slug: '', sections: [] });
    } catch {
      setMessage('Error menghapus page');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPage = () => {
    setEditingId('');
    setFormData({ title: '', slug: '', sections: [] });
    setExpandedSections(new Set());
    setViewMode('editor');
  };

  const handleEditPage = (pageId: string) => {
    setEditingId(pageId);
    setExpandedSections(new Set());
    setViewMode('editor');
  };

  const handleCreateExample = async (example: Omit<CustomPage, 'id'>) => {
    setLoading(true);
    try {
      await addPage(example);
      setMessage(`Contoh page "${example.title}" berhasil dibuat!`);
    } catch {
      setMessage('Error membuat contoh page');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingId('');
    setFormData({ title: '', slug: '', sections: [] });
    setMessage('');
  };

  // ========== SECTION FORM RENDERER ==========
  const renderSectionForm = (section: PageSection) => {
    const inputClass = "w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition";
    const labelClass = "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide";

    switch (section.type) {
      case 'hero':
        return (<>
          <div><label className={labelClass}>Badge (opsional)</label><input type="text" placeholder="e.g., PROMO SPESIAL" value={section.data.badge || ''} onChange={(e) => handleUpdateSectionData(section.id, 'badge', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Judul Utama *</label><input type="text" placeholder="Judul hero section" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle</label><input type="text" placeholder="Subtitle singkat" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Deskripsi</label><textarea placeholder="Deskripsi lebih detail" value={section.data.description || ''} onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)} className={inputClass} rows={3} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Tombol 1 Text</label><input type="text" placeholder="Daftar Sekarang" value={section.data.buttonText || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tombol 1 Link</label><input type="text" placeholder="/register" value={section.data.buttonLink || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Tombol 2 Text</label><input type="text" placeholder="Pelajari Lebih Lanjut" value={section.data.buttonText2 || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonText2', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tombol 2 Link</label><input type="text" placeholder="#about" value={section.data.buttonLink2 || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink2', e.target.value)} className={inputClass} /></div>
          </div>
          <ImageUpload value={section.data.image || ''} onChange={(url) => handleUpdateSectionData(section.id, 'image', url)} folder="pages" label="Background Image" />
        </>);
      case 'text-image':
        return (<>
          <div><label className={labelClass}>Badge (opsional)</label><input type="text" placeholder="TENTANG KAMI" value={section.data.badge || ''} onChange={(e) => handleUpdateSectionData(section.id, 'badge', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Judul *</label><input type="text" placeholder="Judul section" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Konten</label><textarea placeholder="Konten text" value={section.data.content || ''} onChange={(e) => handleUpdateSectionData(section.id, 'content', e.target.value)} className={inputClass} rows={5} /></div>
          <ImageUpload value={section.data.image || ''} onChange={(url) => handleUpdateSectionData(section.id, 'image', url)} folder="pages" label="Gambar *" />
          <div><label className={labelClass}>Posisi Gambar</label><select value={section.data.imagePosition || 'right'} onChange={(e) => handleUpdateSectionData(section.id, 'imagePosition', e.target.value)} className={inputClass}><option value="right">Kanan</option><option value="left">Kiri</option></select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Tombol Text</label><input type="text" placeholder="Selengkapnya" value={section.data.buttonText || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tombol Link</label><input type="text" placeholder="/about" value={section.data.buttonLink || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)} className={inputClass} /></div>
          </div>
        </>);
      case 'image-grid':
        return (<>
          <div><label className={labelClass}>Judul (opsional)</label><input type="text" placeholder="Galeri Kegiatan" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle (opsional)</label><input type="text" placeholder="Dokumentasi" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /></div>
          <MultiImageUpload value={section.data.images || []} onChange={(urls) => handleUpdateSectionData(section.id, 'images', urls)} folder="pages" label="Gambar-gambar" maxFiles={20} />
          <div><label className={labelClass}>Kolom</label><select value={section.data.columns || 4} onChange={(e) => handleUpdateSectionData(section.id, 'columns', parseInt(e.target.value))} className={inputClass}><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option></select></div>
        </>);
      case 'stats':
        return (<>
          <div><label className={labelClass}>Judul (opsional)</label><input type="text" placeholder="Pencapaian Kami" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Statistics (format: angka|label, satu per baris)</label>
            <textarea placeholder={"500+|Siswa Terdaftar\n50+|Pengajar\n100%|Kepuasan"} value={(section.data.items || []).map((s: any) => `${s.number}|${s.label}`).join('\n')} onChange={(e) => {
              const items = e.target.value.split('\n').filter(l => l.trim()).map(l => { const [number, label] = l.split('|'); return { number: number?.trim() || '', label: label?.trim() || '' }; });
              handleUpdateSectionData(section.id, 'items', items);
            }} className={inputClass} rows={5} />
          </div>
        </>);
      case 'testimonial':
        return (<>
          <div><label className={labelClass}>Kutipan *</label><textarea placeholder="Testimoni..." value={section.data.quote || ''} onChange={(e) => handleUpdateSectionData(section.id, 'quote', e.target.value)} className={inputClass} rows={4} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Nama *</label><input type="text" placeholder="John Doe" value={section.data.author || ''} onChange={(e) => handleUpdateSectionData(section.id, 'author', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Role</label><input type="text" placeholder="CEO" value={section.data.role || ''} onChange={(e) => handleUpdateSectionData(section.id, 'role', e.target.value)} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Avatar URL</label><input type="text" placeholder="https://..." value={section.data.avatar || ''} onChange={(e) => handleUpdateSectionData(section.id, 'avatar', e.target.value)} className={inputClass} /></div>
        </>);
      case 'two-column':
        return (<>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h5 className="text-slate-800 font-semibold mb-3 text-sm">Kolom Kiri</h5>
            <div className="space-y-2">
              <div><label className={labelClass}>Judul</label><input type="text" placeholder="Judul kiri" value={section.data.leftTitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'leftTitle', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Konten</label><textarea placeholder="Konten kiri" value={section.data.leftContent || ''} onChange={(e) => handleUpdateSectionData(section.id, 'leftContent', e.target.value)} className={inputClass} rows={4} /></div>
              <MultiImageUpload value={section.data.leftImages || []} onChange={(urls) => handleUpdateSectionData(section.id, 'leftImages', urls)} folder="pages" label="Gambar" maxFiles={5} />
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <h5 className="text-slate-800 font-semibold mb-3 text-sm">Kolom Kanan</h5>
            <div className="space-y-2">
              <div><label className={labelClass}>Judul</label><input type="text" placeholder="Judul kanan" value={section.data.rightTitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'rightTitle', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Konten</label><textarea placeholder="Konten kanan" value={section.data.rightContent || ''} onChange={(e) => handleUpdateSectionData(section.id, 'rightContent', e.target.value)} className={inputClass} rows={4} /></div>
              <MultiImageUpload value={section.data.rightImages || []} onChange={(urls) => handleUpdateSectionData(section.id, 'rightImages', urls)} folder="pages" label="Gambar" maxFiles={5} />
            </div>
          </div>
        </>);
      case 'cards':
        return (<>
          <div><label className={labelClass}>Judul (opsional)</label><input type="text" placeholder="Layanan Kami" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle (opsional)</label><input type="text" placeholder="Layanan unggulan" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Cards (JSON)</label>
            <textarea placeholder='[{"icon":"🤖","title":"Robotika","description":"Belajar robot"}]' value={JSON.stringify(section.data.items || [], null, 2)} onChange={(e) => { try { handleUpdateSectionData(section.id, 'items', JSON.parse(e.target.value)); } catch { } }} className={inputClass + ' font-mono text-xs'} rows={8} />
          </div>
          <div><label className={labelClass}>Kolom</label><select value={section.data.columns || 3} onChange={(e) => handleUpdateSectionData(section.id, 'columns', parseInt(e.target.value))} className={inputClass}><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option></select></div>
        </>);
      case 'video':
        return (<>
          <div><label className={labelClass}>Judul</label><input type="text" placeholder="Video Profil" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle</label><input type="text" placeholder="Kenali kami" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>YouTube URL *</label><input type="text" placeholder="https://youtube.com/watch?v=xxx" value={section.data.url || ''} onChange={(e) => handleUpdateSectionData(section.id, 'url', e.target.value)} className={inputClass} /></div>
        </>);
      case 'features':
        return (<>
          <div><label className={labelClass}>Judul (opsional)</label><input type="text" placeholder="Fitur Unggulan" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Subtitle (opsional)</label><input type="text" placeholder="Mengapa kami" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Features (judul|deskripsi, per baris)</label>
            <textarea placeholder={"Pengajar Berpengalaman|Tim profesional\nKurikulum Terupdate"} value={(section.data.items || []).map((f: any) => typeof f === 'string' ? f : `${f.title}${f.description ? '|' + f.description : ''}`).join('\n')} onChange={(e) => {
              const items = e.target.value.split('\n').filter(l => l.trim()).map(l => { const [title, description] = l.split('|'); return description ? { title: title.trim(), description: description.trim() } : title.trim(); });
              handleUpdateSectionData(section.id, 'items', items);
            }} className={inputClass} rows={6} />
          </div>
        </>);
      case 'cta':
        return (<>
          <div><label className={labelClass}>Judul *</label><input type="text" placeholder="Siap Bergabung?" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Deskripsi</label><textarea placeholder="Ajakan bertindak" value={section.data.description || ''} onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)} className={inputClass} rows={2} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Tombol 1 Text *</label><input type="text" placeholder="Daftar" value={section.data.buttonText || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tombol 1 Link</label><input type="text" placeholder="/register" value={section.data.buttonLink || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)} className={inputClass} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Tombol 2 Text</label><input type="text" placeholder="Hubungi" value={section.data.buttonText2 || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonText2', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Tombol 2 Link</label><input type="text" placeholder="/contact" value={section.data.buttonLink2 || ''} onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink2', e.target.value)} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Background Image</label><input type="text" placeholder="https://..." value={section.data.backgroundImage || ''} onChange={(e) => handleUpdateSectionData(section.id, 'backgroundImage', e.target.value)} className={inputClass} /></div>
        </>);
      case 'text':
        return (<>
          <div><label className={labelClass}>Judul</label><input type="text" placeholder="Judul" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Konten *</label><textarea placeholder="Tulis konten..." value={section.data.content || ''} onChange={(e) => handleUpdateSectionData(section.id, 'content', e.target.value)} className={inputClass} rows={6} /></div>
        </>);
      case 'image':
        return (<>
          <div><label className={labelClass}>Judul</label><input type="text" placeholder="Judul gambar" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <ImageUpload value={section.data.image || ''} onChange={(url) => handleUpdateSectionData(section.id, 'image', url)} folder="pages" label="Gambar *" />
          <div><label className={labelClass}>Caption</label><input type="text" placeholder="Keterangan" value={section.data.caption || ''} onChange={(e) => handleUpdateSectionData(section.id, 'caption', e.target.value)} className={inputClass} /></div>
        </>);
      case 'gallery':
        return (<>
          <div><label className={labelClass}>Judul</label><input type="text" placeholder="Galeri" value={section.data.title || ''} onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Deskripsi</label><input type="text" placeholder="Deskripsi" value={section.data.description || ''} onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Filter Kategori</label><input type="text" placeholder="Robotics" value={section.data.subtitle || ''} onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)} className={inputClass} /><p className="text-xs text-slate-400 mt-1">Kosongkan untuk semua item galeri</p></div>
        </>);
      case 'divider':
        return (<>
          <div><label className={labelClass}>Style</label><select value={section.data.style || 'normal'} onChange={(e) => handleUpdateSectionData(section.id, 'style', e.target.value)} className={inputClass}><option value="normal">Normal</option><option value="thick">Thick</option></select></div>
          <div><label className={labelClass}>Color</label><select value={section.data.color || 'border-gray-700'} onChange={(e) => handleUpdateSectionData(section.id, 'color', e.target.value)} className={inputClass}><option value="border-gray-700">Gray</option><option value="border-orange-500">Orange</option><option value="border-blue-500">Blue</option></select></div>
        </>);
      case 'spacer':
        return (<div><label className={labelClass}>Height (px)</label><input type="number" placeholder="60" value={section.data.height || 60} onChange={(e) => handleUpdateSectionData(section.id, 'height', parseInt(e.target.value) || 60)} className={inputClass} /></div>);
      default:
        return <p className="text-slate-400 text-sm">Tidak ada konfigurasi untuk section ini.</p>;
    }
  };

  // ========== LIST VIEW ==========
  if (viewMode === 'list') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Layers className="w-7 h-7 text-blue-600" />
                Page Builder
              </h1>
              <p className="text-slate-500 text-sm mt-1">{pages.length} halaman tersedia</p>
            </div>
          </div>
        </div>

        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-lg text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {message}
          </div>
        )}

        {/* Main content: list on left, preview on right */}
        <div className="flex h-[calc(100vh-180px)]">
          {/* Left - Page list */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 flex-1 overflow-y-auto space-y-2">
              {pages.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Belum ada halaman</p>
                  <p className="text-slate-400 text-xs mt-1">Klik tombol di bawah untuk membuat</p>
                </div>
              ) : (
                pages.map(page => (
                  <div
                    key={page.id}
                    onClick={() => setSelectedPageId(page.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all group cursor-pointer ${selectedPageId === page.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <div className="font-semibold text-sm truncate">{page.title}</div>
                    <div className={`text-xs mt-1 ${selectedPageId === page.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      /pages/{page.slug}
                    </div>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${selectedPageId === page.id ? 'text-blue-200' : 'text-slate-400'}`}>
                      <Layers className="w-3 h-3" /> {page.sections?.length || 0} sections
                    </div>
                    {/* Edit button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditPage(page.id); }}
                      className={`mt-2 w-full text-xs py-1.5 rounded-lg font-medium transition ${selectedPageId === page.id
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 opacity-0 group-hover:opacity-100'
                        }`}
                    >
                      ✏️ Edit Page
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Example Pages Section */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Contoh Pages</p>
              <div className="space-y-1.5">
                {EXAMPLE_PAGES.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCreateExample(example)}
                    disabled={loading}
                    className="w-full text-left p-2 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition text-xs disabled:opacity-50"
                  >
                    <span className="font-medium text-amber-800">+ {example.title}</span>
                    <span className="block text-amber-600 mt-0.5">{example.sections.length} sections • menggunakan berbagai tipe</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add page button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleNewPage}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-5 h-5" /> Tambah Halaman Baru
              </button>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="flex-1 overflow-y-auto bg-white">
            {selectedPage ? (
              <div>
                {/* Preview header */}
                <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">{selectedPage.title}</h2>
                    <p className="text-xs text-slate-400">/pages/{selectedPage.slug}</p>
                  </div>
                  <button
                    onClick={() => handleEditPage(selectedPage.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    ✏️ Edit Page
                  </button>
                </div>
                {/* Preview content */}
                {selectedPage.sections && selectedPage.sections.length > 0 ? (
                  <PageRenderer sections={selectedPage.sections} />
                ) : (
                  <div className="flex items-center justify-center h-96 text-slate-400">
                    <p>Halaman ini belum memiliki sections.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                  <p className="text-lg font-medium">Pilih halaman untuk preview</p>
                  <p className="text-sm mt-1">Atau buat halaman baru</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== EDITOR VIEW ==========
  return (
    <div className="min-h-screen bg-white">
      {/* Editor Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Kembali">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {editingId && editingId.length > 10 ? 'Edit Page' : 'Halaman Baru'}
            </h1>
            <p className="text-xs text-slate-400">{formData.title || 'Untitled'} • {formData.sections?.length || 0} sections</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editingId && editingId.length > 10 && (
            <button onClick={() => handleDelete(editingId)} disabled={loading} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition disabled:opacity-50">
              Hapus
            </button>
          )}
          <button onClick={handleSave} disabled={loading} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 shadow-sm">
            <Save className="w-4 h-4" /> {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mx-6 mt-3 p-3 rounded-lg text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message}
        </div>
      )}

      {/* Editor: left = form, right = live preview */}
      <div className="flex h-[calc(100vh-130px)]">
        {/* Left - Editor Panel */}
        <div className="w-[440px] border-r border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-5 space-y-5">
            {/* Title & Slug */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Judul Halaman *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Nama halaman" className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide">Slug *</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="nama-halaman" className="w-full px-3 py-2 bg-white text-slate-900 rounded-lg text-sm border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                <p className="text-xs text-slate-400 mt-1">Diakses di /pages/{formData.slug || '...'}</p>
              </div>
            </div>

            {/* Sections */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Sections ({formData.sections?.length || 0})
              </h3>

              {formData.sections?.map((section, idx) => (
                <div key={section.id} className="bg-white rounded-xl mb-3 border border-gray-200 overflow-hidden shadow-sm">
                  {/* Section Header */}
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleSectionExpand(section.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base flex-shrink-0">{SECTION_TYPES.find(t => t.value === section.type)?.label.split(' ')[0]}</span>
                      <div className="min-w-0">
                        <h4 className="text-slate-800 font-medium text-sm truncate">
                          {SECTION_TYPES.find(t => t.value === section.type)?.label.split(' ').slice(1).join(' ')}
                        </h4>
                        {section.data.title && <p className="text-slate-400 text-xs truncate">{section.data.title}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); handleMoveSectionUp(idx); }} className="p-1 hover:bg-gray-200 rounded transition" title="Move up">
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleMoveSectionDown(idx); }} className="p-1 hover:bg-gray-200 rounded transition" title="Move down">
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleRemoveSection(section.id); }} className="p-1 hover:bg-red-100 rounded transition text-red-400 hover:text-red-600" title="Remove">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {expandedSections.has(section.id) ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                  {/* Section Form */}
                  {expandedSections.has(section.id) && (
                    <div className="px-4 pb-4 pt-0 border-t border-gray-100 space-y-3">
                      {renderSectionForm(section)}
                    </div>
                  )}
                </div>
              ))}

              {/* Add Section */}
              <div className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 transition">
                <h4 className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Tambah Section
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {SECTION_TYPES.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setNewSection({ ...newSection, type: type.value as any })}
                      className={`p-2 rounded-lg text-left transition text-xs ${newSection.type === type.value
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                        }`}
                    >
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
                <button onClick={handleAddSection} className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Tambahkan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Live Preview */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Live Preview</span>
          </div>
          {formData.sections && formData.sections.length > 0 ? (
            <PageRenderer sections={formData.sections} />
          ) : (
            <div className="flex items-center justify-center h-96 text-slate-300">
              <div className="text-center">
                <Layers className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Belum ada sections</p>
                <p className="text-sm mt-1">Tambahkan section di panel kiri untuk melihat preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
