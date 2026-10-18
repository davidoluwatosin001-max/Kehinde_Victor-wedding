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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, approved } = body;
    if (!id || typeof approved !== "boolean") {
      return NextResponse.json({ error: "Missing message id or valid approved boolean" }, { status: 400 });
    }

    const updated = await store.updateGuestbookApproval(id, approved);
    if (!updated) {
      return NextResponse.json({ error: "Guestbook message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const success = await store.deleteGuestbookMessage(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}
