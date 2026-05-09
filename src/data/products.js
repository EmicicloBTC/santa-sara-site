/**
 * @typedef {object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} kind
 * @property {string} price
 * @property {string} status
 * @property {string} family
 * @property {string} claim
 * @property {string[]} colors
 * @property {'lamp'|'vase'|'bottle'|'plate'|'tile'} shape
 * @property {string} [photo] — singola immagine o copertina se non usi imagesFolder
 * @property {string[]} [gallery] — altri path manuali (nessun autoplay speciale: conta come più URL)
 * @property {{ slug: string, count: number, ext?: string }} [imagesFolder]
 *   Cartella: public/images/products/{slug}/1.ext, 2.ext, … — slug minuscolo, senza spazi.
 */

/** @type {Product[]} */
export const works = [
  {
    id: 1,
    title: "Florence",
    kind: "Lampada decorata a mano",
    price: "€420",
    status: "pezzo unico",
    family: "lampade",
    claim: "Viola lucido, figure femminili, tensione classica.",
    colors: ["#2b133f", "#7d42a1", "#efc081", "#111111"],
    shape: "lamp",
    photo: "",
    imagesFolder: { slug: "florence", count: 1, ext: ".png" },
  },
  {
    id: 2,
    title: "Cohort 03",
    kind: "Vaso ornamentale",
    price: "€185",
    status: "disponibile",
    family: "vasi",
    claim: "Bianco sporco, nero grafico, una ferita rossa.",
    colors: ["#eee8dc", "#161616", "#c63a31", "#9a7b55"],
    shape: "vase",
    photo: "",
  },
  {
    id: 3,
    title: "Washington Project",
    kind: "Bottiglia decorativa",
    price: "€145",
    status: "in arrivo",
    family: "bottiglie",
    claim: "Un reperto finto-serio con segni da archivio contemporaneo.",
    colors: ["#f2e7d5", "#3f6478", "#d84332", "#161616"],
    shape: "bottle",
    photo: "",
  },
  {
    id: 4,
    title: "Baroque Clash",
    kind: "Piatto da parete",
    price: "€220",
    status: "serie limitata",
    family: "piatti",
    claim: "Ornamento, sfacciataggine, colore che non chiede permesso.",
    colors: ["#d4a03d", "#e9b8c7", "#5c7f4f", "#121212"],
    shape: "plate",
    photo: "",
  },
  {
    id: 5,
    title: "Milk Icon",
    kind: "Mattonella decorativa",
    price: "€160",
    status: "su richiesta",
    family: "mattonelle",
    claim: "Ritratto antico, latte contemporaneo, cortocircuito domestico.",
    colors: ["#7f1d1d", "#e8d6b8", "#f7f7f2", "#c9a24b"],
    shape: "tile",
    photo: "",
  },
  {
    id: 6,
    title: "Romance",
    kind: "Pezzo ornamentale",
    price: "su richiesta",
    status: "disponibile",
    family: "vasi",
    claim: "Decorazione a mano: sensualità barocca, ritmo contemporaneo.",
    colors: ["#5c1a2e", "#f4e4dc", "#c9a227", "#1a1a1a"],
    shape: "vase",
    photo: "/images/Romance.jpg",
  },
];

export const families = ["tutti", "vasi", "lampade", "piatti", "bottiglie", "mattonelle"];

function urlsFromImagesFolder(folder) {
  if (!folder || typeof folder.slug !== "string") return [];
  const slug = folder.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  const count = Math.min(80, Math.max(0, Number(folder.count) || 0));
  let ext = typeof folder.ext === "string" ? folder.ext.trim() : ".jpg";
  if (!ext.startsWith(".")) ext = `.${ext}`;
  if (!slug || count < 1) return [];
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}${ext}`);
}

/** Tutte le URL foto: se c'è `imagesFolder` valido usa solo quello; altrimenti `photo` + `gallery`. */
export function productImages(item) {
  const fromFolder = urlsFromImagesFolder(item.imagesFolder);
  if (fromFolder.length > 0) return fromFolder;

  const out = [];
  const push = (u) => {
    const s = typeof u === "string" ? u.trim() : "";
    if (s && !out.includes(s)) out.push(s);
  };
  push(item.photo);
  if (Array.isArray(item.gallery)) {
    for (const u of item.gallery) push(u);
  }
  return out;
}

/** Copertina lista / hero: prima immagine disponibile. */
export function primaryPhoto(item) {
  const imgs = productImages(item);
  return imgs[0] ?? "";
}

export function assertProductData() {
  const hasValidWorks = works.every(
    (item) =>
      typeof item.id === "number" &&
      item.title &&
      item.kind &&
      item.price &&
      item.status &&
      Array.isArray(item.colors) &&
      item.colors.length >= 4
  );

  const hasAllFilters = families.includes("tutti") && works.every((item) => families.includes(item.family));

  if (typeof console !== "undefined") {
    console.assert(hasValidWorks, "Ogni opera deve avere dati completi per la card shop.");
    console.assert(hasAllFilters, "Ogni famiglia prodotto deve avere un filtro corrispondente.");
  }
}

assertProductData();
