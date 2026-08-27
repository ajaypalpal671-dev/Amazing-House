import React from 'react';
import { Snowflake, BedDouble, Bath, Wifi, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { HotelConfig } from '../types';
import hotelExteriorImg from '../assets/images/mazing_building_facade_1787744312545.jpg';

interface AboutProps {
  config: HotelConfig;
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ config, onOpenBooking }) => {
  return (
    <section id="about" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Real Hotel Photos Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <img
                src={hotelExteriorImg}
                alt="Mazing House hotel building in Rohini Sector-25, Delhi"
                className="w-full h-80 sm:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded mb-1">
                  16 AC Rooms
                </span>
                <p className="text-sm font-medium text-slate-200">
                  Mazing House • Rohini Sector-25, Delhi
                </p>
              </div>
            </div>

            {/* Overlapping feature card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-slate-950 text-white p-5 rounded-xl shadow-2xl border border-slate-800 max-w-xs backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ₹
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Budget Friendly</div>
                  <div className="text-lg font-bold text-white">₹1,200 – ₹1,500</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparent pricing per night with full AC & private bathroom included.
              </p>
            </div>
          </div>

          {/* Right Column: Hotel Copy & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
              About The Hotel
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Welcome to <span className="text-amber-400">{config.hotelName}</span>
            </h2>

            {/* Exact Suggested Text from prompt */}
            <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                Welcome to <strong className="text-white">{config.hotelName}</strong>, your comfortable and affordable stay in Rohini Sector-25, Delhi.
              </p>
              <p>
                Our hotel offers 16 well-maintained air-conditioned rooms designed for guests looking for a convenient and comfortable stay. With room rates starting from ₹1,200 per night, we aim to provide a quality stay at an affordable price.
              </p>
            </div>

            {/* Key highlights list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80">
                <Snowflake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-white">16 Air-Conditioned Rooms</h3>
                  <p className="text-xs text-slate-400">Reliable cooling in every room</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80">
                <BedDouble className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Comfortable Beds</h3>
                  <p className="text-xs text-slate-400">Fresh linen and sanitized pillows</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80">
                <Bath className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Private Bathrooms</h3>
                  <p className="text-xs text-slate-400">Attached clean washroom with shower</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80">
                <Wifi className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Free Wi-Fi & TV</h3>
                  <p className="text-xs text-slate-400">Connected & entertaining stay</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-book-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Room Now</span>
              </button>

              <a
                id="about-call-btn"
                href={`tel:${config.phoneNumber}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {config.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
