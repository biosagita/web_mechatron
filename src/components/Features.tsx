import React from 'react';
import { Zap, Code, Lightbulb, Target } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Teknologi Terkini',
      description: 'Belajar dengan peralatan robotika dan teknologi paling modern di kelasnya',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Coding & Programming',
      description: 'Kurikulum komprehensif mencakup Python, C++, dan ROS (Robot Operating System)',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'STEM Education',
      description: 'Mengembangkan kemampuan berpikir kritis dan problem-solving skills',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Kompetisi Internasional',
      description: 'Persiapan untuk mengikuti lomba robotika nasional dan internasional',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Mengapa Memilih Mechatron?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Kami menyediakan pendidikan robotika terbaik untuk membangun generasi inovator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center text-orange-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
