export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validation";
import { store } from "@/lib/store";
import { sendEmail, generateRSVPEmailHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Auto-sanitize attendees if omitted or empty
    if (!body.attendees || !Array.isArray(body.attendees) || body.attendees.length === 0) {
      body.attendees = [
        {
          name: typeof body.guestName === "string" ? body.guestName.trim() : "",
          dietaryPreference: body.dietaryRequirements || "",
        },
      ];
    } else {
      body.attendees = body.attendees.map((att: any, idx: number) => ({
        name: typeof att?.name === "string" && att.name.trim() !== ""
          ? att.name.trim()
          : (idx === 0 && typeof body.guestName === "string" ? body.guestName.trim() : `Attendee ${idx + 1}`),
        dietaryPreference: att?.dietaryPreference || "",
      }));
    }

    const validated = rsvpSchema.parse(body);

    const { rsvp, isUpdate } = await store.submitRSVP(validated);

    // Send confirmation email asynchronously
    sendEmail({
      to: validated.email,
      subject: `RSVP Confirmed: Kehinde & Victor Wedding — 19 Nov 2026`,
      html: generateRSVPEmailHtml(
        validated.guestName,
        validated.status,
        validated.guestCount,
        validated.attendingEvents
      ),
    }).catch((e) => console.error("Email send failed:", e));

    return NextResponse.json({ success: true, rsvp, isUpdate }, { status: 200 });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to process RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rsvps = await store.getRSVPs();
    return NextResponse.json({ rsvps });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
