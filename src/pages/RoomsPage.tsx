import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Grid, List } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import RoomFilter from '../components/RoomFilter';
import Calendar from '../components/Calendar';
import { Room, BookingFilter } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const RoomsPage: React.FC = () => {
  const { language } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [filter, setFilter] = useState<BookingFilter>({
    checkIn: null,
    checkOut: null,
    guests: 2,
    roomType: '',
    sharedBathroom: false,
  });
  const [selectedDates, setSelectedDates] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const t = useTranslation(language);

  const allRooms: Room[] = [
    {
      id: 'twin-1',
      name: 'Twin 雙床房 - 房間1',
      type: 'twin',
      building: 'A',
      capacity: 2,
      price: 2800,
      discountPrice: 2600,
      images: [
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '簡約雙床設計，享受清晨第一道陽光。配對房間可享共用衛浴折扣。',
      amenities: ['獨立衛浴', '山景窗台', '木質地板', '空調', '免費WiFi'],
      pairWith: 'Twin-2',
      available: true,
      remainingToday: 1,
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
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '與房間1配對的雙床房，適合朋友或家庭同行。',
      amenities: ['獨立衛浴', '山景窗台', '木質地板', '空調', '免費WiFi'],
      pairWith: 'Twin-1',
      available: true,
      remainingToday: 1,
    },
    {
      id: 'double-1',
      name: 'Double 雙人房 - 房間3',
      type: 'double',
      building: 'A',
      capacity: 2,
      price: 3200,
      discountPrice: 3000,
      images: [
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '浪漫雙人空間，眺望遠山如畫。可與房間4配對享折扣。',
      amenities: ['私人陽台', '按摩浴缸', '迷你吧', '免費WiFi', '山景'],
      pairWith: 'Double-2',
      available: true,
      remainingToday: 1,
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
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '與房間3配對的雙人房，享受私密的情侶時光。',
      amenities: ['私人陽台', '按摩浴缸', '迷你吧', '免費WiFi', '山景'],
      pairWith: 'Double-1',
      available: false,
    },
    {
      id: 'family-1',
      name: 'Family 家庭房 - B棟',
      type: 'family',
      building: 'B',
      capacity: 4,
      maxCapacity: 6,
      price: 4500,
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: '寬敞家庭房，享受天倫之樂的完美空間。可容納最多6人。',
      amenities: ['獨立客廳', '小廚房', '洗衣機', '兒童遊戲區', '2間臥室'],
      available: true,
      remainingToday: 2,
    },
  ];

  // Mock unavailable dates and pricing
  const unavailableDates = [
    new Date(2025, 0, 15),
    new Date(2025, 0, 16),
    new Date(2025, 0, 22),
  ];

  const mockPricing: { [key: string]: number } = {
    '2025-01-20': 3500,
    '2025-01-21': 3500,
    '2025-01-27': 3200,
    '2025-01-28': 3200,
  };

  const filteredRooms = allRooms.filter(room => {
    if (filter.roomType && room.type !== filter.roomType) return false;
    if (filter.guests > room.capacity && (!room.maxCapacity || filter.guests > room.maxCapacity)) return false;
    return true;
  });

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setSelectedDates({ start, end });
    setFilter({ ...filter, checkIn: start, checkOut: end });
  };

  useEffect(() => {
    setSelectedDates({ start: filter.checkIn, end: filter.checkOut });
  }, [filter.checkIn, filter.checkOut]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            房型一覽
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            選擇您理想的住宿空間
          </p>
        </div>

        {/* Filter */}
        <RoomFilter filter={filter} onFilterChange={setFilter} />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`
                flex items-center px-4 py-2 rounded-lg transition-all duration-200
                ${viewMode === 'grid' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <Grid className="w-4 h-4 mr-2" />
              卡片檢視
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`
                flex items-center px-4 py-2 rounded-lg transition-all duration-200
                ${viewMode === 'calendar' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              日曆檢視
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            找到 {filteredRooms.length} 間房型
          </p>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Calendar
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
                unavailableDates={unavailableDates}
                pricing={mockPricing}
              />
            </div>
            <div className="space-y-6">
              {filteredRooms.slice(0, 3).map((room) => (
                <div key={room.id} className="transform scale-90">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;