import React from 'react';
import { Star } from 'lucide-react';

export default function Gallery() {
  const projects = [
    {
      title: 'Robot Penjelajah',
      category: 'Autonomous Robot',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Arm Manipulator',
      category: 'Industrial Robotics',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Humanoid Robot',
      category: 'Advanced Robotics',
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    },
    {
      title: 'Drone Delivery',
      category: 'UAV Technology',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Smart Home System',
      category: 'IoT & Automation',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    },
    {
      title: 'Vision System',
      category: 'Computer Vision',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proyek Siswa</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lihat kreativitas dan inovasi siswa-siswa Mechatron
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${project.color} h-64 rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all hover:scale-105 border-4 border-transparent hover:border-orange-400`}
            >
              <div className="w-full h-full flex flex-col justify-between p-6 text-white">
                <div>
                  <p className="text-sm font-semibold opacity-90 mb-2 bg-orange-500/30 px-3 py-1 rounded-full inline-block">{project.category}</p>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="white" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
