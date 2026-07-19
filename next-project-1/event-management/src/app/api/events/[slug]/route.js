import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { events as fallbackEvents } from "@/lib/constants";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(req, { params }) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return NextResponse.json(
      { message: "Invalid or missing slug parameter" },
      { status: 400 },
    );
  }

  // Sanitize slug (remove any potential malicious input)
  const sanitizedSlug = slug.trim().toLowerCase();

  try {
    // Connect to database
    await connectDB();

    // Query events by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (event) {
      return NextResponse.json(
        { message: "Event fetched successfully", event },
        { status: 200 },
      );
    }

    // If DB is available but event is not found, return 404.
    return NextResponse.json(
      { message: `Event with slug '${sanitizedSlug}' not found` },
      { status: 404 },
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", error);
    }

    const fallbackEvent = fallbackEvents.find(
      (item) => item.slug === sanitizedSlug,
    );

    if (fallbackEvent) {
      return NextResponse.json(
        {
          message:
            "Event fetched from fallback data due to database connectivity issue",
          event: fallbackEvent,
        },
        { status: 200 },
      );
    }

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 },
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
