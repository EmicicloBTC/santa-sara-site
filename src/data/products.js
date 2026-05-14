/**
 * @typedef {"Vasi" | "Piatti" | "Palle" | "Misc"} ProductCategory
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
 *   ├─ palle/<nome-prodotto>/1.jpg, 2.jpg, …
 *   └─ misc/<nome-prodotto>/1.jpg, 2.jpg, …
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
    images: { slug: "vasi/romance", count: 4, ext: "png" },
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
  "chappell-roan": {
    id: "chappell-roan",
    title: "Chappell Roan",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Ritratto pop, capelli rossi e ricami metallici. Cornice a zigzag blu con cerchi gialli. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Chappell Roan — disponibilità",
    images: { slug: "piatti/chappell-roan", count: 4, ext: "png" },
  },
  "iris-apfel": {
    id: "iris-apfel",
    title: "Iris Apfel",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Omaggio all'icona dello stile: basco rosso, occhialoni tondi, bracciali. Cornice a quadrettini verdi con tondi rossi. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Iris Apfel — disponibilità",
    images: { slug: "piatti/iris-apfel", count: 4, ext: "png" },
  },
  "lady-gaga": {
    id: "lady-gaga",
    title: "Lady Gaga",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Ritratto rosso scarlatto, energia pop e taglio teatrale. Cornice a ovali gialli e segni grafici. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Lady Gaga — disponibilità",
    images: { slug: "piatti/lady-gaga", count: 4, ext: "png" },
  },
  "keep-fit": {
    id: "keep-fit",
    title: "Keep Fit",
    category: "Piatti",
    kind: "Coppia di piatti decorati a mano",
    dimensions: "ø 32 cm cad. · set di 2",
    description: "Body Rolling e Body Rocking: una coppia ironica in verde prato, ispirata ai manuali di ginnastica anni 50. Pezzi unici, decorati a mano in atelier. Venduti come set.",
    price: "€ 320 (set)",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Keep Fit (set) — disponibilità",
    images: { slug: "piatti/keep-fit", count: 4, ext: "png" },
  },
  "yayoi-kusama": {
    id: "yayoi-kusama",
    title: "Yayoi Kusama",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Omaggio all'artista giapponese: caschetto rosso, pois gialli su fondo nero e viola. Cornice a onda con tondi gialli. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Yayoi Kusama — disponibilità",
    images: { slug: "piatti/yayoi-kusama", count: 4, ext: "png" },
    sold: true,
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
  "kentucky-73": {
    id: "kentucky-73",
    title: "Kentucky '73",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "h 28 cm · ø 26 cm",
    description: "Omaggio al Kentucky Derby del 1973: corsa di cavalli, fantini, rose rosse e righe rosa. Pezzo unico, decorato a mano in atelier.",
    price: "€ 420",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Kentucky '73 — disponibilità",
    images: { slug: "vasi/kentucky-73", count: 4, ext: "png" },
  },
  "visionari-ii": {
    id: "visionari-ii",
    title: "Visionari II",
    category: "Vasi",
    kind: "Cachepot decorato a mano",
    dimensions: "h 30 cm · ø 32 cm",
    description: "Cratere terracotta neoclassico con figure greche che indossano visori VR. Ironia sospesa fra antico e contemporaneo, decoro a meandro greco. Pezzo unico, decorato a mano in atelier.",
    price: "€ 520",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Visionari II — disponibilità",
    images: { slug: "vasi/visionari-ii", count: 4, ext: "png" },
  },
  messieur: {
    id: "messieur",
    title: "Messieur",
    category: "Misc",
    kind: "Pezzo decorativo decorato a mano",
    dimensions: "—",
    description: "Pezzo unico fra classico e contemporaneo, decorato a mano in atelier.",
    price: "Su richiesta",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Messieur — disponibilità",
    images: { slug: "misc/messieur", count: 4, ext: "png" },
  },
  doppio: {
    id: "doppio",
    title: "Doppio",
    category: "Vasi",
    kind: "Coppia di vasi decorati a mano",
    dimensions: "—",
    description: "Coppia di vasi. Pezzi unici, decorati a mano in atelier. Venduti come set.",
    price: "Su richiesta",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Doppio (set) — disponibilità",
    images: { slug: "vasi/doppio", count: 4, ext: "png" },
  },
  "baroque-clash": {
    id: "baroque-clash",
    title: "Baroque Clash",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "ø 32 cm",
    description: "Cornice barocca dorata e segno contemporaneo: piatto da parete che fa cortocircuito fra classico e pop. Pezzo unico, decorato a mano in atelier.",
    price: "€ 180",
    cta: "Chiedi disponibilità",
    ctaHref: "mailto:hello@santasara.com?subject=Baroque Clash — disponibilità",
    images: { slug: "piatti/baroque-clash", count: 4, ext: "png" },
  },
  // ---- PLACEHOLDER ----
  // Hotspot temporanei: gli oggetti esistono in scena 10 ma le foto/info
  // del prodotto non sono state ancora caricate. Quando arrivano basta
  // sostituire title/description/price + aggiungere le foto nella cartella
  // e aumentare images.count.
  "christmas-ball": {
    id: "christmas-ball",
    title: "Palla di Natale",
    category: "Palle",
    kind: "Palla decorata a mano",
    dimensions: "—",
    description: "Pezzo in arrivo. Scrivici per maggiori informazioni.",
    price: "Su richiesta",
    cta: "Chiedi info",
    ctaHref: "mailto:hello@santasara.com?subject=Palla di Natale — info",
    images: { slug: "palle/christmas-ball", count: 0, ext: "png" },
  },
};

/** Tutte le URL del prodotto in ordine: 1.ext, 2.ext, … */
export function productImages(product) {
  if (!product?.images) return [];
  const { slug, count, ext } = product.images;
  const safeExt = ext.startsWith(".") ? ext.slice(1) : ext;
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.${safeExt}`);
}

/**
 * URL della copertina (1.ext) o stringa vuota se il prodotto non ha ancora
 * foto caricate (images.count === 0). Usata dalle card del catalogo.
 */
export function productCover(product) {
  if (!product?.images) return "";
  const { slug, count, ext } = product.images;
  if (!count) return "";
  const safeExt = ext.startsWith(".") ? ext.slice(1) : ext;
  return `/images/products/${slug}/1.${safeExt}`;
}

/** Ordine di rendering delle categorie nel catalogo. */
export const CATEGORY_ORDER = ["Vasi", "Piatti", "Palle", "Misc"];

/**
 * Restituisce l'elenco di prodotti raggruppati per categoria, nell'ordine di
 * CATEGORY_ORDER. L'ordine interno è quello di dichiarazione in `products`.
 * Prodotti senza categoria vanno in "Misc".
 *
 * @returns {{ category: string, items: Product[] }[]}
 */
export function getProductsByCategory() {
  const buckets = new Map(CATEGORY_ORDER.map((c) => [c, []]));
  for (const p of Object.values(products)) {
    const cat = p.category && buckets.has(p.category) ? p.category : "Misc";
    buckets.get(cat).push(p);
  }
  return CATEGORY_ORDER.map((category) => ({ category, items: buckets.get(category) || [] }))
    .filter((g) => g.items.length > 0);
}
