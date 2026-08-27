import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car, Train, Building } from 'lucide-react';
import { HotelConfig } from '../types';

interface LocationProps {
  config: HotelConfig;
}

export const Location: React.FC<LocationProps> = ({ config }) => {
  return (
    <section id="location" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Address & Connectivity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Hotel Location
          </h2>
          <p className="text-slate-300 text-base sm:text-lg flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">{config.address}</span>
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950 h-96 sm:h-[420px]">
              {/* Google Maps Embed iframe with interactive fallback */}
              <iframe
                title="Google Maps Location of Hotel in Rohini Sector-25"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(config.googleMapsEmbedQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Address Overlay */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 shadow-xl text-xs max-w-xs text-slate-200">
                <div className="flex items-center gap-2 font-bold text-white mb-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{config.hotelName}</span>
                </div>
                <p className="text-slate-400">
                  {config.address}
                </p>
              </div>

              {/* Action pill */}
              <div className="absolute bottom-4 right-4">
                <a
                  id="map-directions-overlay-btn"
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-lg text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Location Info & Travel Guide Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Stay in Rohini Sector-25, Delhi
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Located in the well-connected North West sub-city of Rohini, Delhi. The property provides a calm environment with accessibility to Sector-24, Sector-22, and surrounding commercial markets.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Complete Address</div>
                    <div className="text-xs text-slate-300 mt-0.5 font-medium leading-relaxed">
                      {config.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Prominent Landmark</div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Near Delhi School of Professional Studies And Research (DSPSR) • Block E
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Cab & Auto Accessibility</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Seamless pickup & drop points for Ola, Uber, Rapido, and local Delhi auto-rickshaws right at Block E.
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  id="get-directions-btn"
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm"
                >
                  <Navigation className="w-4 h-4 text-slate-950" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
