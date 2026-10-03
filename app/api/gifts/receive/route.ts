import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { giftId, status } = await req.json();
    if (!giftId) {
      return NextResponse.json({ error: "Gift ID is required" }, { status: 400 });
    }

    let updated;
    if (status) {
      updated = await store.updateGiftStatus(giftId, status);
    } else {
      updated = await store.markGiftReceived(giftId);
    }

    if (!updated) {
      return NextResponse.json({ error: "Gift not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, gift: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
