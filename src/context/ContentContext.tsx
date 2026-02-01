'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  image?: string;
  pageSlug?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image?: string;
}

export interface ScheduleItem {
  id: string;
  name: string;
  level: string;
  time: string;
  capacity: string;
  location: string;
}

export interface RegistrationItem {
  id: string;
  namaAnak: string;
  usiaAnak: string;
  asalSekolah: string;
  waAnak: string;
  program: string;
  namaOrangTua: string;
  waOrangTua: string;
  tanggalDaftar: string;
  status: 'Baru' | 'Hubungi' | 'Trial' | 'Konfirmasi';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  photo?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  highlight: string;
  ageGroup: string;
  tools: string;
  details: string;
  image?: string;
  pageId?: string;
  pageSlug?: string;
}

// Page Builder Types
export interface PageSection {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'gallery' | 'text' | 'image' | 'text-image' | 'image-grid' | 'stats' | 'testimonial' | 'two-column' | 'cards' | 'video' | 'divider' | 'spacer';
  order: number;
  data: {
    // Common
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    content?: string;
    
    // Buttons
    buttonText?: string;
    buttonLink?: string;
    buttonText2?: string;
    buttonLink2?: string;
    
    // Hero / CTA
    badge?: string;
    backgroundImage?: string;
    
    // Text-Image
    imagePosition?: 'left' | 'right';
    
    // Image Grid
    images?: string[];
    columns?: number;
    
    // Stats / Features / Cards
    items?: Array<{
      title?: string;
      description?: string;
      icon?: string;
      number?: string;
      label?: string;
      image?: string;
      link?: string;
    }> | string[];
    
    // Testimonial
    quote?: string;
    author?: string;
    role?: string;
    avatar?: string;
    
    // Two Column
    leftTitle?: string;
    leftContent?: string;
    leftImages?: string[];
    rightTitle?: string;
    rightContent?: string;
    rightImages?: string[];
    
    // Video
    url?: string;
    
    // Image
    caption?: string;
    
    // Divider
    style?: 'normal' | 'thick';
    color?: string;
    
    // Spacer
    height?: number;
  };
}

export interface CustomPage {
  id: string;
  courseId?: string;
  title: string;
  slug: string;
  sections: PageSection[];
  createdAt?: any;
  updatedAt?: any;
}

interface ContentContextType {
  // News
  news: NewsItem[];
  addNews: (item: NewsItem) => void;
  updateNews: (id: string, item: NewsItem) => void;
  deleteNews: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGallery: (item: GalleryItem) => void;
  updateGallery: (id: string, item: GalleryItem) => void;
  deleteGallery: (id: string) => void;

  // Schedule
  schedule: ScheduleItem[];
  addSchedule: (item: ScheduleItem) => void;
  updateSchedule: (id: string, item: ScheduleItem) => void;
  deleteSchedule: (id: string) => void;

  // Registrations
  registrations: RegistrationItem[];
  addRegistration: (item: RegistrationItem) => void;
  updateRegistration: (id: string, item: RegistrationItem) => void;
  deleteRegistration: (id: string) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (id: string, item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  // Courses
  courses: CourseItem[];
  addCourse: (item: CourseItem) => void;
  updateCourse: (id: string, item: CourseItem) => void;
  deleteCourse: (id: string) => void;

  // Custom Pages
  pages: CustomPage[];
  addPage: (item: Omit<CustomPage, 'id'>) => Promise<string>;
  updatePage: (id: string, item: Omit<CustomPage, 'id'>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  getPageBySlug: (slug: string) => CustomPage | undefined;
  getPageByCourseId: (courseId: string) => CustomPage | undefined;

  // Partner Banner
  partnerBanner: string;
  updatePartnerBanner: (url: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [partnerBanner, setPartnerBanner] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Load data from Firestore on client mount
  useEffect(() => {
    console.log('[ContentContext] Component mounted, checking window...');
    if (typeof window !== 'undefined') {
      console.log('[ContentContext] Window is defined, calling loadAllDataFromFirestore');
      loadAllDataFromFirestore();
    }
  }, []);

  const loadAllDataFromFirestore = async () => {
    try {
      console.log('[ContentContext] Starting loadAllDataFromFirestore...');
      await Promise.all([
        loadNewsFromFirestore(),
        loadGalleryFromFirestore(),
        loadRegistrationsFromFirestore(),
        loadTestimonialsFromFirestore(),
        loadCoursesFromFirestore(),
        loadPagesFromFirestore(),
        loadPartnerBannerFromFirestore(),
      ]);
      console.log('[ContentContext] All data loaded successfully');
    } catch (error) {
      console.error('[ContentContext] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadNewsFromFirestore = async () => {
    try {
      console.log('[ContentContext] Starting loadNewsFromFirestore...');
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      console.log('[ContentContext] Got news query result:', querySnapshot.size, 'documents');
      const data: NewsItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        console.log('[ContentContext] Processing news item:', docSnap.id, docData.title);
        // Convert Firestore Timestamp to string if needed
        let date = docData.date;
        if (!date && docData.createdAt && typeof docData.createdAt === 'object' && 'seconds' in docData.createdAt) {
          const createdDate = new Date(docData.createdAt.seconds * 1000);
          date = createdDate.toLocaleDateString('id-ID');
        }
        data.push({
          id: docSnap.id,
          date: date || new Date().toLocaleDateString('id-ID'),
          title: docData.title || '',
          excerpt: docData.excerpt || '',
          category: docData.category || '',
          content: docData.content || '',
          image: docData.image || '',
          pageSlug: docData.pageSlug || undefined,
          createdAt: docData.createdAt,
          updatedAt: docData.updatedAt,
        });
      });
      console.log('[ContentContext] Loaded news from Firestore:', data.length, 'items');
      setNews(data);
    } catch (error) {
      console.error('[ContentContext] Error loading news from Firestore:', error);
      // Keep using default data if Firestore fails
    }
  };

  const loadGalleryFromFirestore = async () => {
    try {
      const q = query(collection(db, 'gallery'), orderBy('title'));
      const querySnapshot = await getDocs(q);
      const data: GalleryItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        data.push({
          id: docSnap.id,
          title: docData.title || '',
          category: docData.category || '',
          image: docData.image || '',
        });
      });
      console.log('[ContentContext] Loaded gallery from Firestore:', data.length, 'items');
      setGallery(data);
      
      // If empty, initialize with sample data
      if (data.length === 0) {
        const defaultGallery = [
          { title: 'Robot Penjelajah', category: 'Autonomous Robot', image: 'https://images.unsplash.com/photo-1561432674-641681e8a874?w=500&h=400&fit=crop' },
          { title: 'Arm Manipulator', category: 'Industrial Robotics', image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=500&h=400&fit=crop' },
          { title: 'Humanoid Robot', category: 'Advanced Robotics', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop' },
          { title: 'Drone Delivery', category: 'UAV Technology', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=400&fit=crop' },
          { title: 'Smart Home System', category: 'IoT & Automation', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=400&fit=crop' },
          { title: 'Vision System', category: 'Computer Vision', image: 'https://images.unsplash.com/photo-1551431009-381d36ac3a99?w=500&h=400&fit=crop' },
        ];
        for (const item of defaultGallery) {
          const docRef = await addDoc(collection(db, 'gallery'), item);
          data.push({ id: docRef.id, ...item });
        }
        setGallery(data);
      }
    } catch (error) {
      console.error('[ContentContext] Error loading gallery from Firestore:', error);
    }
  };

  const loadRegistrationsFromFirestore = async () => {
    try {
      const q = query(collection(db, 'registrations'), orderBy('tanggalDaftar', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: RegistrationItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        // Convert Firestore Timestamp to string
        let tanggalDaftar = docData.tanggalDaftar;
        if (tanggalDaftar && typeof tanggalDaftar === 'object' && 'seconds' in tanggalDaftar) {
          // It's a Firestore Timestamp
          const date = new Date(tanggalDaftar.seconds * 1000);
          tanggalDaftar = date.toLocaleDateString('id-ID');
        }
        data.push({ 
          id: docSnap.id, 
          ...docData,
          tanggalDaftar: tanggalDaftar || new Date().toLocaleDateString('id-ID')
        } as RegistrationItem);
      });
      console.log('Loaded registrations from Firestore:', data);
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
    }
  };

  const loadTestimonialsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const data: TestimonialItem[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() } as TestimonialItem);
      });
      console.log('Loaded testimonials from Firestore:', data);
      if (data.length > 0) {
        setTestimonials(data);
      } else {
        // Initialize with default data if empty
        const defaultTestimonials: Omit<TestimonialItem, 'id'>[] = [
          {
            name: 'Budi Santoso',
            role: 'Orang Tua Siswa',
            message: 'Anak saya sangat antusias belajar robotika di Mechatron. Dalam waktu 3 bulan sudah bisa membuat robot sederhana sendiri. Terima kasih Mechatron!',
            rating: 5,
            photo: '',
          },
          {
            name: 'Rina Wijaya',
            role: 'Siswa',
            message: 'Kelas di Mechatron sangat seru dan mudah dipahami. Pengajarnya sabar dan selalu membantu ketika ada kesulitan.',
            rating: 5,
            photo: '',
          },
          {
            name: 'Ahmad Fauzi',
            role: 'Alumni',
            message: 'Berkat belajar di Mechatron, saya berhasil masuk jurusan Teknik Robotika di universitas impian. Fondasi yang diberikan sangat kuat.',
            rating: 5,
            photo: '',
          },
        ];
        // Add default data to Firestore
        for (const item of defaultTestimonials) {
          const docRef = await addDoc(collection(db, 'testimonials'), item);
          data.push({ id: docRef.id, ...item });
        }
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const loadPartnerBannerFromFirestore = async () => {
    try {
      const settingsRef = doc(db, 'settings', 'partnerBanner');
      const docSnap = await getDoc(settingsRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as { partnerBanner?: string };
        if (data.partnerBanner) {
          setPartnerBanner(data.partnerBanner);
        }
      }
      console.log('Loaded partner banner from Firestore');
    } catch (error) {
      console.error('Error loading partner banner:', error);
    }
  };

  // Initial data
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      date: '25 Januari 2025',
      title: 'Mechatron Raih Juara 1 Kompetisi Robotika Nasional',
      excerpt: 'Tim siswa Mechatron berhasil memenangkan kompetisi robotika nasional 2025 dengan proyek inovatif.',
      category: 'Prestasi',
      content: 'Dengan bangga kami persembahkan prestasi gemilang tim Mechatron yang telah meraih Juara 1 dalam Kompetisi Robotika Nasional 2025. Kompetisi yang diikuti oleh lebih dari 50 sekolah dari seluruh Indonesia ini menampilkan inovasi luar biasa dari para peserta.\n\nTim kami berhasil membuat robot autonomous yang dapat menyelesaikan misi kompleks dengan presisi tinggi. Proyeknya berfokus pada aplikasi robotika dalam industri manufaktur modern, menggabungkan machine learning dengan kontrol mekanika yang canggih.\n\nPrestasi ini membuktikan komitmen Mechatron dalam memberikan pendidikan robotika berkualitas tinggi kepada generasi muda Indonesia. Kami berterima kasih kepada semua guru, siswa, dan orang tua yang telah mendukung perjalanan ini.',
    },
    {
      id: '2',
      date: '20 Januari 2025',
      title: 'Workshop Gratis: Intro to Robotics dengan Arduino',
      excerpt: 'Kami mengadakan workshop gratis untuk calon siswa yang ingin mengenal dunia robotika.',
      category: 'Workshop',
      content: 'Mechatron dengan senang hati mengumumkan Workshop Gratis "Introduction to Robotics dengan Arduino" yang terbuka untuk umum, khususnya calon siswa dan peminat robotika dari berbagai kalangan.\n\nWorkshop ini akan membahas:\n- Pengenalan dasar Arduino dan komponen elektronik\n- Pemrograman Arduino menggunakan bahasa C\n- Praktik langsung membuat robot sederhana\n- Troubleshooting dan problem-solving\n\nFasilitas dan semua materials disediakan oleh Mechatron. Peserta tidak perlu membawa apapun kecuali antusiasme belajar. Tempat terbatas hingga 30 peserta per sesi. Daftar sekarang melalui formulir kontak di website kami!',
    },
    {
      id: '3',
      date: '15 Januari 2025',
      title: 'Peluncuran Program Beasiswa untuk Siswa Berprestasi',
      excerpt: 'Mechatron menyediakan program beasiswa penuh untuk siswa dengan prestasi akademik terbaik.',
      category: 'Beasiswa',
      content: 'Dalam rangka mendukung pendidikan robotika bagi talenta muda Indonesia, Mechatron Robotic School dengan bangga meluncurkan Program Beasiswa untuk Siswa Berprestasi tahun 2025.\n\nProgram Beasiswa mencakup:\n- Beasiswa Penuh: Gratis semua biaya kursus selama 1 tahun\n- Beasiswa Setengah: Diskon 50% untuk semua biaya kursus\n- Beasiswa Materi: Gratis semua peralatan dan materials\n\nKriteria Penerima Beasiswa:\n- Memiliki nilai rata-rata akademik minimal 80 di sekolah sebelumnya\n- Menunjukkan minat dan dedikasi tinggi terhadap robotika dan teknologi\n- Berasal dari keluarga dengan kondisi ekonomi menengah ke bawah\n- Bersedia berkomitmen penuh dalam program\n\nPendaftaran dibuka hingga akhir Januari 2025. Untuk informasi lengkap dan proses pendaftaran, silakan hubungi kami atau kunjungi halaman beasiswa di website kami.',
    },
  ]);

  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    {
      id: '1',
      name: 'Beginner Robotics',
      level: 'Pemula',
      time: 'Senin & Rabu, 15:00-17:00',
      capacity: '15 Siswa',
      location: 'Lab A',
    },
    {
      id: '2',
      name: 'Intermediate Programming',
      level: 'Menengah',
      time: 'Selasa & Kamis, 16:00-18:00',
      capacity: '12 Siswa',
      location: 'Lab B',
    },
    {
      id: '3',
      name: 'Advanced Robotics',
      level: 'Lanjutan',
      time: 'Sabtu, 09:00-12:00',
      capacity: '10 Siswa',
      location: 'Lab C',
    },
    {
      id: '4',
      name: 'Drone & UAV',
      level: 'Spesialis',
      time: 'Minggu, 10:00-13:00',
      capacity: '8 Siswa',
      location: 'Outdoor Arena',
    },
  ]);

  // News handlers
  const addNews = (item: NewsItem) => {
    setNews([item, ...news]);
  };

  const updateNews = (id: string, item: NewsItem) => {
    setNews(news.map((n) => (n.id === id ? item : n)));
  };

  const deleteNews = (id: string) => {
    setNews(news.filter((n) => n.id !== id));
  };

  // Gallery handlers
  const addGallery = async (item: GalleryItem) => {
    try {
      console.log('[Gallery] Adding gallery item:', item);
      const docRef = await addDoc(collection(db, 'gallery'), {
        title: item.title,
        category: item.category,
        image: item.image || '',
      });
      console.log('[Gallery] Successfully added with ID:', docRef.id);
      setGallery([...gallery, { ...item, id: docRef.id }]);
    } catch (error: any) {
      console.error('[Gallery] Error adding gallery item:', error.message || error);
      console.error('[Gallery] Full error:', error);
      throw error;
    }
  };

  const updateGallery = async (id: string, item: GalleryItem) => {
    try {
      console.log('[Gallery] Updating gallery item:', id, item);
      const galleryRef = doc(db, 'gallery', id);
      await updateDoc(galleryRef, {
        title: item.title,
        category: item.category,
        image: item.image || '',
      });
      console.log('[Gallery] Successfully updated');
      setGallery(gallery.map((g) => (g.id === id ? item : g)));
    } catch (error: any) {
      console.error('[Gallery] Error updating gallery item:', error.message || error);
      console.error('[Gallery] Full error:', error);
      throw error;
    }
  };

  const deleteGallery = async (id: string) => {
    try {
      console.log('[Gallery] Deleting gallery item:', id);
      await deleteDoc(doc(db, 'gallery', id));
      console.log('[Gallery] Successfully deleted');
      setGallery(gallery.filter((g) => g.id !== id));
    } catch (error: any) {
      console.error('[Gallery] Error deleting gallery item:', error.message || error);
      console.error('[Gallery] Full error:', error);
      throw error;
    }
  };

  // Schedule handlers
  const addSchedule = (item: ScheduleItem) => {
    setSchedule([...schedule, item]);
  };

  const updateSchedule = (id: string, item: ScheduleItem) => {
    setSchedule(schedule.map((s) => (s.id === id ? item : s)));
  };

  const deleteSchedule = (id: string) => {
    setSchedule(schedule.filter((s) => s.id !== id));
  };

  // Registration handlers
  const addRegistration = async (item: Omit<RegistrationItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...item,
        tanggalDaftar: Timestamp.now(),
      });
      const newItem: RegistrationItem = { ...item, id: docRef.id, tanggalDaftar: new Date().toISOString() };
      setRegistrations([newItem, ...registrations]);
      console.log('Registration added to Firestore:', newItem);
      return docRef.id;
    } catch (error) {
      console.error('Error adding registration:', error);
      throw error;
    }
  };

  const updateRegistration = async (id: string, item: Partial<RegistrationItem>) => {
    try {
      const registrationRef = doc(db, 'registrations', id);
      await updateDoc(registrationRef, item);
      setRegistrations(registrations.map((r) => (r.id === id ? { ...r, ...item } : r)));
      console.log('Registration updated:', id);
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'registrations', id));
      setRegistrations(registrations.filter((r) => r.id !== id));
      console.log('Registration deleted:', id);
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  };

  // Testimonial handlers
  const addTestimonial = async (item: TestimonialItem) => {
    try {
      const { id, ...itemData } = item;
      const docRef = await addDoc(collection(db, 'testimonials'), itemData);
      const newItem = { ...item, id: docRef.id };
      setTestimonials([...testimonials, newItem]);
      console.log('Testimonial added to Firestore:', newItem);
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
  };

  const updateTestimonial = async (id: string, item: TestimonialItem) => {
    try {
      const { id: itemId, ...itemData } = item;
      const testimonialRef = doc(db, 'testimonials', id);
      await updateDoc(testimonialRef, itemData);
      setTestimonials(testimonials.map((t) => (t.id === id ? item : t)));
      console.log('Testimonial updated:', id);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      setTestimonials(testimonials.filter((t) => t.id !== id));
      console.log('Testimonial deleted:', id);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  };

  const loadCoursesFromFirestore = async () => {
    try {
      const q = query(collection(db, 'courses'), orderBy('title', 'asc'));
      const querySnapshot = await getDocs(q);
      const data: CourseItem[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() } as CourseItem);
      });
      console.log('Loaded courses from Firestore:', data);
      if (data.length > 0) {
        setCourses(data);
      } else {
        // Initialize with default data if empty
        const defaultCourses: Omit<CourseItem, 'id'>[] = [
          {
            title: 'Beginner Robotics',
            highlight: 'Dasar-dasar Robotika untuk Pemula',
            ageGroup: '8-12 Tahun',
            tools: 'LEGO Mindstorms, Arduino',
            details: 'Pelajari fundamental robotika, assembly dasar, dan programming sederhana untuk menggerakkan robot pertama Anda.',
          },
          {
            title: 'Intermediate Programming',
            highlight: 'Programmable Logic untuk Level Menengah',
            ageGroup: '12-16 Tahun',
            tools: 'Python, C++, Arduino Uno',
            details: 'Tingkatkan skill programming Anda dengan proyek-proyek kompleks menggunakan Arduino dan bahasa pemrograman tingkat menengah.',
          },
          {
            title: 'Advanced Robotics',
            highlight: 'Robotika Lanjutan dengan AI',
            ageGroup: '14+ Tahun',
            tools: 'ROS, OpenCV, Machine Learning',
            details: 'Jelajahi teknologi terdepan termasuk computer vision, autonomous navigation, dan artificial intelligence untuk robot cerdas.',
          },
          {
            title: 'Drone & UAV',
            highlight: 'Drone Programming dan Kontrol',
            ageGroup: '12+ Tahun',
            tools: 'DJI SDK, MAVProxy, Ardupilot',
            details: 'Kuasai seni flying, autonomous missions, dan aerial imaging dengan drone technology yang profesional.',
          },
        ];
        // Add default data to Firestore
        for (const item of defaultCourses) {
          const docRef = await addDoc(collection(db, 'courses'), item);
          data.push({ id: docRef.id, ...item });
        }
        setCourses(data);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  // Course handlers
  const addCourse = async (item: CourseItem) => {
    try {
      const { id, ...itemData } = item;
      const docRef = await addDoc(collection(db, 'courses'), itemData);
      const newItem = { ...item, id: docRef.id };
      setCourses([...courses, newItem]);
      console.log('Course added to Firestore:', newItem);
    } catch (error) {
      console.error('Error adding course:', error);
      throw error;
    }
  };

  const updateCourse = async (id: string, item: CourseItem) => {
    try {
      const { id: itemId, ...itemData } = item;
      const courseRef = doc(db, 'courses', id);
      await updateDoc(courseRef, itemData);
      setCourses(courses.map((c) => (c.id === id ? item : c)));
      console.log('Course updated:', id);
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
      setCourses(courses.filter((c) => c.id !== id));
      console.log('Course deleted:', id);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  };

  // Partner Banner handler
  const updatePartnerBanner = async (url: string) => {
    try {
      const settingsRef = doc(db, 'settings', 'partnerBanner');
      await setDoc(settingsRef, { partnerBanner: url }, { merge: true });
      setPartnerBanner(url);
      console.log('Partner banner updated:', url);
    } catch (error) {
      console.error('Error updating partner banner:', error);
      throw error;
    }
  };

  // Load pages from Firestore
  const loadPagesFromFirestore = async () => {
    try {
      const q = query(collection(db, 'pages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: CustomPage[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() } as CustomPage);
      });
      console.log('Loaded pages from Firestore:', data);
      setPages(data);
    } catch (error) {
      console.error('Error loading pages from Firestore:', error);
      setPages([]);
    }
  };

  // Page handlers
  const addPage = async (item: Omit<CustomPage, 'id'>) => {
    try {
      console.log('[Pages] Adding page:', item);
      const docRef = await addDoc(collection(db, 'pages'), {
        ...item,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      const newPage: CustomPage = { ...item, id: docRef.id };
      setPages([...pages, newPage]);
      console.log('[Pages] Successfully added with ID:', docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error('[Pages] Error adding page:', error.message || error);
      throw error;
    }
  };

  const updatePage = async (id: string, item: Omit<CustomPage, 'id'>) => {
    try {
      console.log('[Pages] Updating page:', id, item);
      const pageRef = doc(db, 'pages', id);
      await updateDoc(pageRef, {
        ...item,
        updatedAt: Timestamp.now(),
      });
      setPages(pages.map((p) => (p.id === id ? { id, ...item } : p)));
      console.log('[Pages] Successfully updated');
    } catch (error: any) {
      console.error('[Pages] Error updating page:', error.message || error);
      throw error;
    }
  };

  const deletePage = async (id: string) => {
    try {
      console.log('[Pages] Deleting page:', id);
      await deleteDoc(doc(db, 'pages', id));
      setPages(pages.filter((p) => p.id !== id));
      console.log('[Pages] Successfully deleted');
    } catch (error: any) {
      console.error('[Pages] Error deleting page:', error.message || error);
      throw error;
    }
  };

  const getPageBySlug = (slug: string): CustomPage | undefined => {
    return pages.find((p) => p.slug === slug);
  };

  const getPageByCourseId = (courseId: string): CustomPage | undefined => {
    return pages.find((p) => p.courseId === courseId);
  };

  return (
    <ContentContext.Provider
      value={{
        news,
        addNews,
        updateNews,
        deleteNews,
        gallery,
        addGallery,
        updateGallery,
        deleteGallery,
        schedule,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        registrations,
        addRegistration,
        updateRegistration,
        deleteRegistration,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        pages,
        addPage,
        updatePage,
        deletePage,
        getPageBySlug,
        getPageByCourseId,
        partnerBanner,
        updatePartnerBanner,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
