import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Event from "../../../../../database/event.model";

const VALID_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(_request, { params }) {
  const slug = params?.slug;

  if (!slug || typeof slug !== "string" || !slug.trim()) {
    return NextResponse.json(
      { message: "Missing event slug parameter." },
      { status: 400 },
    );
  }

  const normalizedSlug = slug.trim().toLowerCase();

  if (!VALID_SLUG_REGEX.test(normalizedSlug)) {
    return NextResponse.json(
      {
        message:
          "Invalid event slug. Use lowercase letters, numbers, and hyphens only.",
      },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event not found for slug: ${normalizedSlug}` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/events/[slug] failed:", error);
    return NextResponse.json(
      {
        message: "Unable to fetch event details at this time.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
