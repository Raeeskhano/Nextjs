import React from "react";
import ExploreBtn from "./components/ExploreBtn";
import EventCard from "./components/EventCard";

const page = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const response = await fetch(new URL("/api/events", baseUrl).toString(), {
    cache: "no-store",
  });

  const { events: eventsData } = response.ok
    ? await response.json()
    : { events: [] };

  return (
    <section>
      <h1 className="text-center tracking-tighter">
        The Hub For Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {eventsData &&
            eventsData.length > 0 &&
            eventsData.map((event) => (
              <li key={event.title} className="">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
