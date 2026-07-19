import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let event = {};
    let file = null;
    let tags;
    let agenda;

    if (contentType.includes("multipart/form-data")) {
      let formData;
      try {
        formData = await req.formData();
      } catch (e) {
        return NextResponse.json(
          {
            message: "Event Creation Failed",
            error:
              "Failed to parse body as FormData. Ensure you are sending multipart/form-data with an 'image' file field.",
          },
          { status: 400 },
        );
      }

      file = formData.get("image");
      event = Object.fromEntries(formData.entries());
      const tagsRaw = formData.get("tags");
      const agendaRaw = formData.get("agenda");

      if (!tagsRaw || !agendaRaw) {
        return NextResponse.json(
          {
            message: "Event Creation Failed",
            error:
              "Both 'tags' and 'agenda' fields are required as JSON strings.",
          },
          { status: 400 },
        );
      }

      try {
        tags = JSON.parse(tagsRaw);
        agenda = JSON.parse(agendaRaw);
      } catch (error) {
        return NextResponse.json(
          {
            message: "Event Creation Failed",
            error:
              "Failed to parse 'tags' or 'agenda'. They must be valid JSON arrays.",
          },
          { status: 400 },
        );
      }
    } else if (contentType.includes("application/json")) {
      try {
        event = await req.json();
      } catch (e) {
        return NextResponse.json(
          {
            message: "Event Creation Failed",
            error:
              "Invalid JSON body. Send valid JSON when using application/json.",
          },
          { status: 400 },
        );
      }

      tags = Array.isArray(event.tags)
        ? event.tags
        : typeof event.tags === "string"
          ? JSON.parse(event.tags)
          : undefined;
      agenda = Array.isArray(event.agenda)
        ? event.agenda
        : typeof event.agenda === "string"
          ? JSON.parse(event.agenda)
          : undefined;
    } else {
      return NextResponse.json(
        {
          message: "Event Creation Failed",
          error:
            "Request content type must be multipart/form-data or application/json.",
        },
        { status: 400 },
      );
    }

    if (!file && !event.imageUrl) {
      return NextResponse.json(
        {
          message: "Event Creation Failed",
          error:
            "An image is required. Upload a file in multipart/form-data or provide imageUrl in JSON.",
        },
        { status: 400 },
      );
    }

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "DevEvent" },
            (error, results) => {
              if (error) return reject(error);

              resolve(results);
            },
          )
          .end(buffer);
      });

      event.image = uploadResult.secure_url || uploadResult.url || "";
    } else {
      event.image = event.imageUrl || "";
    }

    // If client supplied `location` but not `venue`, use `location` as venue
    if (!event.venue && event.location) {
      event.venue = event.location;
    }

    const createdEvent = await Event.create({
      ...event,
      tags,
      agenda,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    console.error(e && e.stack ? e.stack : e);

    // Handle Mongoose validation errors with 400 and details
    if (e && e.name === "ValidationError") {
      const details = {};
      if (e.errors && typeof e.errors === "object") {
        for (const key of Object.keys(e.errors)) {
          details[key] = e.errors[key].message;
        }
      }

      return NextResponse.json(
        {
          message: "Event Creation Failed",
          error: "Validation failed",
          details,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
        stack:
          process.env.NODE_ENV === "production"
            ? undefined
            : e && e.stack
              ? e.stack
              : undefined,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (e) {
    console.error("GET /api/events failed:", e);
    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 },
    );
  }
}
