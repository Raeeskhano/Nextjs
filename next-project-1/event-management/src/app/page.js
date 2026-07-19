import ExploreBtn from "@/components/ExploreBtn";
import EventsList from "@/components/EventsList";
import { events as fallbackEvents } from "@/lib/constants";

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <EventsList fallbackEvents={fallbackEvents} />
      </div>
    </section>
  );
};

export default Page;
