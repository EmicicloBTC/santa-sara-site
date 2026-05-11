/**
 * Dizionario completo IT/EN per tutto il sito.
 *
 * REGOLA D'ORO: NON traduciamo mai i NOMI delle opere (Florence, Snow Yeti,
 * Iris Apfel, ...). Sono titoli dei pezzi e restano identici in tutte le
 * lingue, esattamente come fanno i nomi propri.
 *
 * Tradotto invece TUTTO il resto: UI (menu, footer, ARIA), label del modal
 * prodotto, testo del modal bio, descrizioni e prezzi dei prodotti, titoli
 * e alt-text delle scene, etichette delle categorie.
 *
 * Per aggiungere una nuova lingua: duplicare l'oggetto `en` (o `it`),
 * tradurre i valori, e registrarla qui sotto in `translations` e in
 * `SUPPORTED_LANGS`.
 */

const it = {
  ui: {
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    basedIn: "Based in Italy",
    bioAtelier: "Bio & atelier",
    infoBadge: "info",
    etsyShop: "Etsy shop",
    buyBadge: "acquista",
    contacts: "Contatti",
    emailBadge: "email",
    languageLabel: "Lingua",
    prevScene: "Scena precedente",
    nextScene: "Scena successiva",
    close: "Chiudi",
    prev: "Precedente",
    next: "Successiva",
    imageN: "Immagine",
    openProductCard: "Apri scheda",
  },
  modal: {
    dimensions: "Dimensioni",
    price: "Prezzo",
    askAvailability: "Chiedi disponibilità",
    onRequest: "Su richiesta",
  },
  category: {
    Vasi: "Vasi",
    Piatti: "Piatti",
    Palle: "Palle",
    Misc: "Misc",
  },
  info: {
    aria: "Bio e atelier",
    atelierLabel: "— Atelier",
    paragraph1:
      "Ceramiche ornamentali decorate a mano. Ogni pezzo è unico, dipinto in atelier: forma classica, segno contemporaneo. Nessuna serie industriale, nessun catalogo da supermercato — solo oggetti che entrano in casa con una posizione.",
    paragraph2Prefix:
      "Per disponibilità, commissioni private o visite all'atelier scrivere a",
    etsyBadge: "shop",
  },
  scenes: {
    "scene-1": {
      title: "Terrazza · Mediterraneo",
      alt: "Terrazza affacciata sul mare con vaso Kentucky '73 sul tavolino e cachepot Visionari II sulla colonna",
    },
    "scene-2": {
      title: "Tavolo · Sera",
      alt: "Dettaglio interno con ceramiche Santa Sara fra oggetti casuali, incluso il pezzo Messieur",
    },
    "scene-3": {
      title: "Scena · 03",
      alt: "Ambiente Santa Sara con ceramiche e oggetti quotidiani",
    },
    "scene-4": {
      title: "Scena · 04",
      alt: "Ambiente Santa Sara con ceramiche e oggetti quotidiani",
    },
    "scene-5": {
      title: "Atelier · Studio",
      alt: "Scrivania d'atelier con piatto Snow Yeti appeso e vaso Prime Cut sul piano",
    },
    "scene-6": {
      title: "Soggiorno · Sera",
      alt: "Soggiorno serale con lampada Florence sul tavolo e piatto Iris Apfel appeso alla parete",
    },
    "scene-7": {
      title: "Tavola · Tramonto",
      alt: "Apparecchiatura su tavolo all'aperto al tramonto, con quattro piatti decorati Santa Sara",
    },
    "scene-8": {
      title: "Soggiorno · Camino",
      alt: "Salotto minimale con camino e coppia di piatti Keep Fit (Body Rolling + Body Rocking) sulla mensola",
    },
    "scene-9": {
      title: "Scena · 09",
      alt: "Ambiente Santa Sara con il pezzo Messieur in primo piano",
    },
  },
  products: {
    florence: {
      description:
        "Viola lucido, figure femminili, tensione classica. Pezzo unico, decorato a mano in atelier.",
      dimensions: "h 38 cm · ø 22 cm",
      price: "€ 420",
      cta: "Chiedi disponibilità",
    },
    romance: {
      description:
        "Decorazione a mano: sensualità barocca, ritmo contemporaneo. Sfumature calde su base avorio.",
      dimensions: "h 28 cm · ø 16 cm",
      price: "Su richiesta",
      cta: "Chiedi disponibilità",
    },
    "snow-yeti": {
      description:
        "Sfumature glaciali e tratto materico. Pezzo unico, decorato a mano in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Chiedi disponibilità",
    },
    "chappell-roan": {
      description:
        "Ritratto pop, capelli rossi e ricami metallici. Cornice a zigzag blu con cerchi gialli. Pezzo unico, decorato a mano in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Chiedi disponibilità",
    },
    "iris-apfel": {
      description:
        "Omaggio all'icona dello stile: basco rosso, occhialoni tondi, bracciali. Cornice a quadrettini verdi con tondi rossi. Pezzo unico, decorato a mano in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Chiedi disponibilità",
    },
    "lady-gaga": {
      description:
        "Ritratto rosso scarlatto, energia pop e taglio teatrale. Cornice a ovali gialli e segni grafici. Pezzo unico, decorato a mano in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Chiedi disponibilità",
    },
    "keep-fit": {
      description:
        "Body Rolling e Body Rocking: una coppia ironica in verde prato, ispirata ai manuali di ginnastica anni 50. Pezzi unici, decorati a mano in atelier. Venduti come set.",
      dimensions: "ø 32 cm cad. · set di 2",
      price: "€ 320 (set)",
      cta: "Chiedi disponibilità",
    },
    "yayoi-kusama": {
      description:
        "Omaggio all'artista giapponese: caschetto rosso, pois gialli su fondo nero e viola. Cornice a onda con tondi gialli. Pezzo unico, decorato a mano in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Chiedi disponibilità",
    },
    "prime-cut": {
      description:
        "Figura femminile e schema anatomico, stelle rosse e cornice barocca. Pezzo unico, decorato a mano in atelier.",
      dimensions: "h 30 cm · ø 18 cm",
      price: "€ 420",
      cta: "Chiedi disponibilità",
    },
    "cohort-03": {
      description:
        "Tre figure di profilo, contemporaneo e essenziale. Linea fluida su porcellana bianca. Pezzo unico, decorato a mano in atelier.",
      dimensions: "h 30 cm · ø 18 cm",
      price: "€ 380",
      cta: "Chiedi disponibilità",
    },
    "kentucky-73": {
      description:
        "Omaggio al Kentucky Derby del 1973: corsa di cavalli, fantini, rose rosse e righe rosa. Pezzo unico, decorato a mano in atelier.",
      dimensions: "h 28 cm · ø 26 cm",
      price: "€ 420",
      cta: "Chiedi disponibilità",
    },
    "visionari-ii": {
      description:
        "Cratere terracotta neoclassico con figure greche che indossano visori VR. Ironia sospesa fra antico e contemporaneo, decoro a meandro greco. Pezzo unico, decorato a mano in atelier.",
      dimensions: "h 30 cm · ø 32 cm",
      price: "€ 520",
      cta: "Chiedi disponibilità",
    },
    messieur: {
      description:
        "Pezzo unico fra classico e contemporaneo, decorato a mano in atelier.",
      dimensions: "—",
      price: "Su richiesta",
      cta: "Chiedi disponibilità",
    },
  },
};

const en = {
  ui: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    basedIn: "Based in Italy",
    bioAtelier: "Bio & atelier",
    infoBadge: "info",
    etsyShop: "Etsy shop",
    buyBadge: "shop",
    contacts: "Contact",
    emailBadge: "email",
    languageLabel: "Language",
    prevScene: "Previous scene",
    nextScene: "Next scene",
    close: "Close",
    prev: "Previous",
    next: "Next",
    imageN: "Image",
    openProductCard: "Open product card",
  },
  modal: {
    dimensions: "Dimensions",
    price: "Price",
    askAvailability: "Check availability",
    onRequest: "On request",
  },
  category: {
    Vasi: "Vases",
    Piatti: "Plates",
    Palle: "Spheres",
    Misc: "Misc",
  },
  info: {
    aria: "Bio and atelier",
    atelierLabel: "— Atelier",
    paragraph1:
      "Hand-painted ornamental ceramics. Each piece is unique, painted in the atelier: classical form, contemporary mark. No industrial series, no supermarket catalogue — only objects that enter the home with a stance.",
    paragraph2Prefix:
      "For availability, private commissions or atelier visits, please write to",
    etsyBadge: "shop",
  },
  scenes: {
    "scene-1": {
      title: "Terrace · Mediterranean",
      alt: "Seaside terrace with the Kentucky '73 vase on the bistro table and the Visionari II cachepot on the column",
    },
    "scene-2": {
      title: "Table · Evening",
      alt: "Interior detail with Santa Sara ceramics among everyday objects, including the Messieur piece",
    },
    "scene-3": {
      title: "Scene · 03",
      alt: "Santa Sara setting with ceramics and everyday objects",
    },
    "scene-4": {
      title: "Scene · 04",
      alt: "Santa Sara setting with ceramics and everyday objects",
    },
    "scene-5": {
      title: "Atelier · Studio",
      alt: "Atelier desk with the Snow Yeti plate on the wall and the Prime Cut vase on the surface",
    },
    "scene-6": {
      title: "Living room · Evening",
      alt: "Evening living room with the Florence lamp on the table and the Iris Apfel plate on the wall",
    },
    "scene-7": {
      title: "Table · Sunset",
      alt: "Outdoor table set at sunset with four hand-painted Santa Sara plates",
    },
    "scene-8": {
      title: "Living room · Fireplace",
      alt: "Minimal living room with a fireplace and the Keep Fit pair of plates (Body Rolling + Body Rocking) on the mantel",
    },
    "scene-9": {
      title: "Scene · 09",
      alt: "Santa Sara setting with the Messieur piece in the foreground",
    },
  },
  products: {
    florence: {
      description:
        "Glossy purple, female figures, classical tension. One-of-a-kind, hand-painted in atelier.",
      dimensions: "h 38 cm · ø 22 cm",
      price: "€ 420",
      cta: "Check availability",
    },
    romance: {
      description:
        "Hand-painted decoration: baroque sensuality, contemporary rhythm. Warm shades on ivory ground.",
      dimensions: "h 28 cm · ø 16 cm",
      price: "On request",
      cta: "Check availability",
    },
    "snow-yeti": {
      description:
        "Glacial shades and a textured mark. One-of-a-kind, hand-painted in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Check availability",
    },
    "chappell-roan": {
      description:
        "Pop portrait, red hair and metallic embroidery. Blue zigzag border with yellow circles. One-of-a-kind, hand-painted in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Check availability",
    },
    "iris-apfel": {
      description:
        "An homage to the style icon: red beret, round oversize glasses, bracelets. Green check border with red dots. One-of-a-kind, hand-painted in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Check availability",
    },
    "lady-gaga": {
      description:
        "Scarlet-red portrait, pop energy and theatrical cut. Yellow oval border with graphic marks. One-of-a-kind, hand-painted in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Check availability",
    },
    "keep-fit": {
      description:
        "Body Rolling and Body Rocking: an ironic duo in grass-green, inspired by 1950s gymnastics manuals. One-of-a-kind, hand-painted in atelier. Sold as a set.",
      dimensions: "ø 32 cm each · set of 2",
      price: "€ 320 (set)",
      cta: "Check availability",
    },
    "yayoi-kusama": {
      description:
        "An homage to the Japanese artist: red bob, yellow polka dots on black-and-purple ground. Wave border with yellow circles. One-of-a-kind, hand-painted in atelier.",
      dimensions: "ø 32 cm",
      price: "€ 180",
      cta: "Check availability",
    },
    "prime-cut": {
      description:
        "Female figure and anatomical diagram, red stars and baroque border. One-of-a-kind, hand-painted in atelier.",
      dimensions: "h 30 cm · ø 18 cm",
      price: "€ 420",
      cta: "Check availability",
    },
    "cohort-03": {
      description:
        "Three figures in profile, contemporary and essential. Fluid line on white porcelain. One-of-a-kind, hand-painted in atelier.",
      dimensions: "h 30 cm · ø 18 cm",
      price: "€ 380",
      cta: "Check availability",
    },
    "kentucky-73": {
      description:
        "An homage to the 1973 Kentucky Derby: horse race, jockeys, red roses and pink stripes. One-of-a-kind, hand-painted in atelier.",
      dimensions: "h 28 cm · ø 26 cm",
      price: "€ 420",
      cta: "Check availability",
    },
    "visionari-ii": {
      description:
        "Neoclassical terracotta krater featuring Greek figures wearing VR headsets. Suspended irony between ancient and contemporary, with a Greek meander border. One-of-a-kind, hand-painted in atelier.",
      dimensions: "h 30 cm · ø 32 cm",
      price: "€ 520",
      cta: "Check availability",
    },
    messieur: {
      description:
        "One-of-a-kind piece between classical and contemporary, hand-painted in atelier.",
      dimensions: "—",
      price: "On request",
      cta: "Check availability",
    },
  },
};

export const translations = { it, en };
export const SUPPORTED_LANGS = ["it", "en"];
export const DEFAULT_LANG = "en";
