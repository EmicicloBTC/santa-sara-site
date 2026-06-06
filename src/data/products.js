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

import { mailtoLink } from "./site.js";

/** @type {Record<string, Product>} */
export const products = {
  florence: {
    id: "florence",
    title: "Florence",
    category: "Vasi",
    kind: "Lampada decorata a mano",
    dimensions: "l 24 cm · h 45 cm",
    description:
      "Materiali: ceramica. Viola lucido, figure femminili, tensione classica. Pezzo unico, decorato a mano in atelier.",
    price: "€ 420",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4500997615/florence-one-of-a-kind-ceramic-table",
    images: { slug: "vasi/florence", count: 4, ext: "png" },
  },
  romance: {
    id: "romance",
    title: "Romance",
    category: "Vasi",
    kind: "Pezzo ornamentale",
    dimensions: "l 20 cm · h 31 cm",
    description:
      "Materiali: ceramica, smalti. Decorazione a mano: sensualità barocca, ritmo contemporaneo. Sfumature calde su base avorio.",
    price: "€ 240",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4304720773/hand-decorated-ceramic-vase-errata",
    images: { slug: "vasi/romance", count: 4, ext: "png" },
  },

  "snow-yeti": {
    id: "snow-yeti",
    title: "Snow Yeti",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "l 37 cm · h 3 cm",
    description:
      "Materiali: ceramica, argilla, engobbi, smalti. Sfumature glaciali e tratto materico. Pezzo unico, decorato a mano in atelier.",
    price: "€ 130",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/1887573027/piatto-decorativo-in-ceramica-da",
    images: { slug: "piatti/snow-yeti", count: 4, ext: "png" },
  },
  "chappell-roan": {
    id: "chappell-roan",
    title: "Chappell Roan",
    category: "Piatti",
    kind: "Icons · piatto decorato a mano",
    dimensions: "l 25 cm",
    description:
      "Materiali: ceramica. Serie Icons dinner service. Ritratto pop, capelli rossi e ricami metallici. Cornice a zigzag blu con cerchi gialli. Pezzo unico, decorato a mano in atelier.",
    price: "€ 85",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4473931235/icons-dinner-service-o-chappell-roan-o",
    images: { slug: "piatti/chappell-roan", count: 4, ext: "png" },
  },
  "iris-apfel": {
    id: "iris-apfel",
    title: "Iris Apfel",
    category: "Piatti",
    kind: "Icons · piatto decorato a mano",
    dimensions: "l 25 cm",
    description:
      "Materiali: ceramica. Serie Icons dinner service. Omaggio all'icona dello stile: basco rosso, occhialoni tondi, bracciali. Cornice a quadrettini verdi con tondi rossi. Pezzo unico, decorato a mano in atelier.",
    price: "€ 85",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4473941459/icons-dinner-service-o-iris-apfel-o-hand",
    images: { slug: "piatti/iris-apfel", count: 4, ext: "png" },
  },
  "lady-gaga": {
    id: "lady-gaga",
    title: "Lady Gaga",
    category: "Piatti",
    kind: "Icons · piatto decorato a mano",
    dimensions: "l 25 cm",
    description:
      "Materiali: ceramica. Serie Icons dinner service. Ritratto rosso scarlatto, energia pop e taglio teatrale. Cornice a ovali gialli e segni grafici. Pezzo unico, decorato a mano in atelier.",
    price: "€ 85",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4473913165/icons-dinner-service-o-lady-gaga-o-hand",
    images: { slug: "piatti/lady-gaga", count: 4, ext: "png" },
  },
  "keep-fit": {
    id: "keep-fit",
    title: "Keep Fit",
    category: "Piatti",
    kind: "Coppia di piatti decorati a mano",
    dimensions: "l 37 cm · h 37 cm · set di 2",
    description:
      "Materiali: ceramica. Body Rolling e Body Rocking: una coppia ironica in verde prato, ispirata ai manuali di ginnastica anni 50. Pezzi unici, decorati a mano in atelier. Venduti come set.",
    price: "€ 280 (set)",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4371978130/hand-painted-ceramic-wall-plate-keep-fit",
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
    ctaHref: mailtoLink("Yayoi Kusama — disponibilità"),
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
    ctaHref: mailtoLink("Prime Cut — disponibilità"),
    images: { slug: "vasi/prime-cut", count: 4, ext: "png" },
  },
  "cohort-03": {
    id: "cohort-03",
    title: "Cohort 03",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "l 15 cm · h 26 cm",
    description:
      "Materiali: ceramica. Tre figure di profilo, contemporaneo e essenziale. Linea fluida su porcellana bianca. Pezzo unico, decorato a mano in atelier.",
    price: "€ 210",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4500295298/hand-painted-ceramic-vase-cohort-03",
    images: { slug: "vasi/cohort-03", count: 4, ext: "png" },
  },
  "dandy-land": {
    id: "dandy-land",
    title: "Dandy Land",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "—",
    description:
      "Anfora decorata a mano con ritratto dandy, scritta DANDY sul collo e fiori stilizzati sulla base. Pezzo unico, decorato a mano in atelier.",
    price: "Su richiesta",
    cta: "Chiedi disponibilità",
    ctaHref: mailtoLink("Dandy Land — disponibilità"),
    images: { slug: "vasi/dandy-land", count: 4, ext: "jpg" },
  },
  "kentucky-73": {
    id: "kentucky-73",
    title: "Kentucky '73",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "l 22 cm · h 25 cm",
    description:
      "Materiali: ceramica, smalti. Omaggio al Kentucky Derby del 1973: corsa di cavalli, fantini, rose rosse e righe rosa. Pezzo unico, decorato a mano in atelier.",
    price: "€ 280",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4475520601/kentucky-73-vase-kentucky-derby-tribute",
    images: { slug: "vasi/kentucky-73", count: 4, ext: "png" },
  },
  "look-up": {
    id: "look-up",
    title: "Look-up",
    category: "Vasi",
    kind: "Vaso decorato a mano",
    dimensions: "l 29 cm · h 19,5 cm",
    description:
      "Materiali: ceramica, engobbi, smalti. Vaso a pancia con decoro astratto su fondo avorio. Pezzo unico, decorato a mano in atelier.",
    price: "€ 310",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4321905772/hand-decorated-ceramic-vase-look-up",
    images: { slug: "vasi/look-up", count: 4, ext: "jpg" },
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
    ctaHref: mailtoLink("Visionari II — disponibilità"),
    images: { slug: "vasi/visionari-ii", count: 4, ext: "png" },
  },
  messieur: {
    id: "messieur",
    title: "Messieur",
    category: "Misc",
    kind: "Pezzo decorativo decorato a mano",
    dimensions: "l 11 cm · h 17 cm",
    description:
      "Materiali: ceramica. Pezzo unico fra classico e contemporaneo, decorato a mano in atelier.",
    price: "€ 159",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4499661433/hand-painted-decorative-ceramic-bottle",
    images: { slug: "misc/messieur", count: 4, ext: "png" },
  },
  doppio: {
    id: "doppio",
    title: "Doppio",
    category: "Vasi",
    kind: "Coppia di vasi decorati a mano",
    dimensions: "l 14 cm · h 20 cm · set di 2",
    description:
      "Materiali: ceramica, engobbi, smalti. Coppia di vasi. Pezzi unici, decorati a mano in atelier. Venduti come set.",
    price: "€ 180 (set)",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4322551721/set-of-2-hand-painted-ceramic-vases",
    images: { slug: "vasi/doppio", count: 4, ext: "png" },
  },
  "padded-dynasty": {
    id: "padded-dynasty",
    title: "Padded Dynasty",
    category: "Vasi",
    kind: "Coppia di vasi decorati a mano",
    dimensions: "l 11 cm · h 22 cm · set di 2",
    description:
      "Materiali: ceramica. Coppia di vasi in terracotta con ritratti ispirati alla dinastia cinese e giacche imbottite contemporanee. Pezzi unici, decorati a mano in atelier. Venduti come set — un solo set disponibile.",
    price: "€ 220 (set)",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4504374324/padded-dynasty-hand-decorated-ceramic",
    images: { slug: "vasi/padded-dynasty", count: 4, ext: "jpg" },
  },
  "baroque-clash": {
    id: "baroque-clash",
    title: "Baroque Clash",
    category: "Piatti",
    kind: "Piatto decorato a mano",
    dimensions: "l 37 cm · h 37 cm",
    description:
      "Materiali: ceramica. Cornice barocca dorata e segno contemporaneo: piatto da parete che fa cortocircuito fra classico e pop. Pezzo unico, decorato a mano in atelier.",
    price: "€ 160",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4470222859/baroque-clash-hand-painted-ceramic-wall",
    images: { slug: "piatti/baroque-clash", count: 4, ext: "png" },
  },
  "gift-giving": {
    id: "gift-giving",
    title: "Gift Giving",
    category: "Palle",
    kind: "Palla natalizia decorata a mano",
    dimensions: "l 12 cm",
    description:
      "Materiali: ceramica. Palla natalizia decorata a mano con ritratto e scritta Gift Giving. Pezzo unico, decorato a mano in atelier.",
    price: "€ 45",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4403794692/handmade-ceramic-christmas-ball-1350",
    images: { slug: "palle/gift-giving", count: 4, ext: "jpg" },
  },
  "divine-bovine": {
    id: "divine-bovine",
    title: "Bovine Divine",
    category: "Palle",
    kind: "Palla natalizia decorata a mano",
    dimensions: "l 12 cm",
    description:
      "Materiali: ceramica. Palla natalizia decorata a mano con ritratto bovino e scritta Bovine Divine. Pezzo unico, decorato a mano in atelier.",
    price: "€ 45",
    cta: "Chiedi disponibilità",
    ctaHref: mailtoLink("Bovine Divine — disponibilità"),
    images: { slug: "palle/divine-bovine", count: 4, ext: "png" },
  },
  dragonbell: {
    id: "dragonbell",
    title: "Dragonbell",
    category: "Palle",
    kind: "Palla natalizia decorata a mano",
    dimensions: "l 10 cm",
    description:
      "Materiali: ceramica. Palla natalizia decorata a mano con drago e campana. Pezzo unico, decorato a mano in atelier.",
    price: "€ 50",
    cta: "Chiedi disponibilità",
    ctaHref: mailtoLink("Dragonbell — disponibilità"),
    images: { slug: "palle/dragonbell", count: 4, ext: "jpg" },
  },
  "mid-winter": {
    id: "mid-winter",
    title: "Mid Winter",
    category: "Palle",
    kind: "Palla natalizia decorata a mano",
    dimensions: "l 10 cm",
    description:
      "Materiali: ceramica. Palla natalizia decorata a mano con atmosfera mid-winter. Pezzo unico, decorato a mano in atelier.",
    price: "€ 50",
    cta: "Chiedi disponibilità",
    ctaHref: mailtoLink("Mid Winter — disponibilità"),
    images: { slug: "palle/mid-winter", count: 4, ext: "jpg" },
  },
  "back-to-velvet": {
    id: "back-to-velvet",
    title: "Back To Velvet",
    category: "Palle",
    kind: "Palla natalizia decorata a mano",
    dimensions: "l 10 cm",
    description:
      "Materiali: ceramica. Palla natalizia decorata a mano Back To Velvet. Pezzo unico, decorato a mano in atelier.",
    price: "€ 40",
    cta: "Acquista su Etsy",
    ctaHref: "https://www.etsy.com/it/listing/4406148798/handmade-ceramic-christmas-ball-2150",
    images: { slug: "palle/back-to-velvet", count: 4, ext: "png" },
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

/** Sottosezioni del catalogo nella categoria Piatti. */
export const PIATTI_CATALOG_SUBGROUPS = [
  {
    id: "grandi",
    labelKey: "piattiGrandi",
    productIds: ["snow-yeti", "baroque-clash", "keep-fit"],
  },
  {
    id: "icons",
    labelKey: "piattiIcons",
    productIds: ["chappell-roan", "iris-apfel", "lady-gaga"],
  },
];

/**
 * Suddivide i piatti in sottosezioni catalogo (grandi vs Icons).
 * I piatti non elencati finiscono in un gruppo "altri", se presenti.
 *
 * @param {Product[]} items
 * @returns {{ labelKey: string | null, items: Product[] }[]}
 */
export function getPiattiCatalogSections(items) {
  const byId = new Map(items.map((p) => [p.id, p]));
  const used = new Set();
  const sections = [];

  for (const sg of PIATTI_CATALOG_SUBGROUPS) {
    const sgItems = sg.productIds.map((id) => byId.get(id)).filter(Boolean);
    sgItems.forEach((p) => used.add(p.id));
    if (sgItems.length) sections.push({ labelKey: sg.labelKey, items: sgItems });
  }

  const rest = items.filter((p) => !used.has(p.id));
  if (rest.length) sections.push({ labelKey: "piattiAltri", items: rest });

  return sections;
}

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
