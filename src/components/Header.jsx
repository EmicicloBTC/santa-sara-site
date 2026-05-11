import { useEffect, useState } from "react";
import { Close, Menu, Instagram, TikTok, ShoppingBag } from "./icons.jsx";
import { site } from "../data/site.js";

export function Header({ onOpenInfo }) {
  const [open, setOpen] = useState(false);

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
            Santa<span className="italic">Sara</span>
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-stone-950/55 sm:text-[10px]">
            Unorthodox Ceramics
          </span>
        </span>
      </a>

      <div className="pointer-events-auto relative">
        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
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
            <div className="select-none border-b border-stone-950/10 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-stone-500">
              Based in Italy
            </div>

            <button
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); onOpenInfo?.(); }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-stone-950/5"
            >
              Bio &amp; atelier
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">info</span>
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
                Etsy shop
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">acquista</span>
            </a>

            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              <span className="flex items-center gap-2">
                <Instagram size={15} />
                Instagram
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{site.social.instagram.handle}</span>
            </a>

            <a
              href={site.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              <span className="flex items-center gap-2">
                <TikTok size={15} />
                TikTok
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{site.social.tiktok.handle}</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              role="menuitem"
              className="flex w-full items-center justify-between border-t border-stone-950/10 px-4 py-3 text-sm transition hover:bg-stone-950/5"
            >
              Contatti
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">email</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
