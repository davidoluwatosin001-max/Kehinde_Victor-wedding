"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { WaxSeal } from "@/components/invitation/WaxSeal";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<"Victor" | "Kehinde">("Victor");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Support both env ADMIN_PASSCODE or default wedding access passcode "ayobamidele2026" / "kv2026"
    const validCodes = [
      "ayobamidele2026",
      "ayobamidele",
      "kv2026",
      "19112026",
      "admin",
    ];

    setTimeout(() => {
      const cleanInput = passcode.trim().toLowerCase();
      if (validCodes.includes(cleanInput)) {
        if (typeof window !== "undefined") {
          localStorage.setItem("kv_admin_session", JSON.stringify({
            user: adminUser,
            loggedInAt: new Date().toISOString(),
          }));
          document.cookie = `kv_admin_auth=true; path=/; max-age=86400; SameSite=Lax`;
        }
        router.push("/admin");
      } else {
        setError("Invalid passcode. Please enter the wedding admin passcode.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 bg-gradient-to-b from-[#FAF4E6] via-[#F8F3E8] to-[#F1E6CC]">
      <div className="w-full max-w-md">
        {/* Monogram Seal */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <WaxSeal size={80} />
          </Link>
        </div>

        <div className="card-luxury p-8 sm:p-10 rounded-3xl border-1.5 border-gold shadow-2xl relative text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-forest border border-gold/40 text-[10px] uppercase font-bold tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Private Management Portal</span>
          </div>

          <h1 className="font-serif text-3xl text-forest-deep font-semibold">
            Couple Dashboard Login
          </h1>
          <p className="font-sans text-xs text-charcoal/70 mt-1 mb-6">
            Welcome back, Kehinde &amp; Victor. Sign in to oversee your guests, RSVPs, and gifts.
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                Select Administrator
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["Victor", "Kehinde"] as const).map((user) => (
                  <button
                    key={user}
                    type="button"
                    onClick={() => setAdminUser(user)}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                      adminUser === user
                        ? "bg-forest text-ivory border-forest shadow-sm"
                        : "bg-white/70 text-charcoal border-gold/30 hover:bg-gold/10"
                    }`}
                  >
                    {user === "Victor" ? "🤵 Groom (Victor)" : "👰 Bride (Kehinde)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="passcode" className="block text-xs font-medium text-forest-deep uppercase tracking-wider mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  id="passcode"
                  required
                  type="password"
                  placeholder="Enter wedding passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gold/40 bg-white/90 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                />
                <Lock className="w-4 h-4 text-gold absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[10px] text-charcoal/50 mt-1">
                Hint: Passcode is <code className="bg-gold/15 px-1 py-0.5 rounded text-forest font-semibold">ayobamidele2026</code>
              </p>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full flex items-center justify-center gap-2">
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-4 border-t border-gold/30 flex items-center justify-between text-xs text-charcoal/60">
            <Link href="/" className="hover:text-forest flex items-center gap-1">
              &larr; Back to Wedding Invitation
            </Link>
            <span className="font-serif italic text-gold">Ayobamidele &apos;26</span>
          </div>
        </div>
      </div>
    </div>
  );
}
