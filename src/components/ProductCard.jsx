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
      className={`group relative overflow-hidden rounded-[1.75rem] border bg-[#f8f3ea] shadow-[0_18px_45px_-22px_rgba(20,17,15,0.28)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_38px_80px_-28px_rgba(20,17,15,0.4)] ${
        isSelected ? "border-stone-950 ring-2 ring-[#b85245] ring-offset-4 ring-offset-[#f4efe6]" : "border-stone-950"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-pressed={isSelected}
        aria-label={`Apri dettaglio ${item.title}`}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden border-b border-stone-950">
          <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.04]">
            <CeramicVisual item={item} photoSrc={primaryPhoto(item) || undefined} />
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-600">
            <span>{item.kind}</span>
            <span className="font-serif text-sm normal-case tracking-normal text-stone-900">{item.price}</span>
          </div>
          <h3 className="font-serif text-3xl font-normal leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem]">{item.title}</h3>
          <p className="mt-3 min-h-[3rem] text-sm leading-[1.65] text-stone-700">{item.claim}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="rounded-full border border-stone-900/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-700">
              {item.status}
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-stone-950 text-white transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Bag size={16} />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
