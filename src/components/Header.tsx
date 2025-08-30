import React, { useState, useEffect } from 'react';
import { Moon, Sun, Volume2, VolumeX, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const Header: React.FC = () => {
  const { isDark, isQuietMode, language, toggleTheme, toggleQuietMode, toggleLanguage } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'rooms', label: t.nav.rooms },
    { key: 'experiences', label: t.nav.experiences },
    { key: 'blog', label: t.nav.blog },
    { key: 'about', label: t.nav.about },
    { key: 'contact', label: t.nav.contact },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`
              text-2xl lg:text-3xl font-bold tracking-wide
              ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}
              transition-colors duration-300
            `}>
              明月
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400' 
                    : 'text-white/90 hover:text-white'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Quiet Mode Toggle */}
            <button
              onClick={toggleQuietMode}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {isQuietMode ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <button className={`
              hidden lg:block px-6 py-2 rounded-full font-medium transition-all duration-200
              ${isScrolled 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }
            `}>
              {t.nav.bookNow}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-all duration-200
                ${isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all duration-200">
                {t.nav.bookNow}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;