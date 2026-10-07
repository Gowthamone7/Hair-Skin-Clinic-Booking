import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { clinicImages } from '../assets';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onNavigateToAbout?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenBooking,
  onNavigateToAbout
}) => {
  const pillars = [
    {
      title: "Patient-Focused Consultation",
      description: "Dedicated time to listen to your history, symptoms, and lifestyle factors without rushing."
    },
    {
      title: "Clear Communication",
      description: "Concise explanations of your skin condition, underlying causes, and practical expectations."
    },
    {
      title: "Personalized Treatment Planning",
      description: "Evidence-based regimens tailored to your specific skin type and individual goals."
    },
    {
      title: "Professional Clinical Environment",
      description: "Hygienic, comfortable consultation and treatment rooms situated in Vijayanagar 1st Stage."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Photography */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden border border-[#E6E4DC] shadow-[0_12px_36px_rgba(20,31,26,0.06)] bg-[#EAE8E0]">
                <img
                  src={clinicImages.consultationDesk}
                  alt="Doctor consultation suite at Mohan Skin & Hair Clinic Mysuru"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Patient Trust Callout */}
              <div className="mt-4 p-4 rounded-lg bg-[#F4F2EB] border border-[#E6E4DC] flex items-center gap-3">
                <div className="p-2 bg-[#2A5E50] text-white rounded shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#141F1A]">Honest Medical Ethics</p>
                  <p className="text-[11.5px] text-[#55635D] leading-snug">
                    Careful diagnosis first. No unverified procedures or aggressive upselling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Principles */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>ABOUT MOHAN SKIN & HAIR CLINIC</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-[1.2] tracking-[-0.01em] mb-6 [text-wrap:balance]">
              Personalized Care for Your Skin & Hair
            </h2>

            <p className="text-[#4A5550] text-base sm:text-lg leading-relaxed mb-6">
              Mohan Skin & Hair Clinic is a dermatology and skin-care clinic located on Kalidasa Road in Vijayanagar 1st Stage, Mysuru. Our practice is founded on understanding each patient’s unique dermatological journey rather than applying one-size-fits-all routines.
            </p>

            <p className="text-[#56635D] text-sm sm:text-base leading-relaxed mb-8">
              Whether you are consulting for active acne, pigmentation, scalp hair thinning, or general skin maintenance, we believe that informed patients achieve the best results. We discuss your diagnosis candidly, explain how medications work, and set realistic timeframes.
            </p>

            {/* Core commitments grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded border border-[#E8E6DE] bg-[#F7F5EE]/60">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2A5E50] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#141F1A] mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#5D6B65] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded transition-all cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onNavigateToAbout && (
                <button
                  onClick={onNavigateToAbout}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium text-[#24302A] hover:text-[#2A5E50] transition-colors"
                >
                  <span>Learn More About Clinic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
