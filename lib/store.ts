import fs from "fs";
import path from "path";
import {
  Guest,
  RSVP,
  AccommodationRequest,
  GiftItem,
  GiftStatus,
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
  monetaryGifts: MonetaryGift[];
  customGifts: CustomGiftProposal[];
  guestbook: GuestbookMessage[];
}

// Initial default site settings
const initialSettings: SiteSettings = {
  coupleNames: "Kehinde & Victor",
  weddingDate: "2026-11-19T10:00:00+01:00",
  tagline: "Two Hearts. One Journey Forever.",
  hashtag: "Ayobamidele '26",
  bankName: "United Bank for Africa (UBA)",
  accountName: "Victor Odudu",
  accountNumber: "2061621174",
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

const initialGuests: Guest[] = [
  {
    id: "guest-1",
    code: "KV-VIP01",
    name: "Dr. & Mrs. Adeleke",
    email: "adeleke.family@example.com",
    phone: "08031234567",
    maxGuests: 2,
    allowedPlusOne: true,
    accommodationEligible: true,
    isVip: true,
    notes: "Special family table",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "guest-2",
    code: "KV-AB7K2",
    name: "Uncle Femi & Family",
    email: "femi.odudu@example.com",
    phone: "08098765432",
    maxGuests: 2,
    allowedPlusOne: false,
    accommodationEligible: true,
    isVip: false,
    notes: "Requires ground floor seating",
    createdAt: "2026-09-02T11:00:00Z",
  },
  {
    id: "guest-3",
    code: "KV-FRIEND9",
    name: "Blessing Emmanuel",
    email: "blessing.e@example.com",
    phone: "08123456789",
    maxGuests: 2,
    allowedPlusOne: true,
    accommodationEligible: false,
    isVip: false,
    createdAt: "2026-09-03T12:00:00Z",
  },
];

const initialRSVPs: RSVP[] = [
  {
    id: "rsvp-1",
    invitationCode: "KV-VIP01",
    guestName: "Dr. & Mrs. Adeleke",
    email: "adeleke.family@example.com",
    phone: "08031234567",
    status: "Confirmed",
    guestCount: 2,
    attendingEvents: "All Event (Engagement (Wed 18 Nov, 4pm) & White Wedding (Thu 19 Nov, 10am) / Reception)",
    attendees: [
      { name: "Dr. Adeleke", dietaryPreference: "No seafood" },
      { name: "Mrs. Adeleke" },
    ],
    accommodationNeeded: true,
    message: "We rejoice with the Balogun and Odudu families! Looking forward to an unforgettable celebration.",
    submittedAt: "2026-09-10T14:30:00Z",
  },
];

const initialAccommodation: AccommodationRequest[] = [
  {
    id: "acc-1",
    guestName: "Dr. & Mrs. Adeleke",
    email: "adeleke.family@example.com",
    phone: "08031234567",
    numberOfPeople: 2,
    checkInDate: "2026-11-18",
    checkOutDate: "2026-11-20",
    roomRequirement: "1 Double Room / King Suite",
    specialRequirements: "Quiet floor near venue",
    status: "Approved",
    createdAt: "2026-09-10T14:35:00Z",
  },
];

const initialGifts: GiftItem[] = [
  {
    id: "gift-maxi-cooker",
    name: "MAXI 60*60 (3+1) Burner Gas Cooker Wood",
    category: "Kitchen",
    description: "3 Gas Burners, 1 Electrical Burner: 1000W, Wood finish heat-resistant cabinet, auto-ignition, and gas oven. Model: MAXI606031WOOD.",
    image: "/images/gifts/maxi-gas-cooker.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 245000,
  },
  {
    id: "gift-hisense-microwave",
    name: "Hisense 25L Microwave Oven with Grill",
    category: "Kitchen",
    description: "25 Litres digital microwave oven with grill function, defrost setting, mirror black finish, and multi-stage cooking.",
    image: "/images/gifts/hisense-microwave.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 125000,
  },
  {
    id: "gift-silicone-utensils",
    name: "Silicone Cooking Utensil: Kitchen Ware Sets",
    category: "Kitchen",
    description: "Premium food-grade heat-resistant silicone utensil set with ergonomic wooden handles and countertop storage bucket.",
    image: "/images/gifts/silicone-utensils.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 35000,
  },
  {
    id: "gift-dish-rack",
    name: "Wall-Mounted Kitchen Dish Rack Organizer",
    category: "Kitchen",
    description: "Heavy-duty stainless steel wall-mounted kitchen dish drainer rack and space-saving organizer with utensil & cutlery holders.",
    image: "/images/gifts/dish-rack.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 48000,
  },
  {
    id: "gift-masterchef-cookware",
    name: "Master Chef Non-Stick Cookware Set & Frying Pan",
    category: "Kitchen",
    description: "Master Chef heavy-gauge non-stick aluminum cooking pot set and frying pan with tempered glass lids and heat-insulated handles.",
    image: "/images/gifts/cookware-set.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 75000,
  },
  {
    id: "gift-pressure-cooker",
    name: "Master Chef Pressure Cooker Pot - 12L",
    category: "Kitchen",
    description: "Master Chef 12-Litre heavy-duty aluminum pressure cooker with dual-safety valve system for fast, energy-efficient family cooking.",
    image: "/images/gifts/pressure-cooker.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 62000,
  },
  {
    id: "gift-hisense-washing-machine",
    name: "Hisense 6KG Front Loader Automatic Washing Machine",
    category: "Home Appliances",
    description: "6KG capacity front load automatic washing machine with smart wash cycles, quick wash, 1200 RPM spin and energy-saving inverter motor.",
    image: "/images/gifts/hisense-washing-machine.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 310000,
  },
  {
    id: "gift-hisense-chest-freezer",
    name: "Hisense 217 Litres Chest Freezer",
    category: "Home Appliances",
    description: "217L deep chest freezer with fast-freeze technology, tropicalized heavy-duty compressor, and lockable safety lid.",
    image: "/images/gifts/hisense-chest-freezer.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 295000,
  },
  {
    id: "gift-hisense-refrigerator",
    name: "Hisense 124L Top Mount Double Door Refrigerator",
    category: "Home Appliances",
    description: "124-Litre double door top-mount refrigerator with separate freezer compartment, vegetable crisper and low-noise operation.",
    image: "/images/gifts/hisense-refrigerator.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 240000,
  },
  {
    id: "gift-smart-tv",
    name: "Smart UHD 4K TV 55-Inch",
    category: "Home Appliances",
    description: "55-Inch 4K Ultra HD Smart TV with HDR, bezel-less cinematic display, Dolby Audio, Bluetooth, and preloaded streaming apps.",
    image: "/images/gifts/smart-tv.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 420000,
  },
  {
    id: "gift-hisense-soundbar",
    name: "Hisense 2.1 Ch Soundbar with Wireless Subwoofer",
    category: "Home Appliances",
    description: "2.1 Channel home theater soundbar system featuring wireless subwoofer, Bluetooth 5.0 streaming, and HDMI ARC support.",
    image: "/images/gifts/hisense-soundbar.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 145000,
  },
  {
    id: "gift-binatone-fan",
    name: "Binatone 18\" Rechargeable Fan",
    category: "Home Appliances",
    description: "18-inch multi-speed standing rechargeable fan with remote control, LED night light, and long-lasting backup battery.",
    image: "/images/gifts/binatone-fan.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 85000,
  },
  {
    id: "gift-midea-ac",
    name: "Midea 1.5HP Wall Inverter Air Conditioner",
    category: "Home Appliances",
    description: "1.5 Horsepower high-efficiency inverter split unit AC with rapid cooling, whisper-quiet operation and eco-friendly refrigerant.",
    image: "/images/gifts/midea-air-conditioner.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 380000,
  },
  {
    id: "gift-itel-inverter",
    name: "Itel 4kW 24V 1-Phase Inverter + MPPT 6kW",
    category: "Home Appliances",
    description: "4kW 24V single-phase pure sine wave hybrid solar inverter with integrated 6kW MPPT charge controller for seamless home power.",
    image: "/images/gifts/itel-solar-inverter.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 680000,
  },
  {
    id: "gift-cola-solar-battery",
    name: "Cola Solar Lithium Battery 280AH",
    category: "Home Appliances",
    description: "280Ah high-capacity LiFePO4 deep-cycle solar lithium battery with built-in Smart BMS for long lifespan and reliable home energy storage.",
    image: "/images/gifts/cola-solar-battery.jpg",
    quantity: 1,
    status: "Available",
    estimatedValue: 950000,
  },
];

const initialMonetaryGifts: MonetaryGift[] = [
  {
    id: "mg-1",
    senderName: "Pastor & Mrs. Benson",
    senderEmail: "benson@example.com",
    senderPhone: "08022223344",
    amount: 150000,
    paymentDate: "2026-09-12",
    bankUsed: "GTBank",
    reference: "REF-99210",
    message: "May the Lord establish your home in divine peace and abundance!",
    status: "Verified",
    createdAt: "2026-09-12T16:00:00Z",
  },
];

const initialCustomGifts: CustomGiftProposal[] = [];

const initialGuestbook: GuestbookMessage[] = [
  {
    id: "msg-1",
    author: "Tunde & Seyi",
    relationship: "Friends of the Groom",
    message: "Congratulations Victor & Kehinde! Watching your journey blossom has been a true joy. Your home is blessed!",
    approved: true,
    createdAt: "2026-09-14T11:20:00Z",
  },
  {
    id: "msg-2",
    author: "Sister Grace Balogun",
    relationship: "Bride's Family",
    message: "My sweet sister Kehinde, you are marrying a wonderful gentleman. God's grace will preserve your union forever!",
    approved: true,
    createdAt: "2026-09-16T18:45:00Z",
  },
];

function getInitialDatabase(): WeddingDatabase {
  return {
    settings: { ...initialSettings },
    events: [...initialEvents],
    guests: [...initialGuests],
    rsvps: [...initialRSVPs],
    accommodation: [...initialAccommodation],
    gifts: [...initialGifts],
    monetaryGifts: [...initialMonetaryGifts],
    customGifts: [...initialCustomGifts],
    guestbook: [...initialGuestbook],
  };
}

// In-memory cache synced with disk
let memoryCache: WeddingDatabase | null = null;
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

function loadDatabase(): WeddingDatabase {
  if (memoryCache) return memoryCache;

  // 1. Check runtime /tmp cache first (for serverless environments)
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCache = {
        ...getInitialDatabase(),
        ...parsed,
      };
      return memoryCache!;
    }
  } catch (err) {
    console.warn("[Store] Failed to read /tmp/wedding-store.json:", err);
  }

  // 2. Fall back to bundled project data file
  try {
    ensureDirectoryExists(DATA_DIR);
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCache = {
        ...getInitialDatabase(),
        ...parsed,
      };
      // Pre-seed /tmp
      try {
        fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(memoryCache, null, 2), "utf-8");
      } catch {
        // Ignore if /tmp is not available
      }
      return memoryCache!;
    }
  } catch (err) {
    console.warn("[Store] Failed to read data/store.json, initializing defaults:", err);
  }

  const initial = getInitialDatabase();
  memoryCache = initial;
  saveDatabase(initial);
  return memoryCache;
}

function saveDatabase(data: WeddingDatabase) {
  memoryCache = data;
  try {
    ensureDirectoryExists(DATA_DIR);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Expected on read-only serverless deployments
  }

  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Store] Failed to write /tmp/wedding-store.json:", err);
  }
}

// Store API Functions
export const store = {
  // Site Settings
  getSettings: async (): Promise<SiteSettings> => {
    return loadDatabase().settings;
  },
  updateSettings: async (newSettings: Partial<SiteSettings>): Promise<SiteSettings> => {
    const db = loadDatabase();
    db.settings = { ...db.settings, ...newSettings };
    saveDatabase(db);
    return db.settings;
  },

  // Events
  getEvents: async (): Promise<WeddingEvent[]> => {
    return loadDatabase().events;
  },

  // Guests
  getGuests: async (): Promise<Guest[]> => {
    return loadDatabase().guests;
  },
  getGuestByCode: async (code: string): Promise<Guest | null> => {
    const db = loadDatabase();
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
    const db = loadDatabase();
    if (guest.id) {
      const idx = db.guests.findIndex((g) => g.id === guest.id);
      if (idx !== -1) {
        db.guests[idx] = { ...db.guests[idx], ...guest };
        saveDatabase(db);
        return db.guests[idx];
      }
    }
    const newGuest: Guest = {
      ...guest,
      id: `guest-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.guests.unshift(newGuest);
    saveDatabase(db);
    return newGuest;
  },
  deleteGuest: async (id: string): Promise<boolean> => {
    const db = loadDatabase();
    const initialLen = db.guests.length;
    db.guests = db.guests.filter((g) => g.id !== id);
    if (db.guests.length < initialLen) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // RSVPs
  getRSVPs: async (): Promise<RSVP[]> => {
    return loadDatabase().rsvps;
  },
  getRSVPByCode: async (code: string): Promise<RSVP | null> => {
    const db = loadDatabase();
    const clean = code.trim().toUpperCase();
    const rsvp = db.rsvps.find((r) => r.invitationCode.toUpperCase() === clean);
    return rsvp || null;
  },
  submitRSVP: async (data: Omit<RSVP, "id" | "submittedAt">): Promise<{ rsvp: RSVP; isUpdate: boolean }> => {
    const db = loadDatabase();
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

      saveDatabase(db);
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

    saveDatabase(db);
    return { rsvp: newRSVP, isUpdate: false };
  },

  // Accommodation
  getAccommodationRequests: async (): Promise<AccommodationRequest[]> => {
    return loadDatabase().accommodation;
  },
  submitAccommodationRequest: async (
    data: Omit<AccommodationRequest, "id" | "status" | "createdAt">
  ): Promise<AccommodationRequest> => {
    const db = loadDatabase();
    const newReq: AccommodationRequest = {
      ...data,
      id: `acc-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    db.accommodation.unshift(newReq);
    saveDatabase(db);
    return newReq;
  },
  updateAccommodationStatus: async (
    id: string,
    status: AccommodationRequest["status"]
  ): Promise<AccommodationRequest | null> => {
    const db = loadDatabase();
    const req = db.accommodation.find((a) => a.id === id);
    if (!req) return null;
    req.status = status;
    saveDatabase(db);
    return req;
  },

  // Gifts
  getGifts: async (): Promise<GiftItem[]> => {
    return loadDatabase().gifts;
  },
  reserveGift: async (
    giftId: string,
    reserver: { name: string; email: string; phone: string; notes?: string }
  ): Promise<{ success: boolean; message: string; gift?: GiftItem }> => {
    const db = loadDatabase();
    const item = db.gifts.find((g) => g.id === giftId);
    if (!item) {
      return { success: false, message: "Gift item not found" };
    }
    if (item.status === "Reserved") {
      return { success: false, message: "This precious gift has already been reserved by another guest. Please choose another lovely item!" };
    }
    if (item.status === "Received") {
      return { success: false, message: "This gift item has already been received." };
    }

    item.status = "Reserved";
    item.reservedBy = reserver.name;
    item.reservedEmail = reserver.email;
    item.reservedPhone = reserver.phone;
    item.reservedAt = new Date().toISOString();
    if (reserver.notes) item.notes = reserver.notes;
    saveDatabase(db);

    return { success: true, message: "Thank you so much! The gift has been reserved in your name.", gift: item };
  },
  markGiftReceived: async (giftId: string): Promise<GiftItem | null> => {
    const db = loadDatabase();
    const item = db.gifts.find((g) => g.id === giftId);
    if (!item) return null;
    item.status = "Received";
    saveDatabase(db);
    return item;
  },
  updateGiftStatus: async (giftId: string, status: GiftStatus): Promise<GiftItem | null> => {
    const db = loadDatabase();
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
    saveDatabase(db);
    return item;
  },
  saveGiftItem: async (gift: Omit<GiftItem, "id"> & { id?: string }): Promise<GiftItem> => {
    const db = loadDatabase();
    if (gift.id) {
      const idx = db.gifts.findIndex((g) => g.id === gift.id);
      if (idx !== -1) {
        db.gifts[idx] = { ...db.gifts[idx], ...gift };
        saveDatabase(db);
        return db.gifts[idx];
      }
    }
    const newItem: GiftItem = {
      ...gift,
      id: `gift-${Date.now()}`,
    };
    db.gifts.unshift(newItem);
    saveDatabase(db);
    return newItem;
  },
  deleteGiftItem: async (id: string): Promise<boolean> => {
    const db = loadDatabase();
    const len = db.gifts.length;
    db.gifts = db.gifts.filter((g) => g.id !== id);
    if (db.gifts.length < len) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Monetary Gifts
  getMonetaryGifts: async (): Promise<MonetaryGift[]> => {
    return loadDatabase().monetaryGifts;
  },
  submitMonetaryGift: async (data: Omit<MonetaryGift, "id" | "status" | "createdAt">): Promise<MonetaryGift> => {
    const db = loadDatabase();
    const newGift: MonetaryGift = {
      ...data,
      id: `mg-${Date.now()}`,
      status: "Reported",
      createdAt: new Date().toISOString(),
    };
    db.monetaryGifts.unshift(newGift);
    saveDatabase(db);
    return newGift;
  },
  verifyMonetaryGift: async (id: string): Promise<MonetaryGift | null> => {
    const db = loadDatabase();
    const gift = db.monetaryGifts.find((g) => g.id === id);
    if (!gift) return null;
    gift.status = "Verified";
    saveDatabase(db);
    return gift;
  },

  // Custom Gifts
  getCustomGiftProposals: async (): Promise<CustomGiftProposal[]> => {
    return loadDatabase().customGifts;
  },
  submitCustomGiftProposal: async (data: Omit<CustomGiftProposal, "id" | "createdAt">): Promise<CustomGiftProposal> => {
    const db = loadDatabase();
    const proposal: CustomGiftProposal = {
      ...data,
      id: `cg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.customGifts.unshift(proposal);
    saveDatabase(db);
    return proposal;
  },

  // Guestbook
  getGuestbookMessages: async (): Promise<GuestbookMessage[]> => {
    return loadDatabase().guestbook;
  },
  submitGuestbookMessage: async (data: Omit<GuestbookMessage, "id" | "approved" | "createdAt">): Promise<GuestbookMessage> => {
    const db = loadDatabase();
    const msg: GuestbookMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      approved: true, // auto-approved for pleasant guest experience
      createdAt: new Date().toISOString(),
    };
    db.guestbook.unshift(msg);
    saveDatabase(db);
    return msg;
  },

  // Admin Stats
  getStats: async (): Promise<AdminStats> => {
    const db = loadDatabase();
    const totalInvited = db.guests.reduce((acc, g) => acc + g.maxGuests, 0);
    const confirmedGuests = db.rsvps.filter((r) => r.status === "Confirmed").length;
    const pendingGuests = db.rsvps.filter((r) => r.status === "Pending").length;
    const declinedGuests = db.rsvps.filter((r) => r.status === "Declined").length;
    const totalAttendeesCount = db.rsvps
      .filter((r) => r.status === "Confirmed")
      .reduce((sum, r) => sum + (r.guestCount || 1), 0);

    const monetaryGiftsTotal = db.monetaryGifts.reduce((sum, g) => sum + g.amount, 0);

    return {
      totalInvited,
      confirmedGuests,
      pendingGuests,
      declinedGuests,
      totalAttendeesCount,
      accommodationRequestsCount: db.accommodation.length,
      monetaryGiftsCount: db.monetaryGifts.length,
      monetaryGiftsTotal,
      physicalGiftsTotal: db.gifts.length,
      physicalGiftsReserved: db.gifts.filter((g) => g.status === "Reserved").length,
      physicalGiftsReceived: db.gifts.filter((g) => g.status === "Received").length,
      messagesCount: db.guestbook.length,
    };
  },
};
