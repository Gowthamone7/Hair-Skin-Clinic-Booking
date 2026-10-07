import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Supabase Client
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://lshbwciivyhbildqyfcp.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_KmOLcIl3griN4E0neOhUhg_96qEu0ss';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Persistent Data File
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'clinic_data.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  clinicInfo: {
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
    workingDays: [1, 2, 3, 4, 5, 6], // Monday through Saturday
    morningSlots: ["10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"],
    eveningSlots: ["04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"],
    blockedDates: []
  },
  services: [
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
  ],
  reviews: [
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
  ],
  faqs: [
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
  ],
  appointments: [
    {
      id: "MSHC-2026-7841",
      patientName: "Vikram Shenoy",
      phone: "+91 98450 12984",
      email: "vikram.s@example.com",
      serviceId: "acne-acne-scars",
      serviceName: "Acne & Acne Scars Care",
      date: "2026-10-08",
      time: "11:00 AM",
      status: "CONFIRMED",
      notes: "Follow-up consultation regarding persistent acne breakouts on cheeks.",
      createdAt: "2026-10-06T10:15:00.000Z"
    },
    {
      id: "MSHC-2026-8912",
      patientName: "Deepa Nambiar",
      phone: "+91 97311 44520",
      email: "deepa.n@example.com",
      serviceId: "pigmentation-care",
      serviceName: "Pigmentation & Uneven Skin Tone",
      date: "2026-10-08",
      time: "05:30 PM",
      status: "CONFIRMED",
      notes: "First-time consultation for sun pigmentation and patchiness.",
      createdAt: "2026-10-06T14:30:00.000Z"
    },
    {
      id: "MSHC-2026-9043",
      patientName: "Ramesh Bhat",
      phone: "+91 94482 66319",
      email: "ramesh.bhat@example.com",
      serviceId: "hair-scalp-care",
      serviceName: "Hair & Scalp Consultation",
      date: "2026-10-09",
      time: "12:00 PM",
      status: "PENDING",
      notes: "Inquiring about diffuse hair thinning and dry scalp.",
      createdAt: "2026-10-07T08:00:00.000Z"
    },
    {
      id: "MSHC-2026-6215",
      patientName: "Pooja Hegde",
      phone: "+91 98860 33211",
      email: "pooja.h@example.com",
      serviceId: "skin-conditions",
      serviceName: "Skin Conditions & Medical Dermatology",
      date: "2026-10-07",
      time: "06:00 PM",
      status: "CONFIRMED",
      notes: "Patient reports itchy rash on forearm.",
      createdAt: "2026-10-05T11:20:00.000Z"
    }
  ]
};

// Load or initialize data
function getData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return initialData;
    }
  }
  saveData(initialData);
  return initialData;
}

function saveData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Ensure data exists on start
getData();

// API Endpoints
app.get('/api/clinic-info', (req, res) => {
  const data = getData();
  res.json(data.clinicInfo);
});

app.post('/api/clinic-info', (req, res) => {
  const data = getData();
  data.clinicInfo = { ...data.clinicInfo, ...req.body };
  saveData(data);
  res.json({ success: true, clinicInfo: data.clinicInfo });
});

app.get('/api/services', (req, res) => {
  const data = getData();
  res.json(data.services);
});

app.post('/api/services', (req, res) => {
  const data = getData();
  const newService = req.body;
  if (!newService.id) {
    newService.id = newService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    newService.slug = newService.id;
  }
  const index = data.services.findIndex((s: any) => s.id === newService.id);
  if (index >= 0) {
    data.services[index] = { ...data.services[index], ...newService };
  } else {
    data.services.push(newService);
  }
  saveData(data);
  res.json({ success: true, service: newService });
});

app.get('/api/reviews', (req, res) => {
  const data = getData();
  res.json(data.reviews);
});

app.post('/api/reviews', (req, res) => {
  const data = getData();
  const newReview = {
    id: `rev-${Date.now()}`,
    date: 'Just now',
    verified: true,
    ...req.body
  };
  data.reviews.unshift(newReview);
  saveData(data);
  res.json({ success: true, review: newReview });
});

app.get('/api/faqs', (req, res) => {
  const data = getData();
  res.json(data.faqs);
});

// Available slots for a given date
app.get('/api/available-slots', (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Date is required' });
  }

  const data = getData();
  const targetDate = new Date(date);
  const dayOfWeek = targetDate.getDay(); // 0 is Sunday

  // Check if Sunday or closed
  if (!data.clinicInfo.workingDays.includes(dayOfWeek)) {
    return res.json({
      date,
      available: false,
      reason: "The clinic is closed on this day.",
      morningSlots: [],
      eveningSlots: []
    });
  }

  // Check if date is blocked
  if (data.clinicInfo.blockedDates.includes(date)) {
    return res.json({
      date,
      available: false,
      reason: "This date is currently unavailable for bookings.",
      morningSlots: [],
      eveningSlots: []
    });
  }

  // Find booked slots on this date (PENDING or CONFIRMED)
  const bookedTimes = data.appointments
    .filter((a: any) => a.date === date && a.status !== 'CANCELLED')
    .map((a: any) => a.time);

  const morningSlots = data.clinicInfo.morningSlots.map((time: string) => ({
    time,
    available: !bookedTimes.includes(time)
  }));

  const eveningSlots = data.clinicInfo.eveningSlots.map((time: string) => ({
    time,
    available: !bookedTimes.includes(time)
  }));

  res.json({
    date,
    available: true,
    morningSlots,
    eveningSlots
  });
});

// Appointments API
app.get('/api/appointments', (req, res) => {
  const { status, date, search } = req.query;
  const data = getData();
  let list = [...data.appointments];

  if (status && typeof status === 'string' && status !== 'ALL') {
    list = list.filter((a: any) => a.status === status);
  }

  if (date && typeof date === 'string') {
    list = list.filter((a: any) => a.date === date);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter((a: any) =>
      a.patientName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.serviceName.toLowerCase().includes(q)
    );
  }

  // Sort by date and time descending
  list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json(list);
});

// Book appointment
app.post('/api/appointments', (req, res) => {
  const { patientName, phone, email, serviceId, date, time, notes } = req.body;

  // Validation
  if (!patientName || !phone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Please provide all required fields (Name, Phone, Service, Date, Time).' });
  }

  // Check phone format (basic Indian/intl phone check)
  const cleanPhone = phone.trim();
  if (cleanPhone.length < 9) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }

  const data = getData();

  // Double booking check:
  const conflict = data.appointments.find((a: any) =>
    a.date === date && a.time === time && a.status !== 'CANCELLED'
  );

  if (conflict) {
    return res.status(409).json({
      error: `The slot for ${time} on ${date} is already reserved. Please select another slot.`
    });
  }

  const service = data.services.find((s: any) => s.id === serviceId) || { name: 'General Consultation' };

  // Generate Booking ID: MSHC-YEAR-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  const bookingId = `MSHC-${currentYear}-${randomSuffix}`;

  const newAppointment = {
    id: bookingId,
    patientName: patientName.trim(),
    phone: cleanPhone,
    email: (email || '').trim(),
    serviceId,
    serviceName: service.name,
    date,
    time,
    status: 'PENDING',
    notes: (notes || '').trim(),
    createdAt: new Date().toISOString()
  };

  data.appointments.unshift(newAppointment);
  saveData(data);

  // Automatically save to Supabase backend
  Promise.resolve(
    supabase.from('appointments').insert([
      {
        id: bookingId,
        patient_name: newAppointment.patientName,
        phone: newAppointment.phone,
        email: newAppointment.email || null,
        service_id: newAppointment.serviceId,
        service_name: newAppointment.serviceName,
        date: newAppointment.date,
        time: newAppointment.time,
        status: newAppointment.status,
        notes: newAppointment.notes || null,
        created_at: newAppointment.createdAt
      }
    ]).select()
  ).then(({ error }: any) => {
    if (error) {
      console.warn('[Supabase Sync Notice]:', error.message);
    } else {
      console.log('[Supabase Sync Success]: Appointment saved to Supabase with ID', bookingId);
    }
  }).catch((err: any) => {
    console.warn('[Supabase Sync Error]:', err.message);
  });

  res.status(201).json({
    success: true,
    message: 'Appointment request received successfully.',
    appointment: newAppointment
  });
});

// Update appointment status / reschedule / notes
app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const data = getData();

  const index = data.appointments.findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  // If rescheduling, check for conflicts
  if (updates.date && updates.time) {
    const conflict = data.appointments.find((a: any) =>
      a.id !== id && a.date === updates.date && a.time === updates.time && a.status !== 'CANCELLED'
    );
    if (conflict) {
      return res.status(409).json({ error: `The slot for ${updates.time} on ${updates.date} is already reserved.` });
    }
  }

  data.appointments[index] = {
    ...data.appointments[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveData(data);

  // Sync update to Supabase
  const sbUpdates: any = { updated_at: new Date().toISOString() };
  if (updates.status) sbUpdates.status = updates.status;
  if (updates.date) sbUpdates.date = updates.date;
  if (updates.time) sbUpdates.time = updates.time;
  if (updates.notes !== undefined) sbUpdates.notes = updates.notes;

  Promise.resolve(supabase.from('appointments').update(sbUpdates).eq('id', id)).catch(() => {});

  res.json({ success: true, appointment: data.appointments[index] });
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const data = getData();
  const index = data.appointments.findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  data.appointments.splice(index, 1);
  saveData(data);

  // Delete from Supabase
  Promise.resolve(supabase.from('appointments').delete().eq('id', id)).catch(() => {});

  res.json({ success: true });
});

// Supabase Status & Sync Endpoints
app.get('/api/supabase/status', async (req, res) => {
  try {
    const { data, error } = await supabase.from('appointments').select('id').limit(1);
    if (error) {
      const tableMissing = error.code === 'PGRST205' || error.message.includes('Could not find the table');
      return res.json({
        connected: true,
        projectId: 'lshbwciivyhbildqyfcp',
        supabaseUrl: SUPABASE_URL,
        tableExists: !tableMissing,
        error: error.message
      });
    }
    const { count } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    return res.json({
      connected: true,
      projectId: 'lshbwciivyhbildqyfcp',
      supabaseUrl: SUPABASE_URL,
      tableExists: true,
      count: count ?? (data?.length || 0)
    });
  } catch (err: any) {
    return res.json({
      connected: false,
      projectId: 'lshbwciivyhbildqyfcp',
      supabaseUrl: SUPABASE_URL,
      tableExists: false,
      error: err.message
    });
  }
});

app.post('/api/supabase/sync-all', async (req, res) => {
  try {
    const data = getData();
    const records = data.appointments.map((a: any) => ({
      id: a.id,
      patient_name: a.patientName,
      phone: a.phone,
      email: a.email || null,
      service_id: a.serviceId,
      service_name: a.serviceName,
      date: a.date,
      time: a.time,
      status: a.status,
      notes: a.notes || null,
      created_at: a.createdAt
    }));

    const { data: inserted, error } = await supabase.from('appointments').upsert(records, { onConflict: 'id' }).select();
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.json({ success: true, count: records.length, data: inserted });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Auth endpoint
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Default clinic PIN / password
  if (password === 'clinic2026' || password === 'admin') {
    return res.json({ success: true, token: 'mshc-authorized-session' });
  }
  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clinic server running at http://localhost:${PORT}`);
  });
}

startServer();
