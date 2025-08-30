import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RoomCard from './RoomCard';
import { Room } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const FeaturedRooms: React.FC = () => {
  const { language } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  const featuredRooms: Room[] = [
    {
      id: 'twin-1',
      name: t.rooms.twin,
      type: 'twin',
      building: 'A',
      capacity: 2,
      price: 2800,
      discountPrice: 2600,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '簡約雙床設計，享受清晨第一道陽光',
      amenities: ['獨立衛浴', '山景窗台', '木質地板', '空調'],
      pairWith: 'Twin-2',
      available: true,
      remainingToday: 1,
    },
    {
      id: 'double-1',
      name: t.rooms.double,
      type: 'double',
      building: 'A',
      capacity: 2,
      price: 3200,
      discountPrice: 3000,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '浪漫雙人空間，眺望遠山如畫',
      amenities: ['私人陽台', '按摩浴缸', '迷你吧', '免費WiFi'],
      pairWith: 'Double-2',
      available: true,
      remainingToday: 1,
    },
    {
      id: 'family-1',
      name: t.rooms.family,
      type: 'family',
      building: 'B',
      capacity: 4,
      maxCapacity: 6,
      price: 4500,
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '寬敞家庭房，享受天倫之樂的完美空間',
      amenities: ['獨立客廳', '小廚房', '洗衣機', '兒童遊戲區'],
      available: true,
      remainingToday: 2,
    },
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRooms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredRooms.length) % featuredRooms.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`
          text-center mb-16
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            精選房型
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredRooms.map((room) => (
                <div key={room.id} className="w-full flex-shrink-0 px-4">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredRooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${currentSlide === index 
                    ? 'bg-green-500 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <div
              key={room.id}
              className={`
                transform transition-all duration-700 ease-out
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;