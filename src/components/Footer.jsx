export function Footer({ sceneTitle, sceneIndex, sceneCount }) {
  const counter = `${String(sceneIndex + 1).padStart(2, "0")} / ${String(sceneCount).padStart(2, "0")}`;
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between p-4 sm:p-6">
      <div className="pointer-events-auto rounded-full bg-white/55 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-800 backdrop-blur-md ring-1 ring-stone-950/15 sm:text-[11px]">
        {sceneTitle}
      </div>
      <div className="pointer-events-auto flex items-center gap-3">
        <span className="rounded-full bg-white/55 px-3 py-2 font-serif text-sm tracking-[-0.01em] text-stone-900 backdrop-blur-md ring-1 ring-stone-950/15 tabular-nums">
          {counter}
        </span>
        <span className="hidden rounded-full bg-white/55 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-700 backdrop-blur-md ring-1 ring-stone-950/15 sm:inline-flex">
          © Santa Sara
        </span>
      </div>
    </footer>
  );
}
