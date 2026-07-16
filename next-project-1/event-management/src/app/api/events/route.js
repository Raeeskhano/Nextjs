import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "../../../../lib/mongodb";
import Event from "../../../../database/event.model";

export async function POST(req = NextRequest) {
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
    const buffer = buffer.from(arrayBuffer);

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

    const events = Event.find().sort({ createdAt: -1 });
  } catch (error) {
    NextResponse.json(
      { message: "Event fetching failed", error },
      { status: 500 },
    );
  }
}
