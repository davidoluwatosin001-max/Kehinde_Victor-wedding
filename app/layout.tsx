import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Kehinde & Victor — Wedding Digital Guest Experience",
  description:
    "With grateful hearts, we invite you to celebrate the holy matrimony of Kehinde Elizabeth & Victor Oluwatosin. Two Hearts. One Journey Forever. 18th & 19th November 2026.",
  openGraph: {
    title: "Kehinde & Victor Wedding — 19 November 2026",
    description: "Two Hearts. One Journey Forever. RSVP, schedule, gift registry, and event details.",
    url: "https://www.kehindeandvictor.com",
    siteName: "Kehinde & Victor Wedding",
    images: [
      {
        url: "/images/couple.jpg",
        width: 819,
        height: 1024,
        alt: "Kehinde & Victor Wedding — Ayobamidele '26",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kehinde & Victor Wedding — 19 November 2026",
    description: "Two Hearts. One Journey Forever.",
    images: ["/images/couple.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAF4E6] text-[#2B2823] antialiased selection:bg-gold/20 selection:text-forest-deep relative min-h-screen">
        {/* Full-site Faint & Blurry Background of Kehinde & Victor */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-md sm:blur-lg scale-105 opacity-[0.12] sm:opacity-[0.14]"
            style={{
              backgroundImage: "url('/images/couple.jpg')",
            }}
          />
          {/* Subtle warm ivory gradient to harmonize with brand theme and preserve contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4E6]/50 via-transparent to-[#FAF4E6]/55" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
