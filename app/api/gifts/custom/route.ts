import { NextRequest, NextResponse } from "next/server";
import { customGiftSchema } from "@/lib/validation";
import { store } from "@/lib/store";

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
