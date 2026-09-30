import { NextRequest, NextResponse } from "next/server";
import { accommodationSchema } from "@/lib/validation";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = accommodationSchema.parse(body);

    const request = await store.submitAccommodationRequest(validated);
    return NextResponse.json({ success: true, request });
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await store.getAccommodationRequests();
    return NextResponse.json({ requests });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
