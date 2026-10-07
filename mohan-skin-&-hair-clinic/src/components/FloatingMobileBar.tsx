import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { ClinicInfo } from '../types';

interface FloatingMobileBarProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  clinicInfo,
  onOpenBooking
}) => {
  const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Mohan Skin & Hair Clinic, I would like to book an appointment. Please let me know the available slots.'
  )}`;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-t border-[#E6E4DC] px-3 py-2 shadow-[0_-4px_16px_rgba(20,31,26,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#F0EDE3] text-[#24302A] active:bg-[#E5E1D5] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#2A5E50] mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#E4EAE6] text-[#1E453B] active:bg-[#D5E0DA] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#2A5E50] mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Book Button */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#2A5E50] text-white active:bg-[#1E453B] transition-colors shadow-xs"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Book</span>
        </button>
      </div>
    </div>
  );
};
