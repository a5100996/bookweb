import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDates: { start: Date | null; end: Date | null };
  onDateSelect: (start: Date | null, end: Date | null) => void;
  unavailableDates: Date[];
  pricing: { [key: string]: number };
}

const Calendar: React.FC<CalendarProps> = ({ 
  selectedDates, 
  onDateSelect, 
  unavailableDates, 
  pricing 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingEnd, setSelectingEnd] = useState(false);

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailable => 
      unavailable.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date) => {
    if (!selectedDates.start || !selectedDates.end) return false;
    return date >= selectedDates.start && date <= selectedDates.end;
  };

  const isDateSelected = (date: Date) => {
    if (selectedDates.start && date.toDateString() === selectedDates.start.toDateString()) return true;
    if (selectedDates.end && date.toDateString() === selectedDates.end.toDateString()) return true;
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date)) return;

    if (!selectedDates.start || selectingEnd) {
      if (!selectedDates.start) {
        onDateSelect(date, null);
        setSelectingEnd(true);
      } else {
        if (date >= selectedDates.start) {
          onDateSelect(selectedDates.start, date);
        } else {
          onDateSelect(date, null);
        }
        setSelectingEnd(false);
      }
    } else {
      onDateSelect(date, null);
      setSelectingEnd(true);
    }
  };

  const getDatePrice = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return pricing[dateKey] || 2800;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentMonth.getFullYear()}年 {monthNames[currentMonth.getMonth()]}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square"></div>;
          }

          const isUnavailable = isDateUnavailable(date);
          const isSelected = isDateSelected(date);
          const isInRange = isDateInRange(date);
          const price = getDatePrice(date);
          const isPast = date < new Date();

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={isUnavailable || isPast}
              className={`
                aspect-square p-1 text-sm rounded-lg transition-all duration-200
                flex flex-col items-center justify-center relative
                ${isPast 
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                  : isUnavailable 
                    ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                    : isSelected
                      ? 'bg-green-500 text-white shadow-lg'
                      : isInRange
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              <span className="font-medium">{date.getDate()}</span>
              {!isUnavailable && !isPast && (
                <span className="text-xs opacity-75">
                  ${Math.round(price / 100)}k
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Dates Summary */}
      {(selectedDates.start || selectedDates.end) && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300">
                選擇的日期範圍
              </p>
              <p className="font-medium text-green-800 dark:text-green-200">
                {selectedDates.start?.toLocaleDateString('zh-TW')}
                {selectedDates.end && ` - ${selectedDates.end.toLocaleDateString('zh-TW')}`}
              </p>
            </div>
            <button
              onClick={() => onDateSelect(null, null)}
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;