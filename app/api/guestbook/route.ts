import { NextRequest, NextResponse } from "next/server";
import { guestbookSchema } from "@/lib/validation";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const messages = await store.getGuestbookMessages();
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = guestbookSchema.parse(body);

    const message = await store.submitGuestbookMessage(validated);
    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to submit message" }, { status: 500 });
  }
}
