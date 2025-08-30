import React from 'react';
import { Users, MapPin, Tag } from 'lucide-react';
import { Room } from '../types/room';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { isQuietMode, language } = useTheme();
  const t = useTranslation(language);

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden
      transform transition-all duration-300
      ${!isQuietMode ? 'hover:-translate-y-2 hover:shadow-2xl' : 'hover:shadow-xl'}
      border border-gray-100 dark:border-gray-700
    `}>
      {/* Room Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className={`
            w-full h-full object-cover
            ${!isQuietMode ? 'transition-transform duration-500 hover:scale-105' : ''}
          `}
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {room.available ? (
            room.remainingToday && (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                {t.rooms.available} {room.remainingToday}
              </span>
            )
          ) : (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              {t.rooms.fullyBooked}
            </span>
          )}
        </div>

        {/* Building Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-black/20 text-white text-xs font-medium rounded-md backdrop-blur-sm">
            {room.building}{t.rooms.building}
          </span>
        </div>

        {/* Discount Badge */}
        {room.discountPrice && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {t.rooms.pairedDiscount}
            </span>
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {room.name}
          </h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>{room.capacity}{room.maxCapacity ? `-${room.maxCapacity}` : ''} {t.rooms.guests}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
              +{room.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Pairing Info */}
        {room.pairWith && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 text-xs flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {t.rooms.pairWith} {room.pairWith}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {room.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  NT${room.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  NT${room.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                NT${room.price.toLocaleString()}
              </span>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              {t.rooms.fromPrice}
            </span>
          </div>

          <button 
            className={`
              px-4 py-2 bg-green-600 hover:bg-green-700 text-white
              rounded-lg font-medium text-sm transition-all duration-200
              ${!isQuietMode ? 'transform hover:-translate-y-0.5 hover:shadow-lg' : ''}
            `}
            disabled={!room.available}
          >
            {room.available ? t.nav.bookNow : t.rooms.fullyBooked}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;