"use client";

import React, { useState, useEffect } from "react";
import { Gift, Copy, Check, Heart, Lock, Sparkles, Send, Home, Utensils } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GiftItem, SiteSettings } from "@/types";

export const GiftSection: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copied, setCopied] = useState(false);

  // Modal States
  const [isSentGiftModalOpen, setIsSentGiftModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isCustomGiftModalOpen, setIsCustomGiftModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  // Form States
  const [monetaryForm, setMonetaryForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    bankUsed: "",
    reference: "",
    message: "",
  });
  const [reserveForm, setReserveForm] = useState({
    reservedBy: "",
    reservedEmail: "",
    reservedPhone: "",
    notes: "",
  });
  const [customForm, setCustomForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    giftDescription: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchGiftData = async () => {
    try {
      const [resGifts, resSettings] = await Promise.all([
        fetch("/api/gifts"),
        fetch("/api/settings"),
      ]);
      if (resGifts.ok) {
        const data = await resGifts.json();
        setGifts(data.gifts || []);
      }
      if (resSettings.ok) {
        const data = await resSettings.json();
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Failed to load gifts", err);
    }
  };

  useEffect(() => {
    fetchGiftData();
  }, []);

  const handleCopyAccount = () => {
    if (!settings) return;
    const textToCopy = `Bank: ${settings.bankName}\nAccount Name: ${settings.accountName}\nAccount Number: ${settings.accountNumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Submit Monetary Gift Notification
  const handleMonetarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/gifts/monetary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...monetaryForm,
          amount: parseFloat(monetaryForm.amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit gift record");

      setFeedbackMessage({
        type: "success",
        text: "Thank you so much! Your loving gift details have been securely recorded. May God enrich you bountifully!",
      });
      setTimeout(() => {
        setIsSentGiftModalOpen(false);
        setFeedbackMessage(null);
        setMonetaryForm({
          senderName: "",
          senderEmail: "",
          senderPhone: "",
          amount: "",
          paymentDate: new Date().toISOString().split("T")[0],
          bankUsed: "",
          reference: "",
          message: "",
        });
      }, 3000);
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Physical Gift Reservation
  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGift) return;
    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/gifts/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: selectedGift.id,
          ...reserveForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to reserve item");

      setFeedbackMessage({
        type: "success",
        text: `Item reserved in your name! We are grateful for your blessing, ${reserveForm.reservedBy}.`,
      });
      fetchGiftData(); // refresh list to show "Reserved"

      setTimeout(() => {
        setIsReserveModalOpen(false);
        setSelectedGift(null);
        setFeedbackMessage(null);
        setReserveForm({ reservedBy: "", reservedEmail: "", reservedPhone: "", notes: "" });
      }, 2500);
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Custom Gift Proposal
  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/gifts/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit custom gift");

      setFeedbackMessage({
        type: "success",
        text: "Thank you so much! Kehinde & Victor have received your lovely gift note.",
      });
      setTimeout(() => {
        setIsCustomGiftModalOpen(false);
        setFeedbackMessage(null);
        setCustomForm({ senderName: "", senderEmail: "", senderPhone: "", giftDescription: "", message: "" });
      }, 2500);
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", "Kitchen", "Home Appliances"];

  const filteredGifts = selectedCategory === "All"
    ? gifts
    : gifts.filter((g) => {
        if (selectedCategory === "Home Appliances") {
          return g.category === "Home Appliances" || g.category === "Appliances";
        }
        return g.category === selectedCategory;
      });

  return (
    <section id="gifts" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-semibold">
            Registry &amp; Contributions
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep mt-2 font-medium">
            Bless Our Beginning
          </h2>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-10 h-px bg-gold/60" />
            <Gift className="w-4 h-4 text-gold" />
            <span className="w-10 h-px bg-gold/60" />
          </div>
          <p className="font-sans text-charcoal/80 text-sm sm:text-base leading-relaxed">
            &ldquo;Your presence is already a gift. If you would like to bless us further, we are grateful for every expression of love.&rdquo;
          </p>
        </div>

        {/* CATEGORY A: MONETARY GIFTS */}
        <div className="card-luxury rounded-3xl p-6 sm:p-10 mb-12 border-1.5 border-gold shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-forest border border-gold/40 uppercase tracking-widest mb-3">
              Category A
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold">
              Our Home &amp; Future Fund
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-lg mx-auto">
              For family and friends who prefer to give a monetary gift towards our new home foundation, you can transfer directly to our wedding account below.
            </p>

            {/* Bank Card Presentation */}
            <div className="bg-[#FAF4E6] border border-gold/60 rounded-2xl p-5 sm:p-7 my-6 text-left max-w-md mx-auto shadow-sm relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal/60 font-semibold block">Bank</span>
                  <span className="font-serif text-lg text-forest-deep font-bold">{settings?.bankName || "United Bank for Africa (UBA)"}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                  <Home className="w-4 h-4 text-forest" />
                </div>
              </div>

              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-wider text-charcoal/60 font-semibold block">Account Name</span>
                <span className="font-sans text-sm text-forest-deep font-medium">
                  {settings?.accountName || "Victor Odudu"}
                </span>
              </div>

              <div className="pt-3 border-t border-gold/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gold font-semibold block">Account Number</span>
                  <span className="font-mono text-xl sm:text-2xl tracking-widest text-forest-deep font-bold">
                    {settings?.accountNumber || "2061621174"}
                  </span>
                </div>
                <Button
                  onClick={handleCopyAccount}
                  variant="gold"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Details"}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => setIsSentGiftModalOpen(true)}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                I&apos;ve Sent a Gift
              </Button>
              <Button
                onClick={() => setIsCustomGiftModalOpen(true)}
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
              >
                I&apos;d Like to Give Something Else
              </Button>
            </div>
            <p className="text-[11px] text-charcoal/50 mt-3">
              Amounts submitted are kept completely confidential and private from public view.
            </p>
          </div>
        </div>

        {/* CATEGORY B: PHYSICAL GIFT REGISTRY */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-forest/10 text-forest border border-forest/20 uppercase tracking-widest mb-2">
                Category B
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold">
                Physical Gift Registry
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70">
                Reserve a household item you would love to gift the couple for their new home.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-forest text-ivory shadow-sm"
                      : "bg-[#FAF4E6] text-charcoal border border-gold/40 hover:bg-gold/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Registry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className="card-luxury rounded-3xl p-5 border border-gold/40 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group overflow-hidden bg-white/90"
              >
                <div>
                  {/* Gift Image Container */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gold/5 to-forest/5 border border-gold/25 flex items-center justify-center">
                    {gift.image ? (
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-forest">
                        <Gift className="w-7 h-7 text-forest" />
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-md ${
                        gift.status === "Available"
                          ? "bg-emerald-600/90 text-white border border-emerald-400"
                          : gift.status === "Reserved"
                          ? "bg-amber-600/90 text-white border border-amber-400"
                          : "bg-blue-600/90 text-white border border-blue-400"
                      }`}
                    >
                      {gift.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">
                      {gift.category}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-forest-deep leading-snug mb-2">
                    {gift.name}
                  </h4>
                  <p className="font-sans text-xs text-charcoal/75 line-clamp-3 leading-relaxed mb-4">
                    {gift.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
                  {gift.status === "Available" ? (
                    <Button
                      onClick={() => {
                        setSelectedGift(gift);
                        setIsReserveModalOpen(true);
                      }}
                      variant="gold"
                      size="sm"
                      className="w-full"
                    >
                      Reserve Gift
                    </Button>
                  ) : (
                    <div className="w-full text-center py-1.5 text-xs text-charcoal/60 bg-black/5 rounded-full flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-gold" />
                      <span>{gift.status === "Reserved" ? "Reserved by a Guest" : "Gift Received"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* MODAL 1: "I've Sent a Gift" Acknowledgement Modal */}
      <Modal
        isOpen={isSentGiftModalOpen}
        onClose={() => setIsSentGiftModalOpen(false)}
        title="I've Sent a Gift"
        subtitle="Let Us Know So We Can Thank You"
      >
        {feedbackMessage ? (
          <div
            className={`p-4 rounded-xl text-center text-sm ${
              feedbackMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedbackMessage.text}
          </div>
        ) : (
          <form onSubmit={handleMonetarySubmit} className="space-y-4">
            <div>
              <label htmlFor="donorName" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                id="donorName"
                required
                type="text"
                placeholder="e.g. Chief Adeleke"
                value={monetaryForm.senderName}
                onChange={(e) => setMonetaryForm({ ...monetaryForm, senderName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="giftAmount" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Amount Sent (₦) *
                </label>
                <input
                  id="giftAmount"
                  required
                  type="number"
                  min="100"
                  step="100"
                  placeholder="e.g. 50000"
                  value={monetaryForm.amount}
                  onChange={(e) => setMonetaryForm({ ...monetaryForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
              <div>
                <label htmlFor="giftDate" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Date of Transfer *
                </label>
                <input
                  id="giftDate"
                  required
                  type="date"
                  value={monetaryForm.paymentDate}
                  onChange={(e) => setMonetaryForm({ ...monetaryForm, paymentDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="donorEmail" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Email (For Receipt)
                </label>
                <input
                  id="donorEmail"
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={monetaryForm.senderEmail}
                  onChange={(e) => setMonetaryForm({ ...monetaryForm, senderEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
              <div>
                <label htmlFor="donorReference" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Bank / Reference Note
                </label>
                <input
                  id="donorReference"
                  type="text"
                  placeholder="e.g. GTB / Ref 1234"
                  value={monetaryForm.reference}
                  onChange={(e) => setMonetaryForm({ ...monetaryForm, reference: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label htmlFor="donorNote" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Loving Message to Couple
              </label>
              <textarea
                id="donorNote"
                rows={2}
                placeholder="Write a sweet prayer or blessing..."
                value={monetaryForm.message}
                onChange={(e) => setMonetaryForm({ ...monetaryForm, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full">
                Submit Gift Record
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* MODAL 2: Reserve Physical Gift */}
      <Modal
        isOpen={isReserveModalOpen}
        onClose={() => {
          setIsReserveModalOpen(false);
          setSelectedGift(null);
        }}
        title="Reserve Gift Item"
        subtitle={selectedGift?.name || ""}
      >
        {feedbackMessage ? (
          <div
            className={`p-4 rounded-xl text-center text-sm ${
              feedbackMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedbackMessage.text}
          </div>
        ) : (
          <form onSubmit={handleReserveSubmit} className="space-y-4">
            {selectedGift && (
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-gold/30 shadow-sm">
                {selectedGift.image ? (
                  <img
                    src={selectedGift.image}
                    alt={selectedGift.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gold/20 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 text-forest">
                    <Gift className="w-8 h-8 text-forest" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-gold tracking-wider block mb-0.5">
                    {selectedGift.category}
                  </span>
                  <h4 className="font-serif font-bold text-forest-deep text-sm sm:text-base leading-snug line-clamp-1">
                    {selectedGift.name}
                  </h4>
                  <p className="text-[11px] text-charcoal/70 line-clamp-1 mt-0.5">
                    {selectedGift.description}
                  </p>
                </div>
              </div>
            )}

            <p className="text-xs text-charcoal/75 bg-gold/10 p-3 rounded-xl border border-gold/30">
              Reserving this item prevents duplicate purchases by other guests. Please provide your contact details so Kehinde &amp; Victor can coordinate delivery with you.
            </p>

            <div>
              <label htmlFor="reserverName" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                id="reserverName"
                required
                type="text"
                placeholder="e.g. Aunty Folake"
                value={reserveForm.reservedBy}
                onChange={(e) => setReserveForm({ ...reserveForm, reservedBy: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="reserverEmail" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  id="reserverEmail"
                  required
                  type="email"
                  placeholder="e.g. folake@example.com"
                  value={reserveForm.reservedEmail}
                  onChange={(e) => setReserveForm({ ...reserveForm, reservedEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
              <div>
                <label htmlFor="reserverPhone" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  id="reserverPhone"
                  required
                  type="tel"
                  placeholder="e.g. 0803 000 0000"
                  value={reserveForm.reservedPhone}
                  onChange={(e) => setReserveForm({ ...reserveForm, reservedPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reserverNote" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Note on Delivery or Purchase (Optional)
              </label>
              <textarea
                id="reserverNote"
                rows={2}
                placeholder="e.g. Will bring to the reception, or dispatch to home address..."
                value={reserveForm.notes}
                onChange={(e) => setReserveForm({ ...reserveForm, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="gold" size="md" isLoading={isLoading} className="w-full">
                Confirm Reservation
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* MODAL 3: Custom Physical Gift */}
      <Modal
        isOpen={isCustomGiftModalOpen}
        onClose={() => setIsCustomGiftModalOpen(false)}
        title="Custom Gift Proposal"
        subtitle="I'd Like to Give Something Else"
      >
        {feedbackMessage ? (
          <div
            className={`p-4 rounded-xl text-center text-sm ${
              feedbackMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedbackMessage.text}
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label htmlFor="customName" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                id="customName"
                required
                type="text"
                placeholder="e.g. Dr. & Mrs. Adeleke"
                value={customForm.senderName}
                onChange={(e) => setCustomForm({ ...customForm, senderName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="customEmail" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  id="customEmail"
                  type="email"
                  placeholder="e.g. adeleke@example.com"
                  value={customForm.senderEmail}
                  onChange={(e) => setCustomForm({ ...customForm, senderEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
              <div>
                <label htmlFor="customPhone" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                  Phone (WhatsApp)
                </label>
                <input
                  id="customPhone"
                  type="tel"
                  placeholder="e.g. 0802 345 6789"
                  value={customForm.senderPhone}
                  onChange={(e) => setCustomForm({ ...customForm, senderPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customDesc" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Describe the Gift *
              </label>
              <input
                id="customDesc"
                required
                type="text"
                placeholder="e.g. Handcrafted wooden dining chairs, Custom painting, etc."
                value={customForm.giftDescription}
                onChange={(e) => setCustomForm({ ...customForm, giftDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label htmlFor="customMessage" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1">
                Message to the Couple
              </label>
              <textarea
                id="customMessage"
                rows={2}
                placeholder="Any special details or delivery plans..."
                value={customForm.message}
                onChange={(e) => setCustomForm({ ...customForm, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-gold/40 bg-white/90 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full">
                Send Gift Proposal
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};
