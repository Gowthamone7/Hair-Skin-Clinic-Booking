import React from 'react';
import { Calendar, MessageSquare, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { ClinicInfo } from '../types';
import { clinicImages } from '../assets';

interface HeroSectionProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
  onViewTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  clinicInfo,
  onOpenBooking,
  onViewTreatments
}) => {
  const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Mohan Skin & Hair Clinic, I would like to book an appointment. Please let me know the available slots.'
  )}`;

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF9F5]">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#141f1a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small eyebrow */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-6 h-[1.5px] bg-[#2A5E50]" />
              <span>MOHAN SKIN & HAIR CLINIC</span>
            </div>

            {/* Large headline with text-wrap: balance */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-normal leading-[1.12] text-[#141F1A] tracking-[-0.02em] max-w-2xl mb-6 [text-wrap:balance]">
              Expert Skin & Hair Care, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#2A5E50]">Personalized</span> for You.
            </h1>

            {/* Supporting copy */}
            <p className="text-base sm:text-lg text-[#4A5550] leading-relaxed max-w-xl mb-8">
              Thoughtful dermatology and aesthetic care designed around your individual skin and hair concerns. Experience attentive clinical consultations in a calm, modern environment in Vijayanagar, Mysuru.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1E453B] bg-[#EAE8E0] hover:bg-[#E2DFD5] rounded transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-[#2A5E50]" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={onViewTreatments}
                className="inline-flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-[#4A5550] hover:text-[#141F1A] transition-colors"
              >
                <span>View Treatments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust indicators under CTAs */}
            <div className="pt-6 border-t border-[#E6E4DC] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#52605A]">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#141F1A]">4.9/5</span>
                <span>Google Rating</span>
              </div>

              <span className="text-[#C4C0B4]" aria-hidden="true">·</span>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#141F1A]">400+</span>
                <span>Patient Reviews</span>
              </div>

              <span className="text-[#C4C0B4]" aria-hidden="true">·</span>

              <div className="flex items-center gap-1 text-[#4A5550]">
                <MapPin className="w-3.5 h-3.5 text-[#2A5E50]" />
                <span>Vijayanagar 1st Stage, Mysuru</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Photography with Subtle Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#E6E4DC] shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-[#EAE8E0]">
              <img
                src={clinicImages.hero}
                alt="Mohan Skin & Hair Clinic modern consultation room in Mysuru"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium text-emerald-200 uppercase tracking-widest">Clinical Environment</p>
                <p className="font-serif text-lg text-white">Vijayanagar 1st Stage · Kalidasa Road</p>
              </div>
            </div>

            {/* Reassurance Floating Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur border border-[#E6E4DC] p-4 rounded-lg shadow-lg max-w-[260px] items-start gap-3">
              <div className="p-2 rounded bg-[#EAF2EE] text-[#2A5E50] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#141F1A]">Consultation Timings</p>
                <p className="text-[#596660] mt-0.5">Mon–Sat: 10:30 AM–1:30 PM & 4:30 PM–8:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
