import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
      minlength: [10, "Overview must be at least 10 characters long"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: ["online", "offline", "hybrid"],
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Create a URL-friendly slug from the title and only regenerate it when needed.
eventSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Normalize the date to ISO format and keep time in a consistent 24-hour format.
  if (this.isModified("date") || this.isModified("time")) {
    const normalizedDate = new Date(this.date);
    if (!Number.isNaN(normalizedDate.getTime())) {
      this.date = normalizedDate.toISOString().split("T")[0];
    }

    if (this.time) {
      const [hours, minutes] = this.time.match(/\d{1,2}/g) || [];
      if (hours && minutes) {
        const normalizedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        this.time = normalizedTime;
      }
    }
  }

  next();
});

eventSchema.pre("validate", function (next) {
  const requiredFields = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "agenda",
    "organizer",
    "tags",
  ];

  for (const field of requiredFields) {
    const value = this[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && !value.trim())
    ) {
      return next(new Error(`${field} is required and cannot be empty`));
    }
  }

  next();
});

eventSchema.index({ slug: 1 }, { unique: true });

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
