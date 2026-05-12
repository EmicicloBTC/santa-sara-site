import { productImages } from "../data/products.js";
import { Plus } from "./icons.jsx";
import { useT, useLocalizedProduct } from "../i18n/index.jsx";

// Precaricamento lazy delle immagini di un prodotto al primo hover/focus
// sul hotspot. Quando poi l'utente clicca, il modal apre con foto già in cache.
const preloaded = new Set();
function preloadProduct(product) {
  if (!product || preloaded.has(product.id) || typeof window === "undefined") return;
  preloaded.add(product.id);
  for (const url of productImages(product)) {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}

/** Punto interattivo su un prodotto dentro la scena. Le coordinate sono in % rispetto al box scena. */
export function Hotspot({ hotspot, product, onOpen }) {
  const t = useT();
  const localized = useLocalizedProduct(product);
  if (!product) return null;
  const radius = hotspot.r ?? 5;
  const size = `${radius * 2}%`;
  const prefetch = () => preloadProduct(product);
  const isSold = product.sold === true;
  // pallino centrale: variante rosa per i pezzi venduti, neutro altrimenti
  const dotClasses = isSold
    ? "bg-[#fde2e2]/95 text-[#b91c1c] ring-[#b91c1c]/40 shadow-[0_6px_22px_-6px_rgba(185,28,28,0.55)] group-hover:bg-[#fde2e2]"
    : "bg-white/85 text-stone-950 ring-stone-950/20 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.55)] group-hover:bg-white";
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      onTouchStart={prefetch}
      aria-label={`${t.ui.openProductCard} ${product.title}${isSold ? ` (${t.modal.sold})` : ""}`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: size,
        aspectRatio: "1 / 1",
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
    >
      {/* alone glow ampio: appare in hover/focus */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-120%] rounded-full opacity-0 blur-2xl transition duration-500 ease-out group-hover:opacity-90 group-focus-visible:opacity-90"
        style={{
          background: isSold
            ? "radial-gradient(circle, rgba(254,202,202,0.85) 0%, rgba(248,180,180,0.35) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,236,200,0.85) 0%, rgba(255,200,140,0.35) 35%, transparent 70%)",
        }}
      />
      {/* anello pulsante leggero a riposo */}
      <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-white/40 opacity-60 transition group-hover:opacity-0" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-25%] rounded-full ring-1 ring-white/35 opacity-30 transition duration-700 ease-out group-hover:scale-125 group-hover:opacity-0"
        style={{ animation: "ssPing 2.6s ease-out infinite" }}
      />
      {/* punto centrale */}
      <span
        className={`absolute inset-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ring-1 backdrop-blur-md transition duration-300 group-hover:scale-110 ${dotClasses}`}
      >
        <Plus size={14} />
      </span>
      {/* tooltip nome prodotto in hover */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-stone-950/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {product.title} · {isSold ? t.modal.sold : localized.price}
      </span>
    </button>
  );
}
