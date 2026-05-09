import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productImages } from "../data/products.js";
import { CeramicVisual } from "./CeramicVisual.jsx";
import { ChevronLeft, ChevronRight } from "./icons.jsx";

const AUTO_MS = 4000;

/** Dettaglio opera: una foto, oppure carosello con dissolvenza + autoplay se più immagini. */
export function ProductDetailGallery({ item }) {
  const urls = productImages(item);
  const [active, setActive] = useState(0);
  const [pauseHover, setPauseHover] = useState(false);
  const [docHidden, setDocHidden] = useState(() => typeof document !== "undefined" && document.visibilityState === "hidden");

  useEffect(() => {
    setActive(0);
  }, [item.id]);

  useEffect(() => {
    const onVis = () => setDocHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const paused = pauseHover || docHidden;

  useEffect(() => {
    if (urls.length <= 1 || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % urls.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [urls.length, paused, item.id]);

  function go(delta) {
    setActive((prev) => {
      const next = prev + delta;
      if (next < 0) return urls.length - 1;
      if (next >= urls.length) return 0;
      return next;
    });
  }

  if (urls.length === 0) {
    return <CeramicVisual item={item} hero />;
  }

  return (
    <div
      className="flex h-full min-h-[320px] flex-col sm:min-h-[420px] lg:min-h-[560px]"
      onMouseEnter={() => setPauseHover(true)}
      onMouseLeave={() => setPauseHover(false)}
    >
      <div className="relative min-h-[260px] flex-1 overflow-hidden sm:min-h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${item.id}-${urls[active]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <CeramicVisual item={item} hero photoSrc={urls[active]} />
          </motion.div>
        </AnimatePresence>

        {urls.length > 1 && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2 px-4">
              {urls.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Immagine ${index + 1} di ${urls.length}`}
                  aria-current={active === index ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    active === index ? "w-9 bg-white shadow-sm" : "w-2 bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Immagine precedente"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-3 md:h-12 md:w-12"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Immagine successiva"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-3 md:h-12 md:w-12"
            >
              <ChevronRight size={22} />
            </button>
            {paused && urls.length > 1 && (
              <p className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                pausa
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
