'use client';

import AdminLayout from '@/components/AdminLayout';
import { useContent, CourseItem } from '@/context/ContentContext';
import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminCourses() {
  const { courses, addCourse, updateCourse, deleteCourse } = useContent();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CourseItem, 'id'>>({
    title: '',
    highlight: '',
    ageGroup: '',
    tools: '',
    details: '',

  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      highlight: '',
      ageGroup: '',
      tools: '',
      details: '',
     
    });
    setIsFormVisible(true);
  };

  const handleEdit = (course: CourseItem) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      highlight: course.highlight,
      ageGroup: course.ageGroup,
      tools: course.tools,
      details: course.details,
  
    });
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.highlight || !formData.ageGroup || !formData.tools || !formData.details) {
      alert('Semua field harus diisi');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateCourse(editingId, { ...formData, id: editingId });
        alert('Kursus berhasil diperbarui');
      } else {
        const newCourse: CourseItem = {
          id: Date.now().toString(),
          ...formData,
        };
        await addCourse(newCourse);
        alert('Kursus berhasil ditambahkan');
      }
      setIsFormVisible(false);
      setFormData({
        title: '',
        highlight: '',
        ageGroup: '',
        tools: '',
        details: '',
    
      });
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Gagal menyimpan kursus. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus kursus ini?')) return;

    setLoading(true);
    try {
      await deleteCourse(id);
      alert('Kursus berhasil dihapus');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Gagal menghapus kursus. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Kursus</h1>
          <button
            onClick={handleAddNew}
            disabled={loading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition font-semibold"
          >
            <Plus size={20} />
            <span>Tambah Kursus</span>
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Kursus' : 'Tambah Kursus Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Kursus</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Contoh: Advanced Robotics"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Text Highlight</label>
                <input
                  type="text"
                  name="highlight"
                  value={formData.highlight}
                  onChange={handleInputChange}
                  placeholder="Contoh: Robotika Lanjutan dengan AI"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Usia/Target</label>
                  <input
                    type="text"
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleInputChange}
                    placeholder="Contoh: 14+ Tahun"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tools/Software</label>
                  <input
                    type="text"
                    name="tools"
                    value={formData.tools}
                    onChange={handleInputChange}
                    placeholder="Contoh: ROS, OpenCV, Machine Learning"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Detail</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Penjelasan lengkap tentang kursus ini..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 bg-white"
                />
              </div>


              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                >
                  {loading ? 'Menyimpan...' : editingId ? 'Update Kursus' : 'Simpan Kursus'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  disabled={loading}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-slate-700 py-2 rounded-lg font-semibold transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Nama Kursus</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Highlight</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Usia</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Tools</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-slate-700 font-semibold">{course.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{course.highlight}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{course.ageGroup}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{course.tools}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            disabled={loading}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded transition disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            disabled={loading}
                            className="p-2 hover:bg-red-100 text-red-600 rounded transition disabled:opacity-50"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Tidak ada kursus. Klik "Tambah Kursus" untuk membuat kursus baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
