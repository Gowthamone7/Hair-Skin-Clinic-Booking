import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  ShieldAlert,
  Layers,
  Wand2,
  Activity,
  UserCheck,
  Stethoscope,
  ArrowRight,
  Check,
  Clock,
  Calendar
} from 'lucide-react';
import { ServiceItem } from '../types';

interface TreatmentsSectionProps {
  services: ServiceItem[];
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail?: (service: ServiceItem) => void;
  showAllInitially?: boolean;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  services,
  onOpenBooking,
  onSelectServiceDetail,
  showAllInitially = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  // Map category icons
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'skin-conditions':
        return Stethoscope;
      case 'pigmentation-care':
        return Sun;
      case 'acne-acne-scars':
        return Sparkles;
      case 'keloid-scar-care':
        return ShieldAlert;
      case 'skin-needling':
        return Layers;
      case 'hair-scalp-care':
        return Activity;
      case 'cosmetic-dermatology':
        return Wand2;
      case 'corn-minor-lesion':
        return UserCheck;
      default:
        return Stethoscope;
    }
  };

  const featuredIds = ['pigmentation-care', 'acne-acne-scars', 'hair-scalp-care', 'keloid-scar-care'];
  const featuredServices = services.filter((s) => featuredIds.includes(s.id));

  const filteredServices = selectedFilter === 'all'
    ? services
    : services.filter((s) => s.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleLearnMore = (service: ServiceItem) => {
    if (onSelectServiceDetail) {
      onSelectServiceDetail(service);
    } else {
      setModalService(service);
    }
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
            <span>CLINICAL DERMATOLOGY & AESTHETIC CARE</span>
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#141F1A] leading-[1.15] mb-4 tracking-[-0.01em]">
            Popular Areas of Care
          </h2>
          <p className="text-base text-[#52605A] leading-relaxed">
            Every skin and hair plan begins with a personal medical assessment. Explore the primary concerns addressed at Mohan Skin & Hair Clinic in Vijayanagar, Mysuru.
          </p>
        </div>

        {/* Featured 4 Marquee Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {featuredServices.map((service, idx) => {
            const Icon = getServiceIcon(service.id);
            return (
              <div
                key={service.id}
                className="group relative p-7 sm:p-8 rounded-lg border border-[#E6E4DC] bg-[#F7F5EE]/80 hover:bg-white hover:border-[#2A5E50]/40 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(20,31,26,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded bg-[#EAF2EE] text-[#2A5E50] flex items-center justify-center transition-colors group-hover:bg-[#2A5E50] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    {/* Clean unboxed metadata separator adhering to Zero-Pill rule */}
                    <div className="text-xs text-[#707E78]">
                      <span>{service.category}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="tabular-nums">{service.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#141F1A] mb-2.5 group-hover:text-[#2A5E50] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#4E5B55] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between mt-auto">
                  <button
                    onClick={() => handleLearnMore(service)}
                    className="text-xs font-semibold text-[#24302A] hover:text-[#2A5E50] inline-flex items-center gap-1.5 cursor-pointer py-1"
                  >
                    <span>Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="text-xs font-medium uppercase tracking-wider text-[#2A5E50] hover:text-[#1E453B] cursor-pointer inline-flex items-center gap-1.5 py-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Treatments Section Header & Segmented Filter */}
        <div className="border-t border-[#E6E4DC] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#2A5E50] mb-1">
                Full Service Directory
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#141F1A]">
                Comprehensive Treatment Offerings
              </h3>
            </div>

            {/* Segmented Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-[#EBE8DF] rounded-md self-start sm:self-auto overflow-x-auto max-w-full">
              {[
                { label: 'All Treatments', val: 'all' },
                { label: 'Dermatology', val: 'dermatology' },
                { label: 'Skin Care', val: 'skin care' },
                { label: 'Hair & Scalp', val: 'hair' }
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => setSelectedFilter(btn.val)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedFilter === btn.val
                      ? 'bg-white text-[#141F1A] shadow-xs'
                      : 'text-[#586660] hover:text-[#141F1A]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of all treatments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredServices.map((service) => {
              const Icon = getServiceIcon(service.id);
              return (
                <div
                  key={service.id}
                  className="p-6 rounded-lg border border-[#E6E4DC] bg-white/70 hover:bg-white hover:border-[#2A5E50]/40 transition-all duration-150 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded bg-[#EAF2EE] text-[#2A5E50] flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="text-[11px] text-[#7A8782] mb-1 uppercase tracking-wider font-medium">
                      {service.category}
                    </div>

                    <h4 className="font-serif text-lg text-[#141F1A] font-semibold mb-2">
                      {service.name}
                    </h4>

                    <p className="text-xs text-[#52605A] leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EFEB] flex items-center justify-between">
                    <button
                      onClick={() => handleLearnMore(service)}
                      className="text-xs font-medium text-[#24302A] hover:text-[#2A5E50] cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="text-xs font-semibold text-[#2A5E50] hover:text-[#1E453B] cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for detailed treatment info if clicked */}
        {modalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-[#FAF9F5] border border-[#E6E4DC] rounded-lg max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#2A5E50]">
                    {modalService.category} · {modalService.duration} Consultation
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#141F1A] mt-1">
                    {modalService.name}
                  </h3>
                </div>
                <button
                  onClick={() => setModalService(null)}
                  className="p-1.5 text-[#55635D] hover:text-[#141F1A] rounded"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#46534E] leading-relaxed mb-6">
                {modalService.fullDescription}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141F1A] mb-3">
                  What to Expect:
                </h4>
                <div className="space-y-2.5">
                  {modalService.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#46534E]">
                      <Check className="w-4 h-4 text-[#2A5E50] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded bg-[#F2EFE8] border border-[#E6E4DC] mb-6 text-xs text-[#52605A]">
                <strong>Clinical Note:</strong> Individual recommendations and suitable options are determined following careful in-person consultation with the doctor.
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6E4DC]">
                <button
                  onClick={() => setModalService(null)}
                  className="px-4 py-2.5 text-xs font-medium text-[#4A5550] hover:text-[#141F1A]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = modalService.id;
                    setModalService(null);
                    onOpenBooking(id);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded shadow-xs"
                >
                  Book This Treatment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
