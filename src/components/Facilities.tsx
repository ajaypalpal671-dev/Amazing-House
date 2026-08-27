import React from 'react';
import {
  Wind,
  Snowflake,
  BedDouble,
  Tv,
  Bath,
  Wifi,
  BadgePercent,
  CheckCircle,
  Building2
} from 'lucide-react';
import { HOTEL_FACILITIES } from '../hotelConfig';

export const Facilities: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-7 h-7 text-amber-400" />;
      case 'Snowflake':
        return <Snowflake className="w-7 h-7 text-amber-400" />;
      case 'BedDouble':
        return <BedDouble className="w-7 h-7 text-amber-400" />;
      case 'Tv':
        return <Tv className="w-7 h-7 text-amber-400" />;
      case 'Bath':
        return <Bath className="w-7 h-7 text-amber-400" />;
      case 'Wifi':
        return <Wifi className="w-7 h-7 text-amber-400" />;
      case 'BadgePercent':
        return <BadgePercent className="w-7 h-7 text-amber-400" />;
      default:
        return <CheckCircle className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <section id="facilities" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Hotel Amenities & Features
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Confirmed Hotel Facilities
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Essential comforts provided across all 16 rooms for a relaxed, worry-free stay in Rohini Sector-25.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {HOTEL_FACILITIES.map((facility, index) => (
            <div
              key={facility.id}
              id={`facility-card-${facility.id}`}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {getFacilityIcon(facility.iconName)}
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2 group-hover:text-amber-300 transition-colors">
                  <span>{facility.title}</span>
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {facility.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Available in all 16 rooms</span>
              </div>
            </div>
          ))}

          {/* Location / Property Highlight Card */}
          <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                Rohini Sector-25 Location
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Quiet neighborhood location in North West Delhi with easy access to local markets and transit.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-amber-400 font-semibold">
              North West Delhi, India
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
