import { useT } from "../i18n/index.jsx";

export function Footer({
  sceneTitle,
  sceneIndex,
  sceneCount,
  autoAdvance,
  onToggleAutoAdvance,
}) {
  const t = useT();
  const counter = `${String(sceneIndex + 1).padStart(2, "0")} / ${String(sceneCount).padStart(2, "0")}`;

  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between p-4 sm:p-6">
      <div className="pointer-events-auto rounded-full bg-white/55 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-800 backdrop-blur-md ring-1 ring-stone-950/15 sm:text-[11px]">
        {sceneTitle}
      </div>
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleAutoAdvance}
          aria-pressed={autoAdvance}
          aria-label={t.ui.autoModeAria}
          title={autoAdvance ? t.ui.autoModeOnHint : t.ui.autoModeOffHint}
          className={
            "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.26em] backdrop-blur-md ring-1 transition sm:text-[11px] " +
            (autoAdvance
              ? "bg-white/80 text-stone-900 ring-amber-500/35 shadow-sm"
              : "bg-white/45 text-stone-600 ring-stone-950/12 hover:bg-white/55 hover:text-stone-800")
          }
        >
          <span
            aria-hidden
            className={
              "h-2 w-2 shrink-0 rounded-full " +
              (autoAdvance ? "bg-amber-500 animate-pulse" : "bg-stone-400")
            }
          />
          {autoAdvance ? t.ui.autoModeOn : t.ui.autoModeOff}
        </button>
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
