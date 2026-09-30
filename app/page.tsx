"use client";

import React from "react";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { OurStorySection } from "@/components/public/OurStorySection";
import { ScheduleSection } from "@/components/public/ScheduleSection";
import { RSVPSection } from "@/components/public/RSVPSection";
import { GiftSection } from "@/components/public/GiftSection";
import { AccommodationSection } from "@/components/public/AccommodationSection";
import { GuestbookSection } from "@/components/public/GuestbookSection";
import { FAQSection } from "@/components/public/FAQSection";
import { Footer } from "@/components/public/Footer";

export default function HomePage() {
  const scrollToRSVP = () => {
    const el = document.getElementById("rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStory = () => {
    const el = document.getElementById("story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4E6]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Live Countdown */}
        <HeroSection onRSVPClick={scrollToRSVP} onExploreClick={scrollToStory} />

        {/* Our Story Editorial */}
        <OurStorySection />

        {/* Events Timeline & Dress Code Swatches */}
        <ScheduleSection />

        {/* Interactive RSVP System */}
        <RSVPSection />

        {/* Bless Our Beginning Gift Registry & Monetary Gifts */}
        <GiftSection />

        {/* Guest Accommodation Flow */}
        <AccommodationSection />

        {/* Wishes & Guestbook */}
        <GuestbookSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
