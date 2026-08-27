import React from 'react';
import { Calendar, Phone, Snowflake, MapPin, Sparkles } from 'lucide-react';
import { HotelConfig } from '../types';

interface SpecialOfferProps {
  config: HotelConfig;
  onOpenBooking: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ config, onOpenBooking }) => {
  return (
    <section id="special-offer" className="py-14 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-slate-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-amber-400/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Affordable Delhi Stay • 16 AC Rooms</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Comfortable Rooms Starting at <span className="text-amber-400">₹1,200/Night</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              Plan your stay in Rohini Sector-25, Delhi. Clean air-conditioned rooms, comfortable double beds, private bathrooms, and free Wi-Fi.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5 text-amber-400" />
                100% AC Rooms
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Rohini Sector-25
              </span>
              <span>•</span>
              <span>Standard & Deluxe Options</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              id="offer-check-availability-btn"
              onClick={onOpenBooking}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all text-center text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Room Availability</span>
            </button>

            <a
              id="offer-call-btn"
              href={`tel:${config.phoneNumber}`}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-colors text-center text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {config.phoneDisplay}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
