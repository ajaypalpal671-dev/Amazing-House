import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Calendar, MapPin, Building2, ChevronRight } from 'lucide-react';
import { HotelConfig } from '../types';

interface NavbarProps {
  config: HotelConfig;
  onOpenBooking: (roomType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md text-white shadow-lg border-b border-slate-800'
          : 'bg-slate-900/85 backdrop-blur-sm text-white border-b border-white/10'
      }`}
    >
      {/* Top micro-bar */}
      <div id="top-announcement-bar" className="bg-amber-600 text-slate-950 text-xs font-semibold py-1 px-4 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between">
          <span className="flex items-center gap-1.5 justify-center">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
            16 AC Rooms | ₹1,200–₹1,500 per night | Rohini Sector-25, Delhi
          </span>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <a
              id="topbar-call-link"
              href={`tel:${config.phoneNumber}`}
              className="flex items-center gap-1 hover:underline text-slate-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {config.phoneDisplay}</span>
            </a>
            <span className="text-slate-950/40">|</span>
            <a
              id="topbar-location-link"
              href="#location"
              className="flex items-center gap-1 hover:underline text-slate-950"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Rohini Sector-25</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Hotel Brand */}
          <a
            id="nav-brand-logo"
            href="#home"
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {config.hotelName}
              </span>
              <span className="block text-[11px] text-amber-300 font-medium tracking-wide uppercase">
                Rohini Sector-25 • 16 AC Rooms
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-call-btn"
              href={`tel:${config.phoneNumber}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{config.phoneDisplay}</span>
            </a>

            <button
              id="header-book-now-btn"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Hamburger toggle button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-quick-book-header"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-md"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn"
        >
          <div className="grid grid-cols-1 divide-y divide-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`mobile-nav-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-base font-medium text-slate-200 hover:text-amber-400 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-4 grid grid-cols-2 gap-2">
            <a
              id="mobile-menu-call"
              href={`tel:${config.phoneNumber}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Now</span>
            </a>
            <button
              id="mobile-menu-book"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Room</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
