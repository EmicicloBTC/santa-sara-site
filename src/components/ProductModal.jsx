import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productImages } from "../data/products.js";
import { Arrow, ChevronLeft, ChevronRight, Close } from "./icons.jsx";
import { useT, useLocalizedProduct } from "../i18n/index.jsx";

const AUTO_MS = 3000;

/**
 * Precarica un set di URL nel browser (cache HTTP). Idempotente:
 * tiene traccia di cosa è già stato richiesto e non ripete il lavoro.
 * Così quando il modal cambia foto, il browser le mostra istantaneamente.
 */
const preloadedUrls = new Set();
function preloadUrls(urls) {
  if (typeof window === "undefined") return;
  for (const url of urls) {
    if (preloadedUrls.has(url)) continue;
    preloadedUrls.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}

// Variants per la slide "galleria": la foto nuova entra da destra (o sinistra,
// se si va indietro), quella vecchia esce dal lato opposto.
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const SLIDE_TRANSITION = {
  x: { type: "tween", duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  opacity: { duration: 0.35, ease: "linear" },
};

export function ProductModal({ product, onClose }) {
  const open = !!product;
  const t = useT();
  // localizza description / dimensions / price / cta / categoryLabel
  const localized = useLocalizedProduct(product);
  const images = useMemo(() => (product ? productImages(product) : []), [product]);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  // Precarica tutte le foto del prodotto appena cambia (anche prima di aprire,
  // perché preloadUrls non blocca). Così l'apertura non ha "salti".
  useEffect(() => {
    if (images.length) preloadUrls(images);
  }, [images]);

  // Reset slide quando cambia prodotto.
  useEffect(() => {
    setActive(0);
    setDirection(1);
  }, [product?.id]);

  const goNext = () => {
    if (images.length <= 1) return;
    setDirection(1);
    setActive((p) => (p + 1) % images.length);
  };
  const goPrev = () => {
    if (images.length <= 1) return;
    setDirection(-1);
    setActive((p) => (p - 1 + images.length) % images.length);
  };
  const goTo = (i) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setDirection(1);
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
            aria-label={t.ui.close}
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
              aria-label={t.ui.close}
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-stone-900 shadow ring-1 ring-stone-950/15 backdrop-blur-md transition hover:bg-white"
            >
              <Close size={16} />
            </button>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#efe8db] md:aspect-auto md:min-h-[520px]">
              {localized.categoryLabel && (
                <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-700 shadow ring-1 ring-stone-950/15 backdrop-blur-md">
                  {localized.categoryLabel}
                </span>
              )}
              <AnimatePresence initial={false} custom={direction}>
                {images[active] ? (
                  <motion.img
                    key={images[active]}
                    src={images[active]}
                    alt={product.title}
                    draggable={false}
                    decoding="async"
                    loading="eager"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SLIDE_TRANSITION}
                    className="absolute inset-0 h-full w-full object-contain p-3 will-change-transform sm:p-5"
                  />
                ) : null}
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  {/* barra di progresso autoplay (riempie da 0 a 100% in AUTO_MS ms) */}
                  {!paused && (
                    <motion.div
                      key={`progress-${product.id}-${active}`}
                      className="absolute left-0 top-0 z-10 h-0.5 origin-left bg-white/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      style={{ width: "100%" }}
                    />
                  )}

                  <button
                    type="button"
                    aria-label={t.ui.prev}
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label={t.ui.next}
                    onClick={goNext}
                    className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`${t.ui.imageN} ${i + 1}`}
                        aria-current={active === i || undefined}
                        onClick={() => goTo(i)}
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
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                {product.title}
              </h2>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-stone-950/15 py-4 text-sm">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">{t.modal.dimensions}</dt>
                  <dd className="mt-1 font-serif text-base tracking-[-0.01em] text-stone-900">
                    {localized.dimensions || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">{t.modal.price}</dt>
                  <dd className="mt-1 font-serif text-base tracking-[-0.01em] text-stone-900">{localized.price}</dd>
                </div>
              </dl>

              <p className="mt-6 text-base leading-[1.7] text-stone-700">{localized.description}</p>

              <div className="mt-auto pt-8">
                <a
                  href={product.ctaHref || "#"}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-stone-950 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition hover:bg-[#3a342d] sm:w-auto"
                >
                  {localized.cta || t.modal.askAvailability} <Arrow size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
