import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from 'lucide-react';
import { ClinicInfo } from '../types';

interface FooterProps {
  clinicInfo: ClinicInfo;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  clinicInfo,
  onNavigate,
  onOpenBooking
}) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141F1A] text-[#D1D9D4] pt-16 pb-20 sm:pb-12 border-t border-[#23332B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#23332B]">
          {/* Column 1: Clinic Brand */}
          <div className="lg:col-span-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF9F5] block mb-3">
              Mohan Skin & Hair Clinic
            </span>
            <p className="text-xs sm:text-sm text-[#9BA8A1] leading-relaxed mb-5 max-w-sm">
              Personalized skin and hair care in Vijayanagar, Mysuru. Dedicated to thoughtful consultations, honest communication, and professional dermatological care.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8A9690]">
              <span className="text-amber-400 font-semibold">★ 4.9/5</span>
              <span>·</span>
              <span>400+ Patient Reviews in Mysuru</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF9F5] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/" onClick={(e) => handleLink(e, '/')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLink(e, '/about')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  About Clinic
                </a>
              </li>
              <li>
                <a href="/treatments" onClick={(e) => handleLink(e, '/treatments')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  Treatments & Care
                </a>
              </li>
              <li>
                <a href="/reviews" onClick={(e) => handleLink(e, '/reviews')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  Patient Reviews
                </a>
              </li>
              <li>
                <a href="/gallery" onClick={(e) => handleLink(e, '/gallery')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  Clinic Gallery
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleLink(e, '/faq')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="text-[#A4B3AB] hover:text-[#FAF9F5] transition-colors">
                  Contact & Location
                </a>
              </li>
              <li>
                <a href="/admin" onClick={(e) => handleLink(e, '/admin')} className="text-[#597568] hover:text-[#769C8A] transition-colors pt-1 block">
                  Staff Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF9F5] mb-4">
              Clinic Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#A4B3AB]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#478B77] shrink-0 mt-0.5" />
                <span>
                  First Floor, Kalidasa Road,<br />
                  Above Bank of Baroda,<br />
                  Near Kangaroo Care Hospital,<br />
                  Vijayanagar 1st Stage, Mysuru
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#478B77] shrink-0" />
                <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="hover:text-[#FAF9F5]">
                  {clinicInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#478B77] shrink-0" />
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Mohan Skin & Hair Clinic, I would like to book an appointment.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF9F5]"
                >
                  {clinicInfo.whatsapp} (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Clinic Hours & Booking Action */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FAF9F5] mb-4">
              Consultation Timings
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#A4B3AB] mb-6">
              <div className="flex justify-between">
                <span>Mon – Sat:</span>
                <span className="text-[#FAF9F5] text-right">
                  10:30 AM – 1:30 PM<br />
                  4:30 PM – 8:30 PM
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#23332B]">
                <span>Sunday:</span>
                <span className="text-rose-400">Closed</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#387B69] rounded transition-all cursor-pointer shadow-xs"
            >
              Book an Appointment
            </button>
          </div>
        </div>

        {/* Medical Disclaimer Callout */}
        <div className="py-6 border-b border-[#23332B] text-[11.5px] text-[#7A8A82] leading-relaxed">
          <p>
            <strong className="text-[#9BB0A5]">Medical Disclaimer:</strong> Information provided on this website is for general informational purposes and does not replace professional medical advice, diagnosis, or treatment. Individual treatment recommendations are made following appropriate clinical consultation with the doctor.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8A82]">
          <p>© 2026 Mohan Skin & Hair Clinic, Vijayanagar, Mysuru. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" onClick={(e) => handleLink(e, '/privacy')} className="hover:text-[#FAF9F5]">
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms" onClick={(e) => handleLink(e, '/terms')} className="hover:text-[#FAF9F5]">
              Terms of Care
            </a>
            <span aria-hidden="true">·</span>
            <a href="/admin" onClick={(e) => handleLink(e, '/admin')} className="hover:text-[#FAF9F5]">
              Staff Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
