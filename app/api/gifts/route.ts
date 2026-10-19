import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const availableOnly = searchParams.get("availableOnly") === "true";
    const gifts = await store.getGifts(availableOnly);
    return NextResponse.json({ gifts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
