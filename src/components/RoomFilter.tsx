import React, { useState } from 'react';
import { Calendar, Users, Filter, RotateCcw } from 'lucide-react';
import { BookingFilter } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

interface RoomFilterProps {
  filter: BookingFilter;
  onFilterChange: (filter: BookingFilter) => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ filter, onFilterChange }) => {
  const { language } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslation(language);

  const roomTypes = [
    { value: '', label: '所有房型' },
    { value: 'twin', label: t.rooms.twin },
    { value: 'double', label: t.rooms.double },
    { value: 'family', label: t.rooms.family },
  ];

  const handleDateChange = (type: 'checkIn' | 'checkOut', value: string) => {
    onFilterChange({
      ...filter,
      [type]: value ? new Date(value) : null,
    });
  };

  const resetFilter = () => {
    onFilterChange({
      checkIn: null,
      checkOut: null,
      guests: 2,
      roomType: '',
      sharedBathroom: false,
    });
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">篩選條件</span>
          </div>
          <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            <RotateCcw className="w-5 h-5 text-gray-500" />
          </div>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Check-in Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              入住日期
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formatDateForInput(filter.checkIn)}
                onChange={(e) => handleDateChange('checkIn', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              退房日期
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formatDateForInput(filter.checkOut)}
                onChange={(e) => handleDateChange('checkOut', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              住客人數
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filter.guests}
                onChange={(e) => onFilterChange({ ...filter, guests: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>{num} 人</option>
                ))}
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              房型
            </label>
            <select
              value={filter.roomType}
              onChange={(e) => onFilterChange({ ...filter, roomType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
            >
              {roomTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Shared Bathroom Discount */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              共用衛浴折扣
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filter.sharedBathroom}
                onChange={(e) => onFilterChange({ ...filter, sharedBathroom: e.target.checked })}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-900 dark:text-white">啟用折扣</span>
            </label>
          </div>

          {/* Reset Button */}
          <div className="lg:col-span-1 flex items-end">
            <button
              onClick={resetFilter}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;