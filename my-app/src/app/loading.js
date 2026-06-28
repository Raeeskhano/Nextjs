export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950 px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex justify-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-white/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-fuchsia-400 animate-spin" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Loading your experience
        </h1>
        <p className="mt-3 text-sm text-slate-200/80 sm:text-base">
          We&apos;re preparing something amazing just for you.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.2s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.1s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400" />
        </div>
      </div>
    </main>
  );
}
