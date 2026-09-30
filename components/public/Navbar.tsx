"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Story", href: "#story" },
    { name: "Schedule", href: "#schedule" },
    { name: "RSVP", href: "#rsvp" },
    { name: "Gift Registry", href: "#gifts" },
    { name: "Stay & Travel", href: "#accommodation" },
    { name: "Wishes", href: "#guestbook" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF4E6]/95 backdrop-blur-md shadow-sm border-b border-gold/30 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border border-gold bg-forest flex items-center justify-center text-ivory text-xs font-serif font-bold shadow-sm">
            K&amp;V
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold text-forest-deep tracking-wide group-hover:text-gold transition-colors">
              Kehinde &amp; Victor
            </span>
            <span className="text-[9px] tracking-widest uppercase text-gold -mt-1 font-semibold">
              19 &middot; 11 &middot; 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-forest-deep/80 hover:text-forest transition-colors uppercase tracking-wider hover:underline underline-offset-4 decoration-gold decoration-1"
            >
              {link.name}
            </a>
          ))}
          <a href="#rsvp">
            <Button variant="primary" size="sm">
              RSVP
            </Button>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="md:hidden p-2 rounded-xl text-forest-deep hover:bg-gold/10 transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-forest-deep" /> : <Menu className="w-6 h-6 text-forest-deep" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF4E6] border-b border-gold/40 shadow-xl px-5 py-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-forest-deep py-2 border-b border-gold/15 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Heart className="w-3 h-3 text-gold/40" />
              </a>
            ))}
            <div className="pt-2">
              <a href="#rsvp" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <Button variant="primary" size="md" className="w-full">
                  RSVP Now
                </Button>
              </a>
            </div>
            <div className="text-center pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] text-charcoal/50 hover:text-forest underline"
              >
                Couple Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
