export type RSVPStatus = 'Pending' | 'Confirmed' | 'Declined' | 'Maybe';

export interface Guest {
  id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  maxGuests: number;
  allowedPlusOne: boolean;
  accommodationEligible: boolean;
  isVip: boolean;
  notes?: string;
  createdAt: string;
}

export interface RSVPAttendee {
  id?: string;
  name: string;
  dietaryPreference?: string;
}

export interface RSVP {
  id: string;
  invitationCode: string;
  guestName: string;
  email: string;
  phone: string;
  status: RSVPStatus;
  guestCount: number;
  attendingEvents?: string;
  attendingState?: string;
  attendingCity?: string;
  attendees: RSVPAttendee[];
  accommodationNeeded: boolean;
  dietaryRequirements?: string;
  message?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface AccommodationRequest {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  checkInDate: string;
  checkOutDate: string;
  roomRequirement: string;
  specialRequirements?: string;
  notes?: string;
  status: 'Pending' | 'Approved' | 'Declined' | 'Allocated';
  createdAt: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string; // e.g. "Wed, 18th Nov 2026"
  time: string; // e.g. "4:00 PM prompt"
  venue: string;
  address: string;
  description?: string;
  dressCode?: string;
  googleMapsUrl?: string;
  isDayEvent?: boolean;
}

export type GiftStatus = 'Available' | 'Reserved' | 'Received';

export interface GiftItem {
  id: string;
  name: string;
  category: 'Kitchen' | 'Appliances' | 'Furniture' | 'Electronics & Gadgets' | 'Bedroom & Living' | 'Dining & Household';
  description: string;
  image?: string;
  estimatedValue?: number; // admin view
  quantity: number;
  status: GiftStatus;
  reservedBy?: string;
  reservedEmail?: string;
  reservedPhone?: string;
  reservedAt?: string;
  notes?: string;
}

export interface MonetaryGift {
  id: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  amount: number;
  paymentDate: string;
  bankUsed?: string;
  reference?: string;
  message?: string;
  status: 'Reported' | 'Verified';
  createdAt: string;
}

export interface CustomGiftProposal {
  id: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  giftDescription: string;
  message?: string;
  createdAt: string;
}

export interface GuestbookMessage {
  id: string;
  author: string;
  relationship?: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface SiteSettings {
  coupleNames: string;
  weddingDate: string; // ISO string e.g. "2026-11-19T10:00:00+01:00"
  tagline: string;
  hashtag: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  paymentInstructions: string;
  storyTitle: string;
  storyContent: string[];
  announcement?: string;
  showAnnouncement: boolean;
  rsvpDeadline: string;
  phone1: string;
  phone2: string;
}

export interface AdminStats {
  totalInvited: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
  totalAttendeesCount: number;
  accommodationRequestsCount: number;
  monetaryGiftsCount: number;
  monetaryGiftsTotal: number;
  physicalGiftsTotal: number;
  physicalGiftsReserved: number;
  physicalGiftsReceived: number;
  messagesCount: number;
}
