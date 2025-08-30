import React, { useEffect, useRef, useState } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const InstagramGrid: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  const instagramPosts = [
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`
          text-center mb-16
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {t.instagram.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            @mingyue_bnb
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((image, index) => (
            <div
              key={index}
              className={`
                relative group cursor-pointer overflow-hidden rounded-2xl aspect-square
                transform transition-all duration-700 ease-out
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
                }
                ${!isQuietMode ? 'hover:scale-105' : ''}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <button className={`
            inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600
            hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-medium
            transition-all duration-300 shadow-lg hover:shadow-xl
            ${!isQuietMode ? 'transform hover:-translate-y-1' : ''}
          `}>
            <Instagram className="w-5 h-5 mr-2" />
            追蹤我們的 Instagram
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;