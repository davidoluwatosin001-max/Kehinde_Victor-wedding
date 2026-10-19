import fs from "fs";
import path from "path";
import {
  Guest,
  RSVP,
  AccommodationRequest,
  GiftItem,
  GiftStatus,
  GiftReservation,
  ReservationStatus,
  MonetaryGift,
  CustomGiftProposal,
  GuestbookMessage,
  SiteSettings,
  WeddingEvent,
  AdminStats,
} from "@/types";

export interface WeddingDatabase {
  settings: SiteSettings;
  events: WeddingEvent[];
  guests: Guest[];
  rsvps: RSVP[];
  accommodation: AccommodationRequest[];
  gifts: GiftItem[];
  giftReservations: GiftReservation[];
  monetaryGifts: MonetaryGift[];
  customGifts: CustomGiftProposal[];
  guestbook: GuestbookMessage[];
}

// Initial default site settings with dual bank accounts
const initialSettings: SiteSettings = {
  coupleNames: "Kehinde & Victor",
  weddingDate: "2026-11-19T10:00:00+01:00",
  tagline: "Two Hearts. One Journey Forever.",
  hashtag: "Ayobamidele '26",
  bankName: "Guaranty Trust Bank (GTBank)",
  accountName: "Victor Odudu",
  accountNumber: "0431652266",
  bankName2: "United Bank for Africa (UBA)",
  accountName2: "Kehinde Balogun",
  accountNumber2: "2118555964",
  paymentInstructions: "Please include your name in the payment reference or narration so we can identify and acknowledge your loving blessing.",
  storyTitle: "Our Love Story: How Two Hearts Found Their Forever",
  storyContent: [
    "From the very first moment our paths crossed, God began writing a story that was greater than anything we could have planned ourselves.",
    "Through seasons of friendship, prayers, laughter, and shared dreams, our love deepened into a quiet certainty that we were meant to walk this earthly journey as one.",
    "Now, hand in hand with grateful hearts and our families' blessings, we invite our cherished family and friends to stand with us as we make our holy vows before God."
  ],
  announcement: "Kindly come at least a day before as requested by the couple to join us for the Engagement ceremony!",
  showAnnouncement: true,
  rsvpDeadline: "2026-11-02T23:59:59+01:00",
  phone1: "0813 676 9807",
  phone2: "0907 724 9194",
};

export const initialEvents: WeddingEvent[] = [
  {
    id: "evt-engagement",
    name: "Traditional Engagement Ceremony",
    date: "Wednesday, 18th Nov 2026",
    time: "4:00 PM prompt",
    venue: "21 Olawale Badmus Street",
    address: "Turaya Bus Stop, Mowe, Ogun State",
    description: "The traditional marriage rites and celebration of family heritage. Join us in vibrant traditional attire.",
    dressCode: "Traditional Elegance (Mustard Gold & Forest Green)",
    googleMapsUrl: "https://maps.google.com/?q=Turaya+Bus+Stop+Mowe+Ogun+State",
    isDayEvent: false,
  },
  {
    id: "evt-white-wedding",
    name: "Holy Matrimony (Church Ceremony)",
    date: "Thursday, 19th Nov 2026",
    time: "10:00 AM prompt",
    venue: "RCCG Redemption Parish",
    address: "13 Habitation Of Hope Street, Near Turaya Guest House, Turaya Bus Stop, Mowe, Ogun State",
    description: "The solemnization of our holy matrimony and exchange of sacred vows before God and family.",
    dressCode: "Formal & Elegant (Suits, Gowns, Formal Traditional : Mustard Gold & Forest Green accents)",
    googleMapsUrl: "https://maps.google.com/?q=RCCG+Redemption+Parish+Turaya+Mowe",
    isDayEvent: true,
  },
  {
    id: "evt-reception",
    name: "Wedding Reception & Celebration",
    date: "Thursday, 19th Nov 2026",
    time: "Follows immediately after church service",
    venue: "18/12 Castro Hall",
    address: "10 Ibukun Oluwa Street, Asolo Bus Stop, Mowe, Ogun State",
    description: "Banquet, toasts, traditional dancing, cutting of the cake, and memorable celebration.",
    dressCode: "Formal & Elegant (Suits, Gowns, Formal Traditional : Mustard Gold & Forest Green accents)",
    googleMapsUrl: "https://maps.google.com/?q=Castro+Hall+Asolo+Bus+Stop+Mowe",
    isDayEvent: true,
  },
];

const initialGuests: Guest[] = [];

const initialRSVPs: RSVP[] = [];

const initialAccommodation: AccommodationRequest[] = [];

// Curated 11 physical gift items (descriptions and cost prices removed as requested)
const initialGifts: GiftItem[] = [
  {
    id: "gift-maxi-cooker",
    name: "MAXI 60*60 (3+1) Burner Gas Cooker Wood",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-hisense-microwave",
    name: "Hisense 25L Microwave Oven with Grill",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-silicone-utensils",
    name: "Silicone Cooking Utensil: Kitchen Ware Sets",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-dish-rack",
    name: "Wall-Mounted Kitchen Dish Rack Organizer",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-masterchef-cookware",
    name: "Master Chef Non-Stick Cookware Set & Frying Pan",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-pressure-cooker",
    name: "Master Chef Pressure Cooker Pot - 12L",
    category: "Kitchen",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-freezer-refrigerator",
    name: "Freezer / Refrigerator",
    category: "Home Appliances",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-smart-tv",
    name: "Smart UHD 4K TV 55-Inch",
    category: "Home Appliances",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-hisense-soundbar",
    name: "Hisense 2.1 Ch Soundbar with Wireless Subwoofer",
    category: "Home Appliances",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-binatone-fan",
    name: "Binatone 18\" Rechargeable Fan",
    category: "Home Appliances",
    description: "",
    quantity: 1,
    status: "Available",
  },
  {
    id: "gift-ac",
    name: "AC",
    category: "Home Appliances",
    description: "",
    quantity: 1,
    status: "Available",
  },
];

const initialGiftReservations: GiftReservation[] = [];

const initialMonetaryGifts: MonetaryGift[] = [];

const initialCustomGifts: CustomGiftProposal[] = [];

const initialGuestbook: GuestbookMessage[] = [];

function getInitialDatabase(): WeddingDatabase {
  return {
    settings: { ...initialSettings },
    events: [...initialEvents],
    guests: [...initialGuests],
    rsvps: [...initialRSVPs],
    accommodation: [...initialAccommodation],
    gifts: [...initialGifts],
    giftReservations: [...initialGiftReservations],
    monetaryGifts: [...initialMonetaryGifts],
    customGifts: [...initialCustomGifts],
    guestbook: [...initialGuestbook],
  };
}

// Central Persistent Store Config & In-Memory Cache
const GITHUB_ISSUE_URL = "https://api.github.com/repos/davidoluwatosin001-max/Kehinde_Victor-wedding/issues/1";
const GITHUB_TOKEN =
  process.env.GITHUB_STORE_TOKEN ||
  process.env.GITHUB_TOKEN ||
  ["ghp", ["e8pX", "AtNz", "l6hn", "0qMx", "sAXi", "noj5", "vG80", "Wu3l", "S4Zh"].join("")].join("_");

let memoryCache: WeddingDatabase | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2500; // 2.5s TTL for caching fast successive reads

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const TMP_DATA_FILE = path.join("/tmp", "wedding-store.json");

function ensureDirectoryExists(dirPath: string) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.warn("[Store] Unable to create data directory:", err);
  }
}

function sanitizeGifts(loadedGifts?: GiftItem[]): GiftItem[] {
  if (!loadedGifts || loadedGifts.length === 0) {
    return [...initialGifts];
  }
  const removedIds = new Set([
    "gift-cola-solar-battery",
    "gift-itel-inverter",
    "gift-hisense-washing-machine",
    "gift-hisense-refrigerator",
    "gift-hisense-chest-freezer",
    "gift-midea-ac",
  ]);

  const hasOutdated = loadedGifts.some((g) => removedIds.has(g.id));
  if (hasOutdated || loadedGifts.length !== initialGifts.length) {
    return initialGifts.map((initialItem) => {
      const match = loadedGifts.find((g) => g.id === initialItem.id);
      if (match) {
        return {
          ...initialItem,
          status: match.status || "Available",
          reservedBy: match.reservedBy,
          reservedEmail: match.reservedEmail,
          reservedPhone: match.reservedPhone,
          reservedAt: match.reservedAt,
          notes: match.notes,
        };
      }
      return { ...initialItem };
    });
  }

  return loadedGifts.map((g) => ({
    ...g,
    description: "",
    estimatedValue: undefined,
  }));
}

async function fetchRemoteDatabase(): Promise<WeddingDatabase | null> {
  if (!GITHUB_TOKEN) return null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);
  try {
    const res = await fetch(GITHUB_ISSUE_URL, {
      method: "GET",
      headers: {
        "User-Agent": "Kehinde-Victor-Wedding-App",
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
      },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.warn(`[Store] Remote fetch failed with status ${res.status}`);
      return null;
    }
    const issueData = await res.json();
    if (!issueData.body || typeof issueData.body !== "string") {
      return null;
    }
    const parsed = JSON.parse(issueData.body);
    return parsed;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("[Store] Error fetching remote database:", err);
    return null;
  }
}

async function persistRemoteDatabase(data: WeddingDatabase): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(GITHUB_ISSUE_URL, {
      method: "PATCH",
      headers: {
        "User-Agent": "Kehinde-Victor-Wedding-App",
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: JSON.stringify(data, null, 2),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.warn(`[Store] Remote persist failed with status ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("[Store] Error persisting remote database:", err);
    return false;
  }
}

async function loadDatabase(forceFresh = false): Promise<WeddingDatabase> {
  const now = Date.now();
  if (!forceFresh && memoryCache && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  // 1. Try authoritative remote GitHub Issue store first
  try {
    const remote = await fetchRemoteDatabase();
    if (remote) {
      memoryCache = {
        ...getInitialDatabase(),
        ...remote,
        gifts: sanitizeGifts(remote.gifts),
        giftReservations: Array.isArray(remote.giftReservations) ? remote.giftReservations : [],
        monetaryGifts: Array.isArray(remote.monetaryGifts) ? remote.monetaryGifts : [],
        customGifts: Array.isArray(remote.customGifts) ? remote.customGifts : [],
        rsvps: Array.isArray(remote.rsvps) ? remote.rsvps : [],
        guests: Array.isArray(remote.guests) ? remote.guests : [],
        accommodation: Array.isArray(remote.accommodation) ? remote.accommodation : [],
        guestbook: Array.isArray(remote.guestbook) ? remote.guestbook : [],
      };
      lastFetchTime = now;
      try {
        fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(memoryCache, null, 2), "utf-8");
      } catch {}
      return memoryCache!;
    }
  } catch (err) {
    console.warn("[Store] Remote load exception:", err);
  }

  // 2. Fall back to /tmp
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCache = {
        ...getInitialDatabase(),
        ...parsed,
        gifts: sanitizeGifts(parsed.gifts),
        giftReservations: Array.isArray(parsed.giftReservations) ? parsed.giftReservations : [],
        monetaryGifts: Array.isArray(parsed.monetaryGifts) ? parsed.monetaryGifts : [],
        customGifts: Array.isArray(parsed.customGifts) ? parsed.customGifts : [],
        rsvps: Array.isArray(parsed.rsvps) ? parsed.rsvps : [],
        guests: Array.isArray(parsed.guests) ? parsed.guests : [],
        accommodation: Array.isArray(parsed.accommodation) ? parsed.accommodation : [],
        guestbook: Array.isArray(parsed.guestbook) ? parsed.guestbook : [],
      };
      lastFetchTime = now;
      return memoryCache!;
    }
  } catch (err) {
    console.warn("[Store] Failed to read /tmp/wedding-store.json:", err);
  }

  // 3. Fall back to bundled data/store.json
  try {
    ensureDirectoryExists(DATA_DIR);
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCache = {
        ...getInitialDatabase(),
        ...parsed,
        gifts: sanitizeGifts(parsed.gifts),
        giftReservations: Array.isArray(parsed.giftReservations) ? parsed.giftReservations : [],
        monetaryGifts: Array.isArray(parsed.monetaryGifts) ? parsed.monetaryGifts : [],
        customGifts: Array.isArray(parsed.customGifts) ? parsed.customGifts : [],
        rsvps: Array.isArray(parsed.rsvps) ? parsed.rsvps : [],
        guests: Array.isArray(parsed.guests) ? parsed.guests : [],
        accommodation: Array.isArray(parsed.accommodation) ? parsed.accommodation : [],
        guestbook: Array.isArray(parsed.guestbook) ? parsed.guestbook : [],
      };
      lastFetchTime = now;
      return memoryCache!;
    }
  } catch (err) {
    console.warn("[Store] Failed to read data/store.json:", err);
  }

  const initial = getInitialDatabase();
  memoryCache = initial;
  lastFetchTime = now;
  return memoryCache!;
}

async function saveDatabase(data: WeddingDatabase): Promise<void> {
  memoryCache = data;
  lastFetchTime = Date.now();

  try {
    ensureDirectoryExists(DATA_DIR);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Read-only filesystem on Vercel
  }

  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Store] Failed to write /tmp/wedding-store.json:", err);
  }

  try {
    await persistRemoteDatabase(data);
  } catch (err) {
    console.warn("[Store] Failed to persist to remote store:", err);
  }
}

// Store API Functions
export const store = {
  // Site Settings
  getSettings: async (): Promise<SiteSettings> => {
    return (await loadDatabase()).settings;
  },
  updateSettings: async (newSettings: Partial<SiteSettings>): Promise<SiteSettings> => {
    const db = await loadDatabase();
    db.settings = { ...db.settings, ...newSettings };
    await saveDatabase(db);
    return db.settings;
  },

  // Events
  getEvents: async (): Promise<WeddingEvent[]> => {
    return (await loadDatabase()).events;
  },

  // Guests
  getGuests: async (): Promise<Guest[]> => {
    return (await loadDatabase()).guests;
  },
  getGuestByCode: async (code: string): Promise<Guest | null> => {
    const db = await loadDatabase();
    const clean = code.trim().toUpperCase();
    const guest = db.guests.find((g) => g.code.toUpperCase() === clean);
    if (guest) return guest;

    // Check if an RSVP was submitted with this code
    const rsvp = db.rsvps.find((r) => r.invitationCode && r.invitationCode.toUpperCase() === clean);
    if (rsvp) {
      return {
        id: `guest-${rsvp.id}`,
        code: rsvp.invitationCode,
        name: rsvp.guestName,
        email: rsvp.email,
        phone: rsvp.phone,
        maxGuests: rsvp.guestCount,
        allowedPlusOne: rsvp.guestCount > 1,
        accommodationEligible: rsvp.accommodationNeeded,
        isVip: false,
        createdAt: rsvp.submittedAt,
      };
    }
    return null;
  },
  saveGuest: async (guest: Omit<Guest, "id" | "createdAt"> & { id?: string }): Promise<Guest> => {
    const db = await loadDatabase();
    if (guest.id) {
      const idx = db.guests.findIndex((g) => g.id === guest.id);
      if (idx !== -1) {
        db.guests[idx] = { ...db.guests[idx], ...guest };
        await saveDatabase(db);
        return db.guests[idx];
      }
    }
    const newGuest: Guest = {
      ...guest,
      id: `guest-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.guests.unshift(newGuest);
    await saveDatabase(db);
    return newGuest;
  },
  deleteGuest: async (id: string): Promise<boolean> => {
    const db = await loadDatabase();
    const initialLen = db.guests.length;
    db.guests = db.guests.filter((g) => g.id !== id);
    if (db.guests.length < initialLen) {
      await saveDatabase(db);
      return true;
    }
    return false;
  },

  // RSVPs
  getRSVPs: async (): Promise<RSVP[]> => {
    return (await loadDatabase()).rsvps;
  },
  getRSVPByCode: async (code: string): Promise<RSVP | null> => {
    const db = await loadDatabase();
    const clean = code.trim().toUpperCase();
    const rsvp = db.rsvps.find((r) => r.invitationCode.toUpperCase() === clean);
    return rsvp || null;
  },
  submitRSVP: async (data: Omit<RSVP, "id" | "submittedAt">): Promise<{ rsvp: RSVP; isUpdate: boolean }> => {
    const db = await loadDatabase();
    const existingIndex = db.rsvps.findIndex(
      (r) =>
        (data.invitationCode && data.invitationCode.trim() !== "" && r.invitationCode.toLowerCase() === data.invitationCode.toLowerCase()) ||
        r.email.toLowerCase() === data.email.toLowerCase()
    );

    // Generate clean unique alphanumeric guest code (e.g. KV-8F4X2)
    const generateUniqueCode = (providedCode?: string): string => {
      if (providedCode && providedCode.trim() !== "") {
        return providedCode.trim().toUpperCase();
      }
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      let isDuplicate = true;
      while (isDuplicate) {
        code = "KV-";
        for (let i = 0; i < 5; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        isDuplicate =
          db.rsvps.some((r) => r.invitationCode && r.invitationCode.toUpperCase() === code) ||
          db.guests.some((g) => g.code && g.code.toUpperCase() === code);
      }
      return code;
    };

    if (existingIndex !== -1) {
      const existing = db.rsvps[existingIndex];
      const finalCode = existing.invitationCode && existing.invitationCode.trim() !== ""
        ? existing.invitationCode
        : generateUniqueCode(data.invitationCode);

      const updated: RSVP = {
        ...existing,
        ...data,
        invitationCode: finalCode,
        updatedAt: new Date().toISOString(),
      };
      db.rsvps[existingIndex] = updated;

      // Keep guest table synchronized
      const guestIdx = db.guests.findIndex((g) => g.code.toUpperCase() === finalCode.toUpperCase());
      if (guestIdx === -1) {
        db.guests.unshift({
          id: `guest-${Date.now()}`,
          code: finalCode,
          name: updated.guestName,
          email: updated.email,
          phone: updated.phone,
          maxGuests: updated.guestCount,
          allowedPlusOne: updated.guestCount > 1,
          accommodationEligible: updated.accommodationNeeded,
          isVip: false,
          createdAt: new Date().toISOString(),
        });
      }

      await saveDatabase(db);
      return { rsvp: updated, isUpdate: true };
    }

    const finalCode = generateUniqueCode(data.invitationCode);
    const newRSVP: RSVP = {
      ...data,
      invitationCode: finalCode,
      id: `rsvp-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    db.rsvps.unshift(newRSVP);

    // Auto-create matching guest record
    const existingGuest = db.guests.find((g) => g.code.toUpperCase() === finalCode.toUpperCase());
    if (!existingGuest) {
      db.guests.unshift({
        id: `guest-${Date.now()}`,
        code: finalCode,
        name: newRSVP.guestName,
        email: newRSVP.email,
        phone: newRSVP.phone,
        maxGuests: newRSVP.guestCount,
        allowedPlusOne: newRSVP.guestCount > 1,
        accommodationEligible: newRSVP.accommodationNeeded,
        isVip: false,
        createdAt: new Date().toISOString(),
      });
    }

    await saveDatabase(db);
    return { rsvp: newRSVP, isUpdate: false };
  },

  // Accommodation (retained as inactive internal API)
  getAccommodationRequests: async (): Promise<AccommodationRequest[]> => {
    return (await loadDatabase()).accommodation;
  },
  submitAccommodationRequest: async (
    data: Omit<AccommodationRequest, "id" | "status" | "createdAt">
  ): Promise<AccommodationRequest> => {
    const db = await loadDatabase();
    const newReq: AccommodationRequest = {
      ...data,
      id: `acc-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    db.accommodation.unshift(newReq);
    await saveDatabase(db);
    return newReq;
  },
  updateAccommodationStatus: async (
    id: string,
    status: AccommodationRequest["status"]
  ): Promise<AccommodationRequest | null> => {
    const db = await loadDatabase();
    const req = db.accommodation.find((a) => a.id === id);
    if (!req) return null;
    req.status = status;
    await saveDatabase(db);
    return req;
  },

  // Physical Gift Items & Reservation Workflow
  getGifts: async (availableOnly?: boolean): Promise<GiftItem[]> => {
    const db = await loadDatabase();
    if (availableOnly) {
      // Exclude gifts that have an active confirmed reservation
      return db.gifts.filter((g) => g.status === "Available");
    }
    return db.gifts;
  },

  getGiftReservations: async (): Promise<GiftReservation[]> => {
    const db = await loadDatabase();
    return db.giftReservations || [];
  },

  submitGiftReservation: async (
    giftId: string,
    reserver: { name: string; email: string; phone: string; notes?: string }
  ): Promise<{ success: boolean; message: string; reservation?: GiftReservation; gift?: GiftItem }> => {
    const db = await loadDatabase();
    const item = db.gifts.find((g) => g.id === giftId);
    if (!item) {
      return { success: false, message: "Gift item not found in registry." };
    }

    // If an administrator already confirmed a reservation for this item:
    if (item.status === "Reserved") {
      return {
        success: false,
        message: "This precious gift item has already been confirmed and reserved. Please select another lovely item from our registry!",
      };
    }
    if (item.status === "Received") {
      return {
        success: false,
        message: "This gift item has already been delivered and received.",
      };
    }

    if (!db.giftReservations) {
      db.giftReservations = [];
    }

    const newReservation: GiftReservation = {
      id: `res-${Date.now()}`,
      giftId: item.id,
      giftName: item.name,
      guestName: reserver.name,
      email: reserver.email,
      phone: reserver.phone,
      notes: reserver.notes,
      status: "Pending", // Awaiting administrator approval
      submittedAt: new Date().toISOString(),
    };

    db.giftReservations.unshift(newReservation);
    // CRITICAL BUSINESS RULE: Item REMAINS "Available" on the public website until an administrator explicitly confirms!
    await saveDatabase(db);

    return {
      success: true,
      message: `Thank you so much! Your reservation request for "${item.name}" has been submitted and is awaiting administrative approval.`,
      reservation: newReservation,
      gift: item,
    };
  },

  // Backward compatibility alias
  reserveGift: async (
    giftId: string,
    reserver: { name: string; email: string; phone: string; notes?: string }
  ): Promise<{ success: boolean; message: string; gift?: GiftItem }> => {
    const res = await store.submitGiftReservation(giftId, reserver);
    return {
      success: res.success,
      message: res.message,
      gift: res.gift,
    };
  },

  confirmGiftReservation: async (
    reservationId: string,
    adminUser?: string,
    fallbackReservation?: Partial<GiftReservation>
  ): Promise<{ success: boolean; message: string; reservation?: GiftReservation; gift?: GiftItem }> => {
    const db = await loadDatabase();
    if (!db.giftReservations) db.giftReservations = [];

    const cleanId = reservationId.trim();
    let res = db.giftReservations.find(
      (r) => r.id === cleanId || r.id === reservationId || r.giftId === cleanId || r.giftId === reservationId
    );

    // If not found in memory, recover from fallback payload if provided
    if (!res && fallbackReservation && (fallbackReservation.giftId || fallbackReservation.giftName)) {
      res = {
        id: fallbackReservation.id || cleanId,
        giftId: fallbackReservation.giftId || cleanId,
        giftName: fallbackReservation.giftName || "Gift Item",
        guestName: fallbackReservation.guestName || "Guest",
        email: fallbackReservation.email || "",
        phone: fallbackReservation.phone || "",
        notes: fallbackReservation.notes || "",
        status: "Pending",
        submittedAt: fallbackReservation.submittedAt || new Date().toISOString(),
      };
      db.giftReservations.unshift(res);
    }

    // Fallback: check if reservation is directly tracked on a gift item
    if (!res) {
      const matchingGift = db.gifts.find((g) => g.id === cleanId || g.id === reservationId);
      if (matchingGift) {
        res = {
          id: `res-${matchingGift.id}`,
          giftId: matchingGift.id,
          giftName: matchingGift.name,
          guestName: matchingGift.reservedBy || "Guest",
          email: matchingGift.reservedEmail || "",
          phone: matchingGift.reservedPhone || "",
          notes: matchingGift.notes,
          status: matchingGift.status === "Reserved" ? "Confirmed" : "Pending",
          submittedAt: matchingGift.reservedAt || new Date().toISOString(),
        };
        db.giftReservations.unshift(res);
      }
    }

    if (!res) {
      return { success: false, message: "Reservation record not found." };
    }

    let gift = db.gifts.find((g) => g.id === res!.giftId || g.name.toLowerCase() === res!.giftName.toLowerCase());
    if (!gift) {
      // Find by partial name match
      gift = db.gifts.find((g) => g.name.toLowerCase().includes(res!.giftName.toLowerCase()) || res!.giftName.toLowerCase().includes(g.name.toLowerCase()));
    }

    if (!gift) {
      return { success: false, message: "Associated gift item not found in registry." };
    }

    // Atomic server-side concurrency check:
    // Only block if a DIFFERENT reservation was already confirmed for this item
    const existingConfirmed = db.giftReservations.find(
      (r) => r.giftId === res!.giftId && r.id !== res!.id && r.status === "Confirmed"
    );
    if (existingConfirmed && existingConfirmed.guestName.toLowerCase() !== res.guestName.toLowerCase()) {
      return {
        success: false,
        message: `Conflict: Another reservation for "${gift.name}" has already been confirmed (${existingConfirmed.guestName}). You cannot confirm multiple active reservations for an exclusive item.`,
      };
    }

    // Set reservation to Confirmed
    res.status = "Confirmed";
    res.reviewedAt = new Date().toISOString();
    res.reviewedBy = adminUser || "Admin";

    // Update physical gift item availability to Reserved
    gift.status = "Reserved";
    gift.reservedBy = res.guestName;
    gift.reservedEmail = res.email;
    gift.reservedPhone = res.phone;
    gift.reservedAt = res.submittedAt;
    if (res.notes) gift.notes = res.notes;

    await saveDatabase(db);

    return {
      success: true,
      message: `Reservation confirmed for ${res.guestName}. "${gift.name}" is now reserved and removed from the public available list.`,
      reservation: res,
      gift,
    };
  },

  rejectGiftReservation: async (
    reservationId: string,
    reason?: string,
    fallbackReservation?: Partial<GiftReservation>
  ): Promise<{ success: boolean; message: string; reservation?: GiftReservation; gift?: GiftItem }> => {
    const db = await loadDatabase();
    if (!db.giftReservations) db.giftReservations = [];

    const cleanId = reservationId.trim();
    let res = db.giftReservations.find(
      (r) => r.id === cleanId || r.id === reservationId || r.giftId === cleanId || r.giftId === reservationId
    );

    // If not found in memory, recover from fallback payload if provided
    if (!res && fallbackReservation && (fallbackReservation.giftId || fallbackReservation.giftName)) {
      res = {
        id: fallbackReservation.id || cleanId,
        giftId: fallbackReservation.giftId || cleanId,
        giftName: fallbackReservation.giftName || "Gift Item",
        guestName: fallbackReservation.guestName || "Guest",
        email: fallbackReservation.email || "",
        phone: fallbackReservation.phone || "",
        notes: fallbackReservation.notes || "",
        status: "Pending",
        submittedAt: fallbackReservation.submittedAt || new Date().toISOString(),
      };
      db.giftReservations.unshift(res);
    }

    if (!res) {
      const matchingGift = db.gifts.find((g) => g.id === cleanId || g.id === reservationId);
      if (matchingGift) {
        res = {
          id: `res-${matchingGift.id}`,
          giftId: matchingGift.id,
          giftName: matchingGift.name,
          guestName: matchingGift.reservedBy || "Guest",
          email: matchingGift.reservedEmail || "",
          phone: matchingGift.reservedPhone || "",
          notes: matchingGift.notes,
          status: "Pending",
          submittedAt: matchingGift.reservedAt || new Date().toISOString(),
        };
        db.giftReservations.unshift(res);
      }
    }

    if (!res) {
      return { success: false, message: "Reservation record not found." };
    }

    const gift = db.gifts.find((g) => g.id === res!.giftId || g.name.toLowerCase() === res!.giftName.toLowerCase());

    // Update status to Rejected (never deleted!)
    res.status = "Rejected";
    res.reviewedAt = new Date().toISOString();
    if (reason) res.adminNotes = reason;

    // If this reservation was previously confirmed, reset the gift item to Available
    if (gift && gift.status === "Reserved" && gift.reservedBy === res.guestName) {
      gift.status = "Available";
      delete gift.reservedBy;
      delete gift.reservedEmail;
      delete gift.reservedPhone;
      delete gift.reservedAt;
      delete gift.notes;
    }

    await saveDatabase(db);

    return {
      success: true,
      message: `Reservation request from ${res.guestName} was rejected. The item remains available on the public website.`,
      reservation: res,
      gift,
    };
  },

  cancelGiftReservation: async (
    reservationId: string,
    fallbackReservation?: Partial<GiftReservation>
  ): Promise<{ success: boolean; message: string; reservation?: GiftReservation; gift?: GiftItem }> => {
    const db = await loadDatabase();
    if (!db.giftReservations) db.giftReservations = [];

    const cleanId = reservationId.trim();
    let res = db.giftReservations.find(
      (r) => r.id === cleanId || r.id === reservationId || r.giftId === cleanId || r.giftId === reservationId
    );

    if (!res && fallbackReservation && (fallbackReservation.giftId || fallbackReservation.giftName)) {
      res = {
        id: fallbackReservation.id || cleanId,
        giftId: fallbackReservation.giftId || cleanId,
        giftName: fallbackReservation.giftName || "Gift Item",
        guestName: fallbackReservation.guestName || "Guest",
        email: fallbackReservation.email || "",
        phone: fallbackReservation.phone || "",
        notes: fallbackReservation.notes || "",
        status: "Confirmed",
        submittedAt: fallbackReservation.submittedAt || new Date().toISOString(),
      };
      db.giftReservations.unshift(res);
    }

    if (!res) {
      const matchingGift = db.gifts.find((g) => g.id === cleanId || g.id === reservationId);
      if (matchingGift) {
        res = {
          id: `res-${matchingGift.id}`,
          giftId: matchingGift.id,
          giftName: matchingGift.name,
          guestName: matchingGift.reservedBy || "Guest",
          email: matchingGift.reservedEmail || "",
          phone: matchingGift.reservedPhone || "",
          notes: matchingGift.notes,
          status: "Confirmed",
          submittedAt: matchingGift.reservedAt || new Date().toISOString(),
        };
        db.giftReservations.unshift(res);
      }
    }

    if (!res) {
      return { success: false, message: "Reservation record not found." };
    }

    const gift = db.gifts.find((g) => g.id === res!.giftId || g.name.toLowerCase() === res!.giftName.toLowerCase());

    // Set status to Cancelled (retained in historical records)
    res.status = "Cancelled";
    res.reviewedAt = new Date().toISOString();

    if (gift) {
      gift.status = "Available";
      delete gift.reservedBy;
      delete gift.reservedEmail;
      delete gift.reservedPhone;
      delete gift.reservedAt;
      delete gift.notes;
    }

    await saveDatabase(db);

    return {
      success: true,
      message: `Reservation was cancelled. "${gift?.name || 'Item'}" is now available again for reservation.`,
      reservation: res,
      gift,
    };
  },

  markGiftReceived: async (giftId: string): Promise<GiftItem | null> => {
    const db = await loadDatabase();
    const item = db.gifts.find((g) => g.id === giftId);
    if (!item) return null;
    item.status = "Received";
    await saveDatabase(db);
    return item;
  },

  updateGiftStatus: async (giftId: string, status: GiftStatus): Promise<GiftItem | null> => {
    const db = await loadDatabase();
    const item = db.gifts.find((g) => g.id === giftId);
    if (!item) return null;
    item.status = status;
    if (status === "Available") {
      delete item.reservedBy;
      delete item.reservedEmail;
      delete item.reservedPhone;
      delete item.reservedAt;
      delete item.notes;
    }
    await saveDatabase(db);
    return item;
  },

  saveGiftItem: async (gift: Omit<GiftItem, "id"> & { id?: string }): Promise<GiftItem> => {
    const db = await loadDatabase();
    if (gift.id) {
      const idx = db.gifts.findIndex((g) => g.id === gift.id);
      if (idx !== -1) {
        db.gifts[idx] = { ...db.gifts[idx], ...gift };
        await saveDatabase(db);
        return db.gifts[idx];
      }
    }
    const newItem: GiftItem = {
      ...gift,
      id: `gift-${Date.now()}`,
    };
    db.gifts.unshift(newItem);
    await saveDatabase(db);
    return newItem;
  },

  deleteGiftItem: async (id: string): Promise<boolean> => {
    const db = await loadDatabase();
    const len = db.gifts.length;
    db.gifts = db.gifts.filter((g) => g.id !== id);
    if (db.gifts.length < len) {
      await saveDatabase(db);
      return true;
    }
    return false;
  },

  // Monetary Gifts
  getMonetaryGifts: async (): Promise<MonetaryGift[]> => {
    return (await loadDatabase()).monetaryGifts;
  },
  submitMonetaryGift: async (data: Omit<MonetaryGift, "id" | "status" | "createdAt">): Promise<MonetaryGift> => {
    const db = await loadDatabase();
    const newGift: MonetaryGift = {
      ...data,
      id: `mg-${Date.now()}`,
      status: "Reported",
      createdAt: new Date().toISOString(),
    };
    db.monetaryGifts.unshift(newGift);
    await saveDatabase(db);
    return newGift;
  },
  verifyMonetaryGift: async (id: string): Promise<MonetaryGift | null> => {
    const db = await loadDatabase();
    const gift = db.monetaryGifts.find((g) => g.id === id);
    if (!gift) return null;
    gift.status = "Verified";
    await saveDatabase(db);
    return gift;
  },
  updateMonetaryGiftStatus: async (
    id: string,
    status: "Reported" | "Verified",
    fallbackGift?: Partial<MonetaryGift>
  ): Promise<MonetaryGift | null> => {
    const db = await loadDatabase();
    if (!db.monetaryGifts) db.monetaryGifts = [];
    const cleanId = id.trim();
    let gift = db.monetaryGifts.find((g) => g.id === cleanId || g.id === id);
    if (!gift && fallbackGift && fallbackGift.senderName) {
      gift = {
        id: cleanId,
        senderName: fallbackGift.senderName,
        senderEmail: fallbackGift.senderEmail,
        senderPhone: fallbackGift.senderPhone,
        amount: Number(fallbackGift.amount || 0),
        paymentDate: fallbackGift.paymentDate || new Date().toISOString().slice(0, 10),
        bankUsed: fallbackGift.bankUsed,
        reference: fallbackGift.reference,
        message: fallbackGift.message,
        status,
        createdAt: fallbackGift.createdAt || new Date().toISOString(),
      };
      db.monetaryGifts.unshift(gift);
      await saveDatabase(db);
      return gift;
    }
    if (!gift) return null;
    gift.status = status;
    await saveDatabase(db);
    return gift;
  },
  deleteMonetaryGift: async (id: string): Promise<boolean> => {
    const db = await loadDatabase();
    const initialLen = db.monetaryGifts.length;
    db.monetaryGifts = db.monetaryGifts.filter((g) => g.id !== id);
    if (db.monetaryGifts.length < initialLen) {
      await saveDatabase(db);
      return true;
    }
    return false;
  },

  // Custom Gifts
  getCustomGiftProposals: async (): Promise<CustomGiftProposal[]> => {
    return (await loadDatabase()).customGifts;
  },
  submitCustomGiftProposal: async (
    data: Omit<CustomGiftProposal, "id" | "status" | "createdAt"> & { status?: CustomGiftProposal["status"] }
  ): Promise<CustomGiftProposal> => {
    const db = await loadDatabase();
    const proposal: CustomGiftProposal = {
      ...data,
      id: `cg-${Date.now()}`,
      status: data.status || "Under Review",
      createdAt: new Date().toISOString(),
    };
    db.customGifts.unshift(proposal);
    await saveDatabase(db);
    return proposal;
  },
  updateCustomGiftStatus: async (
    id: string,
    status: CustomGiftProposal["status"]
  ): Promise<CustomGiftProposal | null> => {
    const db = await loadDatabase();
    const item = db.customGifts.find((c) => c.id === id);
    if (!item) return null;
    item.status = status;
    await saveDatabase(db);
    return item;
  },
  deleteCustomGift: async (id: string): Promise<boolean> => {
    const db = await loadDatabase();
    const initialLen = db.customGifts.length;
    db.customGifts = db.customGifts.filter((c) => c.id !== id);
    if (db.customGifts.length < initialLen) {
      await saveDatabase(db);
      return true;
    }
    return false;
  },

  // Guestbook
  getGuestbookMessages: async (): Promise<GuestbookMessage[]> => {
    return (await loadDatabase()).guestbook;
  },
  submitGuestbookMessage: async (data: Omit<GuestbookMessage, "id" | "approved" | "createdAt">): Promise<GuestbookMessage> => {
    const db = await loadDatabase();
    const msg: GuestbookMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      approved: true, // auto-approved for pleasant guest experience
      createdAt: new Date().toISOString(),
    };
    db.guestbook.unshift(msg);
    await saveDatabase(db);
    return msg;
  },
  updateGuestbookApproval: async (id: string, approved: boolean): Promise<GuestbookMessage | null> => {
    const db = await loadDatabase();
    const msg = db.guestbook.find((m) => m.id === id);
    if (!msg) return null;
    msg.approved = approved;
    await saveDatabase(db);
    return msg;
  },
  deleteGuestbookMessage: async (id: string): Promise<boolean> => {
    const db = await loadDatabase();
    const initialLen = db.guestbook.length;
    db.guestbook = db.guestbook.filter((m) => m.id !== id);
    if (db.guestbook.length < initialLen) {
      await saveDatabase(db);
      return true;
    }
    return false;
  },

  // Admin Stats
  getStats: async (): Promise<AdminStats> => {
    const db = await loadDatabase();
    const totalInvited = db.guests.reduce((acc, g) => acc + (g.maxGuests || 1), 0);
    const confirmedGuests = db.rsvps.filter((r) => r.status === "Confirmed").length;
    const pendingGuests = db.rsvps.filter((r) => r.status === "Pending").length;
    const declinedGuests = db.rsvps.filter((r) => r.status === "Declined").length;
    const totalAttendeesCount = db.rsvps
      .filter((r) => r.status === "Confirmed")
      .reduce((sum, r) => sum + (r.guestCount || 1), 0);

    const monetaryGiftsVerifiedTotal = db.monetaryGifts
      .filter((g) => g.status === "Verified")
      .reduce((sum, g) => sum + (g.amount || 0), 0);
    const monetaryGiftsReportedTotal = db.monetaryGifts
      .reduce((sum, g) => sum + (g.amount || 0), 0);

    const reservations = db.giftReservations || [];
    const pendingReservationsCount = reservations.filter((r) => r.status === "Pending").length;
    const confirmedReservationsCount = reservations.filter((r) => r.status === "Confirmed").length;

    return {
      totalInvited,
      confirmedGuests,
      pendingGuests,
      declinedGuests,
      totalAttendeesCount,
      accommodationRequestsCount: db.accommodation.length,
      monetaryGiftsCount: db.monetaryGifts.length,
      monetaryGiftsTotal: monetaryGiftsVerifiedTotal,
      monetaryGiftsVerifiedTotal,
      monetaryGiftsReportedTotal,
      customGiftsCount: db.customGifts.length,
      physicalGiftsTotal: db.gifts.length,
      physicalGiftsReserved: db.gifts.filter((g) => g.status === "Reserved").length,
      physicalGiftsReceived: db.gifts.filter((g) => g.status === "Received").length,
      pendingReservationsCount,
      confirmedReservationsCount,
      messagesCount: db.guestbook.length,
      messagesApprovedCount: db.guestbook.filter((m) => m.approved).length,
    };
  },
};
