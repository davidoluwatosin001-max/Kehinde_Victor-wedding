import { NextRequest, NextResponse } from "next/server";
import { monetaryGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = monetaryGiftSchema.parse(body);

    const gift = await store.submitMonetaryGift(validated);
    return NextResponse.json({ success: true, gift });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to record gift" }, { status: 500 });
  }
}
