import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Schedule() {
  const classes = [
    {
      name: 'Beginner Robotics',
      level: 'Pemula',
      time: 'Senin & Rabu, 15:00-17:00',
      capacity: '15 Siswa',
      location: 'Lab A',
    },
    {
      name: 'Intermediate Programming',
      level: 'Menengah',
      time: 'Selasa & Kamis, 16:00-18:00',
      capacity: '12 Siswa',
      location: 'Lab B',
    },
    {
      name: 'Advanced Robotics',
      level: 'Lanjutan',
      time: 'Sabtu, 09:00-12:00',
      capacity: '10 Siswa',
      location: 'Lab C',
    },
    {
      name: 'Drone & UAV',
      level: 'Spesialis',
      time: 'Minggu, 10:00-13:00',
      capacity: '8 Siswa',
      location: 'Outdoor Arena',
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Jadwal Kelas</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Pilih program yang sesuai dengan level dan ketersediaan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{cls.name}</h3>
                  <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                    {cls.level}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-600">
                  <Clock size={18} className="text-cyan-500" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Users size={18} className="text-cyan-500" />
                  <span>Kapasitas: {cls.capacity}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <MapPin size={18} className="text-cyan-500" />
                  <span>{cls.location}</span>
                </div>
              </div>

              <Link href="/register" className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition block text-center">
                Daftar Kelas
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
