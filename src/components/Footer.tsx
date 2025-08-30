import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const Footer: React.FC = () => {
  const { language } = useTheme();
  const t = useTranslation(language);

  const contactInfo = [
    {
      icon: MapPin,
      label: '地址',
      value: '南投縣仁愛鄉清境農場',
    },
    {
      icon: Phone,
      label: '電話',
      value: '+886-49-2801234',
    },
    {
      icon: Mail,
      label: '信箱',
      value: 'hello@mingyue-bnb.com',
    },
  ];

  const quickLinks = [
    { label: t.nav.rooms, href: '#rooms' },
    { label: t.nav.experiences, href: '#experiences' },
    { label: t.nav.blog, href: '#blog' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/mingyue_bnb' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/mingyue_bnb' },
    { icon: MessageCircle, label: 'LINE', href: 'https://line.me/ti/p/mingyue_bnb' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold mb-4">明月</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              在自然懷抱中，尋找內心的寧靜。每個房間都是一個故事，每次住宿都是一段美好回憶。
            </p>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all duration-200 transform hover:-translate-y-0.5">
              {t.nav.bookNow}
            </button>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.contact}</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.quickLinks}</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.follow}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;