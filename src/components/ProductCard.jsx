import { motion } from "framer-motion";
import { primaryPhoto } from "../data/products.js";
import { Bag } from "./icons.jsx";
import { CeramicVisual } from "./CeramicVisual.jsx";

export function ProductCard({ item, index, onSelect, isSelected = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-[2rem] border bg-[#f8f1e6] shadow-[9px_9px_0_#111] transition duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[15px_15px_0_#111] ${
        isSelected ? "border-stone-950 ring-4 ring-[#ff4f2f] ring-offset-2 ring-offset-[#f4efe6]" : "border-stone-950"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-pressed={isSelected}
        aria-label={`Apri dettaglio ${item.title}`}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/5] border-b border-stone-950">
          <CeramicVisual item={item} photoSrc={primaryPhoto(item) || undefined} />
        </div>
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-stone-600">
            <span>{item.kind}</span>
            <span>{item.price}</span>
          </div>
          <h3 className="font-serif text-3xl leading-none tracking-[-0.05em] sm:text-4xl">{item.title}</h3>
          <p className="mt-4 min-h-[3rem] text-sm leading-6 text-stone-700">{item.claim}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="rounded-full border border-stone-950 px-3 py-1 text-xs uppercase tracking-[0.18em]">{item.status}</span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-stone-950 text-white transition group-hover:rotate-[-8deg] group-hover:scale-110">
              <Bag size={18} />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
