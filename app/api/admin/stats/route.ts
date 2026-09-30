import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const stats = await store.getStats();
    return NextResponse.json({ stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
