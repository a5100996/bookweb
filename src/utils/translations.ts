export const translations = {
  zh: {
    nav: {
      rooms: '房型',
      experiences: '體驗',
      blog: '札記',
      about: '關於',
      contact: '聯絡',
      bookNow: '立即訂房',
    },
    hero: {
      title: '明月',
      subtitle: '在自然懷抱中，尋找內心的寧靜',
      cta: '立即訂房',
    },
    rooms: {
      twin: 'Twin 雙床房',
      double: 'Double 雙人房',
      family: 'Family 家庭房',
      fromPrice: '每晚起',
      guests: '人',
      available: '今日剩餘',
      fullyBooked: '已滿',
      building: '棟',
      pairedDiscount: '配對共用衛浴折扣',
      pairWith: '與房間配對',
    },
    highlights: {
      nature: {
        title: '自然環境',
        description: '被翠綠山林環抱，享受最純淨的自然體驗',
      },
      facilities: {
        title: '完善設施',
        description: '現代化設備與傳統美學的完美融合',
      },
      service: {
        title: '貼心服務',
        description: '24小時管家服務，讓您感受家的溫暖',
      },
    },
    testimonials: {
      title: '旅客評價',
    },
    blog: {
      title: '民宿札記',
    },
    instagram: {
      title: '生活時光',
    },
    timeline: {
      title: '四季明月',
      spring: {
        title: '春日萌芽',
        description: '櫻花盛開，新綠滿山',
      },
      summer: {
        title: '夏日清涼',
        description: '溪水潺潺，綠蔭如蓋',
      },
      autumn: {
        title: '秋日豐收',
        description: '楓紅似火，果實滿枝',
      },
      winter: {
        title: '冬日靜謐',
        description: '雪花紛飛，靜享溫暖',
      },
    },
    footer: {
      contact: '聯絡資訊',
      quickLinks: '快速連結',
      follow: '追蹤我們',
      copyright: '© 2025 明月民宿. 保留所有權利.',
    },
  },
  en: {
    nav: {
      rooms: 'Rooms',
      experiences: 'Experiences',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      bookNow: 'Book Now',
    },
    hero: {
      title: 'Mingyue',
      subtitle: 'Find inner peace in nature\'s embrace',
      cta: 'Book Now',
    },
    rooms: {
      twin: 'Twin Room',
      double: 'Double Room',
      family: 'Family Room',
      fromPrice: 'From',
      guests: 'guests',
      available: 'Available today',
      fullyBooked: 'Fully Booked',
      building: 'Building',
      pairedDiscount: 'Paired Shared Bathroom Discount',
      pairWith: 'Paired with Room',
    },
    highlights: {
      nature: {
        title: 'Natural Environment',
        description: 'Surrounded by lush mountains, enjoy the purest natural experience',
      },
      facilities: {
        title: 'Premium Facilities',
        description: 'Perfect fusion of modern amenities and traditional aesthetics',
      },
      service: {
        title: 'Thoughtful Service',
        description: '24-hour concierge service to make you feel at home',
      },
    },
    testimonials: {
      title: 'Guest Reviews',
    },
    blog: {
      title: 'Our Stories',
    },
    instagram: {
      title: 'Life Moments',
    },
    timeline: {
      title: 'Four Seasons at Mingyue',
      spring: {
        title: 'Spring Awakening',
        description: 'Cherry blossoms bloom, fresh green fills the mountains',
      },
      summer: {
        title: 'Summer Coolness',
        description: 'Flowing streams, shade of green canopy',
      },
      autumn: {
        title: 'Autumn Harvest',
        description: 'Maple leaves like fire, fruits full of branches',
      },
      winter: {
        title: 'Winter Serenity',
        description: 'Snowflakes falling, enjoying warmth in silence',
      },
    },
    footer: {
      contact: 'Contact Info',
      quickLinks: 'Quick Links',
      follow: 'Follow Us',
      copyright: '© 2025 Mingyue B&B. All rights reserved.',
    },
  },
};

export const useTranslation = (language: 'zh' | 'en') => {
  return translations[language];
};