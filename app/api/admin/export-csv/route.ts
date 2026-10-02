import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const guests = await store.getGuests();
    const rsvps = await store.getRSVPs();

    // Build CSV Headers
    const headers = [
      "Guest ID",
      "Invitation Code",
      "Primary Guest Name",
      "Email",
      "Phone",
      "State Attending From",
      "City Attending From",
      "Max Guests Allowed",
      "VIP",
      "RSVP Status",
      "Events Attending",
      "Attendees Count",
      "Accommodation Needed",
      "Dietary Requirements",
      "Guest Message",
      "RSVP Date",
    ];

    const rows = guests.map((g) => {
      const match = rsvps.find((r) => r.invitationCode.toUpperCase() === g.code.toUpperCase());
      return [
        `"${g.id}"`,
        `"${g.code}"`,
        `"${g.name.replace(/"/g, '""')}"`,
        `"${g.email || (match?.email) || ""}"`,
        `"${g.phone || (match?.phone) || ""}"`,
        `"${(match?.attendingState || "").replace(/"/g, '""')}"`,
        `"${(match?.attendingCity || "").replace(/"/g, '""')}"`,
        g.maxGuests,
        g.isVip ? "Yes" : "No",
        `"${match ? match.status : "Pending"}"`,
        `"${(match?.attendingEvents || "All Events").replace(/"/g, '""')}"`,
        match ? match.guestCount : 0,
        match?.accommodationNeeded ? "Yes" : "No",
        `"${(match?.dietaryRequirements || "").replace(/"/g, '""')}"`,
        `"${(match?.message || "").replace(/"/g, '""')}"`,
        `"${match?.submittedAt || ""}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="Kehinde_Victor_Wedding_Guests.csv"',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
