"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Camera, 
  Heart, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Shuffle, 
  Check, 
  Layers,
  Crown,
  Smile
} from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { FlourishCorner } from "@/components/invitation/FlourishCorner";

export interface BoothPhoto {
  id: string;
  src: string;
  title: string;
  category: "traditional" | "modern";
  tag: string;
  caption: string;
}

export const BOOTH_PHOTOS: BoothPhoto[] = [
  {
    id: "trad-dance",
    src: "/images/booth/booth-1-trad-dance.jpg",
    title: "A Dance of Destiny",
    category: "traditional",
    tag: "Traditional Royalty",
    caption: "Dancing joyfully into our forever, surrounded by love, family, and divine favor.",
  },
  {
    id: "trad-embrace",
    src: "/images/booth/booth-2-trad-embrace.jpg",
    title: "Sacred Devotion",
    category: "traditional",
    tag: "Traditional Royalty",
    caption: "A quiet moment of tender love, united prayers, and gentle reassurance.",
  },
  {
    id: "trad-regal",
    src: "/images/booth/booth-3-trad-regal.jpg",
    title: "Regal Majesty",
    category: "traditional",
    tag: "Traditional Royalty",
    caption: "Dressed in crown-worthy majesty, standing tall in grace and timeless splendor.",
  },
  {
    id: "trad-holding-hands",
    src: "/images/booth/booth-4-trad-holding-hands.jpg",
    title: "Hand in Hand",
    category: "traditional",
    tag: "Traditional Royalty",
    caption: "Walking through every season with intertwined fingers and harmonious hearts.",
  },
  {
    id: "trad-fulllength",
    src: "/images/booth/booth-5-trad-fulllength.jpg",
    title: "Crown of Splendor",
    category: "traditional",
    tag: "Traditional Royalty",
    caption: "Celebrating our rich heritage and the glorious beginning of a generational blessing.",
  },
  {
    id: "modern-seated",
    src: "/images/booth/booth-6-modern-seated.jpg",
    title: "Quiet Intimacy",
    category: "modern",
    tag: "Modern Romance",
    caption: "Our absolute favorite place in the whole world is simply right beside each other.",
  },
  {
    id: "modern-standing",
    src: "/images/booth/booth-7-modern-standing.jpg",
    title: "Radiant & Joyful",
    category: "modern",
    tag: "Modern Romance",
    caption: "Two best friends, effortless laughter, and infectious joy built on genuine friendship.",
  },
  {
    id: "modern-hug",
    src: "/images/booth/booth-8-modern-hug.jpg",
    title: "Endless Warmth",
    category: "modern",
    tag: "Modern Romance",
    caption: "Wrapped in an embrace that feels like peace, comfort, and home wherever we are.",
  },
  {
    id: "modern-gaze",
    src: "/images/booth/booth-9-modern-gaze.jpg",
    title: "Adoring Eyes",
    category: "modern",
    tag: "Modern Romance",
    caption: "Looking at God's greatest earthly gift with deep admiration and reverent wonder.",
  },
];

type FilterTab = "all" | "traditional" | "modern" | "strip";
type StripTheme = "ivory" | "forest" | "noir";

export const PictureBoothSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    "trad-dance": 42,
    "trad-embrace": 56,
    "trad-regal": 39,
    "trad-holding-hands": 48,
    "trad-fulllength": 61,
    "modern-seated": 52,
    "modern-standing": 45,
    "modern-hug": 67,
    "modern-gaze": 58,
  });

  // Photo strip state (3 selected photos)
  const [stripPhotoIds, setStripPhotoIds] = useState<string[]>([
    "trad-dance",
    "modern-seated",
    "trad-embrace",
  ]);
  const [stripTheme, setStripTheme] = useState<StripTheme>("ivory");
  const [isGeneratingStrip, setIsGeneratingStrip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load likes from localStorage on mount
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem("kv_booth_likes");
      if (savedLikes) {
        setLikes((prev) => ({ ...prev, ...JSON.parse(savedLikes) }));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikes((prev) => {
      const updated = { ...prev, [photoId]: (prev[photoId] || 0) + 1 };
      try {
        localStorage.setItem("kv_booth_likes", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Subtle heart confetti burst
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.7 },
      colors: ["#AD802C", "#C59B27", "#1E3B29", "#FAF4E6"],
    });
  };

  // Filtered photos for gallery view
  const filteredPhotos = BOOTH_PHOTOS.filter((photo) => {
    if (activeTab === "all") return true;
    if (activeTab === "traditional") return photo.category === "traditional";
    if (activeTab === "modern") return photo.category === "modern";
    return true;
  });

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  // Strip photo selection toggle
  const toggleStripPhoto = (photoId: string) => {
    if (stripPhotoIds.includes(photoId)) {
      if (stripPhotoIds.length <= 1) {
        showToast("Please keep at least 1 photo on your strip!");
        return;
      }
      setStripPhotoIds(stripPhotoIds.filter((id) => id !== photoId));
    } else {
      if (stripPhotoIds.length >= 4) {
        showToast("Strip fits up to 4 photos. Replacing the first one.");
        setStripPhotoIds([...stripPhotoIds.slice(1), photoId]);
      } else {
        setStripPhotoIds([...stripPhotoIds, photoId]);
      }
    }
  };

  const shuffleStripPhotos = () => {
    const shuffled = [...BOOTH_PHOTOS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map((p) => p.id);
    setStripPhotoIds(selected);
    showToast("Shuffled photo booth memories! 🎲");
  };

  // Download high-resolution single photo
  const downloadSinglePhoto = (photo: BoothPhoto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const link = document.createElement("a");
    link.href = photo.src;
    link.download = `Kehinde-Victor-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading "${photo.title}"...`);
  };

  // Render & Download Photo Strip using HTML5 Canvas
  const downloadPhotoStrip = async () => {
    setIsGeneratingStrip(true);
    showToast("Crafting your luxury photo strip...");

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      const stripPhotos = stripPhotoIds
        .map((id) => BOOTH_PHOTOS.find((p) => p.id === id))
        .filter((p): p is BoothPhoto => Boolean(p));

      const count = stripPhotos.length;
      const width = 600;
      const photoWidth = 520;
      const photoHeight = 780; // 2:3 aspect
      const headerHeight = 220;
      const footerHeight = 160;
      const padding = 40;
      const spacing = 30;
      const totalHeight = headerHeight + count * photoHeight + (count - 1) * spacing + footerHeight;

      canvas.width = width;
      canvas.height = totalHeight;

      // Background styling
      if (stripTheme === "ivory") {
        ctx.fillStyle = "#FAF4E6";
        ctx.fillRect(0, 0, width, totalHeight);
        // Outer decorative gold border
        ctx.strokeStyle = "#C59B27";
        ctx.lineWidth = 4;
        ctx.strokeRect(12, 12, width - 24, totalHeight - 24);
        ctx.strokeStyle = "#AD802C";
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, width - 40, totalHeight - 40);
      } else if (stripTheme === "forest") {
        ctx.fillStyle = "#1E3B29";
        ctx.fillRect(0, 0, width, totalHeight);
        ctx.strokeStyle = "#C59B27";
        ctx.lineWidth = 4;
        ctx.strokeRect(12, 12, width - 24, totalHeight - 24);
        ctx.strokeStyle = "#EADBB6";
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, width - 40, totalHeight - 40);
      } else {
        // Noir
        ctx.fillStyle = "#161616";
        ctx.fillRect(0, 0, width, totalHeight);
        ctx.strokeStyle = "#C59B27";
        ctx.lineWidth = 4;
        ctx.strokeRect(12, 12, width - 24, totalHeight - 24);
        ctx.strokeStyle = "#888888";
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, width - 40, totalHeight - 40);
      }

      // Header Text
      ctx.textAlign = "center";
      const headerTextColor = stripTheme === "ivory" ? "#1E3B29" : "#FAF4E6";
      const goldColor = "#C59B27";

      ctx.font = "bold 22px serif";
      ctx.fillStyle = goldColor;
      ctx.fillText("AYOBAMIDELE '26", width / 2, 65);

      ctx.font = "bold 32px serif";
      ctx.fillStyle = headerTextColor;
      ctx.fillText("Kehinde & Victor", width / 2, 110);

      ctx.font = "italic 18px serif";
      ctx.fillStyle = goldColor;
      ctx.fillText("★  Two Hearts • One Journey Forever  ★", width / 2, 145);

      // Decorative divider
      ctx.beginPath();
      ctx.moveTo(80, 175);
      ctx.lineTo(width - 80, 175);
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Load all images asynchronously
      const loadedImages = await Promise.all(
        stripPhotos.map(
          (photo) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.src = photo.src;
              img.onload = () => resolve(img);
              img.onerror = reject;
            })
        )
      );

      // Draw photos onto strip
      let currentY = headerHeight;
      loadedImages.forEach((img, i) => {
        const x = padding;
        const y = currentY;

        // Image frame shadow/border
        ctx.fillStyle = stripTheme === "ivory" ? "#F5ECE1" : "#254832";
        ctx.fillRect(x - 4, y - 4, photoWidth + 8, photoHeight + 8);

        ctx.strokeStyle = goldColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 4, y - 4, photoWidth + 8, photoHeight + 8);

        // Draw image
        ctx.drawImage(img, x, y, photoWidth, photoHeight);

        // Caption label below each image
        ctx.fillStyle = "rgba(30, 59, 41, 0.75)";
        ctx.fillRect(x, y + photoHeight - 40, photoWidth, 40);

        ctx.font = "italic 17px serif";
        ctx.fillStyle = "#FAF4E6";
        ctx.textAlign = "center";
        ctx.fillText(stripPhotos[i].title, width / 2, y + photoHeight - 14);

        currentY += photoHeight + spacing;
      });

      // Footer
      const footerY = currentY + 30;
      ctx.beginPath();
      ctx.moveTo(80, footerY);
      ctx.lineTo(width - 80, footerY);
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 20px serif";
      ctx.fillStyle = goldColor;
      ctx.fillText("19 • 11 • 2026", width / 2, footerY + 45);

      ctx.font = "italic 16px serif";
      ctx.fillStyle = headerTextColor;
      ctx.fillText("Forever & Always In Love", width / 2, footerY + 75);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `Ayobamidele26-PhotoBooth-Strip-${stripTheme}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Confetti celebration
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C59B27", "#1E3B29", "#FAF4E6", "#AD802C"],
      });

      showToast("Photo strip saved to your device! 🎉");
    } catch (err) {
      console.error("Failed to generate strip", err);
      showToast("Error generating photo strip. Please try again.");
    } finally {
      setIsGeneratingStrip(false);
    }
  };

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="booth" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF4E6]/85 backdrop-blur-[2px] relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-forest/15 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold tracking-widest uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Ayobamidele '26 Keepsakes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-medium tracking-tight">
            Mini Picture Booth
          </h2>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-12 h-px bg-gold/60" />
            <Sparkles className="w-4 h-4 text-gold fill-gold/40" />
            <span className="w-12 h-px bg-gold/60" />
          </div>

          <p className="font-serif text-base sm:text-lg text-charcoal/85 leading-relaxed">
            Step into our celebratory picture booth! Explore our royal traditional captures, chic modern studio moments, and craft your own personalized photo strip keepsake.
          </p>
        </div>

        {/* Tab Selector & Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${
              activeTab === "all"
                ? "bg-forest text-ivory border-gold shadow-md"
                : "bg-ivory/80 text-forest-deep border-gold/30 hover:bg-gold/10 hover:border-gold"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>All Captures ({BOOTH_PHOTOS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("traditional")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${
              activeTab === "traditional"
                ? "bg-forest text-ivory border-gold shadow-md"
                : "bg-ivory/80 text-forest-deep border-gold/30 hover:bg-gold/10 hover:border-gold"
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>Traditional Royalty (5)</span>
          </button>

          <button
            onClick={() => setActiveTab("modern")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${
              activeTab === "modern"
                ? "bg-forest text-ivory border-gold shadow-md"
                : "bg-ivory/80 text-forest-deep border-gold/30 hover:bg-gold/10 hover:border-gold"
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-gold" />
            <span>Modern Romance (4)</span>
          </button>

          <button
            onClick={() => setActiveTab("strip")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border ${
              activeTab === "strip"
                ? "bg-gradient-to-r from-[#AD802C] via-[#C59B27] to-[#AD802C] text-ivory border-gold-light shadow-lg scale-105"
                : "bg-gold/15 text-gold-dark border-gold/40 hover:bg-gold/25"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-gold-dark" />
            <span className="font-semibold">🎞️ Classic Photo Strip</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: GRID GALLERY (All / Traditional / Modern) */}
        {/* ============================================================== */}
        {activeTab !== "strip" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => {
              const likeCount = likes[photo.id] || 0;
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className="group relative cursor-pointer card-luxury p-3.5 sm:p-4 rounded-3xl border border-gold/40 hover:border-gold shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col bg-[#FDFBF7]"
                >
                  {/* Polaroid Gold Pin Accent */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light shadow-md border border-white/60 z-20" />

                  {/* Corner Flourish on Card */}
                  <FlourishCorner position="tl" className="top-2 left-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <FlourishCorner position="br" className="bottom-2 right-2 opacity-40 group-hover:opacity-100 transition-opacity" />

                  {/* Image Container with 2:3 aspect ratio */}
                  <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-forest/10 border border-gold/30">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay & Hover Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                      {/* Top Action: Expand */}
                      <div className="flex justify-end">
                        <span className="p-2 rounded-full bg-forest-deep/80 border border-gold/50 text-ivory hover:text-gold hover:scale-110 transition-all shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Bottom Action: Click prompt */}
                      <p className="text-center text-xs font-serif italic text-ivory/90 tracking-wide">
                        Click to view full memory
                      </p>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-forest-deep/80 backdrop-blur-sm border border-gold/50 text-[10px] font-medium text-ivory tracking-wide">
                      {photo.tag}
                    </div>
                  </div>

                  {/* Photo Info & Romantic Caption */}
                  <div className="pt-4 pb-1 px-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-lg font-semibold text-forest-deep group-hover:text-gold-dark transition-colors">
                          {photo.title}
                        </h3>
                        {/* Heart Button */}
                        <button
                          onClick={(e) => handleLike(photo.id, e)}
                          title="Send love to this memory"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/30 text-gold-dark text-xs font-medium transition-transform active:scale-125"
                        >
                          <Heart className="w-3.5 h-3.5 text-gold fill-gold/40" />
                          <span>{likeCount}</span>
                        </button>
                      </div>

                      <p className="font-serif text-xs text-charcoal/80 leading-relaxed mt-1.5 italic">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    </div>

                    {/* Footer Date Stamp & Quick Actions */}
                    <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between text-[11px] text-charcoal/60">
                      <span className="font-sans font-semibold tracking-wider text-gold-dark uppercase">
                        19 &middot; 11 &middot; 2026
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => downloadSinglePhoto(photo, e)}
                          className="p-1 rounded-lg hover:bg-gold/15 text-forest-deep transition-colors"
                          title="Download photo"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: INTERACTIVE PHOTO STRIP BOOTH */}
        {/* ============================================================== */}
        {activeTab === "strip" && (
          <div className="max-w-4xl mx-auto">
            {/* Booth Controls Card */}
            <div className="card-luxury p-6 sm:p-8 rounded-3xl border border-gold shadow-xl mb-10 bg-[#FDFBF7]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gold/30">
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl text-forest-deep font-semibold">
                    Keepsake Photo Strip Creator
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/80 font-serif italic mt-1">
                    Select your favorite captures, choose a luxury theme, and download your high-resolution photobooth strip.
                  </p>
                </div>

                {/* Strip Theme Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/70 mr-1">
                    Theme:
                  </span>
                  <button
                    onClick={() => setStripTheme("ivory")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      stripTheme === "ivory"
                        ? "bg-[#FAF4E6] text-forest-deep border-gold shadow-md font-bold"
                        : "bg-transparent text-charcoal/70 border-gold/30 hover:border-gold"
                    }`}
                  >
                    Ivory &amp; Gold
                  </button>
                  <button
                    onClick={() => setStripTheme("forest")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      stripTheme === "forest"
                        ? "bg-forest text-ivory border-gold shadow-md font-bold"
                        : "bg-transparent text-charcoal/70 border-gold/30 hover:border-gold"
                    }`}
                  >
                    Forest Green
                  </button>
                  <button
                    onClick={() => setStripTheme("noir")}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      stripTheme === "noir"
                        ? "bg-neutral-900 text-ivory border-gold shadow-md font-bold"
                        : "bg-transparent text-charcoal/70 border-gold/30 hover:border-gold"
                    }`}
                  >
                    Classic Noir
                  </button>
                </div>
              </div>

              {/* Photo Selector Drawer */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-forest-deep">
                    Tap to Choose Photos ({stripPhotoIds.length}/4 selected)
                  </span>
                  <button
                    onClick={shuffleStripPhotos}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-gold transition-colors"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle Random 3</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
                  {BOOTH_PHOTOS.map((photo) => {
                    const isSelected = stripPhotoIds.includes(photo.id);
                    const selectedIndex = stripPhotoIds.indexOf(photo.id);
                    return (
                      <button
                        key={photo.id}
                        onClick={() => toggleStripPhoto(photo.id)}
                        className={`relative aspect-[2/3] rounded-xl overflow-hidden border-2 transition-all ${
                          isSelected
                            ? "border-gold shadow-md scale-95 ring-2 ring-gold/50"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-forest/40 flex items-center justify-center">
                            <span className="w-5 h-5 rounded-full bg-gold text-forest-deep font-bold text-xs flex items-center justify-center shadow">
                              {selectedIndex + 1}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Strip Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={downloadPhotoStrip}
                  isLoading={isGeneratingStrip}
                  className="w-full sm:w-auto shadow-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download Keepsake Photo Strip (PNG)</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={shuffleStripPhotos}
                  className="w-full sm:w-auto"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  <span>Shuffle Photos</span>
                </Button>
              </div>
            </div>

            {/* Live Strip Mockup Preview */}
            <div className="flex justify-center pb-8">
              <div
                className={`w-full max-w-sm rounded-3xl p-5 sm:p-7 shadow-2xl border-4 transition-all duration-300 relative ${
                  stripTheme === "ivory"
                    ? "bg-[#FAF4E6] border-gold text-forest-deep"
                    : stripTheme === "forest"
                    ? "bg-forest border-gold text-ivory"
                    : "bg-neutral-900 border-gold text-ivory"
                }`}
              >
                {/* Decorative Inner Inset */}
                <div className="absolute inset-2 sm:inset-3 border border-gold/40 rounded-2xl pointer-events-none" />

                {/* Strip Header */}
                <div className="text-center pt-2 pb-4">
                  <p className="font-sans text-[10px] tracking-[0.25em] text-gold uppercase font-bold">
                    AYOBAMIDELE '26
                  </p>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold tracking-wide mt-0.5">
                    Kehinde &amp; Victor
                  </h4>
                  <div className="flex items-center justify-center gap-2 my-2">
                    <span className="w-6 h-px bg-gold/60" />
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span className="w-6 h-px bg-gold/60" />
                  </div>
                  <p className="text-[10px] font-serif italic text-gold">
                    Two Hearts &middot; One Journey Forever
                  </p>
                </div>

                {/* Photo Stack in Strip */}
                <div className="space-y-4 my-3">
                  {stripPhotoIds.map((id, index) => {
                    const photo = BOOTH_PHOTOS.find((p) => p.id === id);
                    if (!photo) return null;
                    return (
                      <div
                        key={id}
                        className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border-2 border-gold shadow-md bg-forest/20 group"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-forest-deep/85 py-1 px-2 text-center border-t border-gold/40">
                          <p className="text-[10px] sm:text-xs font-serif italic text-ivory tracking-wide">
                            {photo.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strip Footer */}
                <div className="text-center pt-3 pb-2 border-t border-gold/40 mt-4">
                  <p className="font-serif text-xs font-bold text-gold tracking-widest uppercase">
                    19 &middot; 11 &middot; 2026
                  </p>
                  <p className="font-serif italic text-[11px] opacity-80 mt-0.5">
                    Forever &amp; Always In Love
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ============================================================== */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-forest-deep/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-ivory z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </span>
              <span className="hidden sm:inline font-serif text-sm text-ivory/80 italic">
                {activePhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => downloadSinglePhoto(activePhoto, e)}
                className="p-2.5 rounded-full bg-ivory/10 hover:bg-gold/30 border border-gold/40 text-ivory hover:text-gold transition-colors"
                title="Download photo"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => handleLike(activePhoto.id, e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory/10 hover:bg-gold/30 border border-gold/40 text-gold transition-colors"
                title="Send Love"
              >
                <Heart className="w-4 h-4 fill-gold text-gold" />
                <span className="text-xs font-bold">{likes[activePhoto.id] || 0}</span>
              </button>

              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-ivory/10 hover:bg-red-500/20 border border-gold/40 text-ivory hover:text-red-400 transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-ivory/15 hover:bg-gold/30 border border-gold/40 text-ivory hover:text-gold transition-all duration-200 z-20"
            title="Previous (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-ivory/15 hover:bg-gold/30 border border-gold/40 text-ivory hover:text-gold transition-all duration-200 z-20"
            title="Next (Right arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Centered Modal Image & Details */}
          <div
            className="relative max-w-lg w-full flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[2/3] w-full max-h-[70vh] rounded-2xl overflow-hidden border-2 border-gold shadow-2xl bg-forest">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Bottom Caption & Wedding Monogram */}
            <div className="mt-4 text-center max-w-md px-4">
              <h4 className="font-serif text-xl sm:text-2xl text-gold font-medium">
                {activePhoto.title}
              </h4>
              <p className="font-serif italic text-xs sm:text-sm text-ivory/90 mt-1 leading-relaxed">
                &ldquo;{activePhoto.caption}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3 mt-2 text-[10px] text-ivory/60 uppercase tracking-widest">
                <span>{activePhoto.tag}</span>
                <span>&middot;</span>
                <span>Kehinde Elizabeth &amp; Victor Oluwatosin</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest-deep text-ivory border border-gold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
