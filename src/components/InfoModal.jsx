import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "./icons.jsx";

export function InfoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Chiudi"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-stone-950/55 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Bio e atelier"
            className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#f6f1e8] p-7 text-stone-950 shadow-2xl ring-1 ring-stone-950/15 sm:p-9"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-stone-900 shadow ring-1 ring-stone-950/15 transition hover:bg-white"
            >
              <Close size={16} />
            </button>

            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">— Atelier</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Santa<span className="italic"> Sara</span>
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-stone-700">
              Ceramiche ornamentali decorate a mano. Ogni pezzo è unico, dipinto in atelier:
              forma classica, segno contemporaneo. Nessuna serie industriale, nessun catalogo
              da supermercato — solo oggetti che entrano in casa con una posizione.
            </p>
            <p className="mt-4 text-base leading-[1.75] text-stone-700">
              Per disponibilità, commissioni private o visite all’atelier scrivere a{" "}
              <a className="underline underline-offset-4 hover:text-stone-950" href="mailto:hello@santasara.com">
                hello@santasara.com
              </a>{" "}
              oppure su{" "}
              <a className="underline underline-offset-4 hover:text-stone-950" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
