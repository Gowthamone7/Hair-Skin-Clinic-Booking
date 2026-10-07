import React from 'react';
import { Star, MessageCircle, MapPin, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: Star,
      value: "4.9★",
      label: "Patient Rating",
      subtext: "Consistent positive feedback"
    },
    {
      icon: MessageCircle,
      value: "400+",
      label: "Patient Reviews",
      subtext: "Verified public testimonials"
    },
    {
      icon: MapPin,
      value: "Mysuru",
      label: "Local Vijayanagar Clinic",
      subtext: "Kalidasa Road landmark"
    },
    {
      icon: Sparkles,
      value: "Skin + Hair",
      label: "Specialized Care",
      subtext: "Dermatology & aesthetic care"
    }
  ];

  return (
    <section className="border-y border-[#E6E4DC] bg-[#F4F2EB] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E0DDCF]/80">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  index > 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-[#2A5E50]" />
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#141F1A] tracking-tight tabular-nums">
                    {item.value}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#24302A]">
                  {item.label}
                </div>
                <div className="text-[11px] text-[#697771] mt-0.5">
                  {item.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
