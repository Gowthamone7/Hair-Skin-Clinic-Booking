import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F4F2EB] border-t border-[#E6E4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#2A5E50]">
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
            <span>COMMONLY ASKED QUESTIONS</span>
            <span className="w-5 h-[1.5px] bg-[#2A5E50]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#141F1A] leading-tight tracking-[-0.01em]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#52605A] mt-2 max-w-xl mx-auto">
            Practical details regarding clinic timings, appointments, reaching our Vijayanagar clinic, and dermatological consultations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="rounded-lg border border-[#E6E4DC] bg-[#FAF9F5] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:bg-[#F0EEE6]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#141F1A] font-medium leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2A5E50] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-[#46534D] leading-relaxed border-t border-[#F0EFEB]/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
