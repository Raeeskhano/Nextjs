import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Event from "../../../../database/event.model";
import { events as fallbackEvents } from "../../../../lib/constants";

export async function POST(req = NextRequest) {
  const { v2: cloudinary } = await import("cloudinary");
  try {
    await dbConnect();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        { message: "invalid form data format" },
        { status: 400 },
      );
    }

    const file = formData.get("image");

    if (!file)
      return NextResponse.json(
        { message: "image file is required" },
        { status: 400 },
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          },
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Event Failed", error });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/events failed:", error);
    return NextResponse.json(
      {
        message: "Event fetching failed; returning fallback events.",
        events: fallbackEvents,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 200 },
    );
  }
}
