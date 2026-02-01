'use client';

import { PageSection } from '@/context/ContentContext';
import { ReactNode } from 'react';
import { useContent } from '@/context/ContentContext';
import { Check, Play, Quote, ArrowRight } from 'lucide-react';

interface PageRendererProps {
  sections: PageSection[];
  courseData?: any;
}

export default function PageRenderer({ sections, courseData }: PageRendererProps) {
  const { gallery } = useContent();
  
  const renderSection = (section: PageSection): ReactNode => {
    switch (section.type) {
      // ============ HERO ADVANCED ============
      case 'hero':
        return (
          <div
            key={section.id}
            className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: section.data.image 
                ? `url(${section.data.image})` 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {/* Overlay */}
            <div className={`absolute inset-0 ${section.data.image ? 'bg-black/60' : 'bg-black/20'}`}></div>
            
            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-6 md:px-8">
              {section.data.badge && (
                <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full mb-6">
                  {section.data.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {section.data.title}
              </h1>
              {section.data.subtitle && (
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  {section.data.subtitle}
                </p>
              )}
              {section.data.description && (
                <p className="text-base md:text-lg opacity-80 mb-8 max-w-2xl mx-auto">
                  {section.data.description}
                </p>
              )}
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {section.data.buttonText && (
                  <a
                    href={section.data.buttonLink || '#'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    {section.data.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                )}
                {section.data.buttonText2 && (
                  <a
                    href={section.data.buttonLink2 || '#'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold rounded-lg transition-all border border-white/30"
                  >
                    {section.data.buttonText2}
                  </a>
                )}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
                <div className="w-1 h-3 bg-white/70 rounded-full"></div>
              </div>
            </div>
          </div>
        );

      // ============ TEXT WITH IMAGE ============
      case 'text-image':
        const imageRight = section.data.imagePosition !== 'left';
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-900">
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageRight ? '' : 'lg:flex-row-reverse'}`}>
              {/* Text Content */}
              <div className={`${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                {section.data.badge && (
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-semibold rounded-full mb-4">
                    {section.data.badge}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {section.data.title}
                </h2>
                <div className="prose prose-lg prose-invert">
                  {section.data.content?.split('\n').map((paragraph: string, idx: number) => (
                    paragraph.trim() && (
                      <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
                {section.data.buttonText && (
                  <a
                    href={section.data.buttonLink || '#'}
                    className="inline-flex items-center mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                  >
                    {section.data.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
              
              {/* Image */}
              <div className={`${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative">
                  <img
                    src={section.data.image || '/images/placeholder.jpg'}
                    alt={section.data.title || 'Section image'}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-orange-500/30 rounded-2xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        );

      // ============ IMAGE GRID ============
      case 'image-grid':
        const images = section.data.images || [];
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-800">
            <div className="max-w-6xl mx-auto">
              {section.data.title && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.data.title}</h2>
                  {section.data.subtitle && (
                    <p className="text-gray-400 max-w-2xl mx-auto">{section.data.subtitle}</p>
                  )}
                </div>
              )}
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${section.data.columns || 4} gap-4`}>
                {images.map((img: string, idx: number) => (
                  <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ============ STATS/NUMBERS ============
      case 'stats':
        const stats = section.data.items || [];
        return (
          <div key={section.id} className="py-16 md:py-20 px-6 md:px-8 bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="max-w-6xl mx-auto">
              {section.data.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{section.data.title}</h2>
              )}
              <div className={`grid grid-cols-2 md:grid-cols-${stats.length > 4 ? 4 : stats.length} gap-8 md:gap-12`}>
                {stats.map((stat: any, idx: number) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ============ TESTIMONIAL ============
      case 'testimonial':
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-900">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 text-orange-500 mx-auto mb-8 opacity-50" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-8 italic">
                "{section.data.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                {section.data.avatar && (
                  <img
                    src={section.data.avatar}
                    alt={section.data.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                  />
                )}
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">{section.data.author}</div>
                  {section.data.role && (
                    <div className="text-gray-400">{section.data.role}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // ============ TWO COLUMNS ============
      case 'two-column':
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-900">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                {section.data.leftTitle && (
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{section.data.leftTitle}</h3>
                )}
                <div className="text-gray-300 leading-relaxed">
                  {section.data.leftContent?.split('\n').map((p: string, idx: number) => (
                    p.trim() && <p key={idx} className="mb-4">{p}</p>
                  ))}
                </div>
                {section.data.leftImages && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {section.data.leftImages.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt="" className="rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Column */}
              <div>
                {section.data.rightTitle && (
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{section.data.rightTitle}</h3>
                )}
                <div className="text-gray-300 leading-relaxed">
                  {section.data.rightContent?.split('\n').map((p: string, idx: number) => (
                    p.trim() && <p key={idx} className="mb-4">{p}</p>
                  ))}
                </div>
                {section.data.rightImages && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {section.data.rightImages.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt="" className="rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // ============ CARDS ============
      case 'cards':
        const cards = section.data.items || [];
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-800">
            <div className="max-w-6xl mx-auto">
              {section.data.title && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.data.title}</h2>
                  {section.data.subtitle && (
                    <p className="text-gray-400 max-w-2xl mx-auto">{section.data.subtitle}</p>
                  )}
                </div>
              )}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${section.data.columns || 3} gap-8`}>
                {cards.map((card: any, idx: number) => (
                  <div key={idx} className="bg-gray-900 rounded-2xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                    {card.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {card.icon && (
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-2xl">{card.icon}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-gray-400 mb-4">{card.description}</p>
                      {card.link && (
                        <a href={card.link} className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-400">
                          Pelajari lebih lanjut
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // ============ VIDEO ============
      case 'video':
        const getYouTubeId = (url: string) => {
          const match = url?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
          return match ? match[1] : null;
        };
        const videoId = getYouTubeId(section.data.url || '');
        
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-900">
            <div className="max-w-4xl mx-auto">
              {section.data.title && (
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.data.title}</h2>
                  {section.data.subtitle && (
                    <p className="text-gray-400">{section.data.subtitle}</p>
                  )}
                </div>
              )}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={section.data.title || 'Video'}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // ============ FEATURES LIST ============
      case 'features':
        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-800">
            <div className="max-w-6xl mx-auto">
              {section.data.title && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.data.title}</h2>
                  {section.data.subtitle && (
                    <p className="text-gray-400 max-w-2xl mx-auto">{section.data.subtitle}</p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(section.data.items) &&
                  section.data.items.map((feature: any, idx: number) => (
                    <div key={idx} className="bg-gray-900 p-6 rounded-xl hover:bg-gray-850 transition group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg mb-1">
                            {typeof feature === 'string' ? feature : feature.title}
                          </h4>
                          {typeof feature !== 'string' && feature.description && (
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      // ============ CTA SECTION ============
      case 'cta':
        return (
          <div 
            key={section.id} 
            className="py-16 md:py-24 px-6 md:px-8 bg-cover bg-center relative"
            style={{
              backgroundImage: section.data.backgroundImage 
                ? `url(${section.data.backgroundImage})` 
                : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
            }}
          >
            {section.data.backgroundImage && (
              <div className="absolute inset-0 bg-black/60"></div>
            )}
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {section.data.title || 'Ready to Get Started?'}
              </h2>
              {section.data.description && (
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {section.data.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={section.data.buttonLink || '#'}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  {section.data.buttonText || 'Get Started'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                {section.data.buttonText2 && (
                  <a
                    href={section.data.buttonLink2 || '#'}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
                  >
                    {section.data.buttonText2}
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      // ============ TEXT SECTION ============
      case 'text':
        return (
          <div key={section.id} className="py-16 md:py-20 px-6 md:px-8 bg-gray-900">
            <div className="max-w-4xl mx-auto">
              {section.data.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">{section.data.title}</h2>
              )}
              <div className="prose prose-lg prose-invert max-w-none">
                {section.data.content?.split('\n').map((paragraph: string, idx: number) => (
                  paragraph.trim() && (
                    <p key={idx} className="mb-6 text-gray-300 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        );

      // ============ IMAGE SECTION ============
      case 'image':
        return (
          <div key={section.id} className="py-12 md:py-16 px-6 md:px-8 bg-gray-900">
            <div className="max-w-5xl mx-auto">
              {section.data.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">{section.data.title}</h2>
              )}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={section.data.image || ''}
                  alt={section.data.description || 'Section image'}
                  className="w-full h-auto"
                />
              </div>
              {section.data.caption && (
                <p className="text-center text-gray-400 mt-4 italic">{section.data.caption}</p>
              )}
            </div>
          </div>
        );

      // ============ GALLERY FROM CONTEXT ============
      case 'gallery':
        const galleryItems = section.data.subtitle
          ? gallery.filter((item) => item.category === section.data.subtitle)
          : gallery;

        return (
          <div key={section.id} className="py-16 md:py-24 px-6 md:px-8 bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {section.data.title || 'Gallery'}
                </h2>
                {section.data.description && (
                  <p className="text-gray-400 max-w-2xl mx-auto">{section.data.description}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.length > 0 ? (
                  galleryItems.map((item) => (
                    <div key={item.id} className="relative group overflow-hidden rounded-xl aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.category}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-12">
                    No gallery items available
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // ============ DIVIDER ============
      case 'divider':
        return (
          <div key={section.id} className="py-8 px-6 bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className={`border-t ${section.data.style === 'thick' ? 'border-2' : 'border'} ${section.data.color || 'border-gray-700'}`}></div>
            </div>
          </div>
        );

      // ============ SPACER ============
      case 'spacer':
        return (
          <div 
            key={section.id} 
            className="bg-gray-900"
            style={{ height: `${section.data.height || 60}px` }}
          ></div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {sections.sort((a, b) => a.order - b.order).map(renderSection)}
    </div>
  );
}
