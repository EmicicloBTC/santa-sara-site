import { useEffect, useState } from "react";
import { Close, Menu, Instagram, TikTok, ShoppingBag, Grid } from "./icons.jsx";
import { site } from "../data/site.js";
import { useT, useLang } from "../i18n/index.jsx";

export function Header({ onOpenInfo, onOpenCatalog }) {
  const [open, setOpen] = useState(false);
  const t = useT();
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
      <a
        href="#home"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/55 py-1.5 pl-1.5 pr-4 backdrop-blur-md ring-1 ring-stone-950/20 transition hover:bg-white/75"
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

        {open && (
          <div
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl bg-white/85 text-stone-950 shadow-lg ring-1 ring-stone-950/15 backdrop-blur-xl"
            role="menu"
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

            <a
              href={`mailto:${site.email}`}
              role="menuitem"
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              {t.ui.contacts}
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{t.ui.emailBadge}</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
