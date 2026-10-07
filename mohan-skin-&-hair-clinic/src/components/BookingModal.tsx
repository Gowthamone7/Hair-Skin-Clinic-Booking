import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  PhoneCall,
  Download
} from 'lucide-react';
import { ClinicInfo, ServiceItem, Appointment, AvailableSlotsResponse } from '../types';
import { api } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicInfo: ClinicInfo;
  services: ServiceItem[];
  initialServiceId?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  clinicInfo,
  services,
  initialServiceId,
  onAppointmentBooked
}) => {
  // Steps: 1: Service, 2: Date & Slot, 3: Patient Info, 4: Confirmed
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || services[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // UI status
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [slotsData, setSlotsData] = useState<AvailableSlotsResponse | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Reset or preset on open
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceId(initialServiceId);
      } else if (!selectedServiceId && services.length > 0) {
        setSelectedServiceId(services[0].id);
      }

      // Default to tomorrow's date (if not Sunday)
      const d = new Date();
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) {
        d.setDate(d.getDate() + 1); // skip Sunday
      }
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const defaultDateStr = `${yyyy}-${mm}-${dd}`;
      setSelectedDate(defaultDateStr);
      fetchSlots(defaultDateStr);
    }
  }, [isOpen, initialServiceId]);

  const fetchSlots = async (dateStr: string) => {
    if (!dateStr) return;
    setLoadingSlots(true);
    setErrorMessage('');
    setSelectedTime('');
    try {
      const data = await api.getAvailableSlots(dateStr);
      setSlotsData(data);
    } catch {
      setErrorMessage('Could not load slots for this date. Please try another.');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchSlots(newDate);
  };

  const handleNextToDetails = () => {
    if (!selectedServiceId) {
      setErrorMessage('Please choose a service/concern.');
      return;
    }
    if (!selectedDate) {
      setErrorMessage('Please select an appointment date.');
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Please pick an available time slot.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setSubmitting(true);
    try {
      const result = await api.createAppointment({
        patientName: patientName.trim(),
        phone: cleanPhone,
        email: email.trim(),
        serviceId: selectedServiceId,
        date: selectedDate,
        time: selectedTime,
        notes: notes.trim()
      });

      setConfirmedBooking(result.appointment);
      if (onAppointmentBooked) {
        onAppointmentBooked(result.appointment);
      }
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to complete appointment request. Please choose another slot.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = services.find((s) => s.id === selectedServiceId);

  // Generate .ics calendar download
  const downloadCalendarEvent = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-').map(Number);
    // Parse time like "11:00 AM" or "04:30 PM"
    const isPM = confirmedBooking.time.includes('PM');
    const [timePart] = confirmedBooking.time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    const pad = (n: number) => String(n).padStart(2, '0');
    const formatDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mohan Skin & Hair Clinic//Appointment System//EN
BEGIN:VEVENT
UID:${confirmedBooking.id}@mohanskinhair.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Mohan Skin & Hair Clinic: ${confirmedBooking.serviceName}
DESCRIPTION:Appointment Request ${confirmedBooking.id} for ${confirmedBooking.patientName}. Clinic Location: Kalidasa Road, above Bank of Baroda, Vijayanagar 1st Stage, Mysuru. Phone: ${clinicInfo.phone}
LOCATION:Kalidasa Road, Vijayanagar 1st Stage, Mysuru, Karnataka 570017
STATUS:TENTATIVE
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Appointment-${confirmedBooking.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  // Minimum date today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F5] border border-[#E6E4DC] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-[#E6E4DC] bg-[#F7F5EE] flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#2A5E50]">
              Mohan Skin & Hair Clinic · Mysuru
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#141F1A]">
              {step === 4 ? 'Appointment Request Received' : 'Schedule Consultation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#55635D] hover:text-[#141F1A] rounded-md transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-[#FAF9F5] border-b border-[#EBE8DE] flex items-center justify-between text-xs text-[#52605A] shrink-0">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'font-semibold text-[#2A5E50]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-[#2A5E50] text-white' : 'bg-[#E5E2D6] text-[#24302A]'}`}>1</span>
              <span>Select Service</span>
            </div>
            <span className="text-[#C4C0B4]">→</span>
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'font-semibold text-[#2A5E50]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-[#2A5E50] text-white' : 'bg-[#E5E2D6] text-[#24302A]'}`}>2</span>
              <span>Date & Slot</span>
            </div>
            <span className="text-[#C4C0B4]">→</span>
            <div className={`flex items-center gap-1.5 ${step === 3 ? 'font-semibold text-[#2A5E50]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-[#2A5E50] text-white' : 'bg-[#E5E2D6] text-[#24302A]'}`}>3</span>
              <span>Patient Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div>
              <p className="text-xs sm:text-sm text-[#46534E] mb-4">
                Please select the primary concern or dermatological service you would like to consult the doctor for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {services.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#2A5E50] bg-[#EAF2EE] shadow-xs'
                          : 'border-[#E6E4DC] bg-white hover:border-[#B8C9C1]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-[#55635D] font-medium">{service.category}</span>
                        <span className="text-[11px] text-[#7A8782]">{service.duration}</span>
                      </div>
                      <h4 className="font-serif text-base text-[#141F1A] font-semibold">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#52605A] mt-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-3 border-t border-[#E6E4DC]">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage('');
                    setStep(2);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date Picker & Slot Picker */}
          {step === 2 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mb-6">
                {/* Date Selection */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-[#141F1A] mb-2 uppercase tracking-wider">
                    Select Appointment Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50] text-[#141F1A] font-medium"
                    />
                  </div>
                  <div className="mt-3 p-3 rounded bg-[#F4F2EB] border border-[#E6E4DC] text-[11.5px] text-[#596660] space-y-1">
                    <p className="font-medium text-[#141F1A]">Clinic Schedule:</p>
                    <p>Mon – Sat: Morning & Evening sessions</p>
                    <p className="text-rose-700">Sunday: Closed for routine appointments</p>
                  </div>
                </div>

                {/* Slot Selection */}
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-[#141F1A] mb-2 uppercase tracking-wider">
                    Available Time Slots *
                  </label>

                  {loadingSlots ? (
                    <div className="py-8 text-center text-xs text-[#52605A]">
                      Checking doctor's consultation slots...
                    </div>
                  ) : slotsData && !slotsData.available ? (
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      {slotsData.reason || 'The clinic is closed on this day. Please select a Monday to Saturday date.'}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Morning slots */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#2A5E50] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>Morning (10:30 AM – 01:30 PM)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {slotsData?.morningSlots.map((slot) => {
                            const isSelected = selectedTime === slot.time;
                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-2 px-1 text-xs font-medium rounded text-center transition-all ${
                                  !slot.available
                                    ? 'bg-[#EAE8E0]/60 text-[#A0AAA4] cursor-not-allowed line-through'
                                    : isSelected
                                    ? 'bg-[#2A5E50] text-white shadow-xs font-semibold ring-2 ring-[#2A5E50]/30'
                                    : 'bg-white border border-[#DCD9CE] text-[#141F1A] hover:border-[#2A5E50]'
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Evening slots */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#2A5E50] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>Evening (04:30 PM – 08:30 PM)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {slotsData?.eveningSlots.map((slot) => {
                            const isSelected = selectedTime === slot.time;
                            return (
                              <button
                                key={slot.time}
                                type="button"
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-2 px-1 text-xs font-medium rounded text-center transition-all ${
                                  !slot.available
                                    ? 'bg-[#EAE8E0]/60 text-[#A0AAA4] cursor-not-allowed line-through'
                                    : isSelected
                                    ? 'bg-[#2A5E50] text-white shadow-xs font-semibold ring-2 ring-[#2A5E50]/30'
                                    : 'bg-white border border-[#DCD9CE] text-[#141F1A] hover:border-[#2A5E50]'
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Slot legend */}
                      <div className="pt-2 flex items-center gap-4 text-[11px] text-[#63726C]">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#DCD9CE]" /> Available
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2A5E50]" /> Selected
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EAE8E0]" /> Reserved
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E6E4DC]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-[#4A5550] hover:text-[#141F1A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextToDetails}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded flex items-center gap-1.5 shadow-xs"
                >
                  <span>Patient Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking}>
              <div className="mb-4 p-3 rounded-lg bg-[#F4F2EB] border border-[#E6E4DC] text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[#64726C]">Service:</span>{' '}
                  <span className="font-semibold text-[#141F1A]">{selectedService?.name}</span>
                </div>
                <div>
                  <span className="text-[#64726C]">Date & Slot:</span>{' '}
                  <span className="font-semibold text-[#141F1A]">{selectedDate} at {selectedTime}</span>
                </div>
              </div>

              <div className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-xs font-medium text-[#24302A] mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-[#88948E]" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Ramesh Hegde"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Mobile Number (for Confirmation) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-2.5 text-[#88948E]" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98450 12345"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#24302A] mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#88948E]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#24302A] mb-1">
                    Specific Concerns or Notes (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-2.5 text-[#88948E]" />
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Itchy rash on neck since 2 weeks, or previous treatments taken..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#D5D2C7] bg-white focus:outline-none focus:border-[#2A5E50]"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Notice */}
              <div className="p-3 rounded bg-[#FAF7EE] border border-[#E8E4D8] mb-6 text-[11px] text-[#697771]">
                <strong>Notice:</strong> Submitting this request reserves your preferred time. The clinic reception will contact you to confirm and provide arrival instructions.
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E6E4DC]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-medium text-[#4A5550] hover:text-[#141F1A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {submitting ? 'Submitting Request...' : 'Confirm Appointment Request'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmation Screen */}
          {step === 4 && confirmedBooking && (
            <div className="py-2 text-center">
              <div className="w-14 h-14 rounded-full bg-[#EAF2EE] text-[#2A5E50] flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl text-[#141F1A] mb-1">
                Appointment Request Received
              </h4>
              <p className="text-xs sm:text-sm text-[#46534E] max-w-md mx-auto mb-6">
                We've received your appointment request. The clinic staff will confirm your selected slot shortly via phone call or WhatsApp message.
              </p>

              {/* Booking Reference Card */}
              <div className="bg-[#F7F5EE] border border-[#E6E4DC] rounded-lg p-5 max-w-md mx-auto text-left mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DC] mb-3">
                  <span className="text-xs text-[#606E67]">Booking Reference:</span>
                  <span className="font-mono text-sm font-bold text-[#2A5E50] tracking-wider">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#606E67]">Patient Name:</span>
                    <span className="font-medium text-[#141F1A]">{confirmedBooking.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#606E67]">Phone:</span>
                    <span className="font-medium text-[#141F1A]">{confirmedBooking.phone}</span>
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
                    <span className="text-[#606E67]">Status:</span>
                    <span className="font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
                      Pending Clinic Confirmation
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <button
                  onClick={downloadCalendarEvent}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#141F1A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded"
                >
                  <Download className="w-3.5 h-3.5 text-[#2A5E50]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello Mohan Skin & Hair Clinic, I submitted an appointment request (Ref: ${confirmedBooking.id}) for ${confirmedBooking.serviceName} on ${confirmedBooking.date} at ${confirmedBooking.time}. Please confirm my slot.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2A5E50] hover:bg-[#1E453B] rounded shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message on WhatsApp</span>
                </a>

                <a
                  href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#141F1A] bg-[#EAE7DC] hover:bg-[#E0DDD0] rounded"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#2A5E50]" />
                  <span>Call Clinic Reception</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E6E4DC]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A5550] hover:text-[#141F1A]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
