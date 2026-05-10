import { useEffect, useMemo, useState } from "react";

/**
 * Editor coordinate hotspot (dev-only).
 * Attiva con E (o ?) sulla tastiera, oppure aprendo il sito con #edit nell'URL.
 *
 * Flusso:
 *   1. Scegli il prodotto qui sotto (Florence / Romance / …).
 *   2. Clicca sull'immagine sopra il prodotto: appare la riga di codice.
 *   3. Premi "Copia".
 *   4. Apri src/data/scenes.js, trova la scena giusta e incolla la riga
 *      dentro hotspots: [...]   (oppure hotspotsMobile: [...] se sei su
 *      formato mobile/verticale — l'editor te lo dice).
 */
export function HotspotEditor({
  enabled,
  sceneId,
  lastClick,
  products,
  isMobile,
  targetField = "hotspots",
  usingMobileSet,
  viewOverride = "auto",
  onChangeViewOverride,
}) {
  const productList = useMemo(() => Object.values(products || {}), [products]);
  const [productId, setProductId] = useState(productList[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [lastClick, productId, sceneId, targetField]);

  useEffect(() => {
    if (!productId && productList[0]) setProductId(productList[0].id);
  }, [productList, productId]);

  if (!enabled) return null;

  const snippet = lastClick
    ? `{ productId: "${productId || "?"}", x: ${lastClick.x}, y: ${lastClick.y}, r: 6 },`
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

  const deviceLabel = isMobile ? "Mobile · verticale" : "Desktop · orizzontale";
  const deviceClasses = isMobile
    ? "bg-sky-100 text-sky-800 ring-sky-300"
    : "bg-emerald-100 text-emerald-800 ring-emerald-300";

  return (
    <div className="pointer-events-auto absolute right-4 top-20 z-40 w-[300px] max-w-[88vw] rounded-xl border border-amber-300/70 bg-amber-50/95 p-3 text-xs text-stone-900 shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-semibold uppercase tracking-[0.22em] text-amber-700">
          Editor · {sceneId}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] ring-1 ${deviceClasses}`}
        >
          {deviceLabel}
        </span>
      </div>

      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
        Vista
      </p>
      <div className="mb-3 grid grid-cols-3 gap-1 rounded-md bg-white/70 p-1 ring-1 ring-stone-200">
        {[
          { id: "auto", label: "Auto" },
          { id: "desktop", label: "Desktop" },
          { id: "mobile", label: "Mobile" },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChangeViewOverride?.(opt.id)}
            className={`rounded px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] transition ${
              viewOverride === opt.id
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
        1. Scegli il prodotto
      </p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {productList.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProductId(p.id)}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
              productId === p.id
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-700 ring-1 ring-stone-300 hover:bg-stone-100"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
        2. Clicca sulla foto
      </p>
      <code className="block whitespace-pre-wrap break-all rounded-md bg-white/90 p-2 font-mono text-[11px] leading-relaxed">
        {snippet}
      </code>

      <p className="mt-3 mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
        3. Incolla in scenes.js dentro:
      </p>
      <code className="mb-2 block rounded-md bg-stone-900/90 px-2 py-1 font-mono text-[11px] text-amber-100">
        {targetField}: [ … ]
      </code>
      {isMobile && !usingMobileSet ? (
        <p className="mb-2 text-[10px] leading-relaxed text-amber-700">
          Stai usando il fallback desktop su mobile. Aggiungi
          <code className="mx-1 rounded bg-white/70 px-1 font-mono">hotspotsMobile: []</code>
          alla scena per posizioni dedicate.
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={copySnippet}
          disabled={!lastClick}
          className="rounded-md bg-stone-900 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-stone-700 disabled:opacity-40"
        >
          {copied ? "Copiato!" : "Copia riga"}
        </button>
        <span className="text-[10px] text-stone-500">E per chiudere</span>
      </div>
    </div>
  );
}
