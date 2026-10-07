import React from 'react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="pt-24 pb-20 bg-[#FAF9F5]">
      {/* Top Banner */}
      <div className="border-b border-[#E6E4DC] bg-[#F7F5EE] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2A5E50] hover:text-[#1E453B] mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="text-xs font-semibold uppercase tracking-widest text-[#707E78] mb-1">
            MOHAN SKIN & HAIR CLINIC · MYSURU
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#141F1A] tracking-[-0.01em]">
            {isPrivacy ? 'Patient Privacy Policy' : 'Terms of Clinical Care'}
          </h1>
          <p className="text-xs sm:text-sm text-[#52605A] mt-2">
            Last updated: October 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none text-[#3E4A44] space-y-6 text-sm sm:text-base leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">1. Confidentiality of Patient Health Information</h2>
                <p>
                  At Mohan Skin & Hair Clinic, patient confidentiality is our highest ethical obligation. All information provided during online appointment requests or during in-person clinical consultations in Vijayanagar, Mysuru is securely handled and accessible only by authorized clinic staff.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">2. Information We Collect</h2>
                <p>
                  When you submit an appointment request, we collect your full name, contact phone number, email address, preferred appointment date, preferred time slot, and any voluntary medical notes you share regarding your skin or hair concern.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">3. Purpose of Collection</h2>
                <p>
                  This information is used strictly to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Schedule and manage your consultation with the doctor.</li>
                  <li>Send appointment confirmation or rescheduling notices via phone or WhatsApp.</li>
                  <li>Maintain accurate internal clinic records for continuity of dermatological care.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">4. Third-Party Sharing</h2>
                <p>
                  We do not sell, rent, or disclose patient contact information or clinical details to third-party marketing companies.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">1. Appointment Requests & Confirmations</h2>
                <p>
                  Submission of an appointment request via our website reserves a tentative slot. Final confirmation is made by clinic reception based on the doctor's consultation schedule. Patients are encouraged to arrive 10 minutes prior to their scheduled slot.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">2. Medical Disclaimer</h2>
                <div className="p-4 rounded bg-[#F4F2EB] border border-[#E6E4DC] text-xs sm:text-sm text-[#46534D]">
                  Information provided on this website is for general informational and educational purposes only and does not constitute formal medical diagnosis, prognosis, or therapeutic prescription. Diagnostic opinions and individual treatments are established strictly after personal physical examination by the doctor.
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">3. Rescheduling & Cancellations</h2>
                <p>
                  If you are unable to attend your appointment at Mohan Skin & Hair Clinic on Kalidasa Road, Vijayanagar, Mysuru, please notify our front desk at least 2 hours in advance via phone or WhatsApp so the slot may be offered to waiting patients.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-semibold text-[#141F1A] mb-2">4. Ethical Practice & No Outcome Guarantees</h2>
                <p>
                  Dermatological and trichological outcomes vary based on individual genetic, physiological, and lifestyle factors. In accordance with medical ethics, Mohan Skin & Hair Clinic does not make unverified claims or guarantee 100% cure rates.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
