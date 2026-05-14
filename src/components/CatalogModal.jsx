import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "./icons.jsx";
import {
  CATEGORY_ORDER,
  getProductsByCategory,
  productCover,
} from "../data/products.js";
import { useT } from "../i18n/index.jsx";

/**
 * Overlay catalogo: griglia di tutte le opere raggruppate per categoria con
 * filtro a tab. Cliccando su una card si apre il ProductModal esistente
 * (la card delega al genitore tramite `onOpenProduct`).
 *
 * - `open`            controlla la visibilità
 * - `onClose`         chiude l'overlay
 * - `onOpenProduct`   apre il modal del prodotto selezionato
 */
export function CatalogModal({ open, onClose, onOpenProduct }) {
  const t = useT();
  const groups = useMemo(() => getProductsByCategory(), []);
  const totalCount = useMemo(
    () => groups.reduce((acc, g) => acc + g.items.length, 0),
    [groups],
  );

  const [activeFilter, setActiveFilter] = useState("__all");

  useEffect(() => {
    if (!open) return undefined;
    setActiveFilter("__all");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const visibleGroups = useMemo(() => {
    if (activeFilter === "__all") return groups;
    return groups.filter((g) => g.category === activeFilter);
  }, [groups, activeFilter]);

  const formatCount = (n) =>
    n === 1
      ? t.catalog.pieceCountOne
      : (t.catalog.pieceCountMany || "{n}").replace("{n}", String(n));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.catalog.aria}
          className="fixed inset-0 z-50 flex flex-col bg-[#f6f1e8] text-stone-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="sticky top-0 z-10 border-b border-stone-950/10 bg-[#f6f1e8]/95 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-4 px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
                  Santa Sara · {formatCount(totalCount)}
                </p>
                <h2 className="mt-1 font-serif text-3xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                  {t.catalog.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-[1.55] text-stone-600 sm:text-base">
                  {t.catalog.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.ui.close}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/85 text-stone-900 shadow ring-1 ring-stone-950/15 transition hover:bg-white"
              >
                <Close size={16} />
              </button>
            </div>

            <nav
              aria-label={t.catalog.title}
              className="mx-auto w-full max-w-7xl overflow-x-auto px-5 pb-4 sm:px-8 sm:pb-5"
            >
              <ul className="flex min-w-max gap-2">
                <li>
                  <FilterChip
                    label={t.catalog.filterAll}
                    count={totalCount}
                    active={activeFilter === "__all"}
                    onClick={() => setActiveFilter("__all")}
                  />
                </li>
                {CATEGORY_ORDER.map((cat) => {
                  const g = groups.find((x) => x.category === cat);
                  if (!g) return null;
                  return (
                    <li key={cat}>
                      <FilterChip
                        label={t.category?.[cat] ?? cat}
                        count={g.items.length}
                        active={activeFilter === cat}
                        onClick={() => setActiveFilter(cat)}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-10">
              {visibleGroups.length === 0 && (
                <p className="py-16 text-center text-sm text-stone-500">{t.catalog.empty}</p>
              )}

              {visibleGroups.map((group, idx) => (
                <section
                  key={group.category}
                  className={idx === 0 ? "" : "mt-10 sm:mt-14"}
                  aria-label={t.category?.[group.category] ?? group.category}
                >
                  <header className="mb-4 flex items-baseline justify-between gap-4 border-b border-stone-950/10 pb-2 sm:mb-6">
                    <h3 className="font-serif text-xl tracking-[-0.02em] sm:text-2xl">
                      {t.category?.[group.category] ?? group.category}
                    </h3>
                    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">
                      {formatCount(group.items.length)}
                    </span>
                  </header>

                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                    {group.items.map((product) => (
                      <li key={product.id}>
                        <CatalogCard
                          product={product}
                          onClick={() => {
                            onOpenProduct?.(product);
                          }}
                          t={t}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FilterChip({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition " +
        (active
          ? "border-stone-950 bg-stone-950 text-white"
          : "border-stone-950/15 bg-white/70 text-stone-700 hover:bg-white hover:text-stone-950")
      }
    >
      <span>{label}</span>
      <span
        className={
          "rounded-full px-1.5 py-0.5 text-[9px] tracking-[0.18em] " +
          (active ? "bg-white/15 text-white/85" : "bg-stone-950/5 text-stone-500")
        }
      >
        {count}
      </span>
    </button>
  );
}

function CatalogCard({ product, onClick, t }) {
  const cover = productCover(product);
  const isSold = product.sold === true;
  const categoryLabel = product.category
    ? t.category?.[product.category] ?? product.category
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${product.title} — ${t.ui.openProductCard}`}
      className="group block w-full overflow-hidden rounded-xl bg-white/70 text-left shadow-sm ring-1 ring-stone-950/10 transition hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#efe8db]">
        {categoryLabel && (
          <span className="pointer-events-none absolute left-2 top-2 z-10 inline-flex items-center rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.24em] text-stone-700 shadow ring-1 ring-stone-950/10 backdrop-blur-md">
            {categoryLabel}
          </span>
        )}
        {isSold && (
          <span
            aria-label={t.catalog.sold}
            className="pointer-events-none absolute right-2 top-2 z-10 inline-flex rotate-[-6deg] items-center rounded-full bg-[#b91c1c] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.32em] text-white shadow ring-2 ring-white/90"
          >
            {t.modal.soldStamp}
          </span>
        )}
        {cover ? (
          <img
            src={cover}
            alt={product.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
              {t.catalog.comingSoon}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-3 py-3 sm:px-4">
        <span className="min-w-0 truncate font-serif text-base tracking-[-0.01em] text-stone-950 sm:text-lg">
          {product.title}
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
          {product.price}
        </span>
      </div>
    </button>
  );
}
