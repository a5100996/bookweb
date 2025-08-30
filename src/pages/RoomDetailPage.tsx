import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, MapPin, Tag, ToggleLeft, ToggleRight, Plus, Minus } from 'lucide-react';
import { Room } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const RoomDetailPage: React.FC = () => {
  const { isQuietMode, language } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pairMode, setPairMode] = useState<'twin' | 'double'>('twin');
  const [guestCount, setGuestCount] = useState(4);
  const t = useTranslation(language);

  const twinRooms: Room[] = [
    {
      id: 'twin-1',
      name: 'Twin 雙床房 - 房間1',
      type: 'twin',
      building: 'A',
      capacity: 2,
      price: 2800,
      discountPrice: 2600,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      description: '明亮舒適的雙床房，享受清晨第一道陽光。與房間2配對使用可享共用衛浴折扣每間-NT$200。',
      amenities: ['兩張單人床', '獨立衛浴', '山景窗台', '木質地板', '空調', '免費WiFi', '保險箱', '吹風機'],
      pairWith: 'Twin-2',
      available: true,
    },
    {
      id: 'twin-2',
      name: 'Twin 雙床房 - 房間2',
      type: 'twin',
      building: 'A',
      capacity: 2,
      price: 2800,
      discountPrice: 2600,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      description: '與房間1配對的雙床房，適合朋友或家庭同行。配對訂房享共用衛浴折扣優惠。',
      amenities: ['兩張單人床', '獨立衛浴', '山景窗台', '木質地板', '空調', '免費WiFi', '保險箱', '吹風機'],
      pairWith: 'Twin-1',
      available: true,
    },
  ];

  const doubleRooms: Room[] = [
    {
      id: 'double-1',
      name: 'Double 雙人房 - 房間3',
      type: 'double',
      building: 'A',
      capacity: 2,
      price: 3200,
      discountPrice: 3000,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      description: '浪漫雙人空間，眺望遠山如畫。與房間4配對使用可享共用衛浴折扣每間-NT$200。',
      amenities: ['一張雙人床', '私人陽台', '按摩浴缸', '迷你吧', '免費WiFi', '山景', '浴袍', '高級備品'],
      pairWith: 'Double-2',
      available: true,
    },
    {
      id: 'double-2',
      name: 'Double 雙人房 - 房間4',
      type: 'double',
      building: 'A',
      capacity: 2,
      price: 3200,
      discountPrice: 3000,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      description: '與房間3配對的雙人房，享受私密的情侶時光。配對訂房享優惠價格。',
      amenities: ['一張雙人床', '私人陽台', '按摩浴缸', '迷你吧', '免費WiFi', '山景', '浴袍', '高級備品'],
      pairWith: 'Double-1',
      available: false,
    },
  ];

  const familyRoom: Room = {
    id: 'family-1',
    name: 'Family 家庭房 - B棟',
    type: 'family',
    building: 'B',
    capacity: 4,
    maxCapacity: 6,
    price: 4500,
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: '寬敞家庭房，享受天倫之樂的完美空間。基本配置4人（1張雙人床+2張榻榻米），可加床至6人。',
    amenities: ['一張雙人床', '兩張榻榻米', '獨立客廳', '小廚房', '洗衣機', '兒童遊戲區', '兩間臥室', '兩套衛浴'],
    available: true,
  };

  const currentRooms = pairMode === 'twin' ? twinRooms : doubleRooms;
  const currentRoom = currentRooms[0];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentRoom.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentRoom.images.length) % currentRoom.images.length);
  };

  const calculateTotalPrice = () => {
    if (currentRoom.type === 'family') {
      const basePrice = familyRoom.price;
      const extraBeds = Math.max(0, guestCount - 4);
      return basePrice + (extraBeds * 500);
    }
    
    const roomPrice = currentRoom.discountPrice || currentRoom.price;
    return roomPrice * 2; // Paired rooms
  };

  const getDiscountAmount = () => {
    if (currentRoom.type === 'family') return 0;
    return 400; // NT$200 per room * 2 rooms
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-green-600 dark:text-green-400 hover:underline">首頁</a></li>
            <li className="text-gray-500">/</li>
            <li><a href="/rooms" className="text-green-600 dark:text-green-400 hover:underline">房型一覽</a></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 dark:text-white">{currentRoom.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden group">
              <img
                src={currentRoom.images[currentImageIndex]}
                alt={currentRoom.name}
                className={`
                  w-full h-full object-cover
                  ${!isQuietMode ? 'transition-transform duration-500 group-hover:scale-105' : ''}
                `}
              />
              
              {/* Navigation Arrows */}
              {currentRoom.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {currentRoom.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-2">
              {currentRoom.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`
                    relative h-24 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${currentImageIndex === index 
                      ? 'border-green-500' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${currentRoom.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="space-y-8">
            {/* A棟配對切換 */}
            {currentRoom.building === 'A' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  A棟配對房型
                </h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Twin 組</span>
                  <button
                    onClick={() => setPairMode(pairMode === 'twin' ? 'double' : 'twin')}
                    className="relative"
                  >
                    {pairMode === 'twin' ? (
                      <ToggleLeft className="w-8 h-8 text-blue-500" />
                    ) : (
                      <ToggleRight className="w-8 h-8 text-blue-500" />
                    )}
                  </button>
                  <span className="text-sm text-blue-700 dark:text-blue-300">Double 組</span>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {pairMode === 'twin' ? 'Twin 配對組合' : 'Double 配對組合'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {pairMode === 'twin' 
                      ? '房間1 & 房間2 - 適合朋友或家庭同行'
                      : '房間3 & 房間4 - 適合情侶或夫妻'
                    }
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        配對折扣 -NT$400
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      NT${((currentRoom.discountPrice || currentRoom.price) * 2).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Family Room Capacity Control */}
            {currentRoom.type === 'family' && (
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  入住人數設定
                </h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-orange-700 dark:text-orange-300 font-medium">住客人數：</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      disabled={guestCount <= 1}
                      className="w-8 h-8 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold text-orange-900 dark:text-orange-100 min-w-[2rem] text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                      disabled={guestCount >= 6}
                      className="w-8 h-8 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">基本配置 (4人)</p>
                      <p className="font-medium">1雙人床 + 2榻榻米</p>
                    </div>
                    {guestCount > 4 && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">加床 ({guestCount - 4}人)</p>
                        <p className="font-medium">+NT${((guestCount - 4) * 500).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-medium text-gray-900 dark:text-white">總價格</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      NT${(familyRoom.price + Math.max(0, guestCount - 4) * 500).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Room Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentRoom.name}
                  </h1>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{currentRoom.building}棟</span>
                    <span className="mx-2">•</span>
                    <Users className="w-4 h-4 mr-1" />
                    <span>
                      {currentRoom.capacity}
                      {currentRoom.maxCapacity ? `-${currentRoom.maxCapacity}` : ''} 人
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {currentRoom.discountPrice ? (
                    <div>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        NT${currentRoom.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                        NT${currentRoom.price.toLocaleString()}
                      </span>
                      <p className="text-sm text-green-600 dark:text-green-400">每晚</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        NT${currentRoom.price.toLocaleString()}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">每晚</p>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {currentRoom.description}
              </p>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">房間設備</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentRoom.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Section */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      入住日期
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      退房日期
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    {currentRoom.type === 'family' ? (
                      <>
                        <div className="flex justify-between">
                          <span>基本價格 (4人)</span>
                          <span>NT${familyRoom.price.toLocaleString()}</span>
                        </div>
                        {guestCount > 4 && (
                          <div className="flex justify-between">
                            <span>加床費用 ({guestCount - 4}人)</span>
                            <span>NT${((guestCount - 4) * 500).toLocaleString()}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span>房間價格 × 2</span>
                          <span>NT${((currentRoom.price) * 2).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>配對折扣</span>
                          <span>-NT${getDiscountAmount().toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-bold">
                      <span>總計</span>
                      <span>NT${calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className={`
                    w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg
                    transition-all duration-200 shadow-lg hover:shadow-xl
                    ${!isQuietMode ? 'transform hover:-translate-y-0.5' : ''}
                  `}
                  disabled={!currentRoom.available}
                >
                  {currentRoom.available ? t.nav.bookNow : t.rooms.fullyBooked}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in Rules */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">入住須知</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">入住時間</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• 入住：下午 3:00 後</li>
                <li>• 退房：上午 11:00 前</li>
                <li>• 提早入住需加收費用</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">房間規則</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• 禁止吸菸（可至指定區域）</li>
                <li>• 歡迎攜帶寵物（需額外清潔費）</li>
                <li>• 夜間請保持安靜（22:00-07:00）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;