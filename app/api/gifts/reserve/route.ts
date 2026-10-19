import { NextRequest, NextResponse } from "next/server";
import { reserveGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";
import { sendEmail, generateGiftReservationPendingEmailHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = reserveGiftSchema.parse(body);

    const result = await store.submitGiftReservation(validated.giftId, {
      name: validated.reservedBy,
      email: validated.reservedEmail,
      phone: validated.reservedPhone,
      notes: validated.notes,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 409 });
    }

    // Send email notification to guest: Pending confirmation
    if (result.gift) {
      sendEmail({
        to: validated.reservedEmail,
        subject: `Reservation Request Received: ${result.gift.name} — Kehinde & Victor Wedding`,
        html: generateGiftReservationPendingEmailHtml(validated.reservedBy, result.gift.name),
      }).catch((e) => console.error("Email send failed:", e));
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      reservation: result.reservation,
      gift: result.gift,
    });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to submit gift reservation request" }, { status: 500 });
  }
}
