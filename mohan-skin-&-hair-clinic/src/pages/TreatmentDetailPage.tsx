import React from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import { ServiceItem, ClinicInfo } from '../types';

interface TreatmentDetailPageProps {
  service: ServiceItem;
  clinicInfo: ClinicInfo;
  onBack: () => void;
  onOpenBooking: (serviceId: string) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({
  service,
  clinicInfo,
  onBack,
  onOpenBooking
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2A5E50] hover:text-[#1E453B] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Treatments</span>
          </button>

          <div className="text-xs font-semibold uppercase tracking-widest text-[#707E78] mb-1">
            {service.category} · Consultation: {service.duration}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141F1A] leading-tight mb-4 tracking-[-0.01em]">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-[#4E5C56] max-w-2xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose max-w-none text-[#3E4A44] space-y-6">
              <section>
                <h2 className="font-serif text-2xl text-[#141F1A] mb-3">
                  Clinical Overview
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>

              <section className="pt-4 border-t border-[#E6E4DC]">
                <h3 className="font-serif text-xl text-[#141F1A] mb-4">
                  What Our Consultation Includes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="p-3.5 rounded bg-[#F7F5EE] border border-[#E6E4DC] flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#2A5E50] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-4 border-t border-[#E6E4DC]">
                <h3 className="font-serif text-xl text-[#141F1A] mb-3">
                  Patient Preparation & Care Guidelines
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4E5B55] list-disc pl-5">
                  <li>Please bring a list of your existing skin products, prescriptions, or cleansers currently in use.</li>
                  <li>Avoid applying thick decorative cosmetics or heavy pigments on the day of consultation so the doctor can examine your natural skin barrier accurately.</li>
                  <li>Inform the doctor of any known drug allergies, past dermatological procedures, or underlying health conditions.</li>
                </ul>
              </section>

              {/* Medical Disclaimer */}
              <div className="mt-8 p-4 rounded-lg bg-[#F4F2EB] border border-[#E6E4DC] text-xs text-[#52605A] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2A5E50] shrink-0 mt-0.5" />
                <div>
                  <strong>Ethical Practice Notice:</strong> We do not offer or promote speculative cosmetic procedures. The doctor determines the clinical advisability of any treatment following physical assessment.
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Booking Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#F7F5EE] border border-[#E6E4DC] rounded-lg p-6 sticky top-24">
              <h3 className="font-serif text-xl text-[#141F1A] mb-2">
                Consult for This Concern
              </h3>
              <p className="text-xs text-[#52605A] mb-5">
                Reserve an appointment slot at Mohan Skin & Hair Clinic on Kalidasa Road, Vijayanagar 1st Stage, Mysuru.
              </p>

              <div className="space-y-3 pb-5 border-b border-[#E6E4DC] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64726C]">Concern:</span>
                  <span className="font-semibold text-[#141F1A]">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64726C]">Typical Duration:</span>
                  <span className="font-semibold text-[#141F1A]">{service.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64726C]">Clinic Hours:</span>
                  <span className="font-semibold text-[#141F1A]">Mon–Sat Sessions</span>
                </div>
              </div>

              <div className="pt-5 space-y-3">
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Slot</span>
                </button>

                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello Mohan Skin & Hair Clinic, I would like to inquire about consultation for ${service.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-medium text-[#1E453B] bg-[#EAE8E0] hover:bg-[#E2DFD5] rounded flex items-center justify-center gap-2 text-center"
                >
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
