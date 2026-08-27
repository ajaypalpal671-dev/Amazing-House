import React, { useState, useEffect } from 'react';
import {
  Settings,
  X,
  Check,
  Copy,
  Sliders,
  RefreshCw,
  Database,
  Calendar,
  Phone,
  User,
  ExternalLink,
  Code,
  ShieldCheck,
  Building
} from 'lucide-react';
import { HotelConfig } from '../types';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SCHEMA,
  fetchAllBookings,
  StoredBooking
} from '../lib/supabase';

interface AdminConfigHelperProps {
  config: HotelConfig;
  onChangeConfig: (newConfig: HotelConfig) => void;
  onResetConfig: () => void;
}

export const AdminConfigHelper: React.FC<AdminConfigHelperProps> = ({
  config,
  onChangeConfig,
  onResetConfig
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'supabase'>('config');
  const [copied, setCopied] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const [tempName, setTempName] = useState(config.hotelName);
  const [tempPhone, setTempPhone] = useState(config.phoneDisplay);
  const [tempWhatsApp, setTempWhatsApp] = useState(config.whatsappNumber);
  const [tempMinPrice, setTempMinPrice] = useState(config.minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(config.maxPrice);

  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingSource, setBookingSource] = useState<'supabase' | 'local'>('supabase');

  useEffect(() => {
    if (isOpen && activeTab === 'supabase') {
      loadBookings();
    }
  }, [isOpen, activeTab]);

  const loadBookings = async () => {
    setIsLoadingBookings(true);
    const res = await fetchAllBookings();
    setBookings(res.bookings);
    setBookingSource(res.source);
    setIsLoadingBookings(false);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeConfig({
      ...config,
      hotelName: tempName,
      phoneNumber: tempPhone.replace(/\s+/g, ''),
      phoneDisplay: tempPhone,
      whatsappNumber: tempWhatsApp.replace(/[^0-9]/g, ''),
      whatsappDisplay: tempPhone,
      minPrice: Number(tempMinPrice),
      maxPrice: Number(tempMaxPrice)
    });
    setIsOpen(false);
  };

  const handleCopyCode = () => {
    const codeSnippet = `export const HOTEL_CONFIG: HotelConfig = {
  hotelName: "${tempName}",
  address: "Property Number 195, Block E, near Delhi School of Professional Studies And Research, Rohini Sector-25, Delhi, 110085, India",
  phoneNumber: "${tempPhone.replace(/\s+/g, '')}",
  phoneDisplay: "${tempPhone}",
  whatsappNumber: "${tempWhatsApp.replace(/[^0-9]/g, '')}",
  whatsappDisplay: "${tempPhone}",
  email: "${config.email}",
  googleMapsUrl: "${config.googleMapsUrl}",
  totalRooms: 16,
  minPrice: ${tempMinPrice},
  maxPrice: ${tempMaxPrice},
  currency: "₹"
};`;

    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <>
      {/* Floating trigger badge */}
      <aside
        id="admin-config-trigger"
        aria-label="Hotel owner customization and Supabase database"
        className="fixed bottom-20 left-4 z-40"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900/95 hover:bg-slate-900 text-amber-400 border border-slate-700 shadow-xl px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-sm cursor-pointer hover:border-amber-400 transition-all"
          title="Supabase Database & Hotel Customizer"
        >
          <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Supabase & Settings</span>
        </button>
      </aside>

      {/* Slide-over panel / Modal */}
      {isOpen && (
        <div
          id="admin-config-modal"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold">Admin Management & Supabase</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('config')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'config'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Hotel Details</span>
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Supabase Database ({SUPABASE_PROJECT_ID})</span>
              </button>
            </div>

            {activeTab === 'config' && (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <p className="text-slate-400">
                  Preview changes in real-time or copy the configuration code to paste into <code className="text-amber-300">src/hotelConfig.ts</code>.
                </p>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Hotel Name:
                  </label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="e.g. Hotel Rohini Comfort"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      placeholder="+91 93109 66151"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      WhatsApp Number:
                    </label>
                    <input
                      type="text"
                      value={tempWhatsApp}
                      onChange={(e) => setTempWhatsApp(e.target.value)}
                      placeholder="919310966151"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Standard Room Rate (₹):
                    </label>
                    <input
                      type="number"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Deluxe Room Rate (₹):
                    </label>
                    <input
                      type="number"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={onResetConfig}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Config'}</span>
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                    >
                      Apply to Page
                    </button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'supabase' && (
              <div className="space-y-4 text-xs">
                {/* Supabase Status Card */}
                <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <strong className="text-emerald-400 text-sm">Supabase Connected</strong>
                    </div>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Project: {SUPABASE_PROJECT_ID}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    All guest booking requests from the website form are automatically routed and saved directly into your Supabase database table (<code className="text-emerald-300">public.bookings</code>).
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open Supabase Table Editor</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] border border-slate-700 cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Code className="w-3 h-3" />}
                      <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema for Supabase'}</span>
                    </button>
                  </div>
                </div>

                {/* Stored Bookings List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">
                      Recent Booking Inquiries ({bookings.length})
                    </span>
                    <button
                      onClick={loadBookings}
                      disabled={isLoadingBookings}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingBookings ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p>No booking inquiries yet.</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Submit a test reservation through the booking form on the homepage to see it appear here and in your Supabase account!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {bookings.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1 text-slate-300"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-amber-400" />
                              {item.guest_name}
                            </span>
                            <span className="text-amber-400 font-bold">
                              ₹{item.total_price?.toLocaleString('en-IN') || '0'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-500" />
                              <span>{item.phone_number}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <span>{item.check_in} to {item.check_out}</span>
                            </div>
                            <div>
                              <span>Room: </span>
                              <strong className="text-slate-200">{item.room_type} ({item.rooms} room)</strong>
                            </div>
                            <div>
                              <span>Guests: </span>
                              <strong className="text-slate-200">{item.guests}</strong>
                            </div>
                          </div>
                          {item.special_requests && (
                            <div className="text-[10px] text-slate-500 border-t border-slate-900 pt-1">
                              Note: {item.special_requests}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

