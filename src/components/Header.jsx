import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Close, Menu, Instagram, TikTok, ShoppingBag, Grid } from "./icons.jsx";
import { site } from "../data/site.js";
import { useT, useLang } from "../i18n/index.jsx";

const MENU_EASE = [0.22, 1, 0.36, 1];
const MENU_PANEL_TRANSITION = { duration: 0.32, ease: MENU_EASE };
const SCROLL_HINT_MS = 2400;
const SCROLL_HINT_TRANSITION = { duration: 0.5, ease: MENU_EASE };

export function Header({ onOpenInfo, onOpenCatalog, onOpenContact, autoAdvance, onAutoAdvanceChange }) {
  const [open, setOpen] = useState(false);
  const [scrollHint, setScrollHint] = useState(null);
  const hintTimer = useRef(null);
  const t = useT();
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    return () => {
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  function handleLogoClick(e) {
    e.preventDefault();
    const next = !autoAdvance;
    onAutoAdvanceChange?.(next);
    setScrollHint(next ? "on" : "off");
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setScrollHint(null), SCROLL_HINT_MS);
  }

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
      <div className="relative">
        <a
          href="#home"
          onClick={handleLogoClick}
          className={
            "pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/55 py-1.5 pl-1.5 pr-4 backdrop-blur-md ring-1 ring-stone-950/20 transition-[background-color,box-shadow] duration-700 hover:bg-white/75 " +
            (autoAdvance
              ? "shadow-[0_0_16px_rgba(255,255,255,0.28),0_0_32px_rgba(255,236,200,0.14)]"
              : "")
          }
        >
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-stone-950/10">
            <img
              src="/logo.png"
              alt="Logo Santa Sara"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base tracking-[-0.02em] text-stone-950 sm:text-lg">
              Santa Sara
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-stone-950/55 sm:text-[10px]">
              Unorthodox Ceramics
            </span>
          </span>
        </a>

        <AnimatePresence>
          {scrollHint && (
            <motion.p
              key={scrollHint}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SCROLL_HINT_TRANSITION}
              className="pointer-events-none absolute left-1 top-full mt-3 whitespace-nowrap font-serif text-2xl tracking-[-0.02em] text-stone-50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-3xl"
            >
              Auto-Scroll {scrollHint === "on" ? "ON" : "OFF"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-auto relative">
        <button
          type="button"
          aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/55 text-stone-950 backdrop-blur-md ring-1 ring-stone-950/20 transition hover:bg-white/75"
        >
          {open ? <Close size={18} /> : <Menu size={18} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="header-menu"
              role="menu"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={MENU_PANEL_TRANSITION}
              className="absolute right-0 mt-2 w-60 origin-top-right overflow-hidden rounded-xl bg-white/85 text-stone-950 shadow-lg ring-1 ring-stone-950/15 backdrop-blur-xl"
            >
            <div className="flex items-center justify-between border-b border-stone-950/10 px-4 py-3">
              <span className="select-none text-[10px] uppercase tracking-[0.22em] text-stone-500">
                {t.ui.basedIn}
              </span>
              <div
                role="group"
                aria-label={t.ui.languageLabel}
                className="inline-flex overflow-hidden rounded-full bg-stone-950/5 p-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ring-stone-950/10"
              >
                <button
                  type="button"
                  onClick={() => setLang("it")}
                  aria-pressed={lang === "it"}
                  className={
                    "rounded-full px-2.5 py-1 transition " +
                    (lang === "it"
                      ? "bg-stone-950 text-white"
                      : "text-stone-600 hover:text-stone-950")
                  }
                >
                  IT
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                  className={
                    "rounded-full px-2.5 py-1 transition " +
                    (lang === "en"
                      ? "bg-stone-950 text-white"
                      : "text-stone-600 hover:text-stone-950")
                  }
                >
                  EN
                </button>
              </div>
            </div>

            <button
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); onOpenCatalog?.(); }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-stone-950/5"
            >
              <span className="flex items-center gap-2">
                <Grid size={15} />
                {t.ui.catalog}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{t.ui.catalogBadge}</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); onOpenInfo?.(); }}
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-left text-sm transition hover:bg-stone-950/5"
            >
              {t.ui.bioAtelier}
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{t.ui.infoBadge}</span>
            </button>

            <a
              href={site.social.etsy.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={15} />
                {t.ui.etsyShop}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{t.ui.buyBadge}</span>
            </a>

            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label={`Instagram ${site.social.instagram.handle}`}
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              <Instagram size={15} />
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">
                {site.social.instagram.handle}
              </span>
            </a>

            <a
              href={site.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label={`TikTok ${site.social.tiktok.handle}`}
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              <TikTok size={15} />
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">
                {site.social.tiktok.handle}
              </span>
            </a>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onOpenContact?.();
              }}
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-left text-sm transition hover:bg-stone-950/5"
            >
              {t.ui.contacts}
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{t.ui.emailBadge}</span>
            </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
