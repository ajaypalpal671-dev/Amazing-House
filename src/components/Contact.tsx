import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Navigation, Send, CheckCircle2, Building2 } from 'lucide-react';
import { HotelConfig } from '../types';
import { generateWhatsAppLink } from '../hotelConfig';

interface ContactProps {
  config: HotelConfig;
}

export const Contact: React.FC<ContactProps> = ({ config }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentStatus(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
            Get In Touch
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Contact {config.hotelName}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have questions about room availability, check-in time, or directions? Contact us directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Hotel Info Card */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {config.hotelName}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    16 AC Rooms • Rohini Sector-25, Delhi
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">Address</span>
                    <span className="text-slate-200">{config.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">Phone</span>
                    <a
                      id="contact-phone-link"
                      href={`tel:${config.phoneNumber}`}
                      className="text-slate-200 hover:text-amber-400 transition-colors"
                    >
                      {config.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">WhatsApp</span>
                    <a
                      id="contact-whatsapp-link"
                      href={generateWhatsAppLink(config)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      {config.whatsappDisplay} (Chat Available)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">Email</span>
                    <a
                      id="contact-email-link"
                      href={`mailto:${config.email}`}
                      className="text-slate-200 hover:text-amber-400 transition-colors"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Three Required Action Buttons */}
              <div className="pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  id="contact-btn-call"
                  href={`tel:${config.phoneNumber}`}
                  className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>

                <a
                  id="contact-btn-whatsapp"
                  href={generateWhatsAppLink(config)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  id="contact-btn-directions"
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7">
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Send a Message to Reception
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Leave your contact details and message, and our hotel manager will get back to you promptly.
              </p>

              {sentStatus ? (
                <div className="bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 p-5 rounded-xl text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-semibold">
                    Thank you! Your message has been sent. We will call you shortly.
                  </p>
                  <button
                    onClick={() => setSentStatus(false)}
                    className="text-xs text-emerald-400 underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message / Question *
                    </label>
                    <textarea
                      id="contact-form-message"
                      rows={3}
                      placeholder="e.g. Do you have rooms available for this weekend? How far is the metro?"
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Hotel</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
