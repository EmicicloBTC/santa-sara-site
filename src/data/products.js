/**
 * @typedef {object} Product
 * @property {string} id            slug univoco usato dalle scene per i hotspot
 * @property {string} title
 * @property {string} kind          tipologia, es. "Lampada decorata a mano"
 * @property {string} dimensions    es. "h 38 cm · ø 22 cm"
 * @property {string} description   descrizione breve, 1-3 righe
 * @property {string} price         es. "€ 420" o "su richiesta"
 * @property {string} cta           label del bottone, es. "Chiedi disponibilità"
 * @property {string} ctaHref       link CTA: mailto:, https://, ecc.
 * @property {{ slug: string, count: number, ext: string }} images
 *   public/images/products/{slug}/1.{ext}, 2.{ext}, …
 */

/** @type {Record<string, Product>} */
export const products = {
  florence: {
    id: "florence",
    title: "Florence",
    kind: "Lampada decorata a mano",
    dimensions: "h 38 cm · ø 22 cm",
    description: "Viola lucido, figure femminili, tensione classica. Pezzo unico, decorato a mano in atelier.",
    price: "€ 420",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Florence — disponibilità",
    images: { slug: "florence", count: 1, ext: "png" },
  },
  romance: {
    id: "romance",
    title: "Romance",
    kind: "Pezzo ornamentale",
    dimensions: "h 28 cm · ø 16 cm",
    description: "Decorazione a mano: sensualità barocca, ritmo contemporaneo. Sfumature calde su base avorio.",
    price: "Su richiesta",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Romance — disponibilità",
    images: { slug: "romance", count: 1, ext: "jpg" },
  },
};

/** Tutte le URL del prodotto in ordine: 1.ext, 2.ext, … */
export function productImages(product) {
  if (!product?.images) return [];
  const { slug, count, ext } = product.images;
  const safeExt = ext.startsWith(".") ? ext.slice(1) : ext;
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.${safeExt}`);
}
