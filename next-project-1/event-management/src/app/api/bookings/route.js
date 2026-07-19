import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { eventId, email } = body;

    if (!eventId || !email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing eventId or email." },
        { status: 400 },
      );
    }

    const booking = await Booking.create({ eventId, email });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking creation failed:", error);

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Booking creation failed.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
