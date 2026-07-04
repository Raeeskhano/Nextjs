// import Hello from "../../../components/hello";
import Products from "../../../components/Products";

export default function Home() {
  // console.log("what type of component am i?");
  return (
    <div className="flex flex-col items-center justify-center min-h-[120vh] bg-black">
      <h1 className="text-6xl tracking-tighter mb-10 w-full md:w-[40vw] lg:w-[60vw] font-extrabold">
        Home Page Where You Can See All The Products Which Are Available In The
        Dummy JSON API.
      </h1>
      {/* <Hello /> */}
      <div>
        <Products />
      </div>
    </div>
  );
}
