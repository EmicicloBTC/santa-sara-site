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
 * @property {string} photo — immagine principale in lista / hero (path tipo "/images/nome.jpg")
 * @property {string[]} [gallery] — altre foto dello stesso pezzo (solo nella scheda dettaglio: grande + miniature)
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
    photo: "/images/Florence.png",
    // gallery: ["/images/Florence-dettaglio.png"], // più foto: aggiungi file in public/images e path qui
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

/** Tutte le URL foto del pezzo: prima `photo`, poi `gallery` senza duplicati. */
export function productImages(item) {
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
