"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What is the dress code and official color code?",
    a: "The official color code is Mustard Gold & Forest Green. Guests are warmly invited to wear either formal traditional attire (aso-oke, lace, agbada) or western formal attire (suits, elegant gowns).",
  },
  {
    q: "When is the RSVP deadline?",
    a: "Kindly RSVP on or before Sunday, 25th October 2026. This allows us to finalize banquet seating, catering, and personalized guest favors.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Due to limited banquet hall seating, we can only accommodate guests formally included on your invitation. If your invitation specifies a plus-one or family count, you can confirm their details during RSVP.",
  },
  {
    q: "What are the venue details and parking facilities?",
    a: "The White Wedding takes place at RCCG Redemption Parish (13 Habitation of Hope Street, Near Turaya Guest House, Mowe) at 10:00 AM prompt. The Reception follows immediately at 18/12 Castro Hall (10 Ibukun Oluwa Street, Asolo Bus Stop, Mowe). Both locations feature dedicated, secure parking with security personnel.",
  },
  {
    q: "How can I bless the couple with a gift?",
    a: "Your presence and prayers are our greatest blessings. If you wish to give a gift, we have provided direct bank transfer details under 'Our Home & Future Fund' as well as a curated Physical Gift Registry where items can be reserved.",
  },
  {
    q: "Who can I reach out to if I need travel or accommodation help?",
    a: "Please feel free to contact our RSVP and hospitality coordinators anytime at 0813 676 9807 or 0907 724 9194.",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Questions &amp; Details
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Frequently Asked Questions
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <HelpCircle className="w-4 h-4 text-gold" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="card-luxury rounded-2xl border border-gold/40 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-forest-deep">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/80 leading-relaxed border-t border-gold/20 animate-in fade-in duration-200">
                    {faq.a}
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
