import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { works, families, primaryPhoto } from "../data/products.js";
import { Arrow, Close, Menu } from "../components/icons.jsx";
import { CeramicVisual } from "../components/CeramicVisual.jsx";
import { NoiseLayer } from "../components/NoiseLayer.jsx";
import { Marquee } from "../components/Marquee.jsx";
import { ProductCard } from "../components/ProductCard.jsx";
import { ProductDetailGallery } from "../components/ProductDetailGallery.jsx";

export default function HomePage() {
  const operaPanelRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFamily, setActiveFamily] = useState("tutti");
  const [selected, setSelected] = useState(works[0]);

  function handleSelectProduct(item, { scroll = true } = {}) {
    setSelected(item);
    if (scroll && operaPanelRef.current) {
      requestAnimationFrame(() => {
        operaPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  const filteredWorks = useMemo(() => {
    if (activeFamily === "tutti") return works;
    return works.filter((item) => item.family === activeFamily);
  }, [activeFamily]);

  const closeMenu = () => setMenuOpen(false);

  function handleNewsletterSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen bg-[#f4efe6] text-stone-950 selection:bg-stone-950 selection:text-white">
      <NoiseLayer />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-stone-950 bg-[#f4efe6]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-3 px-4 py-3 md:px-7">
          <a href="#home" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={closeMenu}>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-950 bg-stone-950 font-serif text-sm text-white sm:h-11 sm:w-11">SS</div>
            <div className="min-w-0 leading-none">
              <p className="truncate font-serif text-xl font-normal tracking-[-0.015em] sm:text-2xl">Santa Sara</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-stone-600">ornamental ceramics</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-stone-950/90 bg-white/55 p-1 text-[11px] font-medium uppercase tracking-[0.22em] md:flex">
            {["shop", "opere", "processo", "atelier"].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 transition hover:bg-stone-950 hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#shop"
            className="hidden items-center gap-2 rounded-full bg-[#b85245] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-stone-950/90 transition duration-300 hover:bg-[#a04438] md:inline-flex"
          >
            vedi shop <Arrow size={15} />
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-950 bg-white sm:h-11 sm:w-11 md:hidden"
          >
            {menuOpen ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-stone-950 bg-[#f4efe6] px-5 py-5 md:hidden">
            <nav className="grid gap-3 text-sm font-semibold uppercase tracking-[0.18em]" aria-label="Navigazione mobile">
              <a href="#shop" className="py-1" onClick={closeMenu}>
                Shop
              </a>
              <a href="#opere" className="py-1" onClick={closeMenu}>
                Opere
              </a>
              <a href="#processo" className="py-1" onClick={closeMenu}>
                Processo
              </a>
              <a href="#atelier" className="py-1" onClick={closeMenu}>
                Atelier
              </a>
              <a href="#shop" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#b85245] px-4 py-3 text-center text-white ring-1 ring-stone-950/90" onClick={closeMenu}>
                vedi shop <Arrow size={15} />
              </a>
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-7 md:pb-24 md:pt-32">
        <div className="absolute left-0 top-16 hidden h-px w-full bg-stone-950/15 md:block" />
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f1e6] p-4 shadow-[0_28px_60px_-22px_rgba(20,17,15,0.32)] sm:rounded-[2.4rem] sm:p-5 md:p-8 lg:min-h-[680px] xl:min-h-[760px]">
            <div className="absolute right-3 top-3 z-10 rounded-full border border-stone-950/90 bg-[#c8a866] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-950 sm:right-5 sm:top-5 sm:px-4 sm:py-2 sm:text-[11px]">
              shop / gallery
            </div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 max-w-[980px] pr-[42%] sm:pr-0">
              <p className="mt-12 text-[10px] font-medium uppercase tracking-[0.42em] text-stone-600 sm:mt-14 sm:text-[11px] md:mt-8">
                Ceramiche d'autore · fatte per non stare zitte
              </p>
              <h1 className="mt-6 font-serif text-[15vw] font-light leading-[0.86] tracking-[-0.035em] sm:mt-8 sm:text-[12vw] md:text-[9.5rem] lg:text-[11rem] xl:text-[13.5rem]">
                Santa
                <span className="block pl-[.18em] italic font-normal text-[#b85245]">Sara</span>
              </h1>
            </motion.div>

            <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-4 sm:bottom-6 sm:left-5 sm:right-5 md:left-8 md:right-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
              <div className="rounded-[1.4rem] border border-stone-950 bg-white/80 p-5 backdrop-blur-xl sm:rounded-[1.7rem] sm:p-6">
                <p className="font-serif text-2xl font-light leading-[1.05] tracking-[-0.02em] sm:text-3xl md:text-[2.85rem]">
                  Oggetti decorati a mano.
                  <span className="block italic text-stone-700">Con carattere, non con timidezza.</span>
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="#shop"
                  className="group flex items-center justify-between rounded-full border border-stone-950 bg-stone-950 px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition duration-300 hover:bg-[#b85245] sm:px-6 sm:py-4"
                >
                  vedi shop <Arrow className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#processo"
                  className="group flex items-center justify-between rounded-full border border-stone-950 bg-[#f4efe6] px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.32em] text-stone-950 transition duration-300 hover:bg-[#c8a866] sm:px-6 sm:py-4"
                >
                  il processo <Arrow className="transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="absolute right-[4%] top-[22%] h-[42%] w-[52%] max-w-[280px] rotate-[4deg] overflow-hidden rounded-[1.4rem] border border-stone-950 shadow-[0_22px_55px_-22px_rgba(20,17,15,0.28)] sm:h-[48%] sm:max-w-[360px] sm:rounded-[2rem] md:right-[8%] md:top-[16%] md:h-[58%] md:w-[48%] md:max-w-[520px] md:rotate-[5deg]">
              <CeramicVisual item={selected} hero photoSrc={primaryPhoto(selected) || undefined} />
            </div>
            <div className="absolute left-[6%] top-[48%] hidden h-[22%] w-[24%] -rotate-[8deg] overflow-hidden rounded-[1.6rem] border border-stone-950 shadow-[0_14px_38px_-18px_rgba(20,17,15,0.22)] md:block">
              <CeramicVisual item={works[1]} photoSrc={primaryPhoto(works[1]) || undefined} />
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-950 bg-stone-950 p-6 text-[#f4efe6] shadow-[0_30px_70px_-22px_rgba(184,82,69,0.45)] sm:rounded-[2.4rem] md:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-[#c8a866]">— Manifesto</p>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
                Non souvenir.
                <span className="block italic text-[#e6dccb]">Non bomboniere.</span>
                Non cose carine.
              </h2>
              <p className="mt-7 max-w-xl text-base font-light leading-[1.7] text-stone-300 sm:mt-8 sm:text-lg">
                Santa Sara è uno shop d'atelier: pezzi unici, decorazioni manuali, oggetti che sembrano usciti da una casa antica dopo una discussione con il presente.
              </p>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f1e6] text-center shadow-[0_18px_45px_-20px_rgba(20,17,15,0.25)]">
              {[
                ["1/1", "pezzi"],
                ["hand", "painted"],
                ["IT", "atelier"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-stone-950 p-4 last:border-r-0 sm:p-6">
                  <p className="font-serif text-2xl font-light tracking-[-0.015em] sm:text-4xl">{value}</p>
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.32em] text-stone-600 sm:text-[10px]">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Marquee />

      <section id="shop" className="px-4 py-16 md:px-7 md:py-28">
        <div className="mx-auto max-w-[1520px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-stone-600">— Shop</p>
              <h2 className="mt-4 font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                Opere <span className="italic text-stone-700">disponibili</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {families.map((family) => (
                <button
                  key={family}
                  type="button"
                  onClick={() => setActiveFamily(family)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] transition duration-300 sm:px-5 sm:text-[11px] ${
                    activeFamily === family
                      ? "border-stone-950 bg-stone-950 text-white"
                      : "border-stone-950/70 bg-white/55 text-stone-800 hover:border-stone-950 hover:bg-[#c8a866] hover:text-stone-950"
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </div>

          <div id="opere" className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {filteredWorks.map((item, index) => (
              <ProductCard
                key={item.id}
                item={item}
                index={index}
                isSelected={selected.id === item.id}
                onSelect={(product) => handleSelectProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={operaPanelRef}
        id="opera-selezionata"
        className="scroll-mt-28 px-4 pb-16 md:scroll-mt-32 md:px-7 md:pb-28"
        aria-label="Dettaglio opera selezionata"
      >
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-stone-950 bg-[#e7d8b3] p-6 shadow-[0_28px_60px_-22px_rgba(20,17,15,0.32)] sm:rounded-[2.4rem] sm:p-8 md:p-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-stone-800">— Opera selezionata</p>
            <AnimatePresence mode="wait">
              <motion.div key={selected.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.3 }}>
                <h2 className="mt-6 font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                  <span className="italic">{selected.title}</span>
                </h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-stone-950/80 bg-[#f4efe6] p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-600">Tipologia</p>
                    <p className="mt-2 font-serif text-2xl font-normal tracking-[-0.015em]">{selected.kind}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-stone-950/80 bg-[#f4efe6] p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-600">Prezzo</p>
                    <p className="mt-2 font-serif text-2xl font-normal tracking-[-0.015em]">{selected.price}</p>
                  </div>
                </div>
                <p className="mt-8 max-w-2xl text-lg font-light leading-[1.7] text-stone-800 sm:text-xl">{selected.claim}</p>
                <a
                  href="#shop"
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-stone-950 bg-stone-950 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition duration-300 hover:bg-[#b85245]"
                >
                  Chiedi disponibilità <Arrow />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-[2rem] border border-stone-950 bg-[#14110f] shadow-[0_28px_60px_-22px_rgba(20,17,15,0.32)] sm:min-h-[480px] lg:min-h-[560px] sm:rounded-[2.4rem]">
            <ProductDetailGallery item={selected} />
          </div>
        </div>
      </section>

      <section id="processo" className="border-y border-stone-950 bg-[#14110f] px-4 py-20 text-[#f4efe6] md:px-7 md:py-32">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-[#c8a866]">— Processo</p>
              <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                Dal bianco
                <span className="block italic text-[#c8a866]">al disturbo.</span>
              </h2>
            </div>

            <div className="grid gap-4">
              {[
                ["01", "Scelta della forma", "La base non è neutra: vaso, lampada o piatto decidono il ritmo dell'immagine."],
                ["02", "Disegno e trasferimento", "Il soggetto entra nella ceramica come una figura da archivio, poi viene sabotato con colore e segno."],
                ["03", "Decorazione", "Engobbi, tratto, campiture, dettagli. La mano deve restare visibile."],
                ["04", "Cristallina e cottura", "La superficie si chiude, prende luce e diventa oggetto finito, pronto per essere venduto."],
              ].map(([num, title, text]) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm md:grid-cols-[120px_1fr] lg:grid-cols-[140px_1fr] md:p-9"
                >
                  <p className="font-serif text-5xl font-light leading-none text-[#c8a866] sm:text-6xl md:text-7xl">{num}</p>
                  <div>
                    <h3 className="font-serif text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-4xl">{title}</h3>
                    <p className="mt-4 max-w-2xl text-base font-light leading-[1.75] text-stone-400 sm:text-lg">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atelier" className="px-4 py-16 md:px-7 md:py-28">
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] border border-stone-950 bg-[#b85245] p-7 text-[#fbf7ef] shadow-[0_28px_60px_-22px_rgba(20,17,15,0.32)] sm:rounded-[2.4rem] sm:p-9 md:p-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-[#fbf7ef]/85">— Atelier / brand</p>
            <h2 className="mt-6 font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[8rem]">
              Barocco,
              <span className="block italic">ma con le scarpe sporche.</span>
            </h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-[1.75] sm:text-xl">
              Una direzione più forte per Santa Sara: non “ceramiche carine”, ma oggetti con una posizione. Decorazione classica, taglio contemporaneo, vendita pulita.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-950 bg-[#f8f3ea] p-7 shadow-[0_22px_55px_-22px_rgba(20,17,15,0.28)] sm:rounded-[2.4rem] sm:p-8 md:p-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-stone-600">— 01</p>
              <h3 className="mt-3 font-serif text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-4xl">Regola del sito</h3>
              <p className="mt-5 text-base font-light leading-[1.75] text-stone-700 sm:text-lg">
                Ogni pagina deve vendere senza sembrare un mercatino. Foto grandi, testo secco, prezzo chiaro, pochi prodotti e identità forte.
              </p>
            </div>
            <div className="rounded-[2rem] border border-stone-950 bg-white p-7 shadow-[0_22px_55px_-22px_rgba(20,17,15,0.28)] sm:rounded-[2.4rem] sm:p-8 md:p-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-stone-600">— 02</p>
              <h3 className="mt-3 font-serif text-3xl font-light leading-[1.05] tracking-[-0.02em] sm:text-4xl">Prossimo passo</h3>
              <p className="mt-5 text-base font-light leading-[1.75] text-stone-700 sm:text-lg">
                Quando inserisci le foto reali, questa struttura diventa un sito vero: home, shop, scheda prodotto, commissioni private e archivio opere vendute.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-7 md:pb-28">
        <div className="mx-auto overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f3ea] shadow-[0_28px_60px_-22px_rgba(20,17,15,0.32)] sm:rounded-[2.4rem]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-stone-950 p-7 md:p-14 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-stone-600">— Drop alert</p>
              <h2 className="mt-6 font-serif text-5xl font-light leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[7rem]">
                Nuovi pezzi.
                <span className="block italic text-stone-700">Zero spam.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end p-7 md:p-14">
              <p className="max-w-2xl text-lg font-light leading-[1.75] text-stone-700 sm:text-xl">
                Una newsletter pensata non come riempitivo, ma come invito ai nuovi drop: quando arriva un pezzo nuovo, chi è dentro lo vede prima.
              </p>
              <form className="mt-10 grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleNewsletterSubmit} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email per la newsletter
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="la tua email"
                  className="h-14 rounded-full border border-stone-950 bg-white px-6 text-base font-light outline-none transition placeholder:text-stone-400 focus:border-[#b85245] focus:ring-2 focus:ring-[#b85245]/30 sm:h-16 sm:px-7"
                />
                <button
                  type="submit"
                  className="h-14 rounded-full border border-stone-950 bg-stone-950 px-8 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition duration-300 hover:bg-[#b85245] sm:h-16 sm:px-10"
                >
                  Avvisami
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-950/80 px-4 py-10 md:px-7 md:py-12">
        <div className="mx-auto flex max-w-[1520px] flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-3xl font-light leading-none tracking-[-0.02em] sm:text-4xl">
              Santa <span className="italic text-[#b85245]">Sara</span>
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.42em] text-stone-600">Ceramiche ornamentali decorate a mano</p>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.32em] sm:gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-stone-950/80 px-4 py-2 transition duration-300 hover:bg-stone-950 hover:text-white">
              Instagram
            </a>
            <a href="#shop" className="rounded-full border border-stone-950/80 px-4 py-2 transition duration-300 hover:bg-stone-950 hover:text-white">
              Spedizioni
            </a>
            <a href="#atelier" className="rounded-full border border-stone-950/80 px-4 py-2 transition duration-300 hover:bg-stone-950 hover:text-white">
              Contatti
            </a>
            <a href="#home" className="rounded-full border border-stone-950/80 px-4 py-2 transition duration-300 hover:bg-stone-950 hover:text-white">
              Privacy
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1520px] text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
          © {new Date().getFullYear()} Santa Sara · Atelier — Tutti i diritti riservati
        </p>
      </footer>
    </main>
  );
}
