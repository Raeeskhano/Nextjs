const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async ({ params }) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) return request.json();
  return (
    <section>
      <h1>
        Event Details: <br /> {slug}
      </h1>
    </section>
  );
};

export default page;
