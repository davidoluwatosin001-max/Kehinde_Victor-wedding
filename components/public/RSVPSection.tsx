"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Search, Heart, Calendar, MapPin, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RSVPStatus, Guest, RSVP } from "@/types";
import { generateGoogleCalendarUrl, generateICSContent } from "@/lib/utils";

const NIGERIAN_STATES = [
  "Lagos",
  "Ogun",
  "Oyo",
  "Osun",
  "Ondo",
  "Ekiti",
  "FCT - Abuja",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Nasarawa",
  "Niger",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Outside Nigeria / International",
];

interface RSVPSectionProps {
  initialCode?: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ initialCode = "" }) => {
  const [code, setCode] = useState(initialCode);
  const [guestLookup, setGuestLookup] = useState<Guest | null>(null);
  const [isSearchingCode, setIsSearchingCode] = useState(false);
  const [lookupMessage, setLookupMessage] = useState("");

  const [confirmedRSVP, setConfirmedRSVP] = useState<RSVP | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    attendingState: "Lagos",
    attendingCity: "",
    status: "Confirmed" as RSVPStatus,
    guestCount: 1,
    attendingEvents: "All Events (Engagement (Wed 18 Nov, 4pm) & White Wedding (Thu 19 Nov, 10am) / Reception)",
    attendees: [{ name: "", dietaryPreference: "" }],
    accommodationNeeded: false,
    dietaryRequirements: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check URL parameters for code on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get("code");
      if (codeParam) {
        setCode(codeParam);
        lookupInvitationCode(codeParam);
      }
    }
  }, []);

  const lookupInvitationCode = async (searchCode: string) => {
    if (!searchCode.trim()) return;
    setIsSearchingCode(true);
    setLookupMessage("");
    setErrorMessage("");

    try {
      const res = await fetch(`/api/rsvp/lookup?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();

      if (res.ok && data.guest) {
        setGuestLookup(data.guest);
        setFormData((prev) => ({
          ...prev,
          guestName: data.guest.name,
          email: data.guest.email || prev.email,
          phone: data.guest.phone || prev.phone,
          guestCount: Math.min(prev.guestCount, Math.min(data.guest.maxGuests, 2)) || 1,
          accommodationNeeded: data.guest.accommodationEligible ? prev.accommodationNeeded : false,
        }));
        setLookupMessage(`Invitation found for ${data.guest.name} (Max guests: ${Math.min(data.guest.maxGuests, 2)})`);
      } else {
        setGuestLookup(null);
        setLookupMessage("Invitation code not found. You can still RSVP with your details!");
      }
    } catch {
      setLookupMessage("Could not verify code. Please proceed with your name.");
    } finally {
      setIsSearchingCode(false);
    }
  };

  const handleGuestCountChange = (count: number) => {
    // Number of attending guests strictly not more than 2 people (me and 1 other guest)
    const validCount = Math.max(1, Math.min(count, 2));

    const updatedAttendees = [...formData.attendees];
    while (updatedAttendees.length < validCount) {
      updatedAttendees.push({ name: "", dietaryPreference: "" });
    }
    while (updatedAttendees.length > validCount) {
      updatedAttendees.pop();
    }

    setFormData((prev) => ({
      ...prev,
      guestCount: validCount,
      attendees: updatedAttendees,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          invitationCode: code.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || "Failed to submit RSVP. Please check your details.");
        setIsLoading(false);
        return;
      }

      setIsUpdate(result.isUpdate);
      setConfirmedRSVP(result.rsvp);
      if (result.rsvp?.invitationCode) {
        setCode(result.rsvp.invitationCode);
      }
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#AD802C", "#1E3B29", "#D8B45D", "#FAF4E6"],
      });
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadICS = () => {
    const icsData = generateICSContent({
      title: "Kehinde & Victor Wedding — Holy Matrimony & Reception",
      description: "Celebrating the union of Kehinde Elizabeth & Victor Oluwatosin. Color code: Mustard Gold & Forest Green.",
      location: "RCCG Redemption Parish & Castro Hall, Mowe, Ogun State",
      startDate: "2026-11-19T10:00:00+01:00",
      endDate: "2026-11-19T19:00:00+01:00",
    });

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Kehinde-and-Victor-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = generateGoogleCalendarUrl({
    title: "Kehinde & Victor Wedding",
    description: "Ayobamidele '26: Holy Matrimony & Reception",
    location: "RCCG Redemption Parish & Castro Hall, Mowe, Ogun State",
    startDate: "2026-11-19T10:00:00+01:00",
    endDate: "2026-11-19T19:00:00+01:00",
  });

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-ivory">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-forest/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            RSVP &middot; Ayobamidele '26
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Join Our Celebration
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <Heart className="w-4 h-4 text-gold fill-gold/40" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
          <p className="font-sans text-charcoal/80 text-sm sm:text-base max-w-xl mx-auto">
            Kindly confirm your attendance latest <span className="font-semibold text-forest">2nd November, 2026</span> so we can prepare an unforgettable experience for you.
          </p>
        </div>

        {submitted ? (
          <div className="card-luxury p-8 sm:p-12 rounded-3xl text-center relative border-2 border-gold shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-forest/10 border-2 border-gold flex items-center justify-center mx-auto mb-6 text-forest">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-forest-deep mb-2">
              {isUpdate ? "RSVP Updated!" : "Thank You For Confirming!"}
            </h3>
            <p className="font-sans text-base text-charcoal/80 max-w-md mx-auto mb-6">
              Dear <strong>{formData.guestName}</strong>, we have received your RSVP (
              <span className="font-semibold text-forest">{formData.status}</span>). We are truly blessed by your love and presence!
            </p>

            {/* Generated Unique Code Box */}
            {(confirmedRSVP?.invitationCode || code) && (
              <div className="bg-[#FAF4E6] border-2 border-gold/70 rounded-2xl p-5 mb-6 max-w-lg mx-auto shadow-sm">
                <span className="text-[11px] uppercase font-bold text-gold tracking-widest block mb-1">
                  Your Unique Guest Pass Code
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 my-2">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-forest tracking-wider bg-white px-4 py-1.5 rounded-xl border border-gold/40 shadow-inner">
                    {confirmedRSVP?.invitationCode || code}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(confirmedRSVP?.invitationCode || code);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest/90 transition-all shadow-sm active:scale-95 cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gold" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-charcoal/80 mt-1">
                  Please save or screenshot this unique pass code. It confirms your reserved seat and allows you to update your RSVP anytime!
                </p>
              </div>
            )}

            <div className="bg-[#FAF4E6] border border-gold/40 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto shadow-sm">
              <div className="mb-3 pb-3 border-b border-gold/25">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">
                  Attending Event(s)
                </span>
                <span className="font-serif font-bold text-forest-deep text-sm sm:text-base">
                  {formData.attendingEvents}
                </span>
              </div>
              {(formData.attendingCity || formData.attendingState) && (
                <div className="mb-3 pb-3 border-b border-gold/25">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">
                    Attending From
                  </span>
                  <span className="font-sans font-semibold text-forest-deep text-sm">
                    {[formData.attendingCity, formData.attendingState].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3 mb-3">
                <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-semibold text-forest-deep text-base">White Wedding &middot; Thur 19th Nov 2026</h4>
                  <p className="text-xs text-charcoal/70">10:00 AM Prompt &middot; RCCG Redemption Parish, Mowe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-semibold text-forest-deep text-base">Reception Follows Immediately</h4>
                  <p className="text-xs text-charcoal/70">18/12 Castro Hall, Ibukun Oluwa Street, Mowe</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={handleDownloadICS} variant="gold" size="md">
                Download Apple/Outlook Invite (.ics)
              </Button>
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 px-6 py-2.5 text-sm rounded-full min-h-[44px] border-1.5 border-gold bg-[#FAF4E6] text-forest-deep hover:bg-gold/15"
              >
                Add to Google Calendar
              </a>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs text-charcoal/60 hover:text-forest underline"
            >
              Need to modify your RSVP? Click here.
            </button>
          </div>
        ) : (
          <div className="card-luxury p-6 sm:p-10 rounded-3xl relative border border-gold/60 shadow-xl">
            {/* Invitation Code Verification Header */}
            <div className="mb-8 p-4 rounded-2xl bg-[#F5EEDB]/70 border border-gold/40">
              <label htmlFor="invitationCode" className="block text-xs font-semibold uppercase tracking-wider text-forest-deep mb-1.5">
                Have a Unique Invitation Code? (Optional)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="invitationCode"
                    type="text"
                    placeholder="e.g. KV-AB7K2"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold/50 bg-white/80 text-forest-deep placeholder:text-charcoal/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute right-3 top-3 pointer-events-none" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => lookupInvitationCode(code)}
                  isLoading={isSearchingCode}
                >
                  Verify Code
                </Button>
              </div>

              {lookupMessage && (
                <p className={`text-xs mt-2 flex items-center gap-1 font-medium ${guestLookup ? "text-forest" : "text-charcoal/70"}`}>
                  <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                  {lookupMessage}
                </p>
              )}
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Primary Guest Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guestName" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="guestName"
                    required
                    type="text"
                    placeholder="e.g. Adebayo Ogunlesi"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="e.g. adebayo@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="e.g. 0803 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    Will You Attend? *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Confirmed", "Maybe", "Declined"] as RSVPStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, status })}
                        className={`py-2.5 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                          formData.status === status
                            ? "bg-forest text-ivory border-forest shadow-sm"
                            : "bg-white/70 text-charcoal border-gold/40 hover:bg-gold/10"
                        }`}
                      >
                        {status === "Confirmed" ? "Yes! 🎉" : status === "Maybe" ? "Maybe 🤔" : "Regretfully No"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Where are you attending from: State and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="attendingState" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    Where Are You Attending From? (State) *
                  </label>
                  <select
                    id="attendingState"
                    required
                    value={formData.attendingState}
                    onChange={(e) => setFormData({ ...formData, attendingState: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest cursor-pointer"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="attendingCity" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                    City / Town *
                  </label>
                  <input
                    id="attendingCity"
                    required
                    type="text"
                    placeholder="e.g. Ikeja, Abeokuta, Mowe, London, etc."
                    value={formData.attendingCity}
                    onChange={(e) => setFormData({ ...formData, attendingCity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              </div>

              {formData.status !== "Declined" && (
                <>
                  {/* WHICH EVENT ARE YOU ATTENDING? */}
                  <div>
                    <label className="block text-xs font-semibold text-forest-deep uppercase tracking-wider mb-2">
                      Which Event Are You Attending? *
                    </label>
                    <div className="space-y-2.5">
                      {[
                        {
                          value: "Engagement (Wed 18 Nov, 4pm)",
                          title: "Engagement (Wed 18 Nov, 4pm)",
                          badge: "Wed 18 Nov · 4pm Prompt",
                        },
                        {
                          value: "White Wedding (Thu 19 Nov, 10am) / Reception 1:00pm",
                          title: "White Wedding (Thu 19 Nov, 10am) / Reception 1:00pm",
                          badge: "Thur 19 Nov · 10am Prompt",
                        },
                        {
                          value: "All Event (Engagement (Wed 18 Nov, 4pm) & White Wedding (Thu 19 Nov, 10am) / Reception)",
                          title: "All Event (Engagement (Wed 18 Nov, 4pm) & White Wedding (Thu 19 Nov, 10am) / Reception)",
                          badge: "Full 2-Day Celebration",
                        },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            formData.attendingEvents === item.value
                              ? "bg-forest/10 border-forest text-forest-deep shadow-sm ring-1 ring-forest/30"
                              : "bg-white/80 border-gold/40 text-charcoal hover:bg-gold/10"
                          }`}
                        >
                          <input
                            type="radio"
                            name="attendingEvents"
                            value={item.value}
                            checked={formData.attendingEvents === item.value}
                            onChange={(e) => setFormData({ ...formData, attendingEvents: e.target.value })}
                            className="w-4 h-4 text-forest focus:ring-forest mt-0.5 border-gold/50 cursor-pointer"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="font-semibold text-forest-deep text-sm leading-snug">
                                {item.title}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-forest-deep font-bold tracking-wider uppercase shrink-0 w-fit">
                                {item.badge}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Number of Guests (Strictly Not More Than 2 People) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-forest-deep uppercase tracking-wider">
                        Number of Attending Guests
                      </label>
                      <span className="text-[11px] text-gold font-bold">
                        Maximum 2 Guests Allowed
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { count: 1, label: "1 Person", sublabel: "Just Me" },
                        { count: 2, label: "2 People", sublabel: "Me & 1 Other Guest" },
                      ].map((opt) => (
                        <button
                          key={opt.count}
                          type="button"
                          onClick={() => handleGuestCountChange(opt.count)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            formData.guestCount === opt.count
                              ? "bg-forest text-ivory border-forest shadow-md ring-2 ring-gold/40"
                              : "bg-white/80 text-charcoal border-gold/40 hover:bg-gold/10"
                          }`}
                        >
                          <span className="block font-serif font-bold text-base sm:text-lg leading-tight">
                            {opt.label}
                          </span>
                          <span className={`text-xs block mt-0.5 ${formData.guestCount === opt.count ? "text-ivory/80" : "text-charcoal/60"}`}>
                            {opt.sublabel}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-charcoal/70 mt-2 italic">
                      * Maximum attendance is capped at not more than 2 people (you and 1 other guest).
                    </p>
                  </div>

                  {/* Companion Names */}
                  {formData.guestCount > 1 && (
                    <div className="p-4 rounded-2xl bg-white/60 border border-gold/30 space-y-3">
                      <p className="text-xs font-semibold text-forest uppercase tracking-wider">
                        Companion Names &amp; Details
                      </p>
                      {formData.attendees.map((attendee, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Guest #${index + 1} Name`}
                            value={attendee.name}
                            onChange={(e) => {
                              const updated = [...formData.attendees];
                              updated[index].name = e.target.value;
                              setFormData({ ...formData, attendees: updated });
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border border-gold/40 bg-white text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                          <input
                            type="text"
                            placeholder="Dietary (Optional)"
                            value={attendee.dietaryPreference || ""}
                            onChange={(e) => {
                              const updated = [...formData.attendees];
                              updated[index].dietaryPreference = e.target.value;
                              setFormData({ ...formData, attendees: updated });
                            }}
                            className="w-1/3 px-3 py-2 rounded-lg border border-gold/40 bg-white text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Accommodation Need Checkbox */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gold/10 border border-gold/30">
                    <input
                      type="checkbox"
                      id="accommodationCheck"
                      checked={formData.accommodationNeeded}
                      onChange={(e) => setFormData({ ...formData, accommodationNeeded: e.target.checked })}
                      className="w-4 h-4 rounded text-forest focus:ring-forest border-gold/50"
                    />
                    <label htmlFor="accommodationCheck" className="text-xs text-forest-deep select-none cursor-pointer">
                      I/We may require accommodation recommendations or reservation assistance in Mowe.
                    </label>
                  </div>
                </>
              )}

              {/* Message to the Couple */}
              <div>
                <label htmlFor="note" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                  Personal Note or Prayer for Kehinde &amp; Victor (Optional)
                </label>
                <textarea
                  id="note"
                  rows={3}
                  placeholder="Share a sweet prayer or message of joy with the couple..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              {/* Submit CTA */}
              <div className="text-center pt-2">
                <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full sm:w-auto min-w-[220px]">
                  Confirm My RSVP
                </Button>
                <p className="text-[11px] text-charcoal/60 mt-3">
                  Need direct assistance? Call RSVP hosts: <strong>0813 676 9807</strong> &middot; <strong>0907 724 9194</strong>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
