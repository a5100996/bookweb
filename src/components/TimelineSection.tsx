import React, { useEffect, useRef, useState } from 'react';
import { SeasonActivity } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const TimelineSection: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  const seasons: SeasonActivity[] = [
    {
      season: 'spring',
      title: t.timeline.spring.title,
      description: t.timeline.spring.description,
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#22C55E',
    },
    {
      season: 'summer',
      title: t.timeline.summer.title,
      description: t.timeline.summer.description,
      image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#06B6D4',
    },
    {
      season: 'autumn',
      title: t.timeline.autumn.title,
      description: t.timeline.autumn.description,
      image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#F59E0B',
    },
    {
      season: 'winter',
      title: t.timeline.winter.title,
      description: t.timeline.winter.description,
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: '#8B5CF6',
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

  useEffect(() => {
    if (!isQuietMode) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % seasons.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isQuietMode, seasons.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className={`
          text-center mb-16
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.timeline.title}
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-y-1/2 hidden lg:block">
            <div 
              className={`
                h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full
                transition-all duration-1000 ease-out
                ${isVisible ? 'w-full' : 'w-0'}
              `}
            ></div>
          </div>

          {/* Season Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {seasons.map((season, index) => (
              <div
                key={season.season}
                className={`
                  relative cursor-pointer group
                  transform transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                  }
                  ${activeIndex === index && !isQuietMode ? 'scale-105' : ''}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full mb-4">
                  <div 
                    className={`
                      w-6 h-6 rounded-full border-4 border-white dark:border-gray-900
                      transition-all duration-300
                      ${activeIndex === index 
                        ? 'scale-125 shadow-lg' 
                        : 'scale-100'
                      }
                    `}
                    style={{ backgroundColor: season.color }}
                  ></div>
                </div>

                {/* Card */}
                <div className={`
                  bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden
                  transition-all duration-300
                  ${activeIndex === index 
                    ? 'shadow-2xl ring-2 ring-opacity-50' 
                    : 'hover:shadow-xl'
                  }
                  ${!isQuietMode ? 'hover:-translate-y-1' : ''}
                `}
                style={{ 
                  ringColor: activeIndex === index ? season.color : 'transparent'
                }}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={season.image}
                      alt={season.title}
                      className={`
                        w-full h-full object-cover
                        ${!isQuietMode ? 'transition-transform duration-500 group-hover:scale-105' : ''}
                      `}
                    />
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: season.color }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {season.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {season.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;