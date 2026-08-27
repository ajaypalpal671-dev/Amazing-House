import React from 'react';
import { IndianRupee, Snowflake, MapPin, BedDouble, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 'affordable-stay',
      title: 'Affordable Stay',
      description: 'Rooms starting from ₹1,200 per night.',
      icon: <IndianRupee className="w-6 h-6 text-amber-400" />,
      subtext: 'Transparent pricing with no hidden surcharges'
    },
    {
      id: 'ac-rooms',
      title: 'AC Rooms',
      description: 'All 16 rooms are equipped with AC.',
      icon: <Snowflake className="w-6 h-6 text-amber-400" />,
      subtext: 'Full air conditioning for ultimate comfort'
    },
    {
      id: 'convenient-location',
      title: 'Convenient Location',
      description: 'Located in Rohini Sector-25, Delhi.',
      icon: <MapPin className="w-6 h-6 text-amber-400" />,
      subtext: 'Accessible stay in North West Delhi'
    },
    {
      id: 'comfortable-rooms',
      title: 'Comfortable Rooms',
      description: 'Clean and comfortable accommodation for guests.',
      icon: <BedDouble className="w-6 h-6 text-amber-400" />,
      subtext: 'Hygienic linens, clean beds & private washrooms'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Guest Benefits
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Why Choose Our Hotel?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A trustworthy, peaceful, and clean stay with honest budget rates in Rohini Sector-25.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              id={`why-card-${reason.id}`}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-amber-400/50 hover:bg-slate-800 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-300 text-sm font-medium mb-3">
                  {reason.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{reason.subtext}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
