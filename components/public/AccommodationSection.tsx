"use client";

import React, { useState } from "react";
import { BedDouble, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const AccommodationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    checkInDate: "2026-11-18",
    checkOutDate: "2026-11-20",
    roomRequirement: "Standard Double Room",
    specialRequirements: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/accommodation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit accommodation request");

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting your request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="accommodation" className="py-16 sm:py-24 px-4 sm:px-6 bg-ivory relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Travel &middot; Stay in Mowe
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Guest Accommodation
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <BedDouble className="w-4 h-4 text-gold" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
          <p className="font-sans text-charcoal/80 text-sm sm:text-base max-w-xl mx-auto">
            For our valued guests traveling from outside Lagos or Ogun State, or those wanting to arrive early for the Engagement on Wednesday 18th November, we are pleased to assist with hotel reservations.
          </p>
        </div>

        {submitted ? (
          <div className="card-luxury p-8 sm:p-12 rounded-3xl text-center border-2 border-gold shadow-xl max-w-xl mx-auto animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-forest/10 border-2 border-gold flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep mb-2">
              Request Received!
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Thank you, <strong>{formData.guestName}</strong>. Our guest hospitality team has received your accommodation requirements ({formData.numberOfPeople} guest{formData.numberOfPeople > 1 ? "s" : ""}, check-in {formData.checkInDate}) and will contact you directly via WhatsApp.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info Column */}
            <div className="lg:col-span-5 card-luxury p-6 sm:p-8 rounded-3xl border border-gold/40 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep">Turaya &amp; Mowe Area</h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed mt-1">
                    Partner hotels and executive suites are conveniently located along the Lagos-Ibadan expressway corridor, within 5-10 minutes of both RCCG Redemption Parish and Castro Hall.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF4E6] border border-gold/30 rounded-2xl text-xs space-y-2 text-forest-deep">
                <p className="font-semibold text-gold uppercase tracking-wider">
                  Recommended Arrival
                </p>
                <p>
                  We encourage guests attending the Traditional Engagement to arrive on or before <strong>Wednesday, 18th November 2026</strong> by 2:00 PM.
                </p>
              </div>

              <div className="pt-2 text-xs text-charcoal/60">
                Hospitality Coordinator: <strong>0813 676 9807</strong> &middot; <strong>0907 724 9194</strong>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 card-luxury p-6 sm:p-8 rounded-3xl border border-gold/60 shadow-lg">
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="accName" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Lead Guest Name *
                  </label>
                  <input
                    id="accName"
                    required
                    type="text"
                    placeholder="e.g. Deaconess Funke Balogun"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="accEmail" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="accEmail"
                      required
                      type="email"
                      placeholder="e.g. funke@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                  <div>
                    <label htmlFor="accPhone" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                      Phone (WhatsApp) *
                    </label>
                    <input
                      id="accPhone"
                      required
                      type="tel"
                      placeholder="e.g. 0802 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="accGuests" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                      Number of People *
                    </label>
                    <select
                      id="accGuests"
                      value={formData.numberOfPeople}
                      onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value, 10) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="checkIn" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                      Check-in Date *
                    </label>
                    <input
                      id="checkIn"
                      required
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                      Check-out Date *
                    </label>
                    <input
                      id="checkOut"
                      required
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="roomType" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Room Preference
                  </label>
                  <select
                    id="roomType"
                    value={formData.roomRequirement}
                    onChange={(e) => setFormData({ ...formData, roomRequirement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Single Executive Room">Single Executive Room (1 Bed)</option>
                    <option value="Standard Double Room">Standard Double Room (King Bed)</option>
                    <option value="Twin Bed Room">Twin Bed Room (2 Separate Beds)</option>
                    <option value="Family Suite">Family Suite</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialReq" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Special Requirements or Questions
                  </label>
                  <textarea
                    id="specialReq"
                    rows={2}
                    placeholder="e.g. Ground floor preferred, airport pickup assistance, etc."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full">
                    Submit Accommodation Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
