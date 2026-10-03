"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  BedDouble,
  Gift,
  Coins,
  Download,
  Plus,
  Search,
  Check,
  Trash2,
  Settings,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatNaira, formatDate } from "@/lib/utils";
import { AdminStats, Guest, RSVP, AccommodationRequest, GiftItem, GiftStatus, MonetaryGift, SiteSettings } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "guests" | "rsvps" | "accommodation" | "gifts" | "settings"
  >("overview");

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [accommodations, setAccommodations] = useState<AccommodationRequest[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [monetaryGifts, setMonetaryGifts] = useState<MonetaryGift[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [adminGiftCategory, setAdminGiftCategory] = useState<string>("All");

  // Modals
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState({
    name: "",
    email: "",
    phone: "",
    maxGuests: 2,
    allowedPlusOne: true,
    accommodationEligible: false,
    isVip: false,
    notes: "",
  });

  const [isAddGiftModalOpen, setIsAddGiftModalOpen] = useState(false);
  const [newGiftForm, setNewGiftForm] = useState({
    name: "",
    category: "Kitchen" as GiftItem["category"],
    description: "",
    quantity: 1,
    estimatedValue: 50000,
  });

  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const refreshAllData = async () => {
    try {
      const [resStats, resGuests, resRsvps, resAcc, resGifts, resMonetary, resSet] =
        await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/guests"),
          fetch("/api/rsvp"),
          fetch("/api/accommodation"),
          fetch("/api/gifts"),
          fetch("/api/gifts/monetary"),
          fetch("/api/settings"),
        ]);

      if (resStats.ok) setStats((await resStats.json()).stats);
      if (resGuests.ok) setGuests((await resGuests.json()).guests || []);
      if (resRsvps.ok) setRsvps((await resRsvps.json()).rsvps || []);
      if (resAcc.ok) setAccommodations((await resAcc.json()).requests || []);
      if (resGifts.ok) setGifts((await resGifts.json()).gifts || []);
      if (resSet.ok) setSettings((await resSet.json()).settings);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Add Guest Action
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuestForm),
      });
      if (res.ok) {
        setIsAddGuestModalOpen(false);
        setNewGuestForm({
          name: "",
          email: "",
          phone: "",
          maxGuests: 2,
          allowedPlusOne: true,
          accommodationEligible: false,
          isVip: false,
          notes: "",
        });
        refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Guest Action
  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Are you sure you want to remove this guest invitation?")) return;
    try {
      const res = await fetch(`/api/admin/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Mark Gift Received Action
  const handleMarkGiftReceived = async (giftId: string) => {
    try {
      const res = await fetch("/api/gifts/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftId }),
      });
      refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Update Gift Status Action (Available, Reserved, Received)
  const handleUpdateGiftStatus = async (giftId: string, status: GiftStatus) => {
    try {
      await fetch("/api/gifts/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftId, status }),
      });
      refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccessMsg("Settings updated successfully!");
        setTimeout(() => setSaveSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered Guests
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      g.rsvpStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-5">
        <div>
          <h2 className="font-serif text-3xl font-bold text-forest-deep">
            Wedding Operations Dashboard
          </h2>
          <p className="text-xs text-charcoal/70 mt-1">
            Real-time management for Kehinde &amp; Victor &middot; 19 November 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/admin/export-csv"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-gold bg-[#FAF4E6] text-forest-deep hover:bg-gold/15 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Export CSV</span>
          </a>
          <Button
            onClick={() => setIsAddGuestModalOpen(true)}
            variant="gold"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Guest</span>
          </Button>
        </div>
      </div>

      {/* Primary KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="card-luxury p-4 rounded-2xl border border-gold/40 shadow-sm">
          <div className="flex justify-between items-center text-charcoal/60 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider">Total Invited</span>
            <Users className="w-4 h-4 text-gold" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-forest-deep">
            {stats?.totalInvited ?? 0}
          </span>
          <p className="text-[10px] text-charcoal/60 mt-1">Max guest capacity</p>
        </div>

        <div className="card-luxury p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 shadow-sm">
          <div className="flex justify-between items-center text-emerald-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider">Confirmed</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
            {stats?.confirmedGuests ?? 0}
          </span>
          <p className="text-[10px] text-emerald-800/80 mt-1">
            {stats?.totalAttendeesCount ?? 0} attendees attending
          </p>
        </div>

        <div className="card-luxury p-4 rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm">
          <div className="flex justify-between items-center text-amber-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-950">
            {stats?.pendingGuests ?? 0}
          </span>
          <p className="text-[10px] text-amber-800/80 mt-1">Awaiting response</p>
        </div>

        <div className="card-luxury p-4 rounded-2xl border border-red-200 bg-red-50/40 shadow-sm">
          <div className="flex justify-between items-center text-red-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider">Declined</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-red-950">
            {stats?.declinedGuests ?? 0}
          </span>
          <p className="text-[10px] text-red-700/80 mt-1">Sent warm regrets</p>
        </div>

        <div className="card-luxury p-4 rounded-2xl border border-gold/50 bg-[#F5EEDB] shadow-sm col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center text-forest-deep mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider">Monetary Fund</span>
            <Coins className="w-4 h-4 text-gold" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-forest-deep">
            {formatNaira(stats?.monetaryGiftsTotal ?? 0)}
          </span>
          <p className="text-[10px] text-forest mt-1">
            {stats?.monetaryGiftsCount ?? 0} gifts recorded
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-gold/30 gap-2 pb-px scrollbar-none">
        {[
          { id: "overview", label: "Overview", icon: Sparkles },
          { id: "guests", label: `Guests (${guests.length})`, icon: Users },
          { id: "rsvps", label: `RSVP Submissions (${rsvps.length})`, icon: CheckCircle },
          { id: "accommodation", label: `Accommodations (${accommodations.length})`, icon: BedDouble },
          { id: "gifts", label: `Gifts Registry (${gifts.length})`, icon: Gift },
          { id: "settings", label: "Website Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? "bg-white text-forest border-forest shadow-sm"
                  : "text-charcoal/70 border-transparent hover:text-forest hover:bg-gold/10"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-charcoal/50"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-deep">
              Recent RSVP Submissions
            </h3>
            {rsvps.length === 0 ? (
              <p className="text-xs text-charcoal/60 py-6 text-center">No RSVPs yet.</p>
            ) : (
              <div className="divide-y divide-gold/20">
                {rsvps.slice(0, 5).map((r) => (
                  <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-forest-deep">{r.guestName}</p>
                      <p className="text-[11px] text-charcoal/70">
                        {r.email} &middot; {r.phone} &middot; {r.guestCount} attendee(s)
                        {(r.attendingState || r.attendingCity) && (
                          <span> &middot; Attending from: <strong className="text-forest-deep">{[r.attendingCity, r.attendingState].filter(Boolean).join(", ")}</strong></span>
                        )}
                      </p>
                      {r.message && (
                        <p className="text-xs italic text-gold mt-1">&ldquo;{r.message}&rdquo;</p>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        r.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : r.status === "Declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-deep">
              Gift Registry Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-3 bg-white/70 rounded-xl border border-gold/30">
                <span className="text-charcoal/70">Total Registry Items:</span>
                <strong className="text-forest-deep">{stats?.physicalGiftsTotal ?? 0}</strong>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-amber-800">Reserved by Guests:</span>
                <strong className="text-amber-900">{stats?.physicalGiftsReserved ?? 0}</strong>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-blue-800">Delivered / Received:</span>
                <strong className="text-blue-900">{stats?.physicalGiftsReceived ?? 0}</strong>
              </div>
              <div className="flex justify-between items-center text-xs p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-800">Still Available:</span>
                <strong className="text-emerald-900">
                  {(stats?.physicalGiftsTotal ?? 0) -
                    (stats?.physicalGiftsReserved ?? 0) -
                    (stats?.physicalGiftsReceived ?? 0)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GUEST MANAGEMENT */}
      {activeTab === "guests" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search guest or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-forest"
              />
              <Search className="w-3.5 h-3.5 text-gold absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none"
              >
                <option value="all">All RSVP Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gold/30 text-gold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Guest Name</th>
                  <th className="py-2.5 px-3">Max Allowed</th>
                  <th className="py-2.5 px-3">VIP</th>
                  <th className="py-2.5 px-3">RSVP Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15">
                {filteredGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-gold/5">
                    <td className="py-2.5 px-3 font-mono font-bold text-forest">{g.code}</td>
                    <td className="py-2.5 px-3 font-medium text-forest-deep">{g.name}</td>
                    <td className="py-2.5 px-3">{g.maxGuests} guests</td>
                    <td className="py-2.5 px-3">
                      {g.isVip ? (
                        <span className="bg-gold/20 text-forest-deep px-2 py-0.5 rounded-full font-bold text-[9px]">
                          VIP
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          g.rsvpStatus === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : g.rsvpStatus === "Declined"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {g.rsvpStatus || "Pending"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleDeleteGuest(g.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RSVP SUBMISSIONS */}
      {activeTab === "rsvps" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-forest-deep">
              Detailed RSVP Responses
            </h3>
            <span className="text-xs text-charcoal/60">
              Total RSVPs: <strong>{rsvps.length}</strong>
            </span>
          </div>

          <div className="space-y-3">
            {rsvps.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-white/70 border border-gold/30 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif font-bold text-forest-deep text-base">{r.guestName}</h4>
                    <p className="text-xs text-charcoal/70">
                      Code: <strong className="font-mono text-forest">{r.invitationCode || "Direct"}</strong> &middot; Phone: {r.phone} &middot; Email: {r.email}
                      {(r.attendingState || r.attendingCity) && (
                        <span> &middot; Attending from: <strong className="text-forest-deep">{[r.attendingCity, r.attendingState].filter(Boolean).join(", ")}</strong></span>
                      )}
                    </p>
                    {r.attendingEvents && (
                      <p className="text-xs font-semibold text-forest mt-1 bg-gold/15 px-2.5 py-1 rounded-lg w-fit border border-gold/30">
                        Event: {r.attendingEvents}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      r.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : r.status === "Declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {r.status} ({r.guestCount} Attendees)
                  </span>
                </div>

                {r.attendees && r.attendees.length > 0 && (
                  <div className="text-xs bg-[#FAF4E6] p-2.5 rounded-xl border border-gold/20">
                    <span className="font-semibold text-gold text-[10px] uppercase block mb-1">
                      Companions
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-charcoal/80">
                      {r.attendees.map((att, i) => (
                        <li key={i}>
                          {att.name} {att.dietaryPreference ? `(Diet: ${att.dietaryPreference})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {r.message && (
                  <p className="text-xs italic text-forest border-l-2 border-gold pl-2.5 py-0.5">
                    &ldquo;{r.message}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ACCOMMODATION REQUESTS */}
      {activeTab === "accommodation" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-forest-deep">
            Guest Hotel &amp; Lodging Requests ({accommodations.length})
          </h3>
          <div className="space-y-3">
            {accommodations.length === 0 ? (
              <p className="text-xs text-charcoal/60 py-6 text-center">No accommodation requests yet.</p>
            ) : (
              accommodations.map((acc) => (
                <div key={acc.id} className="p-4 rounded-2xl bg-white/70 border border-gold/30 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-forest-deep text-base">{acc.guestName}</h4>
                      <p className="text-xs text-charcoal/70">
                        {acc.phone} &middot; {acc.email} &middot; <strong>{acc.numberOfPeople} guest(s)</strong>
                      </p>
                      <p className="text-xs text-forest mt-1">
                        Dates: {acc.checkInDate} &rarr; {acc.checkOutDate} ({acc.roomRequirement})
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gold/15 text-forest border border-gold/30">
                      {acc.status}
                    </span>
                  </div>
                  {acc.specialRequirements && (
                    <p className="text-xs text-charcoal/80 bg-gold/10 p-2 rounded-lg">
                      <strong>Special Request:</strong> {acc.specialRequirements}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: GIFTS REGISTRY & MONETARY */}
      {activeTab === "gifts" && (
        <div className="space-y-6">
          <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-deep">
                  Physical Registry Items ({gifts.length})
                </h3>
                <p className="text-xs text-charcoal/60">
                  Manage availability, reservations, and incoming wedding gifts.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {["All", "Kitchen", "Home Appliances"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAdminGiftCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      adminGiftCategory === cat
                        ? "bg-forest text-ivory shadow-sm"
                        : "bg-white text-charcoal border border-gold/40 hover:bg-gold/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gifts
                .filter((g) => {
                  if (adminGiftCategory === "All") return true;
                  if (adminGiftCategory === "Home Appliances") {
                    return g.category === "Home Appliances" || g.category === "Appliances";
                  }
                  return g.category === adminGiftCategory;
                })
                .map((g) => (
                  <div key={g.id} className="p-4 rounded-2xl bg-white/80 border border-gold/30 flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      {/* Product Image */}
                      {g.image && (
                        <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-gold/10 border border-gold/20">
                          <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-bold text-gold px-2 py-0.5 rounded-md bg-gold/10">{g.category}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            g.status === "Available"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : g.status === "Reserved"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-blue-100 text-blue-800 border border-blue-300"
                          }`}
                        >
                          {g.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-forest-deep text-base">{g.name}</h4>
                      <p className="text-xs text-charcoal/70 line-clamp-2 mt-1">{g.description}</p>
                      {g.reservedBy && (
                        <div className="text-xs font-semibold text-forest mt-2 bg-[#FAF4E6] p-2.5 rounded-xl border border-gold/20">
                          <p>Reserved by: <strong>{g.reservedBy}</strong></p>
                          {g.reservedPhone && <p className="text-[11px] text-charcoal/70">Phone: {g.reservedPhone}</p>}
                          {g.reservedEmail && <p className="text-[11px] text-charcoal/70">Email: {g.reservedEmail}</p>}
                          {g.notes && <p className="text-[11px] italic text-gold mt-0.5">&ldquo;{g.notes}&rdquo;</p>}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gold/20 mt-3 flex flex-wrap gap-2 justify-end">
                      {g.status === "Reserved" && (
                        <>
                          <Button
                            onClick={() => handleUpdateGiftStatus(g.id, "Received")}
                            variant="gold"
                            size="sm"
                          >
                            Mark as Received
                          </Button>
                          <Button
                            onClick={() => handleUpdateGiftStatus(g.id, "Available")}
                            variant="outline"
                            size="sm"
                          >
                            Reset to Available
                          </Button>
                        </>
                      )}
                      {g.status === "Received" && (
                        <Button
                          onClick={() => handleUpdateGiftStatus(g.id, "Available")}
                          variant="outline"
                          size="sm"
                        >
                          Reset to Available
                        </Button>
                      )}
                      {g.status === "Available" && (
                        <span className="text-[11px] text-emerald-700 font-medium py-1">
                          ✓ Available for reservation
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: WEBSITE SETTINGS CMS */}
      {activeTab === "settings" && settings && (
        <form onSubmit={handleSaveSettings} className="card-luxury p-6 sm:p-8 rounded-3xl border border-gold/40 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-forest-deep">
              Wedding Content Management
            </h3>
            {saveSuccessMsg && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {saveSuccessMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cmsCouple" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Couple Names
              </label>
              <input
                id="cmsCouple"
                type="text"
                value={settings.coupleNames}
                onChange={(e) => setSettings({ ...settings, coupleNames: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
            <div>
              <label htmlFor="cmsTag" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Wedding Hashtag
              </label>
              <input
                id="cmsTag"
                type="text"
                value={settings.hashtag}
                onChange={(e) => setSettings({ ...settings, hashtag: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cmsBank" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Bank Name
              </label>
              <input
                id="cmsBank"
                type="text"
                value={settings.bankName}
                onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
            <div>
              <label htmlFor="cmsAccName" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Account Name
              </label>
              <input
                id="cmsAccName"
                type="text"
                value={settings.accountName}
                onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
            <div>
              <label htmlFor="cmsAccNum" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Account Number
              </label>
              <input
                id="cmsAccNum"
                type="text"
                value={settings.accountNumber}
                onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cmsAnnounce" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
              Announcement Banner Note
            </label>
            <input
              id="cmsAnnounce"
              type="text"
              value={settings.announcement || ""}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md">
              Save Website Settings
            </Button>
          </div>
        </form>
      )}

      {/* MODAL: ADD GUEST */}
      <Modal
        isOpen={isAddGuestModalOpen}
        onClose={() => setIsAddGuestModalOpen(false)}
        title="Add Invited Guest"
        subtitle="Generate Unique Invitation Code"
      >
        <form onSubmit={handleAddGuest} className="space-y-4">
          <div>
            <label htmlFor="newGuestName" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
              Guest Name *
            </label>
            <input
              id="newGuestName"
              required
              type="text"
              placeholder="e.g. Pastor & Mrs. Taiwo"
              value={newGuestForm.name}
              onChange={(e) => setNewGuestForm({ ...newGuestForm, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="newGuestEmail" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Email
              </label>
              <input
                id="newGuestEmail"
                type="email"
                placeholder="taiwo@example.com"
                value={newGuestForm.email}
                onChange={(e) => setNewGuestForm({ ...newGuestForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
            <div>
              <label htmlFor="newGuestPhone" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Phone
              </label>
              <input
                id="newGuestPhone"
                type="tel"
                placeholder="0803..."
                value={newGuestForm.phone}
                onChange={(e) => setNewGuestForm({ ...newGuestForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="newMaxGuests" className="block text-xs font-medium uppercase tracking-wider text-forest-deep mb-1">
                Max Allowed Guests
              </label>
              <input
                id="newMaxGuests"
                type="number"
                min="1"
                max="10"
                value={newGuestForm.maxGuests}
                onChange={(e) => setNewGuestForm({ ...newGuestForm, maxGuests: parseInt(e.target.value, 10) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isVipCheck"
                checked={newGuestForm.isVip}
                onChange={(e) => setNewGuestForm({ ...newGuestForm, isVip: e.target.checked })}
                className="w-4 h-4 rounded text-forest focus:ring-forest border-gold/50"
              />
              <label htmlFor="isVipCheck" className="text-xs text-forest-deep font-semibold">
                Mark as VIP Guest
              </label>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Create Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
