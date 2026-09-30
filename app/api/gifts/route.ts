import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const gifts = await store.getGifts();
    return NextResponse.json({ gifts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
