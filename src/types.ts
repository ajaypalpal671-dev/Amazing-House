export interface HotelConfig {
  hotelName: string;
  tagline: string;
  address: string;
  locality: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phoneNumber: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  totalRooms: number;
  minPrice: number;
  maxPrice: number;
  currency: string;
}

export interface RoomItem {
  id: string;
  name: string;
  pricePerNight: number;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  facilities: string[];
  maxOccupancy: string;
  bedType: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'exterior' | 'rooms' | 'bathroom' | 'reception' | 'common';
  imageUrl: string;
  altText: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomType: string;
  guestName: string;
  phoneNumber: string;
  emailAddress: string;
  specialRequests: string;
}
