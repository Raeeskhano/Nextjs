"use client";

import { useState } from "react";

const BookEvent = ({ eventId }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!eventId) {
      setError("Bookings are unavailable for this event.");
      return;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Booking creation failed");
        console.error("Booking creation failed", result);
      }
    } catch (fetchError) {
      setError("Unable to create booking. Please try again later.");
      console.error("Booking creation failed", fetchError);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            className="button-submit"
            disabled={!email.trim() || !eventId}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default BookEvent;
