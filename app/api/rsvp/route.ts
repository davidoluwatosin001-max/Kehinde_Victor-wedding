import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validation";
import { store } from "@/lib/store";
import { sendEmail, generateRSVPEmailHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
