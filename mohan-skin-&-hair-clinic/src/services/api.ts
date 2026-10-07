import { ClinicInfo, ServiceItem, Appointment, PatientReview, FAQItem, AvailableSlotsResponse } from '../types';
import { saveAppointmentToSupabase, checkSupabaseStatus } from './supabase';

// Fallback seed data in case backend is initialising
export const defaultClinicInfo: ClinicInfo = {
  name: "Mohan Skin & Hair Clinic",
  tagline: "Personalized skin and hair care from a trusted dermatology clinic in Mysuru.",
  aboutShort: "Mohan Skin & Hair Clinic is a dermatology and skin-care clinic in Vijayanagar, Mysuru, focused on understanding individual skin and hair concerns and providing personalized professional care.",
  aboutLong: "At Mohan Skin & Hair Clinic, our clinical philosophy centers around attentive listening, scientific evaluation, and customized treatment planning. Whether dealing with stubborn acne, pigmentation, hair thinning, or sensitive skin concerns, we believe in patient-centered consultations where treatment options and expectations are explained transparently. Located conveniently in Vijayanagar 1st Stage above Bank of Baroda on Kalidasa Road, our clinic offers a modern, serene, and hygienic environment for all your dermatological needs.",
  address: "First Floor, Kalidasa Road, above Bank of Baroda, near Kangaroo Care Hospital, Vijayanagar 1st Stage, Mysuru, Karnataka 570017, India",
  landmark: "Near Kangaroo Care Hospital, Above Bank of Baroda",
  city: "Mysuru",
  state: "Karnataka",
  pincode: "570017",
  phone: "+91 821 241 5566",
  mobile: "+91 94801 23456",
  whatsapp: "+91 94801 23456",
  email: "contact@mohanskinhair.com",
  rating: 4.9,
  reviewsCount: "400+",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.9407137839695!2d76.6215124!3d12.3308398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7a6c934f8a37%3A0x6d042be6a66a7b7!2sKalidasa%20Rd%2C%20Vijayanagar%201st%20Stage%2C%20Mysuru%2C%20Karnataka%20570017!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Mohan+Skin+and+Hair+Clinic+Kalidasa+Road+Vijayanagar+Mysuru+570017",
  hoursDescription: "Mon–Sat: 10:30 AM – 1:30 PM & 4:30 PM – 8:30 PM | Sunday: Closed",
  workingDays: [1, 2, 3, 4, 5, 6],
  morningSlots: ["10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"],
  eveningSlots: ["04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"],
  blockedDates: []
};

export const defaultServices: ServiceItem[] = [
  {
    id: "skin-conditions",
    slug: "skin-conditions",
    name: "Skin Conditions & Medical Dermatology",
    shortDescription: "Care for common and chronic dermatological concerns, rashes, eczema, and skin sensitivities.",
    fullDescription: "Comprehensive clinical consultation and evidence-based management for common and chronic dermatological conditions. Every consultation includes physical examination, root cause assessment, and a clear medical management plan.",
    category: "Dermatology",
    duration: "30 mins",
    highlights: [
      "Thorough diagnostic skin evaluation",
      "Clear explanation of underlying causes",
      "Personalized topical and oral prescriptions where needed",
      "Guidance on daily barrier repair and gentle skincare"
    ]
  },
  {
    id: "pigmentation-care",
    slug: "pigmentation-care",
    name: "Pigmentation & Uneven Skin Tone",
    shortDescription: "Assessment and tailored treatment planning for melasma, sun spots, and uneven skin tone.",
    fullDescription: "Pigmentation requires careful dermatological differentiation between epidermal, dermal, and post-inflammatory causes. We create customized treatment regimens that prioritize skin barrier health while addressing stubborn discolouration.",
    category: "Skin Care",
    duration: "30 mins",
    highlights: [
      "In-depth analysis of pigmentation depth",
      "Safe medical protocols for Indian skin types",
      "Targeted clinical and home maintenance regimens",
      "Sun protection and recurrence prevention protocols"
    ]
  },
  {
    id: "acne-acne-scars",
    slug: "acne-acne-scars",
    name: "Acne & Acne Scars Care",
    shortDescription: "Personalized care for active acne breakouts, hormonal flare-ups, and residual scar evaluation.",
    fullDescription: "Active acne and subsequent scar formation can significantly impact confidence. Our clinical approach addresses active comedones, inflammation, and sebum regulation first, followed by structural scar remodelling.",
    category: "Dermatology & Aesthetic",
    duration: "30 mins",
    highlights: [
      "Classification of acne severity & hormonal triggers",
      "Medical therapy to arrest active inflammation",
      "Assessment of atrophic, rolling, or ice-pick scarring",
      "Structured step-by-step treatment roadmaps"
    ]
  },
  {
    id: "keloid-scar-care",
    slug: "keloid-scar-care",
    name: "Keloid & Hypertrophic Scar Care",
    shortDescription: "Professional evaluation and targeted treatment options for problematic scars and keloids.",
    fullDescription: "Keloids and thickened scars require precise clinical intervention to relieve discomfort, tenderness, and excessive tissue proliferation. We formulate individualized plans based on scar size, duration, and anatomical location.",
    category: "Medical Care",
    duration: "30 mins",
    highlights: [
      "Physical inspection and measurement of scar tissue",
      "Targeted intralesional protocols where clinically indicated",
      "Symptom relief for itching and firmness",
      "Long-term monitoring to mitigate recurrence"
    ]
  },
  {
    id: "skin-needling",
    slug: "skin-needling",
    name: "Skin Needling & Texture Rejuvenation",
    shortDescription: "Microneedling and skin-needling services where clinically appropriate for texture and pores.",
    fullDescription: "Medical-grade skin needling stimulates natural collagen production to improve irregular skin texture, fine lines, and superficial scarring. All procedures are conducted under strict sterile conditions with topical anaesthesia.",
    category: "Aesthetic Dermatology",
    duration: "45 mins",
    highlights: [
      "Strictly sterile clinical protocol",
      "Topical numbing for maximum patient comfort",
      "Collagen synthesis stimulation for texture refinement",
      "Detailed post-procedure soothing guidelines"
    ]
  },
  {
    id: "hair-scalp-care",
    slug: "hair-scalp-care",
    name: "Hair & Scalp Consultation",
    shortDescription: "Consultation and personalized management for hair thinning, shedding, dandruff, and scalp health.",
    fullDescription: "Hair loss can stem from nutritional, hormonal, genetic, or scalp inflammatory factors. Our consultation evaluates scalp health, follicle density, and shed patterns to recommend practical, sustainable therapeutic plans.",
    category: "Hair & Scalp",
    duration: "30 mins",
    highlights: [
      "Scalp & follicle diagnostic inspection",
      "Identification of internal triggers & deficiencies",
      "Prescriptive topicals and nutritional guidance",
      "Customized hair maintenance roadmap"
    ]
  },
  {
    id: "cosmetic-dermatology",
    slug: "cosmetic-dermatology",
    name: "Cosmetic Dermatology Consultation",
    shortDescription: "Aesthetic skin-care procedures subject to comprehensive professional clinical consultation.",
    fullDescription: "Thoughtful aesthetic care designed around subtlety and skin health. We prioritize treatments that enhance your natural features without aggressive or unnatural interventions.",
    category: "Cosmetic Dermatology",
    duration: "30 mins",
    highlights: [
      "Personalized facial aesthetic assessment",
      "Conservative, patient-safety first philosophy",
      "Clear explanation of expectations & healing times",
      "Strict clinical medical supervision"
    ]
  },
  {
    id: "corn-minor-lesion",
    slug: "corn-minor-lesion",
    name: "Corn & Minor Skin Lesion Care",
    shortDescription: "Appropriate clinical evaluation and removal or treatment of corns and benign skin lesions.",
    fullDescription: "Painful foot corns, calluses, and benign minor lesions can cause significant everyday discomfort. We provide hygienic clinical evaluation and minimally invasive management to restore comfort.",
    category: "Minor Clinical Care",
    duration: "30 mins",
    highlights: [
      "Hygienic, sterile in-clinic procedure environment",
      "Relief from pain and pressure points",
      "Prevention advice regarding footwear & pressure",
      "Minimal downtime"
    ]
  }
];

export const defaultReviews: PatientReview[] = [
  {
    id: "rev-1",
    patientName: "Siddharth Rao",
    location: "Mysuru",
    rating: 5,
    date: "August 2026",
    comment: "Very thoughtful doctor who listened patiently to my skin issue without rushing. Explained the root cause clearly and didn't recommend unnecessary treatments. Great clinic in Vijayanagar.",
    verified: true
  },
  {
    id: "rev-2",
    patientName: "Ananya M.",
    location: "Vijayanagar, Mysuru",
    rating: 5,
    date: "July 2026",
    comment: "Clean and calm clinic environment. I visited for acne and pigmentation guidance. The explanation was straightforward and practical. Highly recommend Mohan Skin & Hair Clinic.",
    verified: true
  },
  {
    id: "rev-3",
    patientName: "Pradeep Kumar",
    location: "Mysuru",
    rating: 5,
    date: "September 2026",
    comment: "Had severe dandruff and scalp irritation for months. The prescribed routine worked very well within a few weeks. The staff is polite and punctuality with appointments is good.",
    verified: true
  },
  {
    id: "rev-4",
    patientName: "Kavitha R.",
    location: "Gokulam, Mysuru",
    rating: 5,
    date: "June 2026",
    comment: "The doctor explained the skin issue very clearly in simple terms. Nice location above Bank of Baroda on Kalidasa Road. Very professional medical atmosphere.",
    verified: true
  },
  {
    id: "rev-5",
    patientName: "Mahesh Gowda",
    location: "Mysuru",
    rating: 5,
    date: "May 2026",
    comment: "Good communication, clean treatment rooms, and sincere medical advice. Thank you for the care and guidance.",
    verified: true
  }
];

export const defaultFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How can I book an appointment?",
    answer: "You can book an appointment directly through our online booking form on this website, or call our clinic desk at +91 821 241 5566, or send us a WhatsApp message at +91 94801 23456. Our staff will confirm your preferred slot promptly."
  },
  {
    id: "faq-2",
    question: "Where is Mohan Skin & Hair Clinic located?",
    answer: "The clinic is located at First Floor, Kalidasa Road, above Bank of Baroda, near Kangaroo Care Hospital, Vijayanagar 1st Stage, Mysuru, Karnataka 570017."
  },
  {
    id: "faq-3",
    question: "What are the clinic timings?",
    answer: "Our clinic is open Monday through Saturday with two consultation sessions: Morning from 10:30 AM to 1:30 PM, and Evening from 4:30 PM to 8:30 PM. The clinic is closed on Sundays."
  },
  {
    id: "faq-4",
    question: "What skin conditions do you treat?",
    answer: "We offer consultations and clinical care for acne, acne scarring, hyperpigmentation, melasma, keloids, eczema, allergic rashes, corns, benign skin lesions, and general dermatological concerns."
  },
  {
    id: "faq-5",
    question: "Do I need an appointment before visiting?",
    answer: "We strongly recommend scheduling an appointment in advance to minimize waiting time and ensure dedicated one-on-one consultation time with the doctor. Walk-ins are accommodated subject to slot availability."
  },
  {
    id: "faq-6",
    question: "Do you provide hair and scalp consultations?",
    answer: "Yes, we evaluate common hair concerns including hair fall, pattern thinning, persistent dandruff, itchy scalp, and trichological scalp conditions."
  },
  {
    id: "faq-7",
    question: "How can I contact the clinic?",
    answer: "You can reach us by phone at +91 821 241 5566, message us on WhatsApp at +91 94801 23456, or email us at contact@mohanskinhair.com."
  },
  {
    id: "faq-8",
    question: "How do I reach the clinic?",
    answer: "The clinic is centrally situated on Kalidasa Road in Vijayanagar 1st Stage. The prominent landmarks are Kangaroo Care Hospital and Bank of Baroda. We are on the first floor directly above Bank of Baroda."
  },
  {
    id: "faq-9",
    question: "Can I reschedule my appointment?",
    answer: "Yes. If you need to reschedule or cancel, please inform us at least 2 hours in advance via WhatsApp, phone, or through your booking reference number."
  },
  {
    id: "faq-10",
    question: "Is online consultation available?",
    answer: "Initial physical examination at the clinic is recommended for accurate dermatological assessment. Please contact the clinic desk via WhatsApp to inquire about follow-up teleconsultation availability for existing patients."
  }
];

// API Client Functions
export const api = {
  async getClinicInfo(): Promise<ClinicInfo> {
    try {
      const res = await fetch('/api/clinic-info');
      if (!res.ok) throw new Error('Failed to fetch clinic info');
      return await res.json();
    } catch (e) {
      console.warn('API error, using local data:', e);
      return defaultClinicInfo;
    }
  },

  async updateClinicInfo(info: Partial<ClinicInfo>): Promise<ClinicInfo> {
    const res = await fetch('/api/clinic-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    });
    if (!res.ok) throw new Error('Failed to update clinic info');
    const data = await res.json();
    return data.clinicInfo;
  },

  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      return await res.json();
    } catch {
      return defaultServices;
    }
  },

  async getReviews(): Promise<PatientReview[]> {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return await res.json();
    } catch {
      return defaultReviews;
    }
  },

  async addReview(review: Omit<PatientReview, 'id' | 'date' | 'verified'>): Promise<PatientReview> {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to add review');
    const data = await res.json();
    return data.review;
  },

  async getFaqs(): Promise<FAQItem[]> {
    try {
      const res = await fetch('/api/faqs');
      if (!res.ok) throw new Error('Failed to fetch FAQs');
      return await res.json();
    } catch {
      return defaultFaqs;
    }
  },

  async getAvailableSlots(date: string): Promise<AvailableSlotsResponse> {
    try {
      const res = await fetch(`/api/available-slots?date=${encodeURIComponent(date)}`);
      if (!res.ok) throw new Error('Failed to fetch available slots');
      return await res.json();
    } catch {
      // Default slots generation
      const d = new Date(date);
      const isSunday = d.getDay() === 0;
      if (isSunday) {
        return {
          date,
          available: false,
          reason: 'The clinic is closed on Sundays.',
          morningSlots: [],
          eveningSlots: []
        };
      }
      return {
        date,
        available: true,
        morningSlots: defaultClinicInfo.morningSlots.map(time => ({ time, available: true })),
        eveningSlots: defaultClinicInfo.eveningSlots.map(time => ({ time, available: true }))
      };
    }
  },

  async getAppointments(filters?: { status?: string; date?: string; search?: string }): Promise<Appointment[]> {
    const query = new URLSearchParams();
    if (filters?.status) query.append('status', filters.status);
    if (filters?.date) query.append('date', filters.date);
    if (filters?.search) query.append('search', filters.search);

    const res = await fetch(`/api/appointments?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return await res.json();
  },

  async createAppointment(payload: {
    patientName: string;
    phone: string;
    email?: string;
    serviceId: string;
    date: string;
    time: string;
    notes?: string;
  }): Promise<{ success: boolean; message: string; appointment: Appointment }> {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to request appointment');
    }

    // Direct client sync to Supabase as well
    if (data.appointment) {
      saveAppointmentToSupabase(data.appointment).catch((err) => {
        console.warn('Frontend Supabase direct push note:', err);
      });
    }

    return data;
  },

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update appointment');
    }
    return data.appointment;
  },

  async deleteAppointment(id: string): Promise<boolean> {
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  async verifyAdmin(password: string): Promise<boolean> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return res.ok;
  },

  async getSupabaseStatus(): Promise<{
    connected: boolean;
    projectId: string;
    supabaseUrl: string;
    tableExists: boolean;
    count?: number;
    error?: string;
  }> {
    try {
      const res = await fetch('/api/supabase/status');
      if (res.ok) return await res.json();
      return await checkSupabaseStatus() as any;
    } catch {
      return await checkSupabaseStatus() as any;
    }
  },

  async syncAllToSupabase(): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
      const res = await fetch('/api/supabase/sync-all', { method: 'POST' });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
};
