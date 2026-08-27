import React from 'react';
import { Phone, MessageCircle, Calendar, ArrowUp } from 'lucide-react';
import { HotelConfig } from '../types';
import { generateWhatsAppLink } from '../hotelConfig';

interface FloatingButtonsProps {
  config: HotelConfig;
  onOpenBooking: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ config, onOpenBooking }) => {
  return (
    <>
      {/* Mobile Sticky Bottom Action Bar (Fixed at bottom on screens < 768px) */}
      <aside
        id="mobile-bottom-quick-bar"
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 shadow-2xl safe-area-bottom"
      >
        <div className="grid grid-cols-3 gap-2">
          {/* 📞 Call Now */}
          <a
            id="mobile-sticky-call-btn"
            href={`tel:${config.phoneNumber}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800 text-white font-semibold text-[11px] border border-slate-700 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
            <span>Call Now</span>
          </a>

          {/* 💬 WhatsApp */}
          <a
            id="mobile-sticky-whatsapp-btn"
            href={generateWhatsAppLink(config)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-700 text-white font-semibold text-[11px] border border-emerald-600 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 text-white mb-0.5" />
            <span>WhatsApp</span>
          </a>

          {/* 🏨 Book Now */}
          <button
            id="mobile-sticky-book-btn"
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-[11px] active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-950 mb-0.5" />
            <span>Book Now</span>
          </button>
        </div>
      </aside>

      {/* Desktop Floating WhatsApp & Quick Book Button (Bottom-Right on desktop) */}
      <aside
        id="desktop-floating-actions"
        aria-label="Quick contact actions"
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3"
      >
        {/* Floating WhatsApp Action Pill */}
        <a
          id="desktop-floating-whatsapp"
          href={generateWhatsAppLink(config)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-950/40 border border-emerald-400/30 transition-all hover:scale-105"
          title="Chat with Hotel on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-xs font-bold whitespace-nowrap">WhatsApp Booking</span>
        </a>

        {/* Floating Call Pill */}
        <a
          id="desktop-floating-call"
          href={`tel:${config.phoneNumber}`}
          className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-full shadow-xl shadow-slate-950/40 border border-slate-700 transition-all hover:scale-105"
          title="Call Hotel Desk"
        >
          <Phone className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold whitespace-nowrap">{config.phoneDisplay}</span>
        </a>
      </aside>
    </>
  );
};
