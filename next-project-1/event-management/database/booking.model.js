import mongoose from "mongoose";
import Event from "./event.model.js";

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Validate that the referenced event exists before saving a booking.
bookingSchema.pre("save", async function (next) {
  if (!this.eventId) {
    return next(new Error("eventId is required"));
  }

  const existingEvent = await Event.findById(this.eventId);
  if (!existingEvent) {
    return next(new Error("Referenced event does not exist"));
  }

  next();
});

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
