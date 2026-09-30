"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Heart, LogOut, ExternalLink, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === "/admin/login") return;

    const sessionStr = localStorage.getItem("kv_admin_session");
    if (!sessionStr) {
      router.push("/admin/login");
    } else {
      try {
        const session = JSON.parse(sessionStr);
        setAdminUser(session.user || "Admin");
      } catch {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("kv_admin_session");
    document.cookie = "kv_admin_auth=; path=/; max-age=0";
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Admin Top Navigation Bar */}
      <header className="bg-forest-deep text-ivory border-b border-gold/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold text-xs font-serif font-bold">
              K&amp;V
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wide text-ivory leading-tight">
                Kehinde &amp; Victor &middot; Admin
              </h1>
              <p className="text-[10px] text-gold uppercase tracking-wider">
                19 November 2026 &middot; Ayobamidele '26
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gold-light hover:text-white bg-forest hover:bg-forest-light border border-gold/30 transition-colors"
            >
              <span>View Public Invitation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-gold/30">
              <span className="text-xs text-ivory/80 hidden sm:inline">
                Signed in as <strong className="text-gold">{adminUser}</strong>
              </span>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-ivory/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
