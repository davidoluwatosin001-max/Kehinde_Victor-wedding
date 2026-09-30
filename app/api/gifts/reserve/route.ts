import { NextRequest, NextResponse } from "next/server";
import { reserveGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";
import { sendEmail, generateGiftReservationEmailHtml } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = reserveGiftSchema.parse(body);

    const result = await store.reserveGift(validated.giftId, {
      name: validated.reservedBy,
      email: validated.reservedEmail,
      phone: validated.reservedPhone,
      notes: validated.notes,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 409 });
    }

    // Send email confirmation
    if (result.gift) {
      sendEmail({
        to: validated.reservedEmail,
        subject: `Gift Reserved: ${result.gift.name} — Kehinde & Victor Wedding`,
        html: generateGiftReservationEmailHtml(validated.reservedBy, result.gift.name),
      }).catch((e) => console.error("Email send failed:", e));
    }

    return NextResponse.json({ success: true, message: result.message, gift: result.gift });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to reserve gift" }, { status: 500 });
  }
}
