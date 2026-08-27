import React, { useState } from 'react';
import { HOTEL_CONFIG } from './hotelConfig';
import { HotelConfig } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Facilities } from './components/Facilities';
import { SpecialOffer } from './components/SpecialOffer';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { Location } from './components/Location';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { PolicyModal } from './components/PolicyModal';
import { AdminConfigHelper } from './components/AdminConfigHelper';

export default function App() {
  const [config, setConfig] = useState<HotelConfig>(HOTEL_CONFIG);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('Standard Room');
  const [initialBookingValues, setInitialBookingValues] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
  }>({});
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenBooking = (
    roomType?: string,
    initialData?: {
      checkIn?: string;
      checkOut?: string;
      guests?: number;
      rooms?: number;
    }
  ) => {
    if (roomType) {
      setSelectedRoomType(roomType);
    }
    if (initialData) {
      setInitialBookingValues(initialData);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleSelectRoomFromCard = (roomName: string) => {
    setSelectedRoomType(roomName);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 pb-16 md:pb-0">
      {/* 1. Header / Navigation */}
      <Navbar config={config} onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero config={config} onOpenBooking={handleOpenBooking} />

        {/* 3. About Section */}
        <About config={config} onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Rooms & Pricing Section */}
        <Rooms onSelectRoom={handleSelectRoomFromCard} />

        {/* 5. Why Choose Us (4 feature cards) */}
        <WhyChooseUs />

        {/* 6. Confirmed Facilities (Icons) */}
        <Facilities />

        {/* 7. Special Promotional Banner */}
        <SpecialOffer config={config} onOpenBooking={() => handleOpenBooking()} />

        {/* 8. Gallery with Lightbox */}
        <Gallery />

        {/* 9. Room Availability / Booking Form (Inline Section) */}
        <BookingForm
          config={config}
          defaultRoomType={selectedRoomType}
          initialValues={initialBookingValues}
        />

        {/* 10. Location & Google Maps Section */}
        <Location config={config} />

        {/* 11. Contact Section */}
        <Contact config={config} />
      </main>

      {/* 12. Footer */}
      <Footer
        config={config}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* 13. Floating Quick Booking & WhatsApp Buttons (Mobile & Desktop) */}
      <FloatingButtons
        config={config}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 14. Booking Request Modal */}
      {isBookingModalOpen && (
        <BookingForm
          config={config}
          isOpenModal={true}
          onCloseModal={handleCloseBooking}
          defaultRoomType={selectedRoomType}
          initialValues={initialBookingValues}
        />
      )}

      {/* 15. Privacy Policy / Terms Modal */}
      <PolicyModal
        config={config}
        policyType={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* 16. Admin Customizer Helper (For live testing hotel name & contact) */}
      <AdminConfigHelper
        config={config}
        onChangeConfig={(newCfg) => setConfig(newCfg)}
        onResetConfig={() => setConfig(HOTEL_CONFIG)}
      />
    </div>
  );
}
