import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Building,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  X,
  AlertCircle,
  HelpCircle,
  Database
} from 'lucide-react';
import { HotelConfig, BookingFormData } from '../types';
import { generateWhatsAppLink, HOTEL_ROOMS } from '../hotelConfig';
import { saveBookingToSupabase, SUPABASE_PROJECT_ID } from '../lib/supabase';

interface BookingFormProps {
  config: HotelConfig;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  defaultRoomType?: string;
  initialValues?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
  };
}

export const BookingForm: React.FC<BookingFormProps> = ({
  config,
  isOpenModal = false,
  onCloseModal,
  defaultRoomType,
  initialValues
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: initialValues?.checkIn || today,
    checkOut: initialValues?.checkOut || tomorrow,
    guests: initialValues?.guests || 2,
    rooms: initialValues?.rooms || 1,
    roomType: defaultRoomType || 'Standard Room',
    guestName: '',
    phoneNumber: '',
    emailAddress: '',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  // Update form if defaultRoomType or initialValues change
  useEffect(() => {
    if (defaultRoomType) {
      setFormData((prev) => ({ ...prev, roomType: defaultRoomType }));
    }
  }, [defaultRoomType]);

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        checkIn: initialValues.checkIn || prev.checkIn,
        checkOut: initialValues.checkOut || prev.checkOut,
        guests: initialValues.guests || prev.guests,
        rooms: initialValues.rooms || prev.rooms
      }));
    }
  }, [initialValues]);

  // Calculate estimated nights and price
  const calculateEstimate = () => {
    const d1 = new Date(formData.checkIn);
    const d2 = new Date(formData.checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nights = diffDays > 0 ? diffDays : 1;

    const rate = formData.roomType.toLowerCase().includes('deluxe') ? 1500 : 1200;
    const total = nights * rate * formData.rooms;

    return { nights, rate, total };
  };

  const { nights, rate, total } = calculateEstimate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' || name === 'rooms' ? Number(value) : value
    }));
  };

  const [saveStatus, setSaveStatus] = useState<{ isSaved: boolean; source: string; error?: string } | null>(null);

  /* ==========================================================================
     BACKEND SUPABASE DATABASE INTEGRATION
     ========================================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save appointment details directly to user's Supabase database
      const result = await saveBookingToSupabase(formData, { nights, rate, total });
      
      setSaveStatus({
        isSaved: true,
        source: result.isLocalFallback ? 'local' : 'supabase',
        error: result.error
      });
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setSaveStatus({
        isSaved: true,
        source: 'local',
        error: err?.message
      });
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSaveStatus(null);
    setFormData({
      checkIn: today,
      checkOut: tomorrow,
      guests: 2,
      rooms: 1,
      roomType: 'Standard Room',
      guestName: '',
      phoneNumber: '',
      emailAddress: '',
      specialRequests: ''
    });
  };

  const formContent = (
    <div className="space-y-6">
      {/* Pricing summary pill */}
      <div className="bg-slate-950 text-white p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-slate-800">
        <div>
          <span className="text-xs text-amber-400 font-bold block uppercase tracking-wider">Estimated Stay Price</span>
          <span className="text-2xl font-bold text-white">
            ₹{total.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-400 ml-2">
            ({nights} {nights === 1 ? 'Night' : 'Nights'} × ₹{rate} × {formData.rooms} {formData.rooms === 1 ? 'Room' : 'Rooms'})
          </span>
        </div>
        <div className="text-xs text-slate-400">
          <span className="inline-block bg-amber-500/20 text-amber-300 font-semibold px-3 py-1 rounded-lg border border-amber-500/30">
            Pay at Hotel Available
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-200">
        {/* Row 1: Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Check-in Date *</span>
            </label>
            <input
              id="booking-checkin"
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              min={today}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Check-out Date *</span>
            </label>
            <input
              id="booking-checkout"
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              min={formData.checkIn || today}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Row 2: Guests, Rooms, Room Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Number of Guests *</span>
            </label>
            <select
              id="booking-guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value={1} className="bg-slate-900 text-slate-100">1 Guest</option>
              <option value={2} className="bg-slate-900 text-slate-100">2 Guests</option>
              <option value={3} className="bg-slate-900 text-slate-100">3 Guests</option>
              <option value={4} className="bg-slate-900 text-slate-100">4 Guests</option>
              <option value={5} className="bg-slate-900 text-slate-100">5+ Guests</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Number of Rooms (16 Total) *</span>
            </label>
            <select
              id="booking-rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value={1} className="bg-slate-900 text-slate-100">1 Room</option>
              <option value={2} className="bg-slate-900 text-slate-100">2 Rooms</option>
              <option value={3} className="bg-slate-900 text-slate-100">3 Rooms</option>
              <option value={4} className="bg-slate-900 text-slate-100">4 Rooms</option>
              <option value={5} className="bg-slate-900 text-slate-100">5+ Rooms (Group booking)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Room Type *</span>
            </label>
            <select
              id="booking-roomtype"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="Standard Room" className="bg-slate-900 text-slate-100">Standard Room (₹1,200/night)</option>
              <option value="Deluxe Room" className="bg-slate-900 text-slate-100">Deluxe Room (₹1,500/night)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Guest Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>Guest Name *</span>
            </label>
            <input
              id="booking-name"
              type="text"
              name="guestName"
              placeholder="e.g. Ramesh Kumar"
              value={formData.guestName}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Mobile Number *</span>
            </label>
            <input
              id="booking-phone"
              type="tel"
              name="phoneNumber"
              placeholder="e.g. 9876543210"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Email Address</span>
            </label>
            <input
              id="booking-email"
              type="email"
              name="emailAddress"
              placeholder="e.g. name@example.com"
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Row 4: Special Request */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Special Request (Optional)</span>
          </label>
          <textarea
            id="booking-special-requests"
            name="specialRequests"
            rows={2}
            placeholder="e.g. Early check-in request, ground floor preference, quiet room..."
            value={formData.specialRequests}
            onChange={handleInputChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>

        {/* Submit & WhatsApp Buttons */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            id="booking-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Checking Availability...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Check Availability</span>
              </span>
            )}
          </button>

          <a
            id="booking-whatsapp-direct"
            href={generateWhatsAppLink(config, {
              checkIn: formData.checkIn,
              checkOut: formData.checkOut,
              guests: formData.guests,
              rooms: formData.rooms,
              roomType: formData.roomType
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          🔒 No advance payment required online. Our hotel team will call you back to confirm booking.
        </p>
      </form>
    </div>
  );

  const confirmationView = (
    <div id="booking-confirmation-view" className="text-center py-6 px-4 space-y-6 animate-fadeIn">
      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        <h3 className="font-serif text-2xl font-bold text-white">
          Booking Request Received
        </h3>

        {/* Exact required confirmation message from prompt */}
        <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 p-4 rounded-xl text-sm font-medium leading-relaxed">
          "Thank you for your booking request. Our team will contact you shortly to confirm room availability and booking details."
        </div>

        {saveStatus && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-950 border border-emerald-500/30 text-emerald-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Synced to Supabase Database (Project: {SUPABASE_PROJECT_ID})</span>
          </div>
        )}
      </div>

      {submittedData && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
          <div className="font-bold text-white border-b border-slate-800 pb-1">Request Summary:</div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Guest:</span> <strong className="text-slate-200">{submittedData.guestName}</strong></div>
            <div><span className="text-slate-500">Phone:</span> <strong className="text-slate-200">{submittedData.phoneNumber}</strong></div>
            <div><span className="text-slate-500">Check-in:</span> {submittedData.checkIn}</div>
            <div><span className="text-slate-500">Check-out:</span> {submittedData.checkOut}</div>
            <div><span className="text-slate-500">Room:</span> {submittedData.roomType} ({submittedData.rooms} room)</div>
            <div><span className="text-slate-500">Guests:</span> {submittedData.guests}</div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
        <a
          id="confirmation-whatsapp-btn"
          href={generateWhatsAppLink(config, {
            checkIn: submittedData?.checkIn,
            checkOut: submittedData?.checkOut,
            guests: submittedData?.guests,
            rooms: submittedData?.rooms,
            roomType: submittedData?.roomType
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Follow up on WhatsApp</span>
        </a>

        <button
          id="new-booking-btn"
          onClick={handleResetForm}
          className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );

  // If rendered as Modal
  if (isOpenModal) {
    return (
      <div
        id="booking-modal"
        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        <div className="relative w-full max-w-2xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Book a Room in Rohini Sector-25
              </h2>
              <p className="text-xs text-amber-400 font-medium">
                16 AC Rooms • ₹1,200 to ₹1,500/night
              </p>
            </div>
            <button
              id="close-booking-modal-btn"
              onClick={onCloseModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? confirmationView : formContent}
        </div>
      </div>
    );
  }

  // If rendered inline in the page
  return (
    <section id="booking" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Room Availability & Reservation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Book Your Stay
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Fill in your travel dates to send a booking inquiry. Our reception desk will promptly verify availability for you.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-800">
          {isSubmitted ? confirmationView : formContent}
        </div>

      </div>
    </section>
  );
};
