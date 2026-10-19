import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { sendEmail, generateGiftReservationConfirmedEmailHtml } from "@/lib/email";

export async function GET() {
  try {
    const reservations = await store.getGiftReservations();
    return NextResponse.json({ reservations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservationId, action, reason, adminUser, reservation } = body;

    if (!reservationId || !action) {
      return NextResponse.json(
        { error: "reservationId and action ('confirm' | 'reject' | 'cancel') are required" },
        { status: 400 }
      );
    }

    let result;
    if (action === "confirm") {
      result = await store.confirmGiftReservation(reservationId, adminUser, reservation);
      // Dispatch confirmed email notification if reservation confirmed successfully
      if (result.success && result.reservation && result.gift && result.reservation.email && result.reservation.email.trim() !== "") {
        sendEmail({
          to: result.reservation.email.trim(),
          subject: `Gift Reservation Confirmed: ${result.gift.name} — Kehinde & Victor Wedding`,
          html: generateGiftReservationConfirmedEmailHtml(result.reservation.guestName, result.gift.name),
        }).catch((e) => console.error("Email send failed:", e));
      }
    } else if (action === "reject") {
      result = await store.rejectGiftReservation(reservationId, reason, reservation);
    } else if (action === "cancel") {
      result = await store.cancelGiftReservation(reservationId, reservation);
    } else {
      return NextResponse.json({ error: `Invalid action '${action}'` }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 409 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update reservation" }, { status: 500 });
  }
}
