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
    catalog: "Catalogo",
    catalogBadge: "opere",
  },
  catalog: {
    aria: "Catalogo opere",
    title: "Catalogo",
    subtitle: "Pezzi unici, decorati a mano in atelier.",
    filterAll: "Tutti",
    pieceCountOne: "1 pezzo",
    pieceCountMany: "{n} pezzi",
    empty: "Nessun pezzo in questa categoria, per ora.",
    comingSoon: "Foto in arrivo",
    sold: "Venduto",
    piattiGrandi: "Piatti grandi",
    piattiIcons: "Icons · formato standard",
    piattiAltri: "Altri piatti",
  },
  modal: {
    dimensions: "Dimensioni",
    price: "Prezzo",
    askAvailability: "Chiedi disponibilità",
    onRequest: "Su richiesta",
    photosComingSoon: "Foto in arrivo",
    sold: "Venduto",
    soldStamp: "SOLD",
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
    bioPhotoAlt: "Santa Sara in atelier",
    paragraph1:
      "Ceramiche ornamentali decorate a mano. Ogni pezzo è unico, dipinto in atelier: forma classica, segno contemporaneo. Nessuna serie industriale, nessun catalogo da supermercato — solo oggetti che entrano in casa con una posizione.",
    paragraph2Prefix:
      "Per disponibilità, commissioni private o visite all'atelier",
    etsyBadge: "shop",
  },
  contact: {
    aria: "Modulo contatti",
    title: "Scrivici",
    subtitle: "Per disponibilità, commissioni private o domande sui pezzi.",
    name: "Nome",
    namePlaceholder: "Il tuo nome",
    email: "Email",
    emailPlaceholder: "nome@esempio.com",
    country: "Nazione",
    countryPlaceholder: "Italia, United Kingdom…",
    message: "Messaggio",
    messagePlaceholder: "Scrivi qui il tuo messaggio…",
    send: "Invia messaggio",
    sending: "Invio in corso…",
    success: "Messaggio inviato. Ti risponderemo presto a questa email.",
    error: "Invio non riuscito. Riprova tra poco o scrivi a hello@santasara.com",
    writeUs: "scrivici qui",
  },
  scenes: {
    "scene-1": {
      title: "Terrazza · Mare",
      alt: "Terrazza affacciata sul mare con cachepot Visionari II sul muretto e vaso Dandy Land in primo piano",
    },
    "scene-1-focus-visionari-ii": {
      title: "Visionari II",
      alt: "Visionari II — cachepot neoclassico decorato a mano",
    },
    "scene-1-second": {
      title: "Tavolo · Natale",
      alt: "Tavolo con le quattro palle natalizie: Bovine Divine, Mid Winter, Gift Giving e Dragonbell",
    },
    "scene-1-focus-dragonbell": {
      title: "Dragonbell",
      alt: "Dragonbell — palla natalizia decorata a mano",
    },
    "scene-1-bis": {
      title: "Balcone · Città",
      alt: "Balcone con cachepot Visionari II e vaso Dandy Land al centro",
    },
    "scene-1-bis-focus-dandy-land": {
      title: "Dandy Land",
      alt: "Dandy Land — vaso decorato a mano",
    },
    "scene-2": {
      title: "Tavolo · Sera",
      alt: "Tavolo serale con vaso Dandy Land a sinistra e pezzo Messieur a destra",
    },
    "scene-2-focus-messieur": {
      title: "Messieur",
      alt: "Messieur — bottiglia decorativa decorata a mano",
    },
    "scene-3": {
      title: "Lobby · Classico",
      alt: "Lobby classica con lampada Florence sulla console a sinistra e piatto Baroque Clash al centro su cavalletto",
    },
    "scene-3-focus-baroque-clash": {
      title: "Baroque Clash",
      alt: "Baroque Clash — piatto decorato a mano",
    },
    "scene-4": {
      title: "Terrazza · Mediterraneo",
      alt: "Terrazza affacciata sul mare con vaso Kentucky '73 sul tavolino e cachepot Visionari II sulla colonna",
    },
    "scene-4-focus-kentucky-73": {
      title: "Kentucky '73",
      alt: "Kentucky '73 — vaso decorato a mano",
    },
    "scene-5": {
      title: "Atelier · Studio",
      alt: "Scrivania d'atelier con piatto Snow Yeti appeso e vaso Prime Cut sul piano",
    },
    "scene-5-focus-snow-yeti": {
      title: "Snow Yeti",
      alt: "Snow Yeti — piatto decorato a mano",
    },
    "scene-6": {
      title: "Soggiorno · Sera",
      alt: "Soggiorno serale con lampada Florence sul tavolo e piatto Iris Apfel appeso alla parete",
    },
    "scene-6-focus-florence": {
      title: "Florence",
      alt: "Florence — lampada decorata a mano",
    },
    "scene-7": {
      title: "Tavola · Tramonto",
      alt: "Apparecchiatura su tavolo all'aperto al tramonto, con quattro piatti decorati Santa Sara",
    },
    "scene-7-focus-lady-gaga": {
      title: "Lady Gaga",
      alt: "Lady Gaga — piatto Icons decorato a mano",
    },
    "scene-8": {
      title: "Soggiorno · Camino",
      alt: "Salotto minimale con camino e coppia di piatti Keep Fit (Body Rolling + Body Rocking) sulla mensola",
    },
    "scene-8-focus-keep-fit": {
      title: "Keep Fit",
      alt: "Keep Fit — coppia di piatti decorati a mano",
    },
    "scene-9": {
      title: "Interno · Messieur",
      alt: "Ambiente Santa Sara con il pezzo Messieur in primo piano",
    },
    "scene-10": {
      title: "Sala · Vasi",
      alt: "Ambiente Santa Sara con il vaso Kentucky '73 a sinistra e il vaso Prime Cut a destra",
    },
    "scene-10-focus-prime-cut": {
      title: "Prime Cut",
      alt: "Prime Cut — vaso decorato a mano",
    },
    "scene-11": {
      title: "Salotto · Geometrico",
      alt: "Sala con vaso Dandy Land sulla console e cachepot Visionari II al centro",
    },
    "scene-12": {
      title: "Soggiorno · Parete verde",
      alt: "Parete verde con coppia di vasi Padded Dynasty su madia",
    },
    "scene-12-focus-padded-dynasty": {
      title: "Padded Dynasty",
      alt: "Padded Dynasty — coppia di vasi decorati a mano",
    },
    "scene-13": {
      title: "Vetrina · Piatti",
      alt: "Vetrina con quattro piatti: Yayoi Kusama, Chappell Roan, Lady Gaga e Iris Apfel",
    },
    "scene-13-focus-iris-apfel": {
      title: "Iris Apfel",
      alt: "Iris Apfel — piatto Icons decorato a mano",
    },
    "scene-14": {
      title: "Tavolo · Studio",
      alt: "Tavolo con cachepot Visionari II a sinistra e vaso Dandy Land a destra",
    },
    "scene-15": {
      title: "Soggiorno · Marmo nero",
      alt: "Soggiorno scuro con tavolino in marmo nero: palla Gift Giving su vassoio bianco a sinistra e vaso Look-up al centro",
    },
    "scene-15-focus-look-up": {
      title: "Look-up",
      alt: "Look-up — vaso decorato a mano",
    },
    "scene-16": {
      title: "Studio · Righe",
      alt: "Parete a righe con piatti Keep Fit (Body Rolling e Body Rocking) in alto e coppia di vasi Doppio sulla mensola",
    },
    "scene-16-focus-doppio": {
      title: "Doppio",
      alt: "Doppio — coppia di vasi decorati a mano",
    },
  },
  products: {
    florence: {
      description:
        "Materiali: ceramica. Viola lucido, figure femminili, tensione classica. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 24 cm · h 45 cm",
      price: "€ 420",
      cta: "Acquista su Etsy",
    },
    romance: {
      description:
        "Materiali: ceramica, smalti. Decorazione a mano: sensualità barocca, ritmo contemporaneo. Sfumature calde su base avorio.",
      dimensions: "l 20 cm · h 31 cm",
      price: "€ 240",
      cta: "Acquista su Etsy",
    },
    "snow-yeti": {
      description:
        "Materiali: ceramica, argilla, engobbi, smalti. Sfumature glaciali e tratto materico. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 37 cm · h 3 cm",
      price: "€ 130",
      cta: "Acquista su Etsy",
    },
    "chappell-roan": {
      description:
        "Materiali: ceramica. Serie Icons dinner service. Ritratto pop, capelli rossi e ricami metallici. Cornice a zigzag blu con cerchi gialli. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 25 cm",
      price: "€ 85",
      cta: "Acquista su Etsy",
    },
    "iris-apfel": {
      description:
        "Materiali: ceramica. Serie Icons dinner service. Omaggio all'icona dello stile: basco rosso, occhialoni tondi, bracciali. Cornice a quadrettini verdi con tondi rossi. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 25 cm",
      price: "€ 85",
      cta: "Acquista su Etsy",
    },
    "lady-gaga": {
      description:
        "Materiali: ceramica. Serie Icons dinner service. Ritratto rosso scarlatto, energia pop e taglio teatrale. Cornice a ovali gialli e segni grafici. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 25 cm",
      price: "€ 85",
      cta: "Acquista su Etsy",
    },
    "keep-fit": {
      description:
        "Materiali: ceramica. Body Rolling e Body Rocking: una coppia ironica in verde prato, ispirata ai manuali di ginnastica anni 50. Pezzi unici, decorati a mano in atelier. Venduti come set.",
      dimensions: "l 37 cm · h 37 cm · set di 2",
      price: "€ 280 (set)",
      cta: "Acquista su Etsy",
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
        "Materiali: ceramica. Tre figure di profilo, contemporaneo e essenziale. Linea fluida su porcellana bianca. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 15 cm · h 26 cm",
      price: "€ 210",
      cta: "Acquista su Etsy",
    },
    "dandy-land": {
      description:
        "Anfora decorata a mano con ritratto dandy, scritta DANDY sul collo e fiori stilizzati sulla base. Pezzo unico, decorato a mano in atelier.",
      dimensions: "—",
      price: "Su richiesta",
      cta: "Chiedi disponibilità",
    },
    "kentucky-73": {
      description:
        "Materiali: ceramica, smalti. Omaggio al Kentucky Derby del 1973: corsa di cavalli, fantini, rose rosse e righe rosa. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 22 cm · h 25 cm",
      price: "€ 280",
      cta: "Acquista su Etsy",
    },
    "look-up": {
      description:
        "Materiali: ceramica, engobbi, smalti. Vaso a pancia con decoro astratto su fondo avorio. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 29 cm · h 19,5 cm",
      price: "€ 310",
      cta: "Acquista su Etsy",
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
        "Materiali: ceramica. Pezzo unico fra classico e contemporaneo, decorato a mano in atelier.",
      dimensions: "l 11 cm · h 17 cm",
      price: "€ 159",
      cta: "Acquista su Etsy",
    },
    doppio: {
      description:
        "Materiali: ceramica, engobbi, smalti. Coppia di vasi. Pezzi unici, decorati a mano in atelier. Venduti come set.",
      dimensions: "l 14 cm · h 20 cm · set di 2",
      price: "€ 180 (set)",
      cta: "Acquista su Etsy",
    },
    "padded-dynasty": {
      description:
        "Materiali: ceramica. Coppia di vasi in terracotta con ritratti ispirati alla dinastia cinese e giacche imbottite contemporanee. Pezzi unici, decorati a mano in atelier. Venduti come set — un solo set disponibile.",
      dimensions: "l 11 cm · h 22 cm · set di 2",
      price: "€ 220 (set)",
      cta: "Acquista su Etsy",
    },
    "baroque-clash": {
      description:
        "Materiali: ceramica. Cornice barocca dorata e segno contemporaneo: piatto da parete che fa cortocircuito fra classico e pop. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 37 cm · h 37 cm",
      price: "€ 160",
      cta: "Acquista su Etsy",
    },
    "gift-giving": {
      description:
        "Materiali: ceramica. Palla natalizia decorata a mano con ritratto e scritta Gift Giving. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 12 cm",
      price: "€ 45",
      cta: "Acquista su Etsy",
    },
    "divine-bovine": {
      description:
        "Materiali: ceramica. Palla natalizia decorata a mano con ritratto bovino e scritta Bovine Divine. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 12 cm",
      price: "€ 45",
      cta: "Chiedi disponibilità",
    },
    dragonbell: {
      description:
        "Materiali: ceramica. Palla natalizia decorata a mano con drago e campana. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 10 cm",
      price: "€ 50",
      cta: "Chiedi disponibilità",
    },
    "mid-winter": {
      description:
        "Materiali: ceramica. Palla natalizia decorata a mano con atmosfera mid-winter. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 10 cm",
      price: "€ 50",
      cta: "Chiedi disponibilità",
    },
    "back-to-velvet": {
      description:
        "Materiali: ceramica. Palla natalizia decorata a mano Back To Velvet. Pezzo unico, decorato a mano in atelier.",
      dimensions: "l 10 cm",
      price: "€ 40",
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
    catalog: "Catalog",
    catalogBadge: "works",
  },
  catalog: {
    aria: "Works catalog",
    title: "Catalog",
    subtitle: "One-of-a-kind pieces, hand-painted in the atelier.",
    filterAll: "All",
    pieceCountOne: "1 piece",
    pieceCountMany: "{n} pieces",
    empty: "No pieces in this category yet.",
    comingSoon: "Photos coming soon",
    sold: "Sold",
    piattiGrandi: "Large plates",
    piattiIcons: "Icons · standard size",
    piattiAltri: "Other plates",
  },
  modal: {
    dimensions: "Dimensions",
    price: "Price",
    askAvailability: "Check availability",
    onRequest: "On request",
    photosComingSoon: "Photos coming soon",
    sold: "Sold",
    soldStamp: "SOLD",
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
    bioPhotoAlt: "Santa Sara in the atelier",
    paragraph1:
      "Hand-painted ornamental ceramics. Each piece is unique, painted in the atelier: classical form, contemporary mark. No industrial series, no supermarket catalogue — only objects that enter the home with a stance.",
    paragraph2Prefix:
      "For availability, private commissions or atelier visits",
    etsyBadge: "shop",
  },
  contact: {
    aria: "Contact form",
    title: "Get in touch",
    subtitle: "For availability, private commissions or questions about the pieces.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "name@example.com",
    country: "Country",
    countryPlaceholder: "Italy, United Kingdom…",
    message: "Message",
    messagePlaceholder: "Write your message here…",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. We will reply to your email soon.",
    error: "Could not send. Please try again or email hello@santasara.com",
    writeUs: "contact us here",
  },
  scenes: {
    "scene-1": {
      title: "Terrace · Sea",
      alt: "Seaside terrace with the Visionari II cachepot on the wall and the Dandy Land vase in the foreground",
    },
    "scene-1-focus-visionari-ii": {
      title: "Visionari II",
      alt: "Visionari II — hand-painted neoclassical cachepot",
    },
    "scene-1-second": {
      title: "Table · Christmas",
      alt: "Table with four Christmas baubles: Bovine Divine, Mid Winter, Gift Giving and Dragonbell",
    },
    "scene-1-focus-dragonbell": {
      title: "Dragonbell",
      alt: "Dragonbell — hand-painted Christmas bauble",
    },
    "scene-1-bis": {
      title: "Balcony · City",
      alt: "Balcony with Visionari II cachepot and Dandy Land vase at the center",
    },
    "scene-1-bis-focus-dandy-land": {
      title: "Dandy Land",
      alt: "Dandy Land — hand-painted vase",
    },
    "scene-2": {
      title: "Table · Evening",
      alt: "Evening table with Dandy Land vase on the left and Messieur piece on the right",
    },
    "scene-2-focus-messieur": {
      title: "Messieur",
      alt: "Messieur — hand-painted decorative bottle",
    },
    "scene-3": {
      title: "Lobby · Classic",
      alt: "Classic lobby with the Florence lamp on the left console and the Baroque Clash plate on a stand at the center",
    },
    "scene-3-focus-baroque-clash": {
      title: "Baroque Clash",
      alt: "Baroque Clash — hand-painted decorative plate",
    },
    "scene-4": {
      title: "Terrace · Mediterranean",
      alt: "Seaside terrace with the Kentucky '73 vase on the bistro table and the Visionari II cachepot on the column",
    },
    "scene-4-focus-kentucky-73": {
      title: "Kentucky '73",
      alt: "Kentucky '73 — hand-painted vase",
    },
    "scene-5": {
      title: "Atelier · Studio",
      alt: "Atelier desk with the Snow Yeti plate on the wall and the Prime Cut vase on the surface",
    },
    "scene-5-focus-snow-yeti": {
      title: "Snow Yeti",
      alt: "Snow Yeti — hand-painted decorative plate",
    },
    "scene-6": {
      title: "Living room · Evening",
      alt: "Evening living room with the Florence lamp on the table and the Iris Apfel plate on the wall",
    },
    "scene-6-focus-florence": {
      title: "Florence",
      alt: "Florence — hand-painted lamp",
    },
    "scene-7": {
      title: "Table · Sunset",
      alt: "Outdoor table set at sunset with four hand-painted Santa Sara plates",
    },
    "scene-7-focus-lady-gaga": {
      title: "Lady Gaga",
      alt: "Lady Gaga — hand-painted Icons plate",
    },
    "scene-8": {
      title: "Living room · Fireplace",
      alt: "Minimal living room with a fireplace and the Keep Fit pair of plates (Body Rolling + Body Rocking) on the mantel",
    },
    "scene-8-focus-keep-fit": {
      title: "Keep Fit",
      alt: "Keep Fit — pair of hand-painted plates",
    },
    "scene-9": {
      title: "Interior · Messieur",
      alt: "Santa Sara setting with the Messieur piece in the foreground",
    },
    "scene-10": {
      title: "Room · Vases",
      alt: "Santa Sara setting with the Kentucky '73 vase on the left and the Prime Cut vase on the right",
    },
    "scene-10-focus-prime-cut": {
      title: "Prime Cut",
      alt: "Prime Cut — hand-painted vase",
    },
    "scene-11": {
      title: "Living room · Geometric",
      alt: "Room with Dandy Land vase on the console and Visionari II cachepot in the center",
    },
    "scene-12": {
      title: "Living room · Green wall",
      alt: "Green wall with the Padded Dynasty pair of vases on the sideboard",
    },
    "scene-12-focus-padded-dynasty": {
      title: "Padded Dynasty",
      alt: "Padded Dynasty — pair of hand-painted vases",
    },
    "scene-13": {
      title: "Shop window · Plates",
      alt: "Shop window with four plates: Yayoi Kusama, Chappell Roan, Lady Gaga and Iris Apfel",
    },
    "scene-13-focus-iris-apfel": {
      title: "Iris Apfel",
      alt: "Iris Apfel — hand-painted Icons plate",
    },
    "scene-14": {
      title: "Table · Studio",
      alt: "Table with Visionari II cachepot on the left and Dandy Land vase on the right",
    },
    "scene-15": {
      title: "Living room · Black marble",
      alt: "Dark living room with a black marble coffee table: Gift Giving bauble on a white tray on the left and Look-up vase in the center",
    },
    "scene-15-focus-look-up": {
      title: "Look-up",
      alt: "Look-up — hand-painted vase",
    },
    "scene-16": {
      title: "Studio · Stripes",
      alt: "Striped wall with Keep Fit plates (Body Rolling and Body Rocking) above and the Doppio pair of vases on the shelf",
    },
    "scene-16-focus-doppio": {
      title: "Doppio",
      alt: "Doppio — pair of hand-painted vases",
    },
  },
  products: {
    florence: {
      description:
        "Materials: ceramic. Glossy purple, female figures, classical tension. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 24 cm · h 45 cm",
      price: "€ 420",
      cta: "Buy on Etsy",
    },
    romance: {
      description:
        "Materials: ceramic, glazes. Hand-painted decoration: baroque sensuality, contemporary rhythm. Warm shades on ivory ground.",
      dimensions: "w 20 cm · h 31 cm",
      price: "€ 240",
      cta: "Buy on Etsy",
    },
    "snow-yeti": {
      description:
        "Materials: ceramic, clay, engobes, glazes. Glacial shades and a textured mark. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 37 cm · h 3 cm",
      price: "€ 130",
      cta: "Buy on Etsy",
    },
    "chappell-roan": {
      description:
        "Materials: ceramic. Icons dinner service series. Pop portrait, red hair and metallic embroidery. Blue zigzag border with yellow circles. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 25 cm",
      price: "€ 85",
      cta: "Buy on Etsy",
    },
    "iris-apfel": {
      description:
        "Materials: ceramic. Icons dinner service series. An homage to the style icon: red beret, round oversize glasses, bracelets. Green check border with red dots. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 25 cm",
      price: "€ 85",
      cta: "Buy on Etsy",
    },
    "lady-gaga": {
      description:
        "Materials: ceramic. Icons dinner service series. Scarlet-red portrait, pop energy and theatrical cut. Yellow oval border with graphic marks. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 25 cm",
      price: "€ 85",
      cta: "Buy on Etsy",
    },
    "keep-fit": {
      description:
        "Materials: ceramic. Body Rolling and Body Rocking: an ironic duo in grass-green, inspired by 1950s gymnastics manuals. One-of-a-kind, hand-painted in atelier. Sold as a set.",
      dimensions: "w 37 cm · h 37 cm · set of 2",
      price: "€ 280 (set)",
      cta: "Buy on Etsy",
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
        "Materials: ceramic. Three figures in profile, contemporary and essential. Fluid line on white porcelain. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 15 cm · h 26 cm",
      price: "€ 210",
      cta: "Buy on Etsy",
    },
    "dandy-land": {
      description:
        "Hand-painted amphora with a dandy portrait, DANDY lettering on the neck and stylized flowers on the base. One-of-a-kind, hand-painted in atelier.",
      dimensions: "—",
      price: "On request",
      cta: "Check availability",
    },
    "kentucky-73": {
      description:
        "Materials: ceramic, glazes. An homage to the 1973 Kentucky Derby: horse race, jockeys, red roses and pink stripes. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 22 cm · h 25 cm",
      price: "€ 280",
      cta: "Buy on Etsy",
    },
    "look-up": {
      description:
        "Materials: ceramic, engobes, glazes. Bulbous vase with abstract decoration on an ivory ground. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 29 cm · h 19.5 cm",
      price: "€ 310",
      cta: "Buy on Etsy",
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
        "Materials: ceramic. One-of-a-kind piece between classical and contemporary, hand-painted in atelier.",
      dimensions: "w 11 cm · h 17 cm",
      price: "€ 159",
      cta: "Buy on Etsy",
    },
    doppio: {
      description:
        "Materials: ceramic, engobes, glazes. Pair of vases. One-of-a-kind pieces, hand-painted in atelier. Sold as a set.",
      dimensions: "w 14 cm · h 20 cm · set of 2",
      price: "€ 180 (set)",
      cta: "Buy on Etsy",
    },
    "padded-dynasty": {
      description:
        "Materials: ceramic. Pair of terracotta vases with portraits inspired by Chinese dynasty figures and contemporary padded jackets. One-of-a-kind, hand-painted in atelier. Sold as a set — only one set available.",
      dimensions: "w 11 cm · h 22 cm · set of 2",
      price: "€ 220 (set)",
      cta: "Buy on Etsy",
    },
    "baroque-clash": {
      description:
        "Materials: ceramic. Gilded baroque border meets a contemporary mark: a wall plate that short-circuits classical and pop. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 37 cm · h 37 cm",
      price: "€ 160",
      cta: "Buy on Etsy",
    },
    "gift-giving": {
      description:
        "Materials: ceramic. Hand-painted Christmas bauble with portrait and Gift Giving lettering. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 12 cm",
      price: "€ 45",
      cta: "Buy on Etsy",
    },
    "divine-bovine": {
      description:
        "Materials: ceramic. Hand-painted Christmas bauble with bovine portrait and Bovine Divine lettering. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 12 cm",
      price: "€ 45",
      cta: "Check availability",
    },
    dragonbell: {
      description:
        "Materials: ceramic. Hand-painted Christmas bauble with dragon and bell motif. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 10 cm",
      price: "€ 50",
      cta: "Check availability",
    },
    "mid-winter": {
      description:
        "Materials: ceramic. Hand-painted Christmas bauble with a mid-winter atmosphere. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 10 cm",
      price: "€ 50",
      cta: "Check availability",
    },
    "back-to-velvet": {
      description:
        "Materials: ceramic. Hand-painted Christmas bauble Back To Velvet. One-of-a-kind, hand-painted in atelier.",
      dimensions: "w 10 cm",
      price: "€ 40",
      cta: "Check availability",
    },
  },
};

export const translations = { it, en };
export const SUPPORTED_LANGS = ["it", "en"];
export const DEFAULT_LANG = "en";
