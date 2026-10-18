"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Gift,
  Coins,
  Download,
  Plus,
  Search,
  Check,
  Trash2,
  Settings,
  MessageSquareHeart,
  Sparkles,
  Eye,
  HeartHandshake,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatNaira, formatDate } from "@/lib/utils";
import {
  AdminStats,
  Guest,
  RSVP,
  GiftItem,
  GiftStatus,
  MonetaryGift,
  CustomGiftProposal,
  GuestbookMessage,
  SiteSettings,
} from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "guests" | "rsvps" | "gifts" | "monetary" | "custom" | "guestbook" | "settings"
  >("overview");

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [monetaryGifts, setMonetaryGifts] = useState<MonetaryGift[]>([]);
  const [customGifts, setCustomGifts] = useState<CustomGiftProposal[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [adminGiftCategory, setAdminGiftCategory] = useState<string>("All");
  const [monetaryFilter, setMonetaryFilter] = useState<string>("all");
  const [customFilter, setCustomFilter] = useState<string>("all");
  const [guestbookFilter, setGuestbookFilter] = useState<string>("all");

  // Modals & Inspection Detail State
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<{
    type: "rsvp" | "guest";
    data: any;
  } | null>(null);

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

  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAllData = async () => {
    setIsRefreshing(true);
    try {
      const [
        resStats,
        resGuests,
        resRsvps,
        resGifts,
        resMonetary,
        resCustom,
        resGuestbook,
        resSet,
      ] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/guests"),
        fetch("/api/rsvp"),
        fetch("/api/gifts"),
        fetch("/api/gifts/monetary"),
        fetch("/api/gifts/custom"),
        fetch("/api/guestbook"),
        fetch("/api/settings"),
      ]);

      if (resStats.ok) setStats((await resStats.json()).stats);
      if (resGuests.ok) setGuests((await resGuests.json()).guests || []);
      if (resRsvps.ok) setRsvps((await resRsvps.json()).rsvps || []);
      if (resGifts.ok) setGifts((await resGifts.json()).gifts || []);
      if (resMonetary.ok) setMonetaryGifts((await resMonetary.json()).monetaryGifts || []);
      if (resCustom.ok) setCustomGifts((await resCustom.json()).proposals || []);
      if (resGuestbook.ok) setGuestbook((await resGuestbook.json()).messages || []);
      if (resSet.ok) setSettings((await resSet.json()).settings);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setIsRefreshing(false);
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

  // Toggle Monetary Gift Verification
  const handleToggleMonetaryVerification = async (id: string, currentStatus: "Reported" | "Verified") => {
    const nextStatus = currentStatus === "Verified" ? "Reported" : "Verified";
    try {
      const res = await fetch("/api/gifts/monetary", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Monetary Gift
  const handleDeleteMonetaryGift = async (id: string) => {
    if (!confirm("Are you sure you want to delete this monetary gift record?")) return;
    try {
      const res = await fetch(`/api/gifts/monetary?id=${id}`, { method: "DELETE" });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Update Custom Gift Status
  const handleUpdateCustomGiftStatus = async (id: string, status: CustomGiftProposal["status"]) => {
    try {
      const res = await fetch("/api/gifts/custom", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Custom Gift
  const handleDeleteCustomGift = async (id: string) => {
    if (!confirm("Are you sure you want to delete this custom gift proposal?")) return;
    try {
      const res = await fetch(`/api/gifts/custom?id=${id}`, { method: "DELETE" });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Guestbook Approval
  const handleToggleGuestbookApproval = async (id: string, currentApproved: boolean) => {
    try {
      const res = await fetch("/api/guestbook", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !currentApproved }),
      });
      if (res.ok) refreshAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Guestbook Message
  const handleDeleteGuestbookMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guestbook message?")) return;
    try {
      const res = await fetch(`/api/guestbook?id=${id}`, { method: "DELETE" });
      if (res.ok) refreshAllData();
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
      g.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.email && g.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (g.phone && g.phone.includes(searchTerm));
    const matchesFilter =
      filterStatus === "all" ||
      g.rsvpStatus?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Filtered RSVPs
  const filteredRSVPs = rsvps.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.invitationCode && r.invitationCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      (r.attendingCity && r.attendingCity.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.attendingState && r.attendingState.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter =
      filterStatus === "all" ||
      r.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Filtered Monetary Gifts
  const filteredMonetaryGifts = monetaryGifts.filter((g) => {
    if (monetaryFilter === "all") return true;
    return g.status.toLowerCase() === monetaryFilter.toLowerCase();
  });

  // Filtered Custom Gifts
  const filteredCustomGifts = customGifts.filter((cg) => {
    if (customFilter === "all") return true;
    return cg.status.toLowerCase() === customFilter.toLowerCase();
  });

  // Filtered Guestbook
  const filteredGuestbook = guestbook.filter((m) => {
    if (guestbookFilter === "all") return true;
    if (guestbookFilter === "approved") return m.approved === true;
    if (guestbookFilter === "hidden") return m.approved === false;
    return true;
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
            Real-time management for Kehinde &amp; Victor &middot; Thursday 19 November 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshAllData}
            disabled={isRefreshing}
            className="p-2 text-xs font-semibold rounded-xl border border-gold/40 bg-white text-forest-deep hover:bg-gold/10 transition-colors shadow-sm disabled:opacity-50"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-gold ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <a
            href="/api/admin/export-csv"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-gold bg-[#FAF4E6] text-forest-deep hover:bg-gold/15 transition-colors shadow-sm"
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

      {/* Primary KPI Metric Cards Grid - Fully Clickable */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Invited */}
        <div
          onClick={() => {
            setActiveTab("guests");
            setFilterStatus("all");
            setSearchTerm("");
          }}
          className="card-luxury p-4 rounded-2xl border border-gold/40 shadow-sm cursor-pointer hover:border-gold hover:shadow-md transition-all active:scale-[0.98] group"
          title="Click to view all invited guests"
        >
          <div className="flex justify-between items-center text-charcoal/60 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider group-hover:text-forest transition-colors">
              Total Invited
            </span>
            <Users className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-forest-deep">
            {stats?.totalInvited ?? 0}
          </span>
          <p className="text-[10px] text-charcoal/60 mt-1">
            {guests.length} invitation(s) issued
          </p>
        </div>

        {/* Confirmed */}
        <div
          onClick={() => {
            setActiveTab("rsvps");
            setFilterStatus("Confirmed");
            setSearchTerm("");
          }}
          className="card-luxury p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 shadow-sm cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all active:scale-[0.98] group"
          title="Click to view confirmed RSVPs"
        >
          <div className="flex justify-between items-center text-emerald-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider group-hover:text-emerald-950 transition-colors">
              Confirmed
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
            {stats?.confirmedGuests ?? 0}
          </span>
          <p className="text-[10px] text-emerald-800/80 mt-1">
            {stats?.totalAttendeesCount ?? 0} attending guest(s)
          </p>
        </div>

        {/* Pending */}
        <div
          onClick={() => {
            setActiveTab("rsvps");
            setFilterStatus("Pending");
            setSearchTerm("");
          }}
          className="card-luxury p-4 rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm cursor-pointer hover:border-amber-500 hover:shadow-md transition-all active:scale-[0.98] group"
          title="Click to view pending RSVPs"
        >
          <div className="flex justify-between items-center text-amber-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider group-hover:text-amber-950 transition-colors">
              Pending
            </span>
            <Clock className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-950">
            {stats?.pendingGuests ?? 0}
          </span>
          <p className="text-[10px] text-amber-800/80 mt-1">Awaiting response</p>
        </div>

        {/* Declined */}
        <div
          onClick={() => {
            setActiveTab("rsvps");
            setFilterStatus("Declined");
            setSearchTerm("");
          }}
          className="card-luxury p-4 rounded-2xl border border-red-200 bg-red-50/40 shadow-sm cursor-pointer hover:border-red-400 hover:shadow-md transition-all active:scale-[0.98] group"
          title="Click to view declined RSVPs"
        >
          <div className="flex justify-between items-center text-red-800 mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider group-hover:text-red-950 transition-colors">
              Declined
            </span>
            <XCircle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-red-950">
            {stats?.declinedGuests ?? 0}
          </span>
          <p className="text-[10px] text-red-700/80 mt-1">Sent warm regrets</p>
        </div>

        {/* Monetary Fund */}
        <div
          onClick={() => {
            setActiveTab("monetary");
            setMonetaryFilter("all");
          }}
          className="card-luxury p-4 rounded-2xl border border-gold/60 bg-[#F5EEDB] shadow-sm col-span-2 sm:col-span-1 cursor-pointer hover:border-gold hover:shadow-md transition-all active:scale-[0.98] group"
          title="Click to view monetary gifts and verify transfers"
        >
          <div className="flex justify-between items-center text-forest-deep mb-1">
            <span className="text-[11px] uppercase font-bold tracking-wider group-hover:text-forest transition-colors">
              Monetary Fund
            </span>
            <Coins className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold text-forest-deep block truncate">
            {formatNaira(stats?.monetaryGiftsTotal ?? 0)}
          </span>
          <p className="text-[10px] text-forest font-semibold mt-1">
            {stats?.monetaryGiftsCount ?? 0} reported &middot; {formatNaira(stats?.monetaryGiftsReportedTotal ?? 0)}
          </p>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex overflow-x-auto border-b border-gold/30 gap-2 pb-px scrollbar-none">
        {[
          { id: "overview", label: "Overview", icon: Sparkles },
          { id: "guests", label: `Guests (${guests.length})`, icon: Users },
          { id: "rsvps", label: `RSVP Submissions (${rsvps.length})`, icon: CheckCircle },
          { id: "gifts", label: `Physical Registry (${gifts.length})`, icon: Gift },
          { id: "monetary", label: `Monetary Gifts (${monetaryGifts.length})`, icon: Coins },
          { id: "custom", label: `Custom Gifts (${customGifts.length})`, icon: HeartHandshake },
          { id: "guestbook", label: `Guestbook (${guestbook.length})`, icon: MessageSquareHeart },
          { id: "settings", label: "Settings CMS", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchTerm("");
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 cursor-pointer ${
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
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-forest-deep">
                Recent RSVP Submissions
              </h3>
              <button
                onClick={() => setActiveTab("rsvps")}
                className="text-xs text-forest hover:text-gold font-semibold underline"
              >
                View all ({rsvps.length})
              </button>
            </div>

            {rsvps.length === 0 ? (
              <div className="p-8 text-center text-xs text-charcoal/60 bg-white/50 rounded-2xl border border-gold/20">
                <Sparkles className="w-8 h-8 text-gold/40 mx-auto mb-2" />
                <p className="font-medium text-forest-deep">No live RSVP responses submitted yet.</p>
                <p className="text-[11px] mt-1">Once guests submit the RSVP form on the website, their responses will appear here in real-time.</p>
              </div>
            ) : (
              <div className="divide-y divide-gold/20">
                {rsvps.slice(0, 6).map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedDetailItem({ type: "rsvp", data: r })}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-gold/5 px-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-forest-deep">{r.guestName}</p>
                        <span className="font-mono text-[10px] text-forest bg-gold/15 px-2 py-0.5 rounded font-bold">
                          {r.invitationCode || "Direct"}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal/70 mt-0.5">
                        {r.email} &middot; {r.phone} &middot; {r.guestCount} attendee(s)
                        {(r.attendingState || r.attendingCity) && (
                          <span> &middot; From: <strong className="text-forest-deep">{[r.attendingCity, r.attendingState].filter(Boolean).join(", ")}</strong></span>
                        )}
                      </p>
                      {r.message && (
                        <p className="text-xs italic text-gold mt-1">&ldquo;{r.message}&rdquo;</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
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
                      <Eye className="w-4 h-4 text-gold hover:text-forest" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Gift Registry Status Box */}
            <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold text-forest-deep">
                  Physical Gifts Status
                </h3>
                <button
                  onClick={() => setActiveTab("gifts")}
                  className="text-xs text-forest hover:text-gold font-semibold underline"
                >
                  Manage
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs p-3 bg-white/70 rounded-xl border border-gold/30">
                  <span className="text-charcoal/70">Total Registry Items:</span>
                  <strong className="text-forest-deep font-mono text-sm">{stats?.physicalGiftsTotal ?? gifts.length}</strong>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-amber-800">Reserved by Guests:</span>
                  <strong className="text-amber-900 font-mono text-sm">{stats?.physicalGiftsReserved ?? 0}</strong>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-blue-800">Delivered / Received:</span>
                  <strong className="text-blue-900 font-mono text-sm">{stats?.physicalGiftsReceived ?? 0}</strong>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800">Available to Reserve:</span>
                  <strong className="text-emerald-900 font-mono text-sm">
                    {Math.max(
                      0,
                      (stats?.physicalGiftsTotal ?? gifts.length) -
                        (stats?.physicalGiftsReserved ?? 0) -
                        (stats?.physicalGiftsReceived ?? 0)
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {/* Quick Monetary Snapshot */}
            <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-3 bg-[#FAF4E6]">
              <h3 className="font-serif text-lg font-bold text-forest-deep">
                Monetary Contributions
              </h3>
              <p className="text-xs text-charcoal/70">
                Verified: <strong className="text-forest">{formatNaira(stats?.monetaryGiftsVerifiedTotal ?? 0)}</strong>
              </p>
              <p className="text-xs text-charcoal/70">
                Reported by Guests: <strong className="text-amber-800">{formatNaira(stats?.monetaryGiftsReportedTotal ?? 0)}</strong> ({monetaryGifts.length} notice(s))
              </p>
              <Button
                onClick={() => setActiveTab("monetary")}
                variant="gold"
                size="sm"
                className="w-full mt-2"
              >
                Review Monetary Gifts
              </Button>
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
                placeholder="Search guest name, code, email, phone..."
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
                className="px-3 py-2 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All RSVP Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          {filteredGuests.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
              <Users className="w-8 h-8 text-gold/40 mx-auto mb-2" />
              <p className="font-semibold text-forest-deep">No guests found matching your criteria.</p>
              <p className="text-[11px] mt-1">Guests will appear here automatically as they RSVP, or you can click &quot;Add Guest&quot; above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold/30 text-gold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Unique Code</th>
                    <th className="py-2.5 px-3">Guest Name</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Capacity</th>
                    <th className="py-2.5 px-3">VIP</th>
                    <th className="py-2.5 px-3">RSVP Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {filteredGuests.map((g) => (
                    <tr
                      key={g.id}
                      className="hover:bg-gold/5 cursor-pointer transition-colors"
                      onClick={() => setSelectedDetailItem({ type: "guest", data: g })}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-forest">{g.code}</td>
                      <td className="py-2.5 px-3 font-medium text-forest-deep">{g.name}</td>
                      <td className="py-2.5 px-3 text-charcoal/70">
                        {g.phone || g.email || "-"}
                      </td>
                      <td className="py-2.5 px-3">{g.maxGuests} max</td>
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
                      <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedDetailItem({ type: "guest", data: g })}
                            className="p-1 rounded text-gold hover:bg-gold/10"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGuest(g.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete Guest"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RSVP SUBMISSIONS */}
      {activeTab === "rsvps" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-deep">
                Detailed RSVP Responses ({filteredRSVPs.length})
              </h3>
              <p className="text-xs text-charcoal/60">
                Click any submission to view full details, companions, and personal notes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter name, city, state, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1.5 pl-8 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-gold absolute left-2.5 top-2 pointer-events-none" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          {filteredRSVPs.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
              <CheckCircle className="w-8 h-8 text-gold/40 mx-auto mb-2" />
              <p className="font-semibold text-forest-deep">No RSVP submissions found.</p>
              <p className="text-[11px] mt-1">Live submissions from guests will appear here with full location and companion details.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRSVPs.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedDetailItem({ type: "rsvp", data: r })}
                  className="p-4 rounded-2xl bg-white/80 border border-gold/30 space-y-2 hover:shadow-md hover:border-gold cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-forest-deep text-base">{r.guestName}</h4>
                        <span className="font-mono text-xs font-bold text-forest bg-gold/15 px-2 py-0.5 rounded">
                          {r.invitationCode || "Direct"}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/70 mt-0.5">
                        <span className="font-medium text-forest-deep">{r.phone}</span> &middot; {r.email}
                        {(r.attendingState || r.attendingCity) && (
                          <span> &middot; Attending from: <strong className="text-forest-deep">{[r.attendingCity, r.attendingState].filter(Boolean).join(", ")}</strong></span>
                        )}
                      </p>
                      {r.attendingEvents && (
                        <p className="text-xs font-semibold text-forest mt-1.5 bg-gold/15 px-2.5 py-1 rounded-lg w-fit border border-gold/30">
                          {r.attendingEvents}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          r.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "Declined"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {r.status} ({r.guestCount} Attendee{r.guestCount > 1 ? "s" : ""})
                      </span>
                      <span className="text-[10px] text-charcoal/50">
                        {r.submittedAt ? formatDate(r.submittedAt) : ""}
                      </span>
                    </div>
                  </div>

                  {r.attendees && r.attendees.length > 0 && (
                    <div className="text-xs bg-[#FAF4E6] p-2.5 rounded-xl border border-gold/20 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-semibold text-gold text-[10px] uppercase">
                        Companion Details:
                      </span>
                      {r.attendees.map((att, i) => (
                        <span key={i} className="text-charcoal/80">
                          <strong>#{i + 1}</strong> {att.name || "Unnamed"} {att.dietaryPreference ? `(${att.dietaryPreference})` : ""}
                        </span>
                      ))}
                    </div>
                  )}

                  {r.message && (
                    <p className="text-xs italic text-forest border-l-2 border-gold pl-2.5 py-0.5 line-clamp-2">
                      &ldquo;{r.message}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PHYSICAL GIFTS REGISTRY */}
      {activeTab === "gifts" && (
        <div className="space-y-6">
          <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-deep">
                  Physical Registry Items ({gifts.length})
                </h3>
                <p className="text-xs text-charcoal/60">
                  Curation retained to 3 select household items. Manage reservations and fulfillment.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {["All", "Kitchen", "Home Appliances"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAdminGiftCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gifts
                .filter((g) => {
                  if (adminGiftCategory === "All") return true;
                  if (adminGiftCategory === "Home Appliances") {
                    return g.category === "Home Appliances" || g.category === "Appliances";
                  }
                  return g.category === adminGiftCategory;
                })
                .map((g) => (
                  <div
                    key={g.id}
                    className="p-5 rounded-2xl bg-white/80 border border-gold/30 flex flex-col justify-between hover:shadow-lg transition-all"
                  >
                    <div>
                      {/* Product Image */}
                      {g.image && (
                        <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-gold/10 border border-gold/20">
                          <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-bold text-gold px-2 py-0.5 rounded-md bg-gold/10">
                          {g.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
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
                      <p className="text-xs text-charcoal/70 line-clamp-3 mt-1">{g.description}</p>
                      {g.estimatedValue && (
                        <p className="text-xs font-semibold text-gold mt-2">
                          Est. Value: {formatNaira(g.estimatedValue)}
                        </p>
                      )}

                      {g.reservedBy && (
                        <div className="text-xs font-semibold text-forest mt-3 bg-[#FAF4E6] p-3 rounded-xl border border-gold/25 space-y-1">
                          <p className="text-gold font-bold text-[10px] uppercase">Reserved In Name Of:</p>
                          <p className="text-forest-deep text-sm font-bold">{g.reservedBy}</p>
                          {g.reservedPhone && <p className="text-[11px] text-charcoal/70">Phone: {g.reservedPhone}</p>}
                          {g.reservedEmail && <p className="text-[11px] text-charcoal/70">Email: {g.reservedEmail}</p>}
                          {g.notes && <p className="text-[11px] italic text-gold mt-1">&ldquo;{g.notes}&rdquo;</p>}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gold/20 mt-4 flex flex-wrap gap-2 justify-end">
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
                          ✓ Available for reservation on public site
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MONETARY GIFTS / "I'VE SENT A GIFT" */}
      {activeTab === "monetary" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-deep">
                Monetary Gifts &amp; Bank Transfers ({filteredMonetaryGifts.length})
              </h3>
              <p className="text-xs text-charcoal/60">
                Verify guest transfer submissions to update your verified monetary fund.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={monetaryFilter}
                onChange={(e) => setMonetaryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Gifts</option>
                <option value="verified">Verified Only</option>
                <option value="reported">Reported (Unverified)</option>
              </select>
            </div>
          </div>

          {filteredMonetaryGifts.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
              <Coins className="w-8 h-8 text-gold/40 mx-auto mb-2" />
              <p className="font-semibold text-forest-deep">No monetary gifts recorded yet.</p>
              <p className="text-[11px] mt-1">When guests submit the &quot;I&apos;ve Sent a Gift&quot; form on the website, they will appear here for verification.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold/30 text-gold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Sender Name</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Date / Bank / Ref</th>
                    <th className="py-2.5 px-3">Message</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {filteredMonetaryGifts.map((mg) => (
                    <tr key={mg.id} className="hover:bg-gold/5 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-forest-deep">{mg.senderName}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-forest text-sm">
                        {formatNaira(mg.amount)}
                      </td>
                      <td className="py-2.5 px-3 text-charcoal/70">
                        {mg.senderPhone || mg.senderEmail || "-"}
                      </td>
                      <td className="py-2.5 px-3 text-charcoal/80">
                        <div>{mg.paymentDate}</div>
                        <div className="text-[10px] text-charcoal/60">
                          {[mg.bankUsed, mg.reference].filter(Boolean).join(" · ")}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-charcoal/80 max-w-xs truncate">
                        {mg.message || "-"}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            mg.status === "Verified"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {mg.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleMonetaryVerification(mg.id, mg.status)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              mg.status === "Verified"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                            title={mg.status === "Verified" ? "Mark as Reported" : "Verify Gift"}
                          >
                            {mg.status === "Verified" ? "Unverify" : "Verify"}
                          </button>
                          <button
                            onClick={() => handleDeleteMonetaryGift(mg.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: CUSTOM GIFT PROPOSALS */}
      {activeTab === "custom" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-deep">
                Custom Gift Proposals ({filteredCustomGifts.length})
              </h3>
              <p className="text-xs text-charcoal/60">
                Gifts proposed via &quot;I&apos;d Like to Give Something Else&quot;. Update status through fulfillment.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={customFilter}
                onChange={(e) => setCustomFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Proposals</option>
                <option value="under review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="received">Received</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
            </div>
          </div>

          {filteredCustomGifts.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
              <HeartHandshake className="w-8 h-8 text-gold/40 mx-auto mb-2" />
              <p className="font-semibold text-forest-deep">No custom gift proposals submitted yet.</p>
              <p className="text-[11px] mt-1">When guests submit alternative gift ideas, they will appear here for review and status coordination.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold/30 text-gold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Sender Name</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Gift Description</th>
                    <th className="py-2.5 px-3">Message</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {filteredCustomGifts.map((cg) => (
                    <tr key={cg.id} className="hover:bg-gold/5 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-forest-deep">{cg.senderName}</td>
                      <td className="py-2.5 px-3 text-charcoal/70">
                        {cg.senderPhone || cg.senderEmail || "-"}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-forest-deep max-w-xs">
                        {cg.giftDescription}
                      </td>
                      <td className="py-2.5 px-3 text-charcoal/80 max-w-xs truncate">
                        {cg.message || "-"}
                      </td>
                      <td className="py-2.5 px-3 text-charcoal/60 text-[10px]">
                        {cg.createdAt ? formatDate(cg.createdAt) : ""}
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={cg.status || "Under Review"}
                          onChange={(e) => handleUpdateCustomGiftStatus(cg.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg text-xs font-semibold bg-white border border-gold/40 focus:outline-none cursor-pointer"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Received">Received</option>
                          <option value="Fulfilled">Fulfilled</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleDeleteCustomGift(cg.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer"
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
          )}
        </div>
      )}

      {/* TAB 7: GUESTBOOK MODERATION */}
      {activeTab === "guestbook" && (
        <div className="card-luxury p-6 rounded-3xl border border-gold/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-deep">
                Guestbook of Love Moderation ({filteredGuestbook.length})
              </h3>
              <p className="text-xs text-charcoal/60">
                Review, approve, or hide guest prayers and wishes appearing on the live guest wall.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={guestbookFilter}
                onChange={(e) => setGuestbookFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gold/40 text-xs bg-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Messages</option>
                <option value="approved">Approved Only</option>
                <option value="hidden">Hidden Only</option>
              </select>
            </div>
          </div>

          {filteredGuestbook.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/60 bg-white/40 rounded-2xl border border-gold/20">
              <MessageSquareHeart className="w-8 h-8 text-gold/40 mx-auto mb-2" />
              <p className="font-semibold text-forest-deep">No guestbook messages found.</p>
              <p className="text-[11px] mt-1">When family and friends post love notes on the website, they will appear here for moderation.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGuestbook.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-white/80 border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-forest-deep text-sm">{m.author}</span>
                      {m.relationship && (
                        <span className="text-[10px] text-gold font-bold px-2 py-0.5 rounded-full bg-gold/15 uppercase">
                          {m.relationship}
                        </span>
                      )}
                      <span className="text-[10px] text-charcoal/50">
                        {m.createdAt ? formatDate(m.createdAt) : ""}
                      </span>
                    </div>
                    <p className="text-xs italic text-charcoal/90">&ldquo;{m.message}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.approved
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {m.approved ? "Approved" : "Hidden"}
                    </span>
                    <button
                      onClick={() => handleToggleGuestbookApproval(m.id, m.approved)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        m.approved
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {m.approved ? "Hide" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleDeleteGuestbookMessage(m.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: WEBSITE SETTINGS CMS */}
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-gold/40 text-xs bg-white font-mono font-bold"
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
                max="2"
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
                className="w-4 h-4 rounded text-forest focus:ring-forest border-gold/50 cursor-pointer"
              />
              <label htmlFor="isVipCheck" className="text-xs text-forest-deep font-semibold cursor-pointer">
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

      {/* MODAL: DETAIL INSPECTION (RSVP / GUEST) */}
      <Modal
        isOpen={Boolean(selectedDetailItem)}
        onClose={() => setSelectedDetailItem(null)}
        title={selectedDetailItem?.type === "rsvp" ? "RSVP Record Details" : "Guest Invitation Details"}
        subtitle={selectedDetailItem?.data?.guestName || selectedDetailItem?.data?.name || ""}
      >
        {selectedDetailItem && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#FAF4E6] p-4 rounded-2xl border border-gold/30 space-y-3">
              <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider">Pass Code</span>
                <span className="font-mono text-base font-bold text-forest">
                  {selectedDetailItem.data.invitationCode || selectedDetailItem.data.code || "Direct"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal/60 block">Full Name</span>
                  <span className="font-semibold text-forest-deep text-sm">
                    {selectedDetailItem.data.guestName || selectedDetailItem.data.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal/60 block">Status</span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      (selectedDetailItem.data.status || selectedDetailItem.data.rsvpStatus) === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : (selectedDetailItem.data.status || selectedDetailItem.data.rsvpStatus) === "Declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedDetailItem.data.status || selectedDetailItem.data.rsvpStatus || "Pending"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal/60 block">Phone</span>
                  <span className="text-forest-deep">{selectedDetailItem.data.phone || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal/60 block">Email</span>
                  <span className="text-forest-deep">{selectedDetailItem.data.email || "Not provided"}</span>
                </div>
              </div>

              {(selectedDetailItem.data.attendingCity || selectedDetailItem.data.attendingState) && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold block">Attending From</span>
                  <span className="font-medium text-forest-deep">
                    {[selectedDetailItem.data.attendingCity, selectedDetailItem.data.attendingState].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {selectedDetailItem.data.attendingEvents && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold block">Events Attending</span>
                  <span className="font-medium text-forest-deep">
                    {selectedDetailItem.data.attendingEvents}
                  </span>
                </div>
              )}
            </div>

            {selectedDetailItem.data.attendees && selectedDetailItem.data.attendees.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-gold/30 space-y-2">
                <span className="text-[10px] uppercase font-bold text-forest tracking-wider block">
                  Companion Names &amp; Details ({selectedDetailItem.data.attendees.length})
                </span>
                <div className="space-y-1.5">
                  {selectedDetailItem.data.attendees.map((att: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gold/5 border border-gold/15">
                      <span className="font-semibold text-forest-deep">
                        #{i + 1} {att.name || "Companion"}
                      </span>
                      {att.dietaryPreference && (
                        <span className="text-[10px] text-charcoal/70 bg-white px-2 py-0.5 rounded border border-gold/20">
                          Diet: {att.dietaryPreference}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedDetailItem.data.message && (
              <div className="p-3 rounded-2xl bg-white border border-gold/30">
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider block mb-1">
                  Personal Note or Prayer
                </span>
                <p className="italic text-charcoal/90 leading-relaxed">
                  &ldquo;{selectedDetailItem.data.message}&rdquo;
                </p>
              </div>
            )}

            <div className="text-[10px] text-charcoal/50 text-right">
              Submitted: {selectedDetailItem.data.submittedAt ? formatDate(selectedDetailItem.data.submittedAt) : "N/A"}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
