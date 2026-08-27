import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { HotelConfig } from '../types';

interface PolicyModalProps {
  config: HotelConfig;
  policyType: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ config, policyType, onClose }) => {
  if (!policyType) return null;

  return (
    <div
      id="policy-modal"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 text-slate-200 rounded-2xl shadow-2xl border border-slate-800 p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            {policyType === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            ) : (
              <FileText className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="font-serif text-xl font-bold text-white">
              {policyType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            id="close-policy-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
          {policyType === 'privacy' ? (
            <>
              <p>
                At <strong className="text-white">{config.hotelName}</strong> (Rohini Sector-25, Delhi), we value and respect your personal privacy. This Privacy Policy details how we handle information provided during room reservation requests.
              </p>
              <h4 className="font-bold text-white">1. Information We Collect</h4>
              <p>
                When you make a booking inquiry, we collect basic details such as your name, mobile phone number, email address, travel dates, and room preferences.
              </p>
              <h4 className="font-bold text-white">2. How We Use Your Information</h4>
              <p>
                Your contact details are strictly used to communicate with you regarding room availability, confirmation of your reservation, check-in instructions, and answering guest questions. We do not sell or trade your personal data.
              </p>
              <h4 className="font-bold text-white">3. Contact Us</h4>
              <p>
                For questions regarding your data or privacy, contact our front desk at {config.phoneNumber} or via email at {config.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong className="text-white">{config.hotelName}</strong>. By reserving a room or staying at our property in Rohini Sector-25, Delhi, you agree to the following standard hotel terms:
              </p>
              <h4 className="font-bold text-white">1. Check-in & ID Requirements</h4>
              <p>
                All staying guests must present a valid government-issued photo ID (Aadhaar Card, Passport, Driving License, or Voter ID) at check-in time as mandated by Delhi local regulations.
              </p>
              <h4 className="font-bold text-white">2. Room Rates & Payments</h4>
              <p>
                Room rates start from ₹1,200 to ₹1,500 per night and may vary based on room category and peak dates. Online requests are inquiries; final reservation confirmation is issued directly by our hotel team.
              </p>
              <h4 className="font-bold text-white">3. Property Rules</h4>
              <p>
                Smoking inside AC guest bedrooms is discouraged to maintain hygienic air quality for all guests. Total property capacity is 16 rooms.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
