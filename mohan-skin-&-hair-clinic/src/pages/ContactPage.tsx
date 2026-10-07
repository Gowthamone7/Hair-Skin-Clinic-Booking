import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ClinicInfo } from '../types';

interface ContactPageProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  clinicInfo,
  onOpenBooking
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Top Banner */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>VISIT US IN MYSURU</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141F1A] leading-tight mb-4 tracking-[-0.01em]">
              Contact & Clinic Location
            </h1>
            <p className="text-base sm:text-lg text-[#4E5C56] leading-relaxed">
              Find directions to Mohan Skin & Hair Clinic on Kalidasa Road in Vijayanagar 1st Stage, Mysuru. Call our front desk or message us on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <ContactSection clinicInfo={clinicInfo} onOpenBooking={onOpenBooking} />
    </div>
  );
};
