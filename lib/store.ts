import fs from "fs";
import path from "path";
import {
  Guest,
  RSVP,
  AccommodationRequest,
  GiftItem,
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
  bankName: "Guaranty Trust Bank (GTBank)",
  accountName: "Victor Oluwatosin Odudu & Kehinde Elizabeth",
  accountNumber: "0123456789",
  paymentInstructions: "Please include your name in the payment reference or narration so we can identify and acknowledge your loving blessing.",
  storyTitle: "Our Love Story: How Two Hearts Found Their Forever",
  storyContent: [
    "From the very first moment our paths crossed, God began writing a story that was greater than anything we could have planned ourselves.",
    "Through seasons of friendship, prayers, laughter, and shared dreams, our love deepened into a quiet certainty that we were meant to walk this earthly journey as one.",
    "Now, hand in hand with grateful hearts and our families' blessings, we invite our cherished family and friends to stand with us as we make our holy vows before God."
  ],
  announcement: "Kindly come at least a day before as requested by the couple to join us for the Engagement ceremony!",
  showAnnouncement: true,
  rsvpDeadline: "2026-10-25T23:59:59+01:00",
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
    dressCode: "Formal & Elegant (Suits, Gowns, Formal Traditional)",
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
    dressCode: "Celebratory Glamour (Mustard Gold & Forest Green)",
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
    id: "gift-1",
    name: "Royal Dutch Oven Enamel Cookware Set",
    category: "Kitchen",
    description: "Heavy-gauge enameled cast iron cookware set in forest green finish with gold brass knobs.",
    quantity: 1,
    status: "Available",
    estimatedValue: 120000,
  },
  {
    id: "gift-2",
    name: "Philips Digital Air Fryer XXL",
    category: "Appliances",
    description: "Twin TurboStar rapid air technology for healthy home cooking and quick family meals.",
    quantity: 1,
    status: "Reserved",
    reservedBy: "Aunty Folashade",
    reservedEmail: "folashade@example.com",
    reservedPhone: "08055551234",
    reservedAt: "2026-09-15T09:00:00Z",
    estimatedValue: 165000,
  },
  {
    id: "gift-3",
    name: "24-Piece Gold-Rimmed Porcelain Dinner Set",
    category: "Dining & Household",
    description: "Classic bone china dinnerware featuring fine gold trim and floral accents.",
    quantity: 1,
    status: "Available",
    estimatedValue: 95000,
  },
  {
    id: "gift-4",
    name: "LG Smart Inverter Microwave Oven 42L",
    category: "Appliances",
    description: "Even heating and defrosting with anti-bacterial easy-clean interior.",
    quantity: 1,
    status: "Available",
    estimatedValue: 180000,
  },
  {
    id: "gift-5",
    name: "Breville Barista Touch Espresso Machine",
    category: "Appliances",
    description: "Automated touchscreen bean-to-cup coffee maker for our morning routines.",
    quantity: 1,
    status: "Available",
    estimatedValue: 350000,
  },
  {
    id: "gift-6",
    name: "Egyptian Cotton Luxury 1000TC Bedding Set",
    category: "Bedroom & Living",
    description: "Ultra-soft breathable king-size bed linen set in warm cream with matching pillowcases.",
    quantity: 1,
    status: "Received",
    reservedBy: "The Groomsmen Collective",
    estimatedValue: 110000,
  },
  {
    id: "gift-7",
    name: "Dyson V11 Cordless Vacuum Cleaner",
    category: "Dining & Household",
    description: "Intelligent suction optimization and deep whole-home filtration.",
    quantity: 1,
    status: "Available",
    estimatedValue: 420000,
  },
  {
    id: "gift-8",
    name: "Panasonic Super Heavy Blender & Grinder",
    category: "Kitchen",
    description: "High-power stainless steel blades ideal for blending beans, pepper, and smoothies.",
    quantity: 1,
    status: "Available",
    estimatedValue: 75000,
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

  try {
    ensureDirectoryExists(DATA_DIR);
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      memoryCache = {
        ...getInitialDatabase(),
        ...parsed,
      };
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
  } catch (err) {
    console.warn("[Store] Failed to write data/store.json to disk:", err);
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
    return guest || null;
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
        (data.invitationCode && r.invitationCode.toLowerCase() === data.invitationCode.toLowerCase()) ||
        r.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingIndex !== -1) {
      const updated: RSVP = {
        ...db.rsvps[existingIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      db.rsvps[existingIndex] = updated;
      saveDatabase(db);
      return { rsvp: updated, isUpdate: true };
    }

    const newRSVP: RSVP = {
      ...data,
      id: `rsvp-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    db.rsvps.unshift(newRSVP);
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
