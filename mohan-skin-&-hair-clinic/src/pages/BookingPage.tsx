import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ShieldCheck, MapPin, Phone, MessageSquare, ArrowRight, User, Mail, FileText, AlertCircle, Download } from 'lucide-react';
import { ClinicInfo, ServiceItem, Appointment, AvailableSlotsResponse } from '../types';
import { api } from '../services/api';

interface BookingPageProps {
  clinicInfo: ClinicInfo;
  services: ServiceItem[];
  preselectedServiceId?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  clinicInfo,
  services,
  preselectedServiceId,
  onAppointmentBooked
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || services[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [slotsData, setSlotsData] = useState<AvailableSlotsResponse | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  useEffect(() => {
    // Tomorrow by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    const dateStr = d.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    fetchSlots(dateStr);
  }, []);

  const fetchSlots = async (dateStr: string) => {
    if (!dateStr) return;
    setLoadingSlots(true);
    setErrorMessage('');
    setSelectedTime('');
    try {
      const data = await api.getAvailableSlots(dateStr);
      setSlotsData(data);
    } catch {
      setErrorMessage('Could not load slots for this date.');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    fetchSlots(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedServiceId) {
      setErrorMessage('Please select a service or consultation area.');
      return;
    }
    if (!selectedDate) {
      setErrorMessage('Please select an appointment date.');
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Please select an available consultation time slot.');
      return;
    }
    if (!patientName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await api.createAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        serviceId: selectedServiceId,
        date: selectedDate,
        time: selectedTime,
        notes: notes.trim()
      });
      setConfirmedBooking(result.appointment);
      if (onAppointmentBooked) onAppointmentBooked(result.appointment);
    } catch (err: any) {
      setErrorMessage(err.message || 'Slot conflict or server error. Please select another time.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Top Banner */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
              <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
              <span>APPOINTMENT BOOKING</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141F1A] leading-tight mb-3 tracking-[-0.01em]">
              Book an Appointment
            </h1>
            <p className="text-base sm:text-lg text-[#4E5C56]">
              Schedule your dermatology, skin care, or hair care consultation at Mohan Skin & Hair Clinic in Vijayanagar 1st Stage, Mysuru.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {confirmedBooking ? (
          <div className="max-w-2xl mx-auto bg-white border border-[#E6E4DC] rounded-xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-[#EAF2EE] text-[#2A5E50] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-3xl text-[#141F1A] mb-2">
              Appointment Request Received
            </h2>
            <p className="text-sm text-[#46534E] max-w-md mx-auto mb-6">
              Thank you, {confirmedBooking.patientName}. We've received your request. The clinic reception will contact you shortly to confirm your slot.
            </p>

            <div className="bg-[#F7F5EE] border border-[#E6E4DC] rounded-lg p-6 max-w-md mx-auto text-left mb-6 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between pb-3 border-b border-[#E6E4DC]">
                <span className="text-[#606E67]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#2A5E50] text-base">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#606E67]">Service:</span>
                <span className="font-medium text-[#141F1A]">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#606E67]">Date & Time:</span>
                <span className="font-medium text-[#141F1A]">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#606E67]">Phone:</span>
                <span className="font-medium text-[#141F1A]">{confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#606E67]">Status:</span>
                <span className="font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded text-xs">
                  Pending Clinic Confirmation
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello Mohan Skin & Hair Clinic, I submitted appointment request ${confirmedBooking.id} for ${confirmedBooking.serviceName} on ${confirmedBooking.date} at ${confirmedBooking.time}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <a
                href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 text-xs font-medium text-[#141F1A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#2A5E50]" />
                <span>Call Clinic Reception</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white border border-[#E6E4DC] rounded-xl p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="mb-6 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Step 1: Select Service */}
                <div className="mb-8 pb-8 border-b border-[#E6E4DC]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2A5E50] mb-1">
                    Step 1 of 3
                  </div>
                  <h3 className="font-serif text-2xl text-[#141F1A] mb-4">
                    Choose Your Consultation Concern
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedServiceId(s.id)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                          selectedServiceId === s.id
                            ? 'border-[#2A5E50] bg-[#EAF2EE] shadow-xs'
                            : 'border-[#E6E4DC] bg-[#FAF9F5] hover:border-[#B8C9C1]'
                        }`}
                      >
                        <div className="text-[11px] text-[#63726C] font-medium">{s.category}</div>
                        <div className="font-serif text-base text-[#141F1A] font-semibold">{s.name}</div>
                        <div className="text-xs text-[#52605A] mt-0.5 line-clamp-1">{s.shortDescription}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Date & Available Slots */}
                <div className="mb-8 pb-8 border-b border-[#E6E4DC]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2A5E50] mb-1">
                    Step 2 of 3
                  </div>
                  <h3 className="font-serif text-2xl text-[#141F1A] mb-4">
                    Select Date & Time Slot
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-medium text-[#24302A] mb-1.5">
                        Appointment Date *
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded border border-[#D5D2C7] bg-[#FAF9F5] focus:outline-none focus:border-[#2A5E50]"
                      />
                      <p className="text-[11.5px] text-[#63726C] mt-2">
                        Mon–Sat: 10:30 AM–1:30 PM & 4:30 PM–8:30 PM<br />
                        <span className="text-rose-700">Sundays closed</span>
                      </p>
                    </div>

                    <div className="sm:col-span-7">
                      <label className="block text-xs font-medium text-[#24302A] mb-1.5">
                        Available Consultation Slots *
                      </label>

                      {loadingSlots ? (
                        <div className="py-6 text-xs text-[#52605A]">Checking slot availability...</div>
                      ) : slotsData && !slotsData.available ? (
                        <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 text-xs rounded">
                          {slotsData.reason || 'Clinic closed on this day. Please select another date.'}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <div className="text-[11px] font-semibold text-[#2A5E50] uppercase mb-1.5">
                              Morning Sessions (10:30 AM – 1:30 PM)
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {slotsData?.morningSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`py-2 px-1 text-xs font-medium rounded text-center transition-all ${
                                    !slot.available
                                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                                      : selectedTime === slot.time
                                      ? 'bg-[#2A5E50] text-white font-semibold'
                                      : 'bg-[#FAF9F5] border border-[#D5D2C7] hover:border-[#2A5E50]'
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] font-semibold text-[#2A5E50] uppercase mb-1.5">
                              Evening Sessions (4:30 PM – 8:30 PM)
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {slotsData?.eveningSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedTime(slot.time)}
                                  className={`py-2 px-1 text-xs font-medium rounded text-center transition-all ${
                                    !slot.available
                                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                                      : selectedTime === slot.time
                                      ? 'bg-[#2A5E50] text-white font-semibold'
                                      : 'bg-[#FAF9F5] border border-[#D5D2C7] hover:border-[#2A5E50]'
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Patient Information */}
                <div className="mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2A5E50] mb-1">
                    Step 3 of 3
                  </div>
                  <h3 className="font-serif text-2xl text-[#141F1A] mb-4">
                    Patient Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24302A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Ramesh Hegde"
                        className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-[#FAF9F5] focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24302A] mb-1">
                        Phone Number (for confirmation) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98450 12345"
                        className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-[#FAF9F5] focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-[#24302A] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-[#FAF9F5] focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#24302A] mb-1">
                        Optional Notes or Concern Details
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any details about duration of symptoms or prior medications..."
                        className="w-full px-3 py-2 text-xs rounded border border-[#D5D2C7] bg-[#FAF9F5] focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF8F2] border border-[#E8E5DA] rounded text-[11px] text-[#63726C]">
                    Submitting this form sends an appointment request to Mohan Skin & Hair Clinic. Our front desk will confirm your slot via WhatsApp or call.
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E4DC] flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded shadow-xs cursor-pointer"
                  >
                    {submitting ? 'Submitting Request...' : 'Submit Appointment Request'}
                  </button>
                </div>
              </form>
            </div>

            {/* Clinic Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#F7F5EE] border border-[#E6E4DC] rounded-xl p-6">
                <h3 className="font-serif text-xl text-[#141F1A] mb-3">
                  Clinic Location & Timing
                </h3>
                <div className="text-xs text-[#4A5550] space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#2A5E50] shrink-0 mt-0.5" />
                    <span>
                      First Floor, Kalidasa Road,<br />
                      Above Bank of Baroda,<br />
                      Near Kangaroo Care Hospital,<br />
                      Vijayanagar 1st Stage, Mysuru
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#2A5E50] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#141F1A]">Mon – Sat:</p>
                      <p>10:30 AM – 1:30 PM & 4:30 PM – 8:30 PM</p>
                      <p className="text-rose-700 mt-0.5 font-medium">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-[#E6E4DC]">
                    <Phone className="w-4 h-4 text-[#2A5E50] shrink-0" />
                    <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="font-medium hover:text-[#2A5E50]">
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F5EE] border border-[#E6E4DC] rounded-xl p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2A5E50] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Standards</span>
                </div>
                <p className="text-xs text-[#55635D] leading-relaxed">
                  We maintain strict clinical ethics. Treatment plans and diagnostic tests are recommended solely based on medical need following thorough personal consultation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
