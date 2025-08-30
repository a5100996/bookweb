import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Home, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const HighlightSection: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Leaf,
      title: t.highlights.nature.title,
      description: t.highlights.nature.description,
      image: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=800',
      delay: 0,
    },
    {
      icon: Home,
      title: t.highlights.facilities.title,
      description: t.highlights.facilities.description,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      delay: 200,
    },
    {
      icon: Heart,
      title: t.highlights.service.title,
      description: t.highlights.service.description,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      delay: 400,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className={`
                  transform transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                  }
                `}
                style={{ transitionDelay: `${highlight.delay}ms` }}
              >
                {/* Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className={`
                      w-full h-full object-cover
                      ${!isQuietMode ? 'transition-transform duration-500 group-hover:scale-105' : ''}
                    `}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;