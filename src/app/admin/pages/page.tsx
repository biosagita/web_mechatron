'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { CustomPage, PageSection, CourseItem } from '@/context/ContentContext';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Eye } from 'lucide-react';

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

export default function AdminPages() {
  const { pages, addPage, updatePage, deletePage, courses } = useContent();
  
  const [editingId, setEditingId] = useState<string>('');
  const [formData, setFormData] = useState<Omit<CustomPage, 'id'>>({
    title: '',
    slug: '',
    courseId: '',
    sections: [],
  });
  const [pageType, setPageType] = useState<'standalone' | 'course' | 'news'>('standalone');
  const [newSection, setNewSection] = useState<Partial<PageSection>>({
    type: 'hero',
    data: {},
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSectionExpand = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (editingId && editingId.length > 10) {
      const page = pages.find((p) => p.id === editingId);
      if (page) {
        setFormData({
          title: page.title,
          slug: page.slug,
          courseId: page.courseId || '',
          sections: page.sections,
        });
      }
    }
  }, [editingId, pages]);

  const handleAddSection = () => {
    if (!newSection.type) return;

    const section: PageSection = {
      id: Date.now().toString(),
      type: newSection.type as any,
      order: (formData.sections?.length || 0) + 1,
      data: newSection.data || {},
    };

    setFormData((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), section],
    }));

    setNewSection({ type: 'hero', data: {} });
  };

  const handleRemoveSection = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections?.filter((s) => s.id !== id) || [],
    }));
  };

  const handleUpdateSectionData = (id: string, key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections?.map((s) =>
        s.id === id ? { ...s, data: { ...s.data, [key]: value } } : s
      ),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      if (!formData.title || !formData.slug) {
        setMessage('Title dan slug harus diisi');
        return;
      }

      if (editingId && editingId.length > 10) {
        await updatePage(editingId, formData);
        setMessage('Page berhasil diupdate');
      } else {
        await addPage(formData);
        setMessage('Page berhasil ditambahkan');
      }

      setEditingId('');
      setFormData({ title: '', slug: '', courseId: '', sections: [] });
    } catch (error) {
      console.error('Error saving page:', error);
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
      setEditingId('');
      setFormData({ title: '', slug: '', courseId: '', sections: [] });
    } catch (error) {
      console.error('Error deleting page:', error);
      setMessage('Error menghapus page');
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk render form berdasarkan section type
  const renderSectionForm = (section: PageSection) => {
    const inputClass = "w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600 focus:border-orange-500 outline-none";
    const labelClass = "block text-xs font-medium text-gray-400 mb-1";

    switch (section.type) {
      case 'hero':
        return (
          <>
            <div>
              <label className={labelClass}>Badge (opsional)</label>
              <input
                type="text"
                placeholder="e.g., PROMO SPESIAL"
                value={section.data.badge || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'badge', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Judul Utama *</label>
              <input
                type="text"
                placeholder="Judul hero section"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                type="text"
                placeholder="Subtitle singkat"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi</label>
              <textarea
                placeholder="Deskripsi lebih detail"
                value={section.data.description || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)}
                className={inputClass}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol 1 Text</label>
                <input
                  type="text"
                  placeholder="e.g., Daftar Sekarang"
                  value={section.data.buttonText || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tombol 1 Link</label>
                <input
                  type="text"
                  placeholder="/register"
                  value={section.data.buttonLink || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol 2 Text (opsional)</label>
                <input
                  type="text"
                  placeholder="e.g., Pelajari Lebih Lanjut"
                  value={section.data.buttonText2 || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonText2', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tombol 2 Link</label>
                <input
                  type="text"
                  placeholder="#about"
                  value={section.data.buttonLink2 || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink2', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Background Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={section.data.image || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'image', e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        );

      case 'text-image':
        return (
          <>
            <div>
              <label className={labelClass}>Badge (opsional)</label>
              <input
                type="text"
                placeholder="e.g., TENTANG KAMI"
                value={section.data.badge || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'badge', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Judul *</label>
              <input
                type="text"
                placeholder="Judul section"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Konten (pisahkan paragraf dengan enter)</label>
              <textarea
                placeholder="Konten text"
                value={section.data.content || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'content', e.target.value)}
                className={inputClass}
                rows={5}
              />
            </div>
            <div>
              <label className={labelClass}>URL Gambar *</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={section.data.image || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'image', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Posisi Gambar</label>
              <select
                value={section.data.imagePosition || 'right'}
                onChange={(e) => handleUpdateSectionData(section.id, 'imagePosition', e.target.value)}
                className={inputClass}
              >
                <option value="right">Gambar di Kanan</option>
                <option value="left">Gambar di Kiri</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol Text (opsional)</label>
                <input
                  type="text"
                  placeholder="e.g., Selengkapnya"
                  value={section.data.buttonText || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tombol Link</label>
                <input
                  type="text"
                  placeholder="/about"
                  value={section.data.buttonLink || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </>
        );

      case 'image-grid':
        return (
          <>
            <div>
              <label className={labelClass}>Judul Section (opsional)</label>
              <input
                type="text"
                placeholder="Galeri Kegiatan"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle (opsional)</label>
              <input
                type="text"
                placeholder="Dokumentasi kegiatan kami"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL Gambar (satu per baris)</label>
              <textarea
                placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg&#10;https://example.com/img3.jpg"
                value={(section.data.images || []).join('\n')}
                onChange={(e) => handleUpdateSectionData(section.id, 'images', e.target.value.split('\n').filter(url => url.trim()))}
                className={inputClass}
                rows={6}
              />
            </div>
            <div>
              <label className={labelClass}>Jumlah Kolom</label>
              <select
                value={section.data.columns || 4}
                onChange={(e) => handleUpdateSectionData(section.id, 'columns', parseInt(e.target.value))}
                className={inputClass}
              >
                <option value={2}>2 Kolom</option>
                <option value={3}>3 Kolom</option>
                <option value={4}>4 Kolom</option>
              </select>
            </div>
          </>
        );

      case 'stats':
        return (
          <>
            <div>
              <label className={labelClass}>Judul Section (opsional)</label>
              <input
                type="text"
                placeholder="Pencapaian Kami"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Statistics (format: angka|label, satu per baris)</label>
              <textarea
                placeholder="500+|Siswa Terdaftar&#10;50+|Pengajar Profesional&#10;100%|Tingkat Kepuasan&#10;10+|Tahun Pengalaman"
                value={(section.data.items || []).map((s: any) => `${s.number}|${s.label}`).join('\n')}
                onChange={(e) => {
                  const items = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                    const [number, label] = line.split('|');
                    return { number: number?.trim() || '', label: label?.trim() || '' };
                  });
                  handleUpdateSectionData(section.id, 'items', items);
                }}
                className={inputClass}
                rows={5}
              />
            </div>
          </>
        );

      case 'testimonial':
        return (
          <>
            <div>
              <label className={labelClass}>Kutipan *</label>
              <textarea
                placeholder="Testimoni atau kutipan..."
                value={section.data.quote || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'quote', e.target.value)}
                className={inputClass}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Nama *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={section.data.author || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'author', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Role/Jabatan</label>
                <input
                  type="text"
                  placeholder="CEO, Company"
                  value={section.data.role || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'role', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>URL Avatar (opsional)</label>
              <input
                type="text"
                placeholder="https://example.com/avatar.jpg"
                value={section.data.avatar || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'avatar', e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        );

      case 'two-column':
        return (
          <>
            <div className="bg-gray-800 p-3 rounded-lg">
              <h5 className="text-white font-medium mb-3">Kolom Kiri</h5>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Judul</label>
                  <input
                    type="text"
                    placeholder="Judul kolom kiri"
                    value={section.data.leftTitle || ''}
                    onChange={(e) => handleUpdateSectionData(section.id, 'leftTitle', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Konten</label>
                  <textarea
                    placeholder="Konten kolom kiri"
                    value={section.data.leftContent || ''}
                    onChange={(e) => handleUpdateSectionData(section.id, 'leftContent', e.target.value)}
                    className={inputClass}
                    rows={4}
                  />
                </div>
                <div>
                  <label className={labelClass}>Gambar (URL, satu per baris)</label>
                  <textarea
                    placeholder="https://example.com/img1.jpg"
                    value={(section.data.leftImages || []).join('\n')}
                    onChange={(e) => handleUpdateSectionData(section.id, 'leftImages', e.target.value.split('\n').filter(url => url.trim()))}
                    className={inputClass}
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <h5 className="text-white font-medium mb-3">Kolom Kanan</h5>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Judul</label>
                  <input
                    type="text"
                    placeholder="Judul kolom kanan"
                    value={section.data.rightTitle || ''}
                    onChange={(e) => handleUpdateSectionData(section.id, 'rightTitle', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Konten</label>
                  <textarea
                    placeholder="Konten kolom kanan"
                    value={section.data.rightContent || ''}
                    onChange={(e) => handleUpdateSectionData(section.id, 'rightContent', e.target.value)}
                    className={inputClass}
                    rows={4}
                  />
                </div>
                <div>
                  <label className={labelClass}>Gambar (URL, satu per baris)</label>
                  <textarea
                    placeholder="https://example.com/img1.jpg"
                    value={(section.data.rightImages || []).join('\n')}
                    onChange={(e) => handleUpdateSectionData(section.id, 'rightImages', e.target.value.split('\n').filter(url => url.trim()))}
                    className={inputClass}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'cards':
        return (
          <>
            <div>
              <label className={labelClass}>Judul Section (opsional)</label>
              <input
                type="text"
                placeholder="Layanan Kami"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle (opsional)</label>
              <input
                type="text"
                placeholder="Berbagai layanan unggulan"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cards (format JSON)</label>
              <textarea
                placeholder='[&#10;  {"icon": "🤖", "title": "Robotika", "description": "Belajar membuat robot", "image": "url", "link": "/courses/robotics"},&#10;  {"icon": "💻", "title": "Coding", "description": "Belajar programming"}&#10;]'
                value={JSON.stringify(section.data.items || [], null, 2)}
                onChange={(e) => {
                  try {
                    const items = JSON.parse(e.target.value);
                    handleUpdateSectionData(section.id, 'items', items);
                  } catch {}
                }}
                className={inputClass + ' font-mono text-xs'}
                rows={8}
              />
            </div>
            <div>
              <label className={labelClass}>Jumlah Kolom</label>
              <select
                value={section.data.columns || 3}
                onChange={(e) => handleUpdateSectionData(section.id, 'columns', parseInt(e.target.value))}
                className={inputClass}
              >
                <option value={2}>2 Kolom</option>
                <option value={3}>3 Kolom</option>
                <option value={4}>4 Kolom</option>
              </select>
            </div>
          </>
        );

      case 'video':
        return (
          <>
            <div>
              <label className={labelClass}>Judul (opsional)</label>
              <input
                type="text"
                placeholder="Video Profil"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle (opsional)</label>
              <input
                type="text"
                placeholder="Kenali kami lebih dekat"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>YouTube URL *</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=xxxxx"
                value={section.data.url || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'url', e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        );

      case 'features':
        return (
          <>
            <div>
              <label className={labelClass}>Judul Section (opsional)</label>
              <input
                type="text"
                placeholder="Fitur Unggulan"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle (opsional)</label>
              <input
                type="text"
                placeholder="Mengapa memilih kami"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Features (satu per baris, atau format: judul|deskripsi)</label>
              <textarea
                placeholder="Pengajar Berpengalaman|Tim pengajar profesional&#10;Kurikulum Terupdate|Materi selalu diperbarui&#10;Sertifikat Resmi"
                value={(section.data.items || []).map((f: any) => 
                  typeof f === 'string' ? f : `${f.title}${f.description ? '|' + f.description : ''}`
                ).join('\n')}
                onChange={(e) => {
                  const items = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                    const [title, description] = line.split('|');
                    return description ? { title: title.trim(), description: description.trim() } : title.trim();
                  });
                  handleUpdateSectionData(section.id, 'items', items);
                }}
                className={inputClass}
                rows={6}
              />
            </div>
          </>
        );

      case 'cta':
        return (
          <>
            <div>
              <label className={labelClass}>Judul *</label>
              <input
                type="text"
                placeholder="Siap Bergabung?"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi</label>
              <textarea
                placeholder="Daftar sekarang dan mulai perjalanan belajar Anda"
                value={section.data.description || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)}
                className={inputClass}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol 1 Text *</label>
                <input
                  type="text"
                  placeholder="Daftar Sekarang"
                  value={section.data.buttonText || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tombol 1 Link</label>
                <input
                  type="text"
                  placeholder="/register"
                  value={section.data.buttonLink || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tombol 2 Text (opsional)</label>
                <input
                  type="text"
                  placeholder="Hubungi Kami"
                  value={section.data.buttonText2 || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonText2', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tombol 2 Link</label>
                <input
                  type="text"
                  placeholder="/contact"
                  value={section.data.buttonLink2 || ''}
                  onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink2', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Background Image (opsional)</label>
              <input
                type="text"
                placeholder="https://example.com/bg.jpg"
                value={section.data.backgroundImage || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'backgroundImage', e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div>
              <label className={labelClass}>Judul (opsional)</label>
              <input
                type="text"
                placeholder="Judul section"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Konten *</label>
              <textarea
                placeholder="Tulis konten di sini..."
                value={section.data.content || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'content', e.target.value)}
                className={inputClass}
                rows={6}
              />
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div>
              <label className={labelClass}>Judul (opsional)</label>
              <input
                type="text"
                placeholder="Judul gambar"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL Gambar *</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={section.data.image || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'image', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Caption (opsional)</label>
              <input
                type="text"
                placeholder="Keterangan gambar"
                value={section.data.caption || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'caption', e.target.value)}
                className={inputClass}
              />
            </div>
          </>
        );

      case 'gallery':
        return (
          <>
            <div>
              <label className={labelClass}>Judul (opsional)</label>
              <input
                type="text"
                placeholder="Galeri"
                value={section.data.title || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi (opsional)</label>
              <input
                type="text"
                placeholder="Deskripsi galeri"
                value={section.data.description || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Filter Kategori (opsional)</label>
              <input
                type="text"
                placeholder="Robotics"
                value={section.data.subtitle || ''}
                onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-1">Kosongkan untuk menampilkan semua item galeri dari Context</p>
            </div>
          </>
        );

      case 'divider':
        return (
          <>
            <div>
              <label className={labelClass}>Style</label>
              <select
                value={section.data.style || 'normal'}
                onChange={(e) => handleUpdateSectionData(section.id, 'style', e.target.value)}
                className={inputClass}
              >
                <option value="normal">Normal</option>
                <option value="thick">Thick</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Color</label>
              <select
                value={section.data.color || 'border-gray-700'}
                onChange={(e) => handleUpdateSectionData(section.id, 'color', e.target.value)}
                className={inputClass}
              >
                <option value="border-gray-700">Gray</option>
                <option value="border-orange-500">Orange</option>
                <option value="border-blue-500">Blue</option>
              </select>
            </div>
          </>
        );

      case 'spacer':
        return (
          <div>
            <label className={labelClass}>Height (px)</label>
            <input
              type="number"
              placeholder="60"
              value={section.data.height || 60}
              onChange={(e) => handleUpdateSectionData(section.id, 'height', parseInt(e.target.value) || 60)}
              className={inputClass}
            />
          </div>
        );

      default:
        return <p className="text-gray-400 text-sm">No configuration available for this section type.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin - Page Builder</h1>

        {message && (
          <div className={`p-4 rounded mb-6 ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId && editingId.length > 10 ? 'Edit Page' : 'New Page'}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="page-title" className="block text-sm font-medium text-white mb-2">
                  Page Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="page-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Robotics Beginner"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="page-slug" className="block text-sm font-medium text-white mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  id="page-slug"
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., robotics-beginner"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Course */}
              <div>
                <label htmlFor="course-select" className="block text-sm font-medium text-white mb-2">
                  Page Type
                </label>
                <select
                  id="page-type-select"
                  value={pageType}
                  onChange={(e) => {
                    setPageType(e.target.value as any);
                    setFormData({ ...formData, courseId: '' });
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none mb-4"
                >
                  <option value="standalone">Standalone Page (Akses via /pages/slug)</option>
                  <option value="course">Linked to Course</option>
                  <option value="news">Linked to News</option>
                </select>
              </div>

              {/* Course Selection - hanya tampil kalau tipe course */}
              {pageType === 'course' && (
                <div>
                  <label htmlFor="course-select" className="block text-sm font-medium text-white mb-2">
                    Pilih Course
                  </label>
                  <select
                    id="course-select"
                    value={formData.courseId || ''}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
                  >
                    <option value="">-- Pilih Course --</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sections */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Sections ({formData.sections?.length || 0})</h3>

                {formData.sections?.map((section, idx) => (
                  <div key={section.id} className="bg-gray-900 rounded-lg mb-4 border border-gray-700 overflow-hidden">
                    {/* Section Header */}
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 transition"
                      onClick={() => toggleSectionExpand(section.id)}
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-5 h-5 text-gray-500" />
                        <span className="text-lg">{SECTION_TYPES.find(t => t.value === section.type)?.label.split(' ')[0]}</span>
                        <h4 className="text-white font-semibold">
                          {idx + 1}. {SECTION_TYPES.find(t => t.value === section.type)?.label.split(' ').slice(1).join(' ') || section.type}
                        </h4>
                        {section.data.title && (
                          <span className="text-gray-400 text-sm">- {section.data.title}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveSection(section.id); }}
                          className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {expandedSections.has(section.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Section Form - Collapsible */}
                    {expandedSections.has(section.id) && (
                      <div className="p-4 pt-0 border-t border-gray-700 space-y-3">
                        {renderSectionForm(section)}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Section */}
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 border-dashed">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Tambah Section Baru
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {SECTION_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setNewSection({ ...newSection, type: type.value as any })}
                        className={`p-3 rounded-lg text-left transition ${
                          newSection.type === type.value
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="font-semibold text-sm">{type.label}</div>
                        <div className="text-xs opacity-75">{type.description}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleAddSection}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Tambahkan {SECTION_TYPES.find(t => t.value === newSection.type)?.label}
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-500"
                >
                  {loading ? 'Saving...' : editingId && editingId.length > 10 ? 'Update' : 'Create'}
                </button>
                {editingId && editingId.length > 10 && (
                  <button
                    onClick={() => handleDelete(editingId)}
                    disabled={loading}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-500"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingId('');
                    setFormData({ title: '', slug: '', courseId: '', sections: [] });
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Pages</h2>

            <div className="space-y-2">
              {pages.length === 0 ? (
                <p className="text-gray-400">Belum ada pages</p>
              ) : (
                pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setEditingId(page.id)}
                    className={`w-full text-left p-3 rounded transition ${
                      editingId === page.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{page.title}</div>
                    <div className="text-xs">{page.slug}</div>
                    {page.courseId && (
                      <div className="text-xs text-yellow-400">
                        Course: {courses.find((c) => c.id === page.courseId)?.title}
                      </div>
                    )}
                    <div className="text-xs">{page.sections?.length || 0} sections</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
