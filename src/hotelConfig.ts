import { HotelConfig, RoomItem, FacilityItem, GalleryPhoto } from './types';
import hotelExteriorImg from './assets/images/mazing_building_facade_1787744312545.jpg';
import hotelHeroExteriorImg from './assets/images/hotel_hero_exterior_1787743269693.jpg';
import standardRoomImg from './assets/images/standard_room_ac_1787743291279.jpg';
import deluxeRoomImg from './assets/images/deluxe_room_ac_1787743318485.jpg';
import modernBedroomImg from './assets/images/modern_ac_bedroom_1787743389903.jpg';
import hotelCorridorImg from './assets/images/hotel_corridor_lobby_1787743345301.jpg';
import hotelReceptionImg from './assets/images/hotel_reception_foyer_1787743367921.jpg';
import hotelBathroomImg from './assets/images/hotel_attached_bathroom_1787743432400.jpg';

/* ==========================================================================
   HOTEL CONFIGURATION SETTINGS
   Edit the values below to update the hotel details across the entire website.
   ========================================================================== */

export const HOTEL_CONFIG: HotelConfig = {
  // Hotel name
  hotelName: "Mazing House", 
  
  tagline: "Clean, comfortable and air-conditioned rooms at affordable prices.",
  
  // Hotel Address in Rohini Sector-25
  address: "Rohini Sector-25, Delhi, India",
  locality: "Rohini Sector-25",
  city: "Delhi",
  state: "Delhi",
  country: "India",
  pincode: "110085",
  
  // Contact numbers
  phoneNumber: "+919310966151", 
  phoneDisplay: "+91 93109 66151", // Visible text
  
  // WhatsApp Number - Enter country code + number without plus (e.g. "919310966151")
  whatsappNumber: "919310966151",
  whatsappDisplay: "+91 93109 66151",
  
  // Hotel Email Address
  email: "contact@mazinghouse.com",
  
  // Google Maps Link (replace with your actual Google Maps pin URL)
  googleMapsUrl: "https://maps.google.com/?q=Rohini+Sector-25+Delhi+India",
  googleMapsEmbedQuery: "Rohini Sector-25, Delhi, India",
  
  // Room Count & Rates
  totalRooms: 16,
  minPrice: 1200,
  maxPrice: 1500,
  currency: "₹"
};

/* ==========================================================================
   ROOM TYPES & PRICING
   ========================================================================== */
export const HOTEL_ROOMS: RoomItem[] = [
  {
    id: "standard-room",
    name: "Standard Room",
    pricePerNight: 1200,
    tagline: "Ideal for solo travelers and couples seeking comfortable AC stay",
    description: "Comfortable air-conditioned room featuring clean linens, private attached bathroom, flat-screen TV, and high-speed Wi-Fi.",
    image: standardRoomImg,
    badge: "Best Value",
    maxOccupancy: "2 Guests",
    bedType: "Comfortable Double Bed",
    facilities: [
      "Air Conditioning (AC)",
      "Comfortable Double Bed",
      "Flat-screen TV",
      "Private Attached Bathroom",
      "Free High-Speed Wi-Fi",
      "Daily Clean Linen"
    ]
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    pricePerNight: 1500,
    tagline: "Spacious air-conditioned room with premium comfort & work desk",
    description: "Spacious air-conditioned room with enhanced interior styling, comfortable double bed, work desk, private bathroom, and TV.",
    image: deluxeRoomImg,
    badge: "Most Popular",
    maxOccupancy: "2-3 Guests",
    bedType: "King / Queen Comfort Bed",
    facilities: [
      "Air Conditioning (AC)",
      "Spacious King/Queen Bed",
      "Wall-Mounted TV",
      "Private Modern Bathroom",
      "Free High-Speed Wi-Fi",
      "Work Desk & Wardrobe",
      "Clean & Sanitized Linens"
    ]
  }
];

/* ==========================================================================
   CONFIRMED HOTEL FACILITIES (No unconfirmed facilities added)
   ========================================================================== */
export const HOTEL_FACILITIES: FacilityItem[] = [
  {
    id: "ac-rooms",
    title: "16 AC Rooms",
    description: "All 16 guest rooms are fully air-conditioned for a cool, comfortable stay in Delhi.",
    iconName: "Wind"
  },
  {
    id: "air-conditioning",
    title: "Air Conditioning",
    description: "Individually controlled modern AC units in every single room.",
    iconName: "Snowflake"
  },
  {
    id: "comfortable-rooms",
    title: "Comfortable Rooms",
    description: "Hygienic, well-kept spaces with comfortable beds and clean fresh bedsheets.",
    iconName: "BedDouble"
  },
  {
    id: "tv-entertainment",
    title: "TV in Every Room",
    description: "Entertainment screen equipped in each room for your relaxation.",
    iconName: "Tv"
  },
  {
    id: "private-bathroom",
    title: "Private Bathroom",
    description: "Attached private bathroom in every room with clean fittings and mirror.",
    iconName: "Bath"
  },
  {
    id: "free-wifi",
    title: "Free Wi-Fi",
    description: "Complimentary wireless internet access available for all staying guests.",
    iconName: "Wifi"
  },
  {
    id: "affordable-pricing",
    title: "Affordable Room Rates",
    description: "Value-packed pricing starting from ₹1,200 to ₹1,500 per night without hidden fees.",
    iconName: "BadgePercent"
  }
];

/* ==========================================================================
   HOTEL GALLERY (Actual hotel photographs)
   ========================================================================== */
export const HOTEL_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Standard AC Bedroom",
    category: "rooms",
    imageUrl: standardRoomImg,
    altText: "Clean air-conditioned standard room with double bed and TV at Mazing House"
  },
  {
    id: "gal-2",
    title: "Deluxe AC Bedroom & Desk",
    category: "rooms",
    imageUrl: deluxeRoomImg,
    altText: "Spacious deluxe bedroom with comfortable bed and wooden furniture at Mazing House"
  },
  {
    id: "gal-3",
    title: "Clean Attached Bathroom",
    category: "bathroom",
    imageUrl: hotelBathroomImg,
    altText: "Modern tiled private bathroom with shower and wash basin"
  },
  {
    id: "gal-4",
    title: "Hotel Building Exterior",
    category: "exterior",
    imageUrl: hotelExteriorImg,
    altText: "Mazing House hotel building facade in Rohini Sector-25 Delhi"
  },
  {
    id: "gal-5",
    title: "Reception & Floor Foyer",
    category: "reception",
    imageUrl: hotelReceptionImg,
    altText: "Clean reception foyer area with 7 horses painting and water cooler"
  },
  {
    id: "gal-6",
    title: "Clean Hallway & Room Corridors",
    category: "common",
    imageUrl: hotelCorridorImg,
    altText: "Bright and clean hallway leading to the 16 AC rooms at Mazing House"
  },
  {
    id: "gal-7",
    title: "Modern Double Bedroom",
    category: "rooms",
    imageUrl: modernBedroomImg,
    altText: "Neat double bed with clean white linens and air conditioner"
  },
  {
    id: "gal-8",
    title: "Main Building Facade",
    category: "exterior",
    imageUrl: hotelHeroExteriorImg,
    altText: "Mazing House front exterior architecture in Rohini Sector-25"
  }
];

/* Helper function to generate prefilled WhatsApp booking message */
export function generateWhatsAppLink(
  config: HotelConfig,
  details?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    roomType?: string;
  }
): string {
  const hotel = config.hotelName || "the Hotel";
  const checkIn = details?.checkIn || "[Select Check-in Date]";
  const checkOut = details?.checkOut || "[Select Check-out Date]";
  const guests = details?.guests || 1;
  const roomCount = details?.rooms || 1;
  const roomType = details?.roomType || "Standard / Deluxe Room";

  const message = `Hello, I want to book a room at ${hotel} in Rohini Sector-25, Delhi.

📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
👥 Number of guests: ${guests}
🏨 Number of rooms: ${roomCount}
🛏️ Room type: ${roomType}

Please share room availability and total price. Thank you!`;

  return `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    message
  )}`;
}
