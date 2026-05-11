/**
 * Le scene sono le "pagine" della landing: ognuna è una foto fullscreen
 * con prodotti in vendita posizionati come hotspot interattivi.
 *
 * Ogni scena ha DUE versioni della stessa scenografia:
 *   - desktop  → image       + hotspots
 *   - mobile   → imageMobile + hotspotsMobile  (opzionali)
 *
 * Se imageMobile non è impostata, su mobile viene usata image.
 * Se hotspotsMobile non è impostato, su mobile vengono usati hotspots.
 *
 * @typedef {object} Hotspot
 * @property {string} productId   chiave in products (es. "florence")
 * @property {number} x           centro X in % rispetto all'immagine (0-100)
 * @property {number} y           centro Y in % rispetto all'immagine (0-100)
 * @property {number} [r]         raggio in % della larghezza immagine (default 5)
 *
 * @typedef {object} Scene
 * @property {string} id
 * @property {string} title             titolo breve della scena, es. "Cucina · Mattina"
 * @property {string} image             desktop, /images/scenes/...
 * @property {string} [imageMobile]     mobile (verticale), /images/scenes/...-mobile...
 * @property {string} alt
 * @property {Hotspot[]} hotspots
 * @property {Hotspot[]} [hotspotsMobile]
 * @property {{ src: string, poster?: string }} [video]
 *   Video opzionale: parte automuto quando si entra nella scena, si ferma
 *   sull'ultimo frame (che dovrebbe coincidere con `image`), non si ripete.
 *
 * Per posizionare i hotspot facilmente attiva l'editor: premi "E" (o "?") sulla
 * landing e clicca sopra il prodotto. In alto a destra appare la riga da
 * copiare; l'editor riconosce da solo se sei in versione desktop o mobile e
 * ti dice in quale campo incollarla (hotspots oppure hotspotsMobile).
 */

/** @type {Scene[]} */
export const scenes = [
  {
    id: "scene-1",
    title: "Soggiorno · Pomeriggio",
    image: "/images/scenes/scene-1.png",
    // imageMobile: "/images/scenes/scene-1-mobile.png", // aggiungi quando carichi la foto verticale
    video: {
      src: "/videos/scene-1.mp4",
      poster: "/videos/scene-1-poster.jpg",
    },
    alt: "Interno casa con pezzi Santa Sara mischiati ad oggetti quotidiani",
    hotspots: [
      { productId: "florence", x: 38, y: 52, r: 6 },
      { productId: "romance", x: 64, y: 58, r: 6 },
    ],
  },
  {
    id: "scene-2",
    title: "Tavolo · Sera",
    image: "/images/scenes/scene-2.png",
    imageMobile: "/images/scenes/scene-2-mobile.png",
    alt: "Dettaglio interno con ceramiche Santa Sara fra oggetti casuali",
    hotspots: [
      { productId: "florence", x: 42, y: 48, r: 6 },
      { productId: "romance", x: 60, y: 55, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 42, y: 48, r: 7 },
      { productId: "romance", x: 60, y: 55, r: 7 },
    ],
  },
  {
    id: "scene-3",
    title: "Scena · 03",
    image: "/images/scenes/scene-3.png",
    imageMobile: "/images/scenes/scene-3-mobile.png",
    alt: "Ambiente Santa Sara con ceramiche e oggetti quotidiani",
    hotspots: [
      { productId: "florence", x: 40, y: 50, r: 6 },
      { productId: "romance", x: 60, y: 55, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 40, y: 55, r: 7 },
      { productId: "romance", x: 60, y: 60, r: 7 },
    ],
  },
  {
    id: "scene-4",
    title: "Scena · 04",
    image: "/images/scenes/scene-4.png",
    imageMobile: "/images/scenes/scene-4-mobile.png",
    alt: "Ambiente Santa Sara con ceramiche e oggetti quotidiani",
    hotspots: [
      { productId: "florence", x: 40, y: 50, r: 6 },
      { productId: "romance", x: 60, y: 55, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 40, y: 55, r: 7 },
      { productId: "romance", x: 60, y: 60, r: 7 },
    ],
  },
  {
    id: "scene-5",
    title: "Atelier · Studio",
    image: "/images/scenes/scene-5.png",
    imageMobile: "/images/scenes/scene-5-mobile.png",
    alt: "Scrivania d'atelier con piatto Snow Yeti appeso e vaso Prime Cut sul piano",
    // Coordinate stimate da screenshot: rifinisci con l'editor (tasto E sulla landing)
    hotspots: [
      { productId: "snow-yeti", x: 50, y: 35, r: 6 },
      { productId: "prime-cut", x: 56, y: 63, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "snow-yeti", x: 42, y: 29, r: 7 },
      { productId: "prime-cut", x: 63, y: 55, r: 8 },
    ],
  },
  {
    id: "scene-6",
    title: "Soggiorno · Sera",
    image: "/images/scenes/scene-6.png",
    imageMobile: "/images/scenes/scene-6-mobile.png",
    alt: "Soggiorno serale con lampada Florence sul tavolo e piatto Iris Apfel appeso alla parete",
    // Coordinate stimate dalla foto: rifinisci con l'editor (tasto E)
    hotspots: [
      { productId: "florence", x: 55, y: 55, r: 6 },
      { productId: "iris-apfel", x: 83, y: 18, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 40, y: 32, r: 7 },
      { productId: "iris-apfel", x: 16, y: 8, r: 7 },
    ],
  },
  {
    id: "scene-7",
    title: "Tavola · Tramonto",
    image: "/images/scenes/scene-7.png",
    imageMobile: "/images/scenes/scene-7-mobile.png",
    alt: "Apparecchiatura su tavolo all'aperto al tramonto, con quattro piatti decorati Santa Sara",
    // 4 piatti sul tavolo. Coordinate stimate, da rifinire con l'editor.
    hotspots: [
      // Top-left (piccolo, con fragole sopra): placeholder snow-yeti finché
      // non viene aggiunto il 4° piatto. Cambia productId quando ci sarà.
      { productId: "snow-yeti", x: 29, y: 23, r: 5 },
      { productId: "iris-apfel", x: 65, y: 22, r: 5 },
      { productId: "chappell-roan", x: 12, y: 54, r: 6 },
      { productId: "lady-gaga", x: 43, y: 61, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "snow-yeti", x: 23, y: 30, r: 6 },
      { productId: "iris-apfel", x: 64, y: 29, r: 6 },
      { productId: "chappell-roan", x: 16, y: 49, r: 7 },
      { productId: "lady-gaga", x: 48, y: 54, r: 7 },
    ],
  },
];
