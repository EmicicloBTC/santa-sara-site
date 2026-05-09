import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { works, families } from "../data/products.js";
import { Arrow, Close, Menu } from "../components/icons.jsx";
import { CeramicVisual } from "../components/CeramicVisual.jsx";
import { NoiseLayer } from "../components/NoiseLayer.jsx";
import { Marquee } from "../components/Marquee.jsx";
import { ProductCard } from "../components/ProductCard.jsx";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFamily, setActiveFamily] = useState("tutti");
  const [selected, setSelected] = useState(works[0]);

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
              <p className="truncate font-serif text-xl tracking-[-0.05em] sm:text-2xl">Santa Sara</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-stone-600">ornamental ceramics</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 rounded-full border border-stone-950 bg-white/45 p-1 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
            {["shop", "opere", "processo", "atelier"].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 transition hover:bg-stone-950 hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#shop"
            className="hidden items-center gap-2 rounded-full bg-[#ff4f2f] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-stone-950 ring-1 ring-stone-950 transition hover:-rotate-2 md:inline-flex"
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
            <nav className="grid gap-3 text-sm font-black uppercase tracking-[0.18em]" aria-label="Navigazione mobile">
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
              <a href="#shop" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4f2f] px-4 py-3 text-center ring-1 ring-stone-950" onClick={closeMenu}>
                vedi shop <Arrow size={15} />
              </a>
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-7 md:pb-24 md:pt-32">
        <div className="absolute left-0 top-16 hidden h-px w-full bg-stone-950 md:block" />
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f1e6] p-4 shadow-[12px_12px_0_#111] sm:rounded-[2.4rem] sm:p-5 md:p-8 lg:min-h-[680px] xl:min-h-[760px]">
            <div className="absolute right-3 top-3 z-10 rounded-full border border-stone-950 bg-[#c9ff3d] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] sm:right-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
              shop / gallery
            </div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 max-w-[980px] pr-[42%] sm:pr-0">
              <p className="mt-12 text-[10px] font-black uppercase tracking-[0.35em] text-stone-600 sm:mt-14 sm:text-xs md:mt-8">
                ceramiche d'autore · fatte per non stare zitte
              </p>
              <h1 className="mt-6 font-serif text-[15vw] leading-[0.73] tracking-[-0.1em] sm:mt-8 sm:text-[12vw] md:text-[9.5rem] lg:text-[11rem] xl:text-[13.5rem]">
                Santa
                <span className="block pl-[.26em] italic text-[#ff4f2f]">Sara</span>
              </h1>
            </motion.div>

            <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-4 sm:bottom-6 sm:left-5 sm:right-5 md:left-8 md:right-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
              <div className="rounded-[1.4rem] border border-stone-950 bg-white/75 p-4 backdrop-blur-xl sm:rounded-[1.7rem] sm:p-5">
                <p className="font-serif text-2xl leading-none tracking-[-0.04em] sm:text-3xl md:text-5xl">Oggetti decorati a mano. Con carattere, non con timidezza.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="#shop"
                  className="group flex items-center justify-between rounded-full border border-stone-950 bg-stone-950 px-4 py-3 font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#ff4f2f] hover:text-stone-950 sm:px-5 sm:py-4"
                >
                  vedi shop <Arrow className="transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#processo"
                  className="group flex items-center justify-between rounded-full border border-stone-950 bg-[#f4efe6] px-4 py-3 font-black uppercase tracking-[0.14em] transition hover:bg-[#c9ff3d] sm:px-5 sm:py-4"
                >
                  il processo <Arrow className="transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="absolute right-[4%] top-[22%] h-[42%] w-[52%] max-w-[280px] rotate-[4deg] overflow-hidden rounded-[1.4rem] border border-stone-950 shadow-[10px_10px_0_#111] sm:h-[48%] sm:max-w-[360px] sm:rounded-[2rem] md:right-[8%] md:top-[16%] md:h-[58%] md:w-[48%] md:max-w-[520px] md:rotate-[5deg]">
              <CeramicVisual item={selected} hero />
            </div>
            <div className="absolute left-[6%] top-[48%] hidden h-[22%] w-[24%] -rotate-[8deg] overflow-hidden rounded-[1.6rem] border border-stone-950 shadow-[7px_7px_0_#111] md:block">
              <CeramicVisual item={works[1]} />
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-950 bg-stone-950 p-6 text-[#f4efe6] shadow-[12px_12px_0_#ff4f2f] sm:rounded-[2.4rem] md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c9ff3d]">manifesto</p>
              <h2 className="mt-6 font-serif text-4xl leading-[0.9] tracking-[-0.08em] sm:text-5xl md:text-6xl lg:text-7xl">Non souvenir. Non bomboniere. Non cose carine.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-stone-300 sm:mt-8 sm:text-lg sm:leading-8">
                Santa Sara è uno shop d'atelier: pezzi unici, decorazioni manuali, oggetti che sembrano usciti da una casa antica dopo una discussione con il presente.
              </p>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f1e6] text-center shadow-[8px_8px_0_#111]">
              {[
                ["1/1", "pezzi"],
                ["hand", "painted"],
                ["IT", "atelier"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-stone-950 p-3 last:border-r-0 sm:p-5">
                  <p className="font-serif text-2xl tracking-[-0.05em] sm:text-4xl">{value}</p>
                  <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-600 sm:text-[10px]">{label}</p>
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
              <p className="text-xs font-black uppercase tracking-[0.3em] text-stone-600">shop</p>
              <h2 className="mt-4 font-serif text-5xl leading-[0.85] tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-9xl">Opere disponibili</h2>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {families.map((family) => (
                <button
                  key={family}
                  type="button"
                  onClick={() => setActiveFamily(family)}
                  className={`rounded-full border border-stone-950 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition sm:px-4 sm:text-xs ${
                    activeFamily === family ? "bg-stone-950 text-white" : "bg-white/45 hover:bg-[#c9ff3d]"
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </div>

          <div id="opere" className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {filteredWorks.map((item, index) => (
              <ProductCard key={item.id} item={item} index={index} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-7 md:pb-28">
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-stone-950 bg-[#c9ff3d] p-5 shadow-[12px_12px_0_#111] sm:rounded-[2.4rem] sm:p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em]">opera selezionata</p>
            <AnimatePresence mode="wait">
              <motion.div key={selected.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.3 }}>
                <h2 className="mt-6 font-serif text-5xl leading-[0.82] tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-9xl">{selected.title}</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-stone-950 bg-[#f4efe6] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">tipologia</p>
                    <p className="mt-2 text-xl font-bold">{selected.kind}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-stone-950 bg-[#f4efe6] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">prezzo</p>
                    <p className="mt-2 text-xl font-bold">{selected.price}</p>
                  </div>
                </div>
                <p className="mt-7 max-w-2xl text-lg leading-8 sm:text-xl">{selected.claim}</p>
                <a
                  href="#shop"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-stone-950 bg-stone-950 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:-rotate-1 hover:bg-[#ff4f2f] hover:text-stone-950"
                >
                  chiedi disponibilità <Arrow />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-[2rem] border border-stone-950 shadow-[12px_12px_0_#111] sm:min-h-[480px] lg:min-h-[560px] sm:rounded-[2.4rem]">
            <CeramicVisual item={selected} hero />
          </div>
        </div>
      </section>

      <section id="processo" className="border-y border-stone-950 bg-stone-950 px-4 py-16 text-[#f4efe6] md:px-7 md:py-28">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff4f2f]">processo</p>
              <h2 className="mt-5 font-serif text-5xl leading-[0.82] tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-9xl">Dal bianco al disturbo.</h2>
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
                  className="grid gap-5 rounded-[2rem] border border-[#f4efe6] bg-white/[0.04] p-6 md:grid-cols-[120px_1fr] lg:grid-cols-[140px_1fr] md:p-8"
                >
                  <p className="font-serif text-5xl leading-none text-[#c9ff3d] sm:text-6xl md:text-7xl">{num}</p>
                  <div>
                    <h3 className="font-serif text-3xl leading-none tracking-[-0.05em] sm:text-4xl">{title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg sm:leading-8">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atelier" className="px-4 py-16 md:px-7 md:py-28">
        <div className="mx-auto grid max-w-[1520px] gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] border border-stone-950 bg-[#ff4f2f] p-6 shadow-[12px_12px_0_#111] sm:rounded-[2.4rem] sm:p-7 md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.3em]">atelier / brand</p>
            <h2 className="mt-6 font-serif text-5xl leading-[0.82] tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-[10rem]">Barocco, ma con le scarpe sporche.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 sm:mt-8 sm:text-xl sm:leading-9">
              Una direzione più forte per Santa Sara: non “ceramiche carine”, ma oggetti con una posizione. Decorazione classica, taglio contemporaneo, vendita pulita.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-950 bg-[#f8f1e6] p-6 shadow-[10px_10px_0_#111] sm:rounded-[2.4rem] sm:p-7 md:p-9">
              <h3 className="font-serif text-4xl leading-[0.9] tracking-[-0.07em] sm:text-5xl">Regola del sito</h3>
              <p className="mt-5 text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
                Ogni pagina deve vendere senza sembrare un mercatino. Foto grandi, testo secco, prezzo chiaro, pochi prodotti e identità forte.
              </p>
            </div>
            <div className="rounded-[2rem] border border-stone-950 bg-white p-6 shadow-[10px_10px_0_#111] sm:rounded-[2.4rem] sm:p-7 md:p-9">
              <h3 className="font-serif text-4xl leading-[0.9] tracking-[-0.07em] sm:text-5xl">Prossimo passo</h3>
              <p className="mt-5 text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
                Quando inserisci le foto reali, questa struttura diventa un sito vero: home, shop, scheda prodotto, commissioni private e archivio opere vendute.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-7 md:pb-28">
        <div className="mx-auto overflow-hidden rounded-[2rem] border border-stone-950 bg-[#f8f1e6] shadow-[12px_12px_0_#111] sm:rounded-[2.4rem]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-stone-950 p-6 md:p-12 lg:border-b-0 lg:border-r">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-stone-600">drop alert</p>
              <h2 className="mt-6 font-serif text-5xl leading-[0.82] tracking-[-0.08em] sm:text-6xl md:text-7xl lg:text-9xl">Nuovi pezzi. Zero spam.</h2>
            </div>
            <div className="flex flex-col justify-end p-6 md:p-12">
              <p className="max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl sm:leading-9">
                Una newsletter pensata non come riempitivo, ma come invito ai nuovi drop: quando arriva un pezzo nuovo, chi è dentro lo vede prima.
              </p>
              <form className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleNewsletterSubmit} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email per la newsletter
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email"
                  className="h-14 rounded-full border border-stone-950 bg-white px-5 text-base outline-none focus:bg-[#c9ff3d] sm:h-16 sm:px-6"
                />
                <button
                  type="submit"
                  className="h-14 rounded-full border border-stone-950 bg-stone-950 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff4f2f] hover:text-stone-950 sm:h-16 sm:px-8"
                >
                  avvisami
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-950 px-4 py-8 md:px-7">
        <div className="mx-auto flex max-w-[1520px] flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-3xl leading-none tracking-[-0.06em] sm:text-4xl">Santa Sara</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-stone-600">ceramiche ornamentali decorate a mano</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.18em] sm:gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-stone-950 px-4 py-2 hover:bg-stone-950 hover:text-white">
              instagram
            </a>
            <a href="#shop" className="rounded-full border border-stone-950 px-4 py-2 hover:bg-stone-950 hover:text-white">
              spedizioni
            </a>
            <a href="#atelier" className="rounded-full border border-stone-950 px-4 py-2 hover:bg-stone-950 hover:text-white">
              contatti
            </a>
            <a href="#home" className="rounded-full border border-stone-950 px-4 py-2 hover:bg-stone-950 hover:text-white">
              privacy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
