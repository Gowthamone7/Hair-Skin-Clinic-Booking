import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, MapPin, Clock, Calendar } from 'lucide-react';
import { ClinicInfo } from '../types';
import { clinicImages } from '../assets';

interface AboutPageProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  clinicInfo,
  onOpenBooking,
  onNavigate
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Header Banner */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>ABOUT THE CLINIC</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141F1A] leading-tight mb-4 tracking-[-0.01em]">
              About Mohan Skin & Hair Clinic
            </h1>
            <p className="text-base sm:text-lg text-[#4E5C56] leading-relaxed">
              A private dermatology, skin-care, and hair-care clinic in Vijayanagar 1st Stage, Mysuru, dedicated to personalized clinical evaluation and honest patient guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#141F1A] mb-5">
              Personalized Consultation, Grounded in Science
            </h2>
            <p className="text-sm sm:text-base text-[#46534D] leading-relaxed mb-4">
              At Mohan Skin & Hair Clinic, we believe that dermatological health requires thoughtful, individualized care. Skin and scalp conditions cannot be solved through rushed visits or generic trend-driven solutions.
            </p>
            <p className="text-sm sm:text-base text-[#46534D] leading-relaxed mb-4">
              Our clinical consultation begins by listening carefully to each patient's medical history, current symptoms, prior topical treatments, and lifestyle factors. We take pride in explaining the underlying mechanism of conditions—whether it is acne, melasma, atopic dermatitis, or diffuse hair thinning.
            </p>
            <p className="text-sm sm:text-base text-[#46534D] leading-relaxed mb-6">
              Patients in Mysuru choose our clinic for straightforward clinical communication, transparent guidance without aggressive marketing, and a calm, hygienic clinical atmosphere.
            </p>

            <div className="p-4 rounded-lg bg-[#F4F2EB] border border-[#E6E4DC] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2A5E50] shrink-0" />
              <p className="text-xs text-[#52605A] leading-snug">
                Every treatment regimen is customized following one-on-one clinical evaluation by the doctor in our Vijayanagar clinic.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-lg overflow-hidden border border-[#E6E4DC] shadow-md bg-[#EBE8DF]">
              <img
                src={clinicImages.hero}
                alt="Consultation desk and examination room at Mohan Skin & Hair Clinic"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Clinical Environment Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="rounded-lg border border-[#E6E4DC] bg-[#F7F5EE] p-6">
            <img
              src={clinicImages.reception}
              alt="Clinic reception and waiting area"
              className="w-full h-44 object-cover rounded mb-4"
              referrerPolicy="no-referrer"
            />
            <h3 className="font-serif text-lg text-[#141F1A] font-semibold mb-2">
              Comfortable Reception Lounge
            </h3>
            <p className="text-xs text-[#52605A] leading-relaxed">
              A serene waiting area designed to ensure minimal crowding, punctual appointments, and patient privacy.
            </p>
          </div>

          <div className="rounded-lg border border-[#E6E4DC] bg-[#F7F5EE] p-6">
            <img
              src={clinicImages.treatmentRoom}
              alt="Hygienic dermatological treatment room"
              className="w-full h-44 object-cover rounded mb-4"
              referrerPolicy="no-referrer"
            />
            <h3 className="font-serif text-lg text-[#141F1A] font-semibold mb-2">
              Sterile Treatment Rooms
            </h3>
            <p className="text-xs text-[#52605A] leading-relaxed">
              Dedicated procedural suites adhering to medical-grade hygiene for all minor dermatological interventions.
            </p>
          </div>

          <div className="rounded-lg border border-[#E6E4DC] bg-[#F7F5EE] p-6">
            <img
              src={clinicImages.hairScalpSuite}
              alt="Hair and scalp trichology diagnostic unit"
              className="w-full h-44 object-cover rounded mb-4"
              referrerPolicy="no-referrer"
            />
            <h3 className="font-serif text-lg text-[#141F1A] font-semibold mb-2">
              Hair & Scalp Diagnostic Unit
            </h3>
            <p className="text-xs text-[#52605A] leading-relaxed">
              Focused diagnostic examination for hair density, follicle status, dandruff, and scalp health.
            </p>
          </div>
        </div>

        {/* Location & Timings Box */}
        <div className="p-8 rounded-lg bg-[#FAF8F2] border border-[#E6E4DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#141F1A] mb-2">
              Ready for a Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-[#52605A] max-w-xl">
              We look forward to welcoming you at our clinic on Kalidasa Road in Vijayanagar 1st Stage, Mysuru.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded shadow-xs"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-3 text-xs font-medium text-[#24302A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded"
            >
              View Location Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
