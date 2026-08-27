import React from 'react';
import { Building2, MapPin, Phone, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { HotelConfig } from '../types';
import { generateWhatsAppLink } from '../hotelConfig';

interface FooterProps {
  config: HotelConfig;
  onOpenBooking: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenBooking, onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Hotel Name & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                {config.hotelName}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your clean and comfortable stay in Rohini Sector-25, Delhi. 16 fully air-conditioned rooms with private bathrooms and free Wi-Fi at affordable rates.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${config.phoneNumber}`} className="hover:text-white transition-colors">
                  {config.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={generateWhatsAppLink(config)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {config.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-serif font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Hotel</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-amber-400 transition-colors">Rooms & Rates</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-amber-400 transition-colors">Hotel Facilities</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">Location & Map</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Booking & Reservations (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white font-serif font-bold text-sm uppercase tracking-wider">
              Room Reservation
            </h3>
            <p className="text-xs text-slate-400">
              16 AC Rooms available starting from ₹1,200 to ₹1,500 per night in Rohini Sector-25.
            </p>

            <div className="space-y-2 pt-1">
              <button
                id="footer-book-now-btn"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors text-center cursor-pointer"
              >
                Book Now
              </button>

              <a
                id="footer-check-avail-btn"
                href="#booking"
                className="w-full block py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs transition-colors text-center"
              >
                Check Availability Form
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-slate-900 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          {/* Required Copyright format */}
          <div>
            © 2026 {config.hotelName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              id="footer-privacy-link"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              id="footer-terms-link"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
