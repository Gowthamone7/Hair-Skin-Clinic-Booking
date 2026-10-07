import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, Mail } from 'lucide-react';
import { ClinicInfo } from '../types';

interface ContactSectionProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  clinicInfo,
  onOpenBooking
}) => {
  const whatsappUrl = `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Mohan Skin & Hair Clinic, I would like to book an appointment. Please let me know the available slots.'
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF9F5] border-t border-[#E6E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
            <span>LOCATION & CLINIC DESK</span>
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-tight tracking-[-0.01em]">
            Visit Mohan Skin & Hair Clinic
          </h2>
          <p className="text-sm sm:text-base text-[#52605A] mt-2">
            Located conveniently on Kalidasa Road in Vijayanagar 1st Stage, Mysuru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinic Details & Action Buttons */}
          <div className="lg:col-span-5 bg-[#F7F5EE] border border-[#E6E4DC] p-7 sm:p-9 rounded-lg">
            <h3 className="font-serif text-2xl text-[#141F1A] mb-4">
              Mohan Skin & Hair Clinic
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3.5 mb-6 text-sm text-[#3E4A44]">
              <div className="p-2 bg-[#EAE7DC] text-[#2A5E50] rounded shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-[#141F1A]">Address:</p>
                <p className="mt-0.5 leading-relaxed">
                  First Floor, Kalidasa Road,<br />
                  Above Bank of Baroda,<br />
                  Near Kangaroo Care Hospital,<br />
                  Vijayanagar 1st Stage, Mysuru,<br />
                  Karnataka 570017, India
                </p>
                <p className="text-xs text-[#2A5E50] font-medium mt-1">
                  Primary Landmark: Near Kangaroo Care Hospital (Above Bank of Baroda)
                </p>
              </div>
            </div>

            {/* Clinic Timings */}
            <div className="flex items-start gap-3.5 mb-6 text-sm text-[#3E4A44]">
              <div className="p-2 bg-[#EAE7DC] text-[#2A5E50] rounded shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-[#141F1A]">Clinic Hours:</p>
                <div className="mt-1 space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#606E67]">Mon – Sat:</span>
                    <span className="font-medium text-[#141F1A] text-right">
                      10:30 AM – 1:30 PM<br />
                      4:30 PM – 8:30 PM
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 pt-1 border-t border-[#E4E1D5]">
                    <span className="text-[#606E67]">Sunday:</span>
                    <span className="text-rose-700 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Phones */}
            <div className="flex items-start gap-3.5 mb-8 text-sm text-[#3E4A44]">
              <div className="p-2 bg-[#EAE7DC] text-[#2A5E50] rounded shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-[#141F1A]">Direct Phones:</p>
                <p className="mt-0.5 text-[#33403A]">
                  Reception: <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="hover:text-[#2A5E50] font-medium">{clinicInfo.phone}</a>
                </p>
                <p className="mt-0.5 text-[#33403A]">
                  Mobile & WhatsApp: <a href={`tel:${clinicInfo.mobile.replace(/\s+/g, '')}`} className="hover:text-[#2A5E50] font-medium">{clinicInfo.mobile}</a>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#E2DFD3]">
              <a
                href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#141F1A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded text-center transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2A5E50]" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded text-center transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={clinicInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#141F1A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded text-center transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#2A5E50]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="w-full h-[400px] sm:h-[480px] rounded-lg overflow-hidden border border-[#E6E4DC] shadow-sm relative bg-[#EBE9DF]">
              <iframe
                title="Mohan Skin & Hair Clinic Google Map Location"
                src="https://maps.google.com/maps?q=12.3308398,76.6215124&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {/* Overlay banner at top of map */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto bg-[#FAF9F5]/95 backdrop-blur-xs p-3 rounded border border-[#E6E4DC] shadow-md flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-[#141F1A]">Vijayanagar 1st Stage, Mysuru</p>
                  <p className="text-[11px] text-[#55635D]">Above Bank of Baroda · Kalidasa Rd</p>
                </div>
                <a
                  href={clinicInfo.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#2A5E50] text-white rounded text-[11px] font-medium flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
