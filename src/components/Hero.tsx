import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const Hero: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslation(language);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className={`
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <h1 className={`
            text-6xl lg:text-8xl font-bold mb-6 tracking-wider
            ${!isQuietMode ? 'animate-pulse' : ''}
          `}>
            {t.hero.title}
          </h1>
          
          <p className={`
            text-xl lg:text-2xl mb-8 font-light leading-relaxed
            transform transition-all duration-1000 delay-300 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            ${!isQuietMode ? 'animate-pulse animation-delay-1000' : ''}
          `}>
            {t.hero.subtitle}
          </p>

          <button className={`
            px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm
            text-white border border-white/30 rounded-full
            font-medium text-lg transition-all duration-300
            transform hover:-translate-y-1 hover:shadow-2xl
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            transition-delay-500
            ${!isQuietMode ? 'hover:scale-105' : ''}
          `}>
            {t.hero.cta}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={`
          absolute bottom-8 left-1/2 transform -translate-x-1/2
          ${!isQuietMode ? 'animate-bounce' : ''}
        `}>
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;