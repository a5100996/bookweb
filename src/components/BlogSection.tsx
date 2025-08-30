import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const BlogSection: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '晨曦中的山林步道',
      date: '2025-01-10',
      excerpt: '清晨五點，當第一縷陽光穿過雲層，山林步道開始甦醒...',
      image: 'https://images.pexels.com/photos/1591375/pexels-photo-1591375.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: '自然探索',
    },
    {
      id: '2',
      title: '手作早餐的溫暖時光',
      date: '2025-01-08',
      excerpt: '每天清晨，我們用心準備當地食材製作的豐盛早餐...',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: '美食分享',
    },
    {
      id: '3',
      title: '冬日泡湯的療癒體驗',
      date: '2025-01-05',
      excerpt: '在山林環繞的溫泉中，感受大自然的擁抱與療癒...',
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: '放鬆體驗',
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
            {t.blog.title}
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`
                group cursor-pointer
                transform transition-all duration-700 ease-out
                ${isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
                }
                ${!isQuietMode ? 'hover:-translate-y-1' : ''}
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`
                      w-full h-full object-cover
                      ${!isQuietMode ? 'transition-transform duration-500 group-hover:scale-105' : ''}
                    `}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US')}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">
                    <span>閱讀更多</span>
                    <ArrowRight className={`
                      w-4 h-4 ml-2
                      ${!isQuietMode ? 'transition-transform duration-200 group-hover:translate-x-1' : ''}
                    `} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;