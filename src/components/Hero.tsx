import React, { useState } from 'react';
import { Phone, Calendar, CheckCircle2, ShieldCheck, MapPin, Snowflake, BedDouble, Wifi, ArrowRight } from 'lucide-react';
import { HotelConfig } from '../types';
import hotelBuildingImg from '../assets/images/mazing_building_facade_1787744312545.jpg';

interface HeroProps {
  config: HotelConfig;
  onOpenBooking: (roomType?: string, initialData?: { checkIn?: string; checkOut?: string; guests?: number; rooms?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenBooking }) => {
  // Quick availability helper states
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [roomType, setRoomType] = useState('Standard Room');

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(roomType, {
      checkIn,
      checkOut,
      guests,
      rooms
    });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 bg-slate-950 text-white overflow-hidden">
      {/* Background Image with Dark Overlay for maximum contrast and legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src={hotelBuildingImg}
          alt="New Amazing House Hotel in Rohini Sector-25 Delhi"
          className="w-full h-full object-cover object-center brightness-35 transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Highlights Tag / Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-amber-500/15 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <span className="flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 text-amber-400" />
                16 AC Rooms
              </span>
              <span className="text-amber-500/50">•</span>
              <span>₹1,200–₹1,500 / night</span>
              <span className="text-amber-500/50">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Rohini Sector-25, Delhi
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Comfortable Stay in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Rohini Sector-25</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Clean, comfortable and air-conditioned rooms at affordable prices.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                id="hero-book-room-btn"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Room</span>
              </button>

              <a
                id="hero-call-now-btn"
                href={`tel:${config.phoneNumber}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 shadow-md backdrop-blur-sm transition-all text-base"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Confirmed Amenities Pill Row */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% AC Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Comfortable Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Clean & Sanitized</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Availability / Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-white font-serif">Quick Room Booking</h2>
                  <p className="text-xs text-slate-400">Direct booking request • Instant response</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-semibold uppercase block">Starts from</span>
                  <span className="text-xl font-bold text-white">₹1,200</span>
                  <span className="text-xs text-slate-400">/night</span>
                </div>
              </div>

              <form onSubmit={handleQuickCheck} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Check-in Date
                    </label>
                    <input
                      id="hero-quick-checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Check-out Date
                    </label>
                    <input
                      id="hero-quick-checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Guests
                    </label>
                    <select
                      id="hero-quick-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Rooms (16 Available)
                    </label>
                    <select
                      id="hero-quick-rooms"
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>
                      <option value={4}>4+ Rooms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Room Type
                  </label>
                  <select
                    id="hero-quick-roomtype"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Standard Room">Standard Room (₹1,200/night)</option>
                    <option value="Deluxe Room">Deluxe Room (₹1,500/night)</option>
                  </select>
                </div>

                <button
                  id="hero-quick-submit-btn"
                  type="submit"
                  className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>Check Availability & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  ⚡ Pay at hotel or confirm via phone/WhatsApp • No hidden fees
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
