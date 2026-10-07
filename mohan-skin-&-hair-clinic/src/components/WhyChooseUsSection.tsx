import React from 'react';
import { UserCheck, Sparkles, Building2, Stethoscope, MessageSquareText, MapPin } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      icon: UserCheck,
      title: "Patient-Centered Consultation",
      description: "We allocate adequate time to listen to your individual concerns, lifestyle habits, and previous treatments rather than rushing through visits."
    },
    {
      icon: Sparkles,
      title: "Personalized Care",
      description: "Skin and hair biology differs for every individual. Treatment plans are customized specifically to your condition and personal comfort."
    },
    {
      icon: Building2,
      title: "Professional Environment",
      description: "A clean, hygienic, and calm clinical environment designed to make your dermatological visit welcoming and comfortable."
    },
    {
      icon: Stethoscope,
      title: "Skin & Hair Expertise",
      description: "Dedicated focus on medical dermatology, trichology, and aesthetic skin care, staying grounded in verified dermatological practices."
    },
    {
      icon: MessageSquareText,
      title: "Clear Communication",
      description: "We explain diagnoses and procedures in simple, accessible language so you feel fully informed about your skin's health."
    },
    {
      icon: MapPin,
      title: "Convenient Mysuru Location",
      description: "Centrally positioned on Kalidasa Road in Vijayanagar 1st Stage, directly above Bank of Baroda and near Kangaroo Care Hospital."
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#F4F2EB] border-t border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
            <span>STANDARDS OF CARE</span>
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-tight mb-4 tracking-[-0.01em]">
            Why Choose Mohan Skin & Hair Clinic
          </h2>
          <p className="text-sm sm:text-base text-[#52605A] leading-relaxed">
            Our practice is dedicated to reliable dermatological ethics, patient comfort, and thoughtful clinical counsel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-lg bg-[#FAF9F5] border border-[#E6E4DC] hover:border-[#2A5E50]/40 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#EAF2EE] text-[#2A5E50] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#141F1A] mb-2.5">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E5B55] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
