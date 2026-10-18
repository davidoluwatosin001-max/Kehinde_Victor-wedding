import { NextRequest, NextResponse } from "next/server";
import { monetaryGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const gifts = await store.getMonetaryGifts();
    return NextResponse.json({ monetaryGifts: gifts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Missing gift id or status" }, { status: 400 });
    }

    if (status !== "Reported" && status !== "Verified") {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await store.updateMonetaryGiftStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Monetary gift not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, gift: updated });
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

    const success = await store.deleteMonetaryGift(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}
