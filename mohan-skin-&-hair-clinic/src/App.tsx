import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { BookingModal } from './components/BookingModal';

import { AboutPage } from './pages/AboutPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { AdminDashboard } from './pages/AdminDashboard';

import { ClinicInfo, ServiceItem, PatientReview, FAQItem, Appointment } from './types';
import { api, defaultClinicInfo, defaultServices, defaultReviews, defaultFaqs } from './services/api';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(defaultClinicInfo);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [reviews, setReviews] = useState<PatientReview[]>(defaultReviews);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);

  // Selected treatment for detail view
  const [selectedTreatmentSlug, setSelectedTreatmentSlug] = useState<string | null>(null);

  // Success toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle URL change
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      checkSlugFromPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    checkSlugFromPath(window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const checkSlugFromPath = (path: string) => {
    if (path.startsWith('/treatments/')) {
      const slug = path.replace('/treatments/', '');
      if (slug) setSelectedTreatmentSlug(slug);
    } else {
      setSelectedTreatmentSlug(null);
    }
  };

  const navigateTo = (path: string) => {
    if (path.startsWith('/#')) {
      // Anchor scroll
      const elementId = path.replace('/#', '');
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      path = '/';
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    checkSlugFromPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [info, srv, rev, fq] = await Promise.all([
          api.getClinicInfo(),
          api.getServices(),
          api.getReviews(),
          api.getFaqs()
        ]);
        setClinicInfo(info);
        setServices(srv);
        setReviews(rev);
        setFaqs(fq);
      } catch (err) {
        console.warn('Using seeded data:', err);
      }
    };
    loadInitialData();
  }, []);

  const openBookingWithService = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleAppointmentBooked = (appointment: Appointment) => {
    setToastMessage(`Appointment request received! Ref: ${appointment.id}`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const selectedServiceDetail = services.find((s) => s.slug === selectedTreatmentSlug || s.id === selectedTreatmentSlug);

  const isAdmin = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E2522]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#141F1A] text-white px-5 py-3 rounded-lg shadow-xl border border-[#2A5E50] text-xs font-medium flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar (Hidden in staff portal view) */}
      {!isAdmin && (
        <Navbar
          clinicInfo={clinicInfo}
          onOpenBooking={openBookingWithService}
          currentPath={currentPath}
          onNavigate={navigateTo}
        />
      )}

      {/* Page Routing */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminDashboard
            clinicInfo={clinicInfo}
            services={services}
            onClinicInfoUpdated={(updated) => setClinicInfo(updated)}
            onNavigateHome={() => navigateTo('/')}
          />
        ) : selectedTreatmentSlug && selectedServiceDetail ? (
          <TreatmentDetailPage
            service={selectedServiceDetail}
            clinicInfo={clinicInfo}
            onBack={() => navigateTo('/treatments')}
            onOpenBooking={(id) => openBookingWithService(id)}
          />
        ) : currentPath === '/about' ? (
          <AboutPage
            clinicInfo={clinicInfo}
            onOpenBooking={() => openBookingWithService()}
            onNavigate={navigateTo}
          />
        ) : currentPath === '/treatments' ? (
          <TreatmentsPage
            services={services}
            onOpenBooking={openBookingWithService}
            onSelectServiceDetail={(service) => navigateTo(`/treatments/${service.slug}`)}
          />
        ) : currentPath === '/booking' ? (
          <BookingPage
            clinicInfo={clinicInfo}
            services={services}
            preselectedServiceId={bookingServiceId}
            onAppointmentBooked={handleAppointmentBooked}
          />
        ) : currentPath === '/contact' ? (
          <ContactPage
            clinicInfo={clinicInfo}
            onOpenBooking={() => openBookingWithService()}
          />
        ) : currentPath === '/reviews' ? (
          <ReviewsPage
            reviews={reviews}
            onReviewAdded={(newRev) => setReviews((prev) => [newRev, ...prev])}
          />
        ) : currentPath === '/gallery' ? (
          <GalleryPage />
        ) : currentPath === '/faq' ? (
          <FAQPage faqs={faqs} />
        ) : currentPath === '/privacy' ? (
          <LegalPage type="privacy" onBack={() => navigateTo('/')} />
        ) : currentPath === '/terms' ? (
          <LegalPage type="terms" onBack={() => navigateTo('/')} />
        ) : (
          /* Homepage: Complete flow */
          <div>
            <HeroSection
              clinicInfo={clinicInfo}
              onOpenBooking={() => openBookingWithService()}
              onViewTreatments={() => navigateTo('/treatments')}
            />
            <TrustBar />
            <AboutSection
              onOpenBooking={() => openBookingWithService()}
              onNavigateToAbout={() => navigateTo('/about')}
            />
            <TreatmentsSection
              services={services}
              onOpenBooking={openBookingWithService}
              onSelectServiceDetail={(service) => navigateTo(`/treatments/${service.slug}`)}
            />
            <WhyChooseUsSection />
            <ReviewsSection
              reviews={reviews}
              onReviewAdded={(newRev) => setReviews((prev) => [newRev, ...prev])}
            />
            <GallerySection />
            <FAQSection faqs={faqs} />
            <ContactSection
              clinicInfo={clinicInfo}
              onOpenBooking={() => openBookingWithService()}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      {!isAdmin && (
        <Footer
          clinicInfo={clinicInfo}
          onNavigate={navigateTo}
          onOpenBooking={() => openBookingWithService()}
        />
      )}

      {/* Floating Mobile Action Bar */}
      {!isAdmin && (
        <FloatingMobileBar
          clinicInfo={clinicInfo}
          onOpenBooking={() => openBookingWithService()}
        />
      )}

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        clinicInfo={clinicInfo}
        services={services}
        initialServiceId={bookingServiceId}
        onAppointmentBooked={handleAppointmentBooked}
      />
    </div>
  );
}
