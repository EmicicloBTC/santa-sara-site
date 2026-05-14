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
 *   Video opzionale (desktop): parte automuto quando si entra nella scena, si
 *   ferma sull'ultimo frame (che dovrebbe coincidere con `image`), non si ripete.
 * @property {{ src: string, poster?: string }} [videoMobile]
 *   Variante mobile (verticale) del video. Se non c'è, su telefono viene
 *   usato `video`.
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
    title: "Intro",
    image: "/images/scenes/scene-1.png",
    imageMobile: "/images/scenes/scene-1-mobile.png",
    // Video intro (reverse + ultimo frame = immagine statica).
    video: {
      src: "/videos/scene-1.mp4",
      poster: "/videos/scene-1-poster.jpg",
    },
    videoMobile: {
      src: "/videos/scene-1-mobile.mp4",
      poster: "/videos/scene-1-mobile-poster.jpg",
    },
    alt: "Balcone con grande vaso illustrato Visionari II e pezzo Kentucky '73",
    hotspots: [
      { productId: "visionari-ii", x: 28, y: 44, r: 7 },
      { productId: "kentucky-73", x: 48, y: 58, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "visionari-ii", x: 32, y: 42, r: 8 },
      { productId: "kentucky-73", x: 50, y: 56, r: 8 },
    ],
  },
  {
    id: "scene-2",
    title: "Tavolo · Sera",
    image: "/images/scenes/scene-2.png",
    imageMobile: "/images/scenes/scene-2-mobile.png",
    alt: "Dettaglio interno con la lampada Florence e il pezzo Messieur",
    hotspots: [
      { productId: "florence", x: 42, y: 48, r: 6 },
      { productId: "messieur", x: 60, y: 55, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 42, y: 48, r: 7 },
      { productId: "messieur", x: 60, y: 55, r: 7 },
    ],
  },
  {
    id: "scene-3",
    title: "Lobby · Classico",
    image: "/images/scenes/scene-3.png",
    imageMobile: "/images/scenes/scene-3-mobile.png",
    alt: "Lobby classica con lampada Florence sulla console a sinistra e piatto Baroque Clash al centro su cavalletto",
    hotspots: [
      { productId: "florence", x: 22, y: 48, r: 7 },
      { productId: "baroque-clash", x: 50, y: 52, r: 6 },
    ],
    hotspotsMobile: [
      { productId: "florence", x: 28, y: 46, r: 8 },
      { productId: "baroque-clash", x: 52, y: 50, r: 7 },
    ],
  },
  {
    id: "scene-4",
    title: "Terrazza · Mediterraneo",
    image: "/images/scenes/scene-4.png",
    imageMobile: "/images/scenes/scene-4-mobile.png",
    alt: "Terrazza affacciata sul mare con vaso Kentucky '73 sul tavolino e cachepot Visionari II sulla colonna",
    hotspots: [
      { productId: "kentucky-73", x: 22, y: 55, r: 5 },
      { productId: "visionari-ii", x: 78, y: 53, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "kentucky-73", x: 20, y: 52, r: 6 },
      { productId: "visionari-ii", x: 70, y: 50, r: 8 },
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
      { productId: "lady-gaga", x: 29, y: 23, r: 5 },     // alto-sx (con fragole)
      { productId: "chappell-roan", x: 72, y: 22, r: 5 }, // alto-dx
      { productId: "iris-apfel", x: 12, y: 54, r: 6 },    // basso-sx
      { productId: "yayoi-kusama", x: 50, y: 61, r: 6 },  // basso-dx (grande)
    ],
    hotspotsMobile: [
      { productId: "lady-gaga", x: 23, y: 30, r: 6 },
      { productId: "chappell-roan", x: 64, y: 29, r: 6 },
      { productId: "iris-apfel", x: 16, y: 49, r: 7 },
      { productId: "yayoi-kusama", x: 48, y: 54, r: 7 },
    ],
  },
  {
    id: "scene-8",
    title: "Soggiorno · Camino",
    image: "/images/scenes/scene-8.png",
    imageMobile: "/images/scenes/scene-8-mobile.png",
    alt: "Salotto minimale con camino e coppia di piatti Keep Fit (Body Rolling + Body Rocking) sulla mensola",
    // Un solo hotspot CENTRATO fra i due piatti: apre il modal della coppia Keep Fit.
    hotspots: [
      { productId: "keep-fit", x: 60, y: 51, r: 8 },
    ],
    hotspotsMobile: [
      { productId: "keep-fit", x: 58, y: 53, r: 9 },
    ],
  },
  {
    id: "scene-9",
    title: "Scena · 09",
    image: "/images/scenes/scene-9.png",
    imageMobile: "/images/scenes/scene-9-mobile.png",
    alt: "Ambiente Santa Sara con il pezzo Messieur in primo piano",
    // Coordinate provvisorie: rifinisci con l'editor (tasto E) appena online
    hotspots: [
      { productId: "messieur", x: 50, y: 55, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "messieur", x: 50, y: 55, r: 8 },
    ],
  },
  {
    id: "scene-10",
    title: "Scena · 10",
    image: "/images/scenes/scene-10.png",
    imageMobile: "/images/scenes/scene-10-mobile.png",
    alt: "Ambiente Santa Sara con il vaso Kentucky '73 a sinistra e il vaso Prime Cut a destra",
    hotspots: [
      { productId: "kentucky-73", x: 38, y: 58, r: 7 },
      { productId: "prime-cut", x: 62, y: 55, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "kentucky-73", x: 38, y: 53, r: 8 },
      { productId: "prime-cut", x: 62, y: 54, r: 7 },
    ],
  },
  {
    id: "scene-11",
    title: "Scena · 11",
    image: "/images/scenes/scene-11.png",
    imageMobile: "/images/scenes/scene-11-mobile.png",
    alt: "Sala con vaso Messieur e cachepot Visionari II al centro",
    hotspots: [
      { productId: "messieur", x: 22, y: 42, r: 6 },
      { productId: "visionari-ii", x: 50, y: 54, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "messieur", x: 24, y: 40, r: 7 },
      { productId: "visionari-ii", x: 48, y: 52, r: 7 },
    ],
  },
  {
    id: "scene-12",
    title: "Scena · 12",
    image: "/images/scenes/scene-12.png",
    imageMobile: "/images/scenes/scene-12-mobile.png",
    alt: "Parete verde con coppia di vasi Doppio su madia",
    hotspots: [{ productId: "doppio", x: 45, y: 48, r: 8 }],
    hotspotsMobile: [{ productId: "doppio", x: 47, y: 46, r: 9 }],
  },
  {
    id: "scene-13",
    title: "Scena · 13",
    image: "/images/scenes/scene-13.png",
    imageMobile: "/images/scenes/scene-13-mobile.png",
    alt: "Vetrina con quattro piatti: Yayoi Kusama, Chappell Roan, Lady Gaga e Iris Apfel",
    hotspots: [
      { productId: "yayoi-kusama", x: 24, y: 54, r: 5 },
      { productId: "chappell-roan", x: 38, y: 54, r: 5 },
      { productId: "lady-gaga", x: 60, y: 54, r: 5 },
      { productId: "iris-apfel", x: 74, y: 54, r: 5 },
    ],
    hotspotsMobile: [
      { productId: "yayoi-kusama", x: 22, y: 52, r: 6 },
      { productId: "chappell-roan", x: 36, y: 52, r: 6 },
      { productId: "lady-gaga", x: 58, y: 52, r: 6 },
      { productId: "iris-apfel", x: 72, y: 52, r: 6 },
    ],
  },
  {
    id: "scene-14",
    title: "Scena · 14",
    image: "/images/scenes/scene-14.png",
    imageMobile: "/images/scenes/scene-14-mobile.png",
    alt: "Tavolo con ciotola Romance e vaso Prime Cut",
    hotspots: [
      { productId: "romance", x: 36, y: 58, r: 7 },
      { productId: "prime-cut", x: 58, y: 50, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "romance", x: 38, y: 56, r: 8 },
      { productId: "prime-cut", x: 56, y: 48, r: 8 },
    ],
  },
  {
    id: "scene-15",
    title: "Soggiorno · Marmo nero",
    image: "/images/scenes/scene-15.png",
    imageMobile: "/images/scenes/scene-15-mobile.png",
    alt: "Soggiorno scuro con tavolino in marmo nero, palla decorativa su vassoio e vaso bianco con decoro blu e terracotta",
    hotspots: [
      { productId: "christmas-ball", x: 44, y: 58, r: 6 },
      { productId: "messieur", x: 74, y: 54, r: 7 },
    ],
    hotspotsMobile: [
      { productId: "christmas-ball", x: 42, y: 56, r: 7 },
      { productId: "messieur", x: 72, y: 52, r: 8 },
    ],
  },
  {
    id: "scene-16",
    title: "Scena · 16",
    image: "/images/scenes/scene-16.png",
    imageMobile: "/images/scenes/scene-16-mobile.png",
    alt: "Parete a righe con piatti Keep Fit (Body Rolling e Body Rocking) in alto e coppia di vasi Doppio sulla mensola",
    hotspots: [
      { productId: "keep-fit", x: 50, y: 26, r: 8 },
      { productId: "doppio", x: 50, y: 62, r: 8 },
    ],
    hotspotsMobile: [
      { productId: "keep-fit", x: 50, y: 24, r: 9 },
      { productId: "doppio", x: 50, y: 58, r: 9 },
    ],
  },
];
