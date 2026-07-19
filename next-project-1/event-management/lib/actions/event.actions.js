"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { events as fallbackEvents } from "@/lib/constants";

export const getEventBySlug = async (slug) => {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const normalizedSlug = slug.trim().toLowerCase();

  try {
    await connectDB();
    const event = await Event.findOne({ slug: normalizedSlug }).lean().exec();
    if (event) {
      return event;
    }
  } catch (error) {
    console.error("Error fetching event by slug:", error);
  }

  return fallbackEvents.find((item) => item.slug === normalizedSlug) || null;
};

export const getSimilarEventsBySlug = async (slug) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags ?? [] },
    })
      .lean()
      .exec();
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [];
  }
};
