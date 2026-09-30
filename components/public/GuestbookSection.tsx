"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareHeart, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GuestbookMessage } from "@/types";

export const GuestbookSection: React.FC = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [formData, setFormData] = useState({
    author: "",
    relationship: "Family Friend",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ author: "", relationship: "Family Friend", message: "" });
        fetchMessages();
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="guestbook" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF4E6] relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Wishes &amp; Prayers
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Guestbook of Love
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <MessageSquareHeart className="w-4 h-4 text-gold" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
          <p className="font-sans text-charcoal/80 text-sm sm:text-base max-w-lg mx-auto">
            Leave a note of love, wisdom, or prayer for Kehinde &amp; Victor as they begin their sacred union.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Message Form */}
          <div className="lg:col-span-5 card-luxury p-6 sm:p-8 rounded-3xl border border-gold/50 shadow-xl">
            <h3 className="font-serif text-xl sm:text-2xl text-forest-deep font-semibold mb-1">
              Send Your Well Wishes
            </h3>
            <p className="text-xs text-charcoal/70 mb-5">
              Your prayer will be displayed on the digital guest wall.
            </p>

            {submitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-emerald-900">Thank you so much!</p>
                <p className="text-xs text-emerald-700 mt-1">Your message has been posted to our guest wall.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="msgAuthor" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    id="msgAuthor"
                    required
                    type="text"
                    placeholder="e.g. Sister Tolu"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div>
                  <label htmlFor="msgRel" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Relationship
                  </label>
                  <select
                    id="msgRel"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="Friend of the Bride">Friend of the Bride</option>
                    <option value="Friend of the Groom">Friend of the Groom</option>
                    <option value="Bride's Family">Bride&apos;s Family</option>
                    <option value="Groom's Family">Groom&apos;s Family</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Church Member">Church Member</option>
                    <option value="Well Wisher">Well Wisher</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="msgText" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                    Your Message / Prayer *
                  </label>
                  <textarea
                    id="msgText"
                    required
                    rows={3}
                    maxLength={500}
                    placeholder="Wishing you a marriage full of joy, fruitfulness, and peace..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 text-gold" />
                    <span>Post Love Note</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Messages Wall */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-forest-deep font-semibold px-1">
              Warm Wishes from Loved Ones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="col-span-2 p-8 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
                  Be the first to leave a warm message for Kehinde &amp; Victor!
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className="card-luxury p-5 rounded-2xl border border-gold/30 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <p className="font-serif italic text-charcoal/90 text-sm leading-relaxed mb-4">
                      &ldquo;{m.message}&rdquo;
                    </p>
                    <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                      <span className="font-sans font-semibold text-xs text-forest-deep">
                        {m.author}
                      </span>
                      {m.relationship && (
                        <span className="text-[10px] text-gold font-medium uppercase tracking-wider">
                          {m.relationship}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
