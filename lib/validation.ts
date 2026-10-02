import { z } from "zod";

export const rsvpSchema = z.object({
  invitationCode: z.string().optional().default(""),
  guestName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Please provide a valid contact phone number"),
  status: z.enum(["Confirmed", "Declined", "Maybe"], {
    errorMap: () => ({ message: "Please select your attendance status" }),
  }),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").max(2, "Number of attending guests cannot be more than 2 (you and 1 other guest)"),
  attendingEvents: z.string().default("All Events (Engagement (Wed 18 Nov, 4pm) & White Wedding (Thu 19 Nov, 10am) / Reception)"),
  attendingState: z.string().optional().default(""),
  attendingCity: z.string().optional().default(""),
  attendees: z.array(
    z.object({
      name: z.string().min(1, "Attendee name is required"),
      dietaryPreference: z.string().optional(),
    })
  ).default([]),
  accommodationNeeded: z.boolean().default(false),
  dietaryRequirements: z.string().optional(),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
});

export const accommodationSchema = z.object({
  guestName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  numberOfPeople: z.coerce.number().min(1, "Number of guests must be at least 1").max(8, "Maximum 8 guests"),
  checkInDate: z.string().min(4, "Check-in date is required"),
  checkOutDate: z.string().min(4, "Check-out date is required"),
  roomRequirement: z.string().min(2, "Please select or describe room preference"),
  specialRequirements: z.string().optional(),
  notes: z.string().optional(),
});

export const monetaryGiftSchema = z.object({
  senderName: z.string().min(2, "Please enter your name"),
  senderEmail: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  senderPhone: z.string().optional().or(z.literal("")),
  amount: z.coerce.number().min(100, "Amount must be at least ₦100"),
  paymentDate: z.string().min(4, "Please specify payment date"),
  bankUsed: z.string().optional(),
  reference: z.string().optional(),
  message: z.string().max(500, "Message is too long").optional(),
});

export const reserveGiftSchema = z.object({
  giftId: z.string().min(1, "Gift ID is required"),
  reservedBy: z.string().min(2, "Please provide your full name"),
  reservedEmail: z.string().email("Please provide your email for confirmation"),
  reservedPhone: z.string().min(7, "Please provide a contact phone number"),
  notes: z.string().optional(),
});

export const customGiftSchema = z.object({
  senderName: z.string().min(2, "Please enter your name"),
  senderEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  senderPhone: z.string().min(7, "Please enter your phone number").optional().or(z.literal("")),
  giftDescription: z.string().min(3, "Please describe the gift you'd like to present"),
  message: z.string().optional(),
});

export const guestbookSchema = z.object({
  author: z.string().min(2, "Please provide your name"),
  relationship: z.string().optional(),
  message: z.string().min(3, "Message should be at least 3 characters").max(600, "Message cannot exceed 600 characters"),
});
