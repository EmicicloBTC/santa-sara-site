import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "../i18n/index.jsx";
import { copyTextToClipboard, getSiteShareUrl } from "../utils/share.js";

const HINT_MS = 2400;

export function Footer({ sceneTitle, sceneIndex, sceneCount }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const counter = `${String(sceneIndex + 1).padStart(2, "0")} / ${String(sceneCount).padStart(2, "0")}`;

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopySiteLink() {
    await copyTextToClipboard(getSiteShareUrl());
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), HINT_MS);
  }

  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between p-4 sm:p-6">
      <div className="relative">
        <button
          type="button"
          onClick={handleCopySiteLink}
          title={t.ui.copySiteLinkHint}
          aria-label={t.ui.copySiteLinkHint}
          className="pointer-events-auto rounded-full bg-white/55 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-800 backdrop-blur-md ring-1 ring-stone-950/15 transition hover:bg-white/75 sm:text-[11px]"
        >
          {sceneTitle}
        </button>
        <AnimatePresence>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-0 bottom-full mb-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.24em] text-stone-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            >
              {t.ui.linkCopied}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="pointer-events-auto flex items-center gap-3">
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
