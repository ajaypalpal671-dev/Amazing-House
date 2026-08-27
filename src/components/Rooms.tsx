import React, { useState } from 'react';
import { Snowflake, BedDouble, Tv, Bath, Wifi, Check, Calendar, ArrowRight, Sparkles, Info, Users } from 'lucide-react';
import { HOTEL_ROOMS } from '../hotelConfig';
import { RoomItem } from '../types';

interface RoomsProps {
  onSelectRoom: (roomName: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onSelectRoom }) => {
  const [selectedRoomModal, setSelectedRoomModal] = useState<RoomItem | null>(null);

  return (
    <section id="rooms" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Room Options & Pricing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Available Rooms & Pricing
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            All 16 rooms are fully air-conditioned, sanitized, and equipped with private attached bathrooms.
          </p>
        </div>

        {/* Pricing notice badge */}
        <div className="mb-10 max-w-2xl mx-auto bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 text-center text-sm text-slate-300 flex items-center justify-center gap-2 backdrop-blur-sm">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Note:</strong> Room rates start from ₹1,200 per night and may vary depending on room type and availability. Prices are subject to availability.
          </span>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {HOTEL_ROOMS.map((room) => {
            const isDeluxe = room.id === 'deluxe-room';

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className={`bg-slate-900 rounded-2xl overflow-hidden shadow-xl border transition-all duration-300 hover:shadow-2xl flex flex-col ${
                  isDeluxe ? 'border-amber-500/60 ring-1 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Room Image with Badge */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Badge */}
                  {room.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 ${
                        isDeluxe ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/90 text-slate-200 border border-slate-700'
                      }`}>
                        {isDeluxe && <Sparkles className="w-3.5 h-3.5" />}
                        {room.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-lg border border-slate-700 shadow-md">
                    <span className="text-xs text-amber-400 font-medium block">Starting from</span>
                    <span className="text-xl font-bold text-white">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400"> / night</span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {room.maxOccupancy}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {room.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Amenities list */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Included Room Amenities
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-300">
                        {room.facilities.map((fac, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Button & Disclaimers */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <button
                      id={`book-room-btn-${room.id}`}
                      onClick={() => onSelectRoom(room.name)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                        isDeluxe
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book {room.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>✓ 100% AC Fitted</span>
                      <span>✓ Attached Private Bath</span>
                      <span>✓ Free Wi-Fi</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer footer banner */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          * Room rates start from ₹1,200/night for Standard Room and ₹1,500/night for Deluxe Room. Subject to date selection, taxes, and availability.
        </div>

      </div>
    </section>
  );
};
