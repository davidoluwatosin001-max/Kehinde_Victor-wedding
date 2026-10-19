export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { customGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";
import { CustomGiftProposal } from "@/types";

export async function GET() {
  try {
    const proposals = await store.getCustomGiftProposals();
    return NextResponse.json({ proposals });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = customGiftSchema.parse(body);

    const proposal = await store.submitCustomGiftProposal(validated);
    return NextResponse.json({ success: true, proposal });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to submit proposal" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Missing proposal id or status" }, { status: 400 });
    }

    const validStatuses: CustomGiftProposal["status"][] = ["Under Review", "Accepted", "Received", "Fulfilled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await store.updateCustomGiftStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, proposal: updated });
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

    const success = await store.deleteCustomGift(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}
