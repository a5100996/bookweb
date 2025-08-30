export interface Room {
  id: string;
  name: string;
  type: 'twin' | 'double' | 'family';
  building: 'A' | 'B';
  capacity: number;
  maxCapacity?: number;
  price: number;
  discountPrice?: number;
  images: string[];
  description: string;
  amenities: string[];
  pairWith?: string; // For A building pairing
  available: boolean;
  remainingToday?: number;
}

export interface BookingFilter {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  roomType: string;
  sharedBathroom: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  source: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

export interface SeasonActivity {
  season: string;
  title: string;
  description: string;
  image: string;
  color: string;
}