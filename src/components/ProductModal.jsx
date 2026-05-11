import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productImages } from "../data/products.js";
import { Arrow, ChevronLeft, ChevronRight, Close } from "./icons.jsx";

const AUTO_MS = 4000;

export function ProductModal({ product, onClose }) {
  const open = !!product;
  const images = product ? productImages(product) : [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [product?.id]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (images.length > 1 && e.key === "ArrowRight") setActive((p) => (p + 1) % images.length);
      if (images.length > 1 && e.key === "ArrowLeft") setActive((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || images.length <= 1 || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [open, images.length, paused, product?.id]);

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Chiudi"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-stone-950/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-[#f6f1e8] text-stone-950 shadow-2xl ring-1 ring-stone-950/20 md:grid-cols-[1.1fr_1fr]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi"
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-stone-900 shadow ring-1 ring-stone-950/15 backdrop-blur-md transition hover:bg-white"
            >
              <Close size={16} />
            </button>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#efe8db] md:aspect-auto md:min-h-[520px]">
              <AnimatePresence mode="wait" initial={false}>
                {images[active] ? (
                  <motion.img
                    key={images[active]}
                    src={images[active]}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
                  />
                ) : null}
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Precedente"
                    onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Successiva"
                    onClick={() => setActive((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Immagine ${i + 1}`}
                        aria-current={active === i || undefined}
                        onClick={() => setActive(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          active === i ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6 sm:p-8 md:p-10">
              {product.category && (
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-stone-950/15 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-700">
                  {product.category}
                </span>
              )}
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
                {product.kind}
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                {product.title}
              </h2>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-stone-950/15 py-4 text-sm">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Dimensioni</dt>
                  <dd className="mt-1 font-serif text-base tracking-[-0.01em] text-stone-900">
                    {product.dimensions || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Prezzo</dt>
                  <dd className="mt-1 font-serif text-base tracking-[-0.01em] text-stone-900">{product.price}</dd>
                </div>
              </dl>

              <p className="mt-6 text-base leading-[1.7] text-stone-700">{product.description}</p>

              <div className="mt-auto pt-8">
                <a
                  href={product.ctaHref || "#"}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-stone-950 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition hover:bg-[#3a342d] sm:w-auto"
                >
                  {product.cta || "Chiedi disponibilità"} <Arrow size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
