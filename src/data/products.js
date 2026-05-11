/**
 * @typedef {"Vasi" | "Piatti" | "Palle"} ProductCategory
 *
 * @typedef {object} Product
 * @property {string} id            slug univoco usato dalle scene per i hotspot
 * @property {string} title
 * @property {ProductCategory} [category]
 *   categoria del prodotto. Le foto vanno organizzate in
 *   `public/images/products/<categoria-lowercase>/<nome-prodotto>/` (vedi `images.slug`).
 * @property {string} kind          tipologia, es. "Lampada decorata a mano"
 * @property {string} dimensions    es. "h 38 cm · ø 22 cm"
 * @property {string} description   descrizione breve, 1-3 righe
 * @property {string} price         es. "€ 420" o "su richiesta"
 * @property {string} cta           label del bottone, es. "Chiedi disponibilità"
 * @property {string} ctaHref       link CTA: mailto:, https://, ecc.
 * @property {{ slug: string, count: number, ext: string }} images
 *   `slug` può contenere sottocartelle, es. "piatti/snow-yeti".
 *   Le foto vanno in `public/images/products/{slug}/1.{ext}`, `2.{ext}`, …
 *
 * --------------------------------------------------------------------------
 * CONVENZIONE CARTELLE (categorie)
 * --------------------------------------------------------------------------
 *   public/images/products/
 *   ├─ vasi/<nome-prodotto>/1.jpg, 2.jpg, …
 *   ├─ piatti/<nome-prodotto>/1.jpg, 2.jpg, …
 *   └─ palle/<nome-prodotto>/1.jpg, 2.jpg, …
 *
 * Esempio: per "Snow Yeti" (categoria Piatti) le foto stanno in
 *   public/images/products/piatti/snow-yeti/1.jpg, 2.jpg, 3.jpg, 4.jpg
 * e nel blocco prodotto si scrive:
 *   category: "Piatti",
 *   images: { slug: "piatti/snow-yeti", count: 4, ext: "jpg" },
 */

/** @type {Record<string, Product>} */
export const products = {
  florence: {
    id: "florence",
    title: "Florence",
    category: "Vasi",
    kind: "Lampada decorata a mano",
    dimensions: "h 38 cm · ø 22 cm",
    description: "Viola lucido, figure femminili, tensione classica. Pezzo unico, decorato a mano in atelier.",
    price: "€ 420",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Florence — disponibilità",
    images: { slug: "vasi/florence", count: 4, ext: "png" },
  },
  romance: {
    id: "romance",
    title: "Romance",
    category: "Vasi",
    kind: "Pezzo ornamentale",
    dimensions: "h 28 cm · ø 16 cm",
    description: "Decorazione a mano: sensualità barocca, ritmo contemporaneo. Sfumature calde su base avorio.",
    price: "Su richiesta",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Romance — disponibilità",
    images: { slug: "vasi/romance", count: 1, ext: "jpg" },
  },

  "snow-yeti": {
    id: "snow-yeti",
    title: "Snow Yeti",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Sfumature glaciali e tratto materico. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Snow Yeti — disponibilità",
    images: { slug: "piatti/snow-yeti", count: 4, ext: "png" },
  },
  "prime-cut": {
    id: "prime-cut",
    title: "Prime Cut",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "h 30 cm · ø 18 cm",
    description: "Figura femminile e schema anatomico, stelle rosse e cornice barocca. Pezzo unico, decorato a mano in atelier.",
    price: "€ 420",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Prime Cut — disponibilità",
    images: { slug: "vasi/prime-cut", count: 4, ext: "png" },
  },
  "cohort-03": {
    id: "cohort-03",
    title: "Cohort 03",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "h 30 cm · ø 18 cm",
    description: "Tre figure di profilo, contemporaneo e essenziale. Linea fluida su porcellana bianca. Pezzo unico, decorato a mano in atelier.",
    price: "€ 380",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Cohort 03 — disponibilità",
    images: { slug: "vasi/cohort-03", count: 4, ext: "png" },
  },
};

/** Tutte le URL del prodotto in ordine: 1.ext, 2.ext, … */
export function productImages(product) {
  if (!product?.images) return [];
  const { slug, count, ext } = product.images;
  const safeExt = ext.startsWith(".") ? ext.slice(1) : ext;
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.${safeExt}`);
}
