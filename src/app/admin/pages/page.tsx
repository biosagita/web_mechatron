'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { CustomPage, PageSection, CourseItem } from '@/context/ContentContext';

const SECTION_TYPES = ['hero', 'features', 'cta', 'gallery', 'text', 'image'] as const;

export default function AdminPages() {
  const { pages, addPage, updatePage, deletePage, courses } = useContent();
  
  const [editingId, setEditingId] = useState<string>('');
  const [formData, setFormData] = useState<Omit<CustomPage, 'id'>>({
    title: '',
    slug: '',
    courseId: '',
    sections: [],
  });
  const [newSection, setNewSection] = useState<Partial<PageSection>>({
    type: 'hero',
    data: {},
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
                  Link to Course (Optional)
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

              {/* Sections */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Sections</h3>

                {formData.sections?.map((section, idx) => (
                  <div key={section.id} className="bg-gray-900 p-4 rounded mb-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-white font-semibold">
                        {idx + 1}. {section.type}
                      </h4>
                      <button
                        onClick={() => handleRemoveSection(section.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Dynamic section form fields */}
                    {section.type === 'hero' && (
                      <>
                        <input
                          type="text"
                          placeholder="Title"
                          value={section.data.title || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm mb-2 border border-gray-600"
                        />
                        <textarea
                          placeholder="Description"
                          value={section.data.description || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                          rows={3}
                        />
                      </>
                    )}

                    {section.type === 'text' && (
                      <textarea
                        placeholder="Content"
                        value={section.data.content || ''}
                        onChange={(e) => handleUpdateSectionData(section.id, 'content', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                        rows={4}
                      />
                    )}

                    {section.type === 'image' && (
                      <>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={section.data.image || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'image', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm mb-2 border border-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Description/Alt Text"
                          value={section.data.description || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                        />
                      </>
                    )}

                    {section.type === 'cta' && (
                      <>
                        <input
                          type="text"
                          placeholder="Button Text"
                          value={section.data.buttonText || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm mb-2 border border-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Button Link"
                          value={section.data.buttonLink || ''}
                          onChange={(e) => handleUpdateSectionData(section.id, 'buttonLink', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                        />
                      </>
                    )}

                    {section.type === 'features' && (
                      <textarea
                        placeholder="Features (satu per baris)"
                        value={(section.data.items || []).join('\n')}
                        onChange={(e) => handleUpdateSectionData(section.id, 'items', e.target.value.split('\n'))}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                        rows={4}
                      />
                    )}

                    {section.type === 'gallery' && (
                      <input
                        type="text"
                        placeholder="Filter category (optional)"
                        value={section.data.subtitle || ''}
                        onChange={(e) => handleUpdateSectionData(section.id, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm border border-gray-600"
                      />
                    )}
                  </div>
                ))}

                {/* Add Section */}
                <div className="bg-gray-900 p-4 rounded border border-gray-700">
                  <h4 className="text-white font-semibold mb-4">Add New Section</h4>
                  <label htmlFor="section-type-select" className="block text-xs font-medium text-gray-300 mb-2">
                    Section Type
                  </label>
                  <select
                    id="section-type-select"
                    value={newSection.type || ''}
                    onChange={(e) => setNewSection({ ...newSection, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm mb-4 border border-gray-600"
                  >
                    {SECTION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddSection}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Section
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
