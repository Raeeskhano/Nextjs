import Hello from "../../components/hello";

export default function Home() {
  console.log("what type of component am i?");
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl tracking-tighter animate-bounce duration-150">
        hello next
      </h1>
      <Hello />
    </div>
  );
}
