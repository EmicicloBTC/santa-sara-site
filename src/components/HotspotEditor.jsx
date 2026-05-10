import { useEffect, useState } from "react";

/**
 * Editor coordinate hotspot (dev-only).
 * Attiva con "?" sulla tastiera. Cliccando sull'immagine appaiono le coordinate
 * in alto a destra: copia la riga e incollala in src/data/scenes.js.
 */
export function HotspotEditor({ enabled, sceneId, lastClick }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [lastClick]);

  if (!enabled) return null;

  const snippet = lastClick
    ? `{ productId: "?", x: ${lastClick.x}, y: ${lastClick.y}, r: 6 },`
    : "Clicca un punto sull'immagine…";

  async function copySnippet() {
    if (!lastClick) return;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="pointer-events-auto absolute right-4 top-20 z-40 max-w-xs rounded-xl border border-amber-300/70 bg-amber-50/95 p-3 text-xs text-stone-900 shadow-xl backdrop-blur-md">
      <p className="mb-2 font-semibold uppercase tracking-[0.22em] text-amber-700">
        Editor hotspot · {sceneId}
      </p>
      <code className="block whitespace-pre-wrap break-all rounded-md bg-white/85 p-2 font-mono text-[11px] leading-relaxed">
        {snippet}
      </code>
      <div className="mt-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={copySnippet}
          disabled={!lastClick}
          className="rounded-md bg-stone-900 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-stone-700 disabled:opacity-40"
        >
          {copied ? "Copiato!" : "Copia"}
        </button>
        <span className="text-[10px] text-stone-500">premi ? per chiudere</span>
      </div>
    </div>
  );
}
