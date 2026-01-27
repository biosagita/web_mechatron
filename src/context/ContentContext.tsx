'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  color: string;
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
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);

  // Load registrations from Firestore on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadRegistrationsFromFirestore();
    }
  }, []);

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
    } finally {
      setLoadingRegistrations(false);
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
    },
    {
      id: '2',
      date: '20 Januari 2025',
      title: 'Workshop Gratis: Intro to Robotics dengan Arduino',
      excerpt: 'Kami mengadakan workshop gratis untuk calon siswa yang ingin mengenal dunia robotika.',
      category: 'Workshop',
    },
    {
      id: '3',
      date: '15 Januari 2025',
      title: 'Peluncuran Program Beasiswa untuk Siswa Berprestasi',
      excerpt: 'Mechatron menyediakan program beasiswa penuh untuk siswa dengan prestasi akademik terbaik.',
      category: 'Beasiswa',
    },
  ]);

  const [gallery, setGallery] = useState<GalleryItem[]>([
    { id: '1', title: 'Robot Penjelajah', category: 'Autonomous Robot', color: 'bg-blue-500' },
    { id: '2', title: 'Arm Manipulator', category: 'Industrial Robotics', color: 'bg-purple-500' },
    { id: '3', title: 'Humanoid Robot', category: 'Advanced Robotics', color: 'bg-pink-500' },
    { id: '4', title: 'Drone Delivery', category: 'UAV Technology', color: 'bg-green-500' },
    { id: '5', title: 'Smart Home System', category: 'IoT & Automation', color: 'bg-yellow-500' },
    { id: '6', title: 'Vision System', category: 'Computer Vision', color: 'bg-red-500' },
  ]);

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
  const addGallery = (item: GalleryItem) => {
    setGallery([...gallery, item]);
  };

  const updateGallery = (id: string, item: GalleryItem) => {
    setGallery(gallery.map((g) => (g.id === id ? item : g)));
  };

  const deleteGallery = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
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
