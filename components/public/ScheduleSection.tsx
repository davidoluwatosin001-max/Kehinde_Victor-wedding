"use client";

import React from "react";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles, Shirt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateGoogleCalendarUrl, generateICSContent } from "@/lib/utils";

export const ScheduleSection: React.FC = () => {
  const events = [
    {
      id: "engagement",
      day: "Wednesday",
      dateNumber: "18",
      monthYear: "Nov 2026",
      title: "Traditional Engagement Ceremony",
      time: "4:00 PM Prompt",
      venue: "21 Olawale Badmus Street",
      address: "Turaya Bus Stop, Mowe, Ogun State",
      description: "A joyful celebration of culture, family unity, and traditional betrothal rites.",
      dressCode: "Traditional Attire (Mustard Gold & Forest Green accents)",
      mapsUrl: "https://maps.google.com/?q=Turaya+Bus+Stop+Mowe+Ogun+State",
      calendarDate: "2026-11-18T16:00:00+01:00",
      calendarEndDate: "2026-11-18T20:00:00+01:00",
    },
    {
      id: "white-wedding",
      day: "Thursday",
      dateNumber: "19",
      monthYear: "Nov 2026",
      title: "White Wedding & Holy Matrimony",
      time: "10:00 AM Prompt",
      venue: "RCCG Redemption Parish",
      address: "13 Habitation Of Hope Street, Near Turaya Guest House, Turaya Bus Stop, Mowe, Ogun State",
      description: "The solemnization of holy matrimony, sacred vows, and worship before God and loved ones.",
      dressCode: "Formal & Elegant (Suits, Gowns, Formal Traditional)",
      mapsUrl: "https://maps.google.com/?q=RCCG+Redemption+Parish+Turaya+Mowe",
      calendarDate: "2026-11-19T10:00:00+01:00",
      calendarEndDate: "2026-11-19T13:00:00+01:00",
    },
    {
      id: "reception",
      day: "Thursday",
      dateNumber: "19",
      monthYear: "Nov 2026",
      title: "Wedding Reception & Celebration",
      time: "Follows Immediately After Church Service",
      venue: "18/12 Castro Hall",
      address: "10 Ibukun Oluwa Street, Asolo Bus Stop, Mowe, Ogun State",
      description: "Banquet, dance, cutting of the cake, music, toasts, and celebrating the newlyweds!",
      dressCode: "Celebratory Glamour (Mustard Gold & Forest Green)",
      mapsUrl: "https://maps.google.com/?q=Castro+Hall+Asolo+Bus+Stop+Mowe",
      calendarDate: "2026-11-19T13:30:00+01:00",
      calendarEndDate: "2026-11-19T19:00:00+01:00",
    },
  ];

  const handleDownloadICS = (evt: typeof events[0]) => {
    const ics = generateICSContent({
      title: `Kehinde & Victor Wedding — ${evt.title}`,
      description: `${evt.description}\nDress Code: ${evt.dressCode}`,
      location: `${evt.venue}, ${evt.address}`,
      startDate: evt.calendarDate,
      endDate: evt.calendarEndDate,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Kehinde-Victor-${evt.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="schedule" className="py-16 sm:py-24 px-4 sm:px-6 bg-ivory relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Wedding Programme &middot; Ayobamidele '26
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Events &amp; Timeline
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <Calendar className="w-4 h-4 text-gold" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
          <p className="font-sans text-charcoal/80 text-sm sm:text-base max-w-xl mx-auto">
            Please review our event schedule to celebrate each sacred and joyful milestone with us.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-8 relative">
          {events.map((evt, idx) => {
            const googleUrl = generateGoogleCalendarUrl({
              title: `Kehinde & Victor — ${evt.title}`,
              description: evt.description,
              location: `${evt.venue}, ${evt.address}`,
              startDate: evt.calendarDate,
              endDate: evt.calendarEndDate,
            });

            return (
              <div
                key={evt.id}
                className="card-luxury rounded-3xl p-6 sm:p-8 border border-gold/50 shadow-xl transition-all duration-300 hover:border-gold hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Date Badge */}
                  <div className="md:col-span-3 flex md:flex-col items-center justify-between md:justify-center p-4 rounded-2xl bg-gradient-to-b from-[#F5EEDB] to-[#FAF4E6] border border-gold/40 text-center">
                    <span className="text-xs uppercase tracking-widest text-gold font-bold">
                      {evt.day}
                    </span>
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-forest-deep my-1">
                      {evt.dateNumber}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-charcoal/70 font-medium">
                      {evt.monthYear}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs text-forest font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{evt.time}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold">
                      {evt.title}
                    </h3>

                    <div className="flex items-start gap-2.5 text-charcoal/80 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-forest-deep">{evt.venue}</strong>
                        <p className="text-charcoal/70 mt-0.5">{evt.address}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed pt-1">
                      {evt.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-forest bg-forest/5 p-2.5 rounded-xl border border-forest/10">
                      <Shirt className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span><strong>Dress Code:</strong> {evt.dressCode}</span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="md:col-span-3 flex flex-col gap-2.5 pt-2 md:pt-0">
                    <a
                      href={evt.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-medium transition-all px-4 py-2.5 text-xs rounded-full min-h-[40px] bg-forest text-ivory hover:bg-forest-deep border border-gold/40 shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-medium transition-all px-4 py-2.5 text-xs rounded-full min-h-[40px] border border-gold bg-[#FAF4E6] text-forest-deep hover:bg-gold/15"
                    >
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>Add to Google Cal</span>
                    </a>

                    <button
                      onClick={() => handleDownloadICS(evt)}
                      className="text-[11px] text-charcoal/60 hover:text-forest underline text-center pt-1"
                    >
                      Download .ics (Apple / Outlook)
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dress Code & Color Code Presentation */}
        <div className="mt-16 card-luxury rounded-3xl p-6 sm:p-10 border-1.5 border-gold shadow-xl text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-bold">
            Guest Palette &middot; Color Code
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep mt-1 mb-4 font-semibold">
            Dress Code &amp; Colors
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/80 max-w-lg mx-auto mb-6">
            We invite you to celebrate with us in our official wedding theme colors:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto">
            {/* Mustard Gold Swatch */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-gold/40 w-full sm:w-1/2">
              <div className="w-10 h-10 rounded-xl bg-[#C59B27] shadow-md border-2 border-white" />
              <div className="text-left">
                <span className="font-serif font-bold text-forest-deep text-base block">Mustard Gold</span>
                <span className="text-[10px] text-charcoal/60 uppercase tracking-wider">Accent &amp; Regal Joy</span>
              </div>
            </div>

            {/* Forest Green Swatch */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-gold/40 w-full sm:w-1/2">
              <div className="w-10 h-10 rounded-xl bg-[#1E3B29] shadow-md border-2 border-white" />
              <div className="text-left">
                <span className="font-serif font-bold text-forest-deep text-base block">Forest Green</span>
                <span className="text-[10px] text-charcoal/60 uppercase tracking-wider">Elegance &amp; Royalty</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-charcoal/70 mt-6 max-w-lg mx-auto italic">
            Whether choosing stunning traditional lace / aso-oke or crisp western suits and formal gowns, we look forward to seeing your radiant smiles!
          </p>
        </div>
      </div>
    </section>
  );
};
