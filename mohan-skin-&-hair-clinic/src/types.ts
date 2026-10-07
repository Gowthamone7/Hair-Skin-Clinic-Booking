export interface ClinicInfo {
  name: string;
  tagline: string;
  aboutShort: string;
  aboutLong: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  mobile: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviewsCount: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  hoursDescription: string;
  workingDays: number[];
  morningSlots: string[];
  eveningSlots: string[];
  blockedDates: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  duration: string;
  highlights: string[];
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PatientReview {
  id: string;
  patientName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SlotAvailability {
  time: string;
  available: boolean;
}

export interface AvailableSlotsResponse {
  date: string;
  available: boolean;
  reason?: string;
  morningSlots: SlotAvailability[];
  eveningSlots: SlotAvailability[];
}
