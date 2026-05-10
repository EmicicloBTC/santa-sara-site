/**
 * Le scene sono le "pagine" della landing: ognuna è una foto fullscreen
 * con prodotti in vendita posizionati come hotspot interattivi.
 *
 * @typedef {object} Hotspot
 * @property {string} productId   chiave in products (es. "florence")
 * @property {number} x           centro X in % rispetto all'immagine (0-100)
 * @property {number} y           centro Y in % rispetto all'immagine (0-100)
 * @property {number} [r]         raggio in % della larghezza immagine (default 5)
 *
 * @typedef {object} Scene
 * @property {string} id
 * @property {string} title       titolo breve della scena, es. "Cucina · Mattina"
 * @property {string} image       /images/scenes/...
 * @property {string} alt
 * @property {Hotspot[]} hotspots
 *
 * Per posizionare i hotspot facilmente, attiva l'editor: premi "?" sulla landing
 * e clicca sulla foto. Le coordinate appaiono in alto a destra: copiale qui.
 */

/** @type {Scene[]} */
export const scenes = [
  {
    id: "scene-1",
    title: "Soggiorno · Pomeriggio",
    image: "/images/scenes/scene-1.png",
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
    alt: "Dettaglio interno con ceramiche Santa Sara fra oggetti casuali",
    hotspots: [
      { productId: "florence", x: 42, y: 48, r: 6 },
      { productId: "romance", x: 60, y: 55, r: 6 },
    ],
  },
];
