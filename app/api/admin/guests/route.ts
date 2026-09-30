import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const guests = await store.getGuests();
    const rsvps = await store.getRSVPs();

    // Attach RSVP status to guest if found
    const guestsWithRSVP = guests.map((g) => {
      const match = rsvps.find((r) => r.invitationCode.toUpperCase() === g.code.toUpperCase());
      return {
        ...g,
        rsvpStatus: match ? match.status : "Pending",
        rsvpGuestCount: match ? match.guestCount : 0,
        rsvpSubmittedAt: match ? match.submittedAt : null,
      };
    });

    return NextResponse.json({ guests: guestsWithRSVP });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Guest name is required" }, { status: 400 });
    }

    // Generate random code if not provided
    const code =
      body.code?.trim() ||
      `KV-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const saved = await store.saveGuest({
      ...body,
      code,
      maxGuests: body.maxGuests || 1,
      allowedPlusOne: Boolean(body.allowedPlusOne),
      accommodationEligible: Boolean(body.accommodationEligible),
      isVip: Boolean(body.isVip),
    });

    return NextResponse.json({ success: true, guest: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const success = await store.deleteGuest(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
