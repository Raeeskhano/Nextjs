import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/database/event.model.js";

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

    const uploadeResult = await new Promise((resolve, reject)=>{
        
    })

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
