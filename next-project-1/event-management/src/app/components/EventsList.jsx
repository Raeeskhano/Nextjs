"use client";

import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

export default function EventsList({ fallbackEvents = [] }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/events")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        const list = Array.isArray(json.events) ? json.events : fallbackEvents;
        setEvents(list);
      })
      .catch(() => {
        if (!mounted) return;
        setEvents(fallbackEvents);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [fallbackEvents]);

  if (loading) return <p>Loading events...</p>;

  const display = events && events.length > 0 ? events : fallbackEvents;

  return (
    <ul className="events">
      {display.map((event) => (
        <li key={event.slug || event.title} className="list-none">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}
