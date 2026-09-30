import type { Metadata } from "next";
import "./globals.css";

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
        url: "/images/wedding-card-luxury.png",
        width: 1200,
        height: 630,
        alt: "Kehinde & Victor Wedding Invitation Card",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kehinde & Victor Wedding — 19 November 2026",
    description: "Two Hearts. One Journey Forever.",
    images: ["/images/wedding-card-luxury.png"],
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
      <body className="bg-[#FAF4E6] text-[#2B2823] antialiased selection:bg-gold/20 selection:text-forest-deep">
        {children}
      </body>
    </html>
  );
}
