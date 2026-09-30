import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code parameter is required" }, { status: 400 });
  }

  const guest = await store.getGuestByCode(code);
  if (!guest) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  }

  return NextResponse.json({ guest });
}
