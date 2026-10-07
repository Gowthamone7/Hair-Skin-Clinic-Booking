import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MessageSquare } from 'lucide-react';
import { ClinicInfo } from '../types';

interface NavbarProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: (serviceId?: string) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  clinicInfo,
  onOpenBooking,
  currentPath,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Treatments', path: '/treatments' },
    { label: 'Why Choose Us', path: '/#why-us' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E6E4DC] shadow-[0_2px_12px_rgba(20,31,26,0.04)] py-3'
          : 'bg-[#FAF9F5] md:bg-[#FAF9F5]/85 border-b border-[#E6E4DC]/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#141F1A] transition-colors group-hover:text-[#2A5E50]">
              Mohan Skin & Hair Clinic
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#4A5550]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`transition-colors py-1 relative hover:text-[#141F1A] ${
                    isActive ? 'text-[#141F1A] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2A5E50]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded transition-all duration-150 shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#24302A] hover:text-[#141F1A] rounded focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E6E4DC] px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 pt-2 pb-4 border-b border-[#E6E4DC]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="text-base font-medium text-[#2C3833] hover:text-[#141F1A] py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={(e) => handleLinkClick(e, '/admin')}
              className="text-sm font-medium text-[#68756F] hover:text-[#141F1A] py-1 pt-2 border-t border-[#E6E4DC]/60"
            >
              Clinic Staff Portal
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] rounded"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-[#24302A] bg-[#EFECE4] rounded"
              >
                <Phone className="w-3.5 h-3.5 text-[#2A5E50]" />
                <span>Call Clinic</span>
              </a>
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello Mohan Skin & Hair Clinic, I would like to book an appointment. Please let me know the available slots.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-[#1E453B] bg-[#E6ECE8] rounded"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2A5E50]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
