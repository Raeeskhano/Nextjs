import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-fuchsia-500 to-amber-400 px-6 py-16 text-white">
      <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em]">
            Oops!
          </span>
          <span className="text-sm text-white/80">This page took a detour</span>
        </div>

        <div className="space-y-4">
          <p className="text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl">
            404
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">
            The page you’re looking for is somewhere over the rainbow.
          </h1>
          <p className="max-w-2xl text-lg text-white/80 sm:text-xl">
            Don’t worry — even the best adventures have a few unexpected turns.
            Head back home and keep exploring.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-fuchsia-700 transition hover:scale-105 hover:bg-fuchsia-50"
          >
            Go Home
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore More
          </Link>
        </div>
      </div>
    </main>
  );
}
