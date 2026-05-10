# Santa Sara — istruzioni rapide

Questo file è il **manuale del sito**. Tutto quello che ti serve per aggiungere foto, prodotti, scene, modificare il logo, pubblicare. Tienilo aperto, ti basterà.

> ### ⚠ PROMEMORIA — peso/dimensioni delle FOTO
> **Non devi fare niente.** Le foto vengono ridimensionate (max 2400px) e ricompresse **in automatico** ogni volta che pushi: lo script parte da solo prima del deploy su Netlify (vedi sezione 11). Quindi tu carica i file a piena risoluzione, anche da 10-20 MB: ci pensa il sistema a tagliarli per il web.
>
> **L'unica cosa da non dimenticare**: se vuoi vedere subito quanto pesano dopo l'ottimizzazione (prima di pushare), lancia `npm run optimize-images` da terminale. È utile solo per curiosità, il deploy lo fa comunque da solo.

---

## 1. Riassunto a memoria corta

| Cosa vuoi fare | Cartella / file da toccare |
|---|---|
| Aggiungere un **nuovo prodotto** in vendita | `public/images/products/<nome>/` + `src/data/products.js` |
| Aggiungere foto a un prodotto già esistente (carosello) | `public/images/products/<nome>/2.jpg`, `3.jpg`… |
| Aggiungere una **nuova scena** (foto fullscreen) | `public/images/scenes/scene-N.png` (+ `scene-N-mobile.png`) e `src/data/scenes.js` |
| Cambiare i **link social** (Instagram, TikTok, Etsy) o l'email | `src/data/site.js` |
| Cambiare il **logo** | sostituisci `public/logo.png` e lancia `npm run build-favicons` |
| Posizionare gli **hotspot** sui prodotti | apri il sito → `#santa-edit` nell'URL → premi **E** |
| **Pubblicare** le modifiche online | salva → push su GitHub → Netlify pubblica da solo in 1-2 minuti |

---

## 2. Cos'è il sito

Una landing page **fullscreen** ispirata ai cataloghi IKEA: ogni "scena" è una foto a tutto schermo con dei prodotti decorativi mischiati ad oggetti di casa. Sopra i prodotti in vendita ci sono **hotspot** cliccabili (puntino con +) che aprono un modal con foto, dimensioni, prezzo, CTA.

Frecce sinistra/destra (o swipe su mobile) per cambiare scena. Niente scroll verticale. Header in alto con logo + menu. Footer in basso con titolo della scena.

---

## 3. Avviare il sito sul tuo PC

### Modo facile (Windows)
Doppio clic su **`AVVIA-SITO.bat`**. Si apre una finestra nera, dopo qualche secondo nel browser apri `http://localhost:5173`.

### Modo da terminale
```bash
npm install   # solo la prima volta
npm run dev
```

Le modifiche al codice si vedono in tempo reale, senza ricaricare.

---

## 4. Pubblicare le modifiche online (Netlify)

Hai GitHub collegato a Netlify, quindi è automatico. Ogni volta che pushi, Netlify fa il deploy.

```bash
git add .
git commit -m "descrizione modifica"
git push
```

In 1-2 minuti il sito ufficiale è aggiornato. Non c'è altro da fare.

---

## 5. Aggiungere o modificare un PRODOTTO

I prodotti (oggetti in vendita) stanno tutti in **`src/data/products.js`**. Sono identificati da una "chiave" (es. `florence`, `romance`).

### 5a. Aggiungere foto a un prodotto già esistente (carosello)

1. Vai in `public/images/products/<nome-prodotto>/`. Esempio: `public/images/products/florence/`.
2. Trascina dentro le foto numerate: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`…
   - La prima (`1`) è quella principale che si vede subito.
   - Le altre scorrono nel carosello dentro al modal.
3. Apri `src/data/products.js`, trova il prodotto e aggiorna `count`:
   ```js
   florence: {
     // ...
     images: { slug: "florence", count: 4, ext: "jpg" },
     //                          ^^^^^^^^   ← numero di foto
   },
   ```
4. Salva, push.

> Le foto possono essere `.jpg` o `.png`. Se sono `.png` cambia `ext: "png"`.
> Tutte le foto nello stesso prodotto devono avere la stessa estensione (`1.jpg`, `2.jpg`… oppure tutte `.png`).

### 5b. Aggiungere un prodotto nuovo (oggetto mai visto prima)

1. Crea la cartella `public/images/products/aurora/` (tutto minuscolo, senza spazi, senza accenti).
2. Metti dentro le foto numerate: `1.jpg`, `2.jpg`, `3.jpg`…
3. Apri `src/data/products.js` e aggiungi un blocco nuovo:
   ```js
   aurora: {
     id: "aurora",
     title: "Aurora",
     kind: "Vaso decorato a mano",
     dimensions: "h 32 cm · ø 18 cm",
     description: "Sfumature ambrate, decoro pittorico, pezzo unico.",
     price: "€ 380",
     cta: "Chiedi disponibilità",
     ctaHref: "mailto:hello@santasara.com?subject=Aurora — disponibilità",
     images: { slug: "aurora", count: 3, ext: "jpg" },
   },
   ```
4. Salva, push.

Da quel momento puoi usare `productId: "aurora"` negli hotspot delle scene.

---

## 6. Aggiungere o modificare una SCENA

Le scene (foto fullscreen) stanno tutte in **`src/data/scenes.js`**.

### 6a. Aggiungere una scena nuova

1. Metti la foto in `public/images/scenes/scene-N.png` (es. `scene-5.png`).
2. **Idealmente** metti anche la versione verticale (per telefoni): `scene-5-mobile.png`.
   - Formato consigliato 9:16 (es. 1080×1920).
   - Se non la metti, su mobile viene usata quella desktop, croppata ai lati.
3. Apri `src/data/scenes.js` e aggiungi un blocco in fondo all'array:
   ```js
   {
     id: "scene-5",
     title: "Cucina · Mattina",   // compare nel footer
     image: "/images/scenes/scene-5.png",
     imageMobile: "/images/scenes/scene-5-mobile.png", // opzionale
     alt: "Descrizione foto per accessibilità",
     hotspots: [
       { productId: "florence", x: 40, y: 50, r: 6 },
       { productId: "aurora",   x: 60, y: 55, r: 6 },
     ],
     hotspotsMobile: [
       { productId: "florence", x: 40, y: 55, r: 7 },
       { productId: "aurora",   x: 60, y: 60, r: 7 },
     ],
   },
   ```
4. Le coordinate (`x`, `y`) inizialmente le metti a caso: poi le aggiusti con l'editor (vedi sezione 7).
5. Salva, push.

### 6b. Cambiare quali prodotti compaiono in una scena

Apri `src/data/scenes.js`, trova la scena, cambia il valore `productId` negli hotspot:

```js
hotspots: [
  { productId: "florence", x: 40, y: 50, r: 6 },
  { productId: "aurora",   x: 60, y: 55, r: 6 },  //  ← era "romance", ora "aurora"
],
```

### 6c. Quante hotspot per scena
Tutte quelle che vuoi: aggiungi righe nell'array. Puoi anche ripetere lo stesso prodotto se compare più volte nella foto.

---

## 7. Editor visuale degli HOTSPOT (i puntini cliccabili)

Per non calcolare a mano le coordinate `x`/`y`, c'è un editor.

### 7a. In LOCALE (`AVVIA-SITO.bat`)
Sempre attivo. Premi **E** sulla tastiera, si apre il pannello arancione in alto a destra.

### 7b. Sul SITO PUBBLICATO (Netlify)
Per sicurezza l'editor è nascosto. Per attivarlo apri il sito aggiungendo questa "chiave segreta" all'URL:

```
https://NOMETUOSITO.netlify.app/#santa-edit
```

Solo con la chiave nell'URL il tasto **E** apre il pannello. Senza, chi visita non vede nulla.

> La chiave si cambia in `src/components/Stage.jsx`, costante `EDITOR_KEY`. Se la cambi devi ridire il nuovo URL a chi deve usarlo.

### 7c. Come si usa il pannello
1. **Vista**: 3 bottoni `Auto / Desktop / Mobile`. Forza la modalità per posizionare i puntini desktop o quelli mobile (anche se sei al PC).
2. **Scegli il prodotto**: clicca Florence, Romance, Aurora… (i bottoni cambiano in base ai prodotti che hai dichiarato).
3. **Clicca sulla foto** sopra al prodotto. Compare una riga di codice già pronta, tipo:
   ```js
   { productId: "florence", x: 38.4, y: 52.7, r: 6 },
   ```
4. **Premi "Copia riga"**. Apri `src/data/scenes.js`, trova la scena giusta e incolla la riga dentro `hotspots` (se eri in vista Desktop) o `hotspotsMobile` (se eri in vista Mobile). **Il pannello te lo dice** allo step 3.
5. Premi **E** per chiudere l'editor.
6. Salva, push.

---

## 8. Foto desktop vs mobile (capirlo una volta per tutte)

| Schermo | Foto usata | Hotspot usati |
|---|---|---|
| PC, finestra orizzontale | `image` | `hotspots` |
| Telefono / finestra verticale | `imageMobile` se c'è, altrimenti `image` | `hotspotsMobile` se c'è e c'è anche `imageMobile`, altrimenti `hotspots` |

In pratica:
- Caricare solo la foto desktop = funziona ovunque ma su mobile vedi solo la fascia centrale.
- Caricare anche `-mobile.png` = vista perfetta su entrambi i device.
- Le `hotspotsMobile` hanno senso solo se hai anche `imageMobile`.

---

## 9. Cambiare il LOGO

1. Sostituisci il file `public/logo.png` con il nuovo (PNG con sfondo trasparente, almeno 512×512).
2. Da terminale lancia:
   ```bash
   npm run build-favicons
   ```
   Rigenera in automatico le 3 versioni del favicon (16, 32, 180 px).
3. Salva, push.

Il nuovo logo compare nell'header e come iconcina nel tab del browser.

---

## 10. Cambiare email e link SOCIAL

Tutto centralizzato in **`src/data/site.js`**:

```js
export const site = {
  name: "Santa Sara",
  email: "hello@santasara.com",  //  ← cambia qui
  social: {
    instagram: { url: "https://www.instagram.com/santasara_ceramic/", ... },
    tiktok:    { url: "https://www.tiktok.com/@santasara_ceramic", ... },
    etsy:      { url: "https://www.etsy.com/shop/santasaraceramic/", ... },
  },
};
```

Cambi qui, tutto il sito si aggiorna (header, modal bio, mailto delle CTA, …).

---

## 11. Ottimizzazione automatica delle FOTO

> **TL;DR — è automatico, non serve ricordartelo.**
> Ogni nuova foto che aggiungi (scene, foto prodotti, logo, qualsiasi cosa in `public/images/`) viene ottimizzata **da sola** la prossima volta che pushi. Quindi puoi caricare file enormi senza pensieri.

### Cosa fa esattamente
Lo script `scripts/optimize-images.js` parte automaticamente prima di ogni build (è agganciato a `prebuild` in `package.json`) sia in locale (`npm run build`) sia su Netlify (al deploy). Per ogni file in `public/images/`:

- Ridimensiona se più grande di 2400px sul lato lungo (sufficiente per qualsiasi schermo retina).
- Ricomprime PNG (palette+quality 80) e JPG (mozjpeg quality 82).
- Sovrascrive il file **solo se** l'output è effettivamente più piccolo: non perde mai qualità inutilmente.
- Salta i file già ottimizzati grazie al manifest `.image-cache.json` (committato): le build successive sono istantanee.

### Esempio reale già visto
Durante lo sviluppo siamo passati da **22 MB → 4,7 MB** totali (-79%) senza muovere un dito. Le foto delle scene da 9 MB sono diventate ~1,5 MB ciascuna, mantenendo la stessa resa visiva.

### Lanciarlo a mano (opzionale)
Se prima di pushare vuoi vedere quanto risparmierai, da terminale:
```bash
npm run optimize-images
```
Stamperà un report file per file con dimensione prima/dopo. Ma anche se non lo lanci, il deploy lo fa per te.

---

## 12. Struttura del progetto

```
santa-sara-site/
├─ public/
│  ├─ logo.png                  ← logo del sito
│  ├─ favicon-16.png            ← (generati da build-favicons)
│  ├─ favicon-32.png
│  ├─ apple-touch-icon.png
│  └─ images/
│     ├─ scenes/                ← foto fullscreen (scene-1.png, scene-1-mobile.png, ...)
│     └─ products/              ← una sottocartella per ogni prodotto
│        ├─ florence/1.png
│        └─ romance/1.jpg
│
├─ src/
│  ├─ data/
│  │  ├─ products.js            ← elenco prodotti (titolo, prezzo, foto, ...)
│  │  ├─ scenes.js              ← elenco scene + hotspot
│  │  └─ site.js                ← email, link social
│  ├─ components/
│  │  ├─ Header.jsx             ← logo + menu in alto
│  │  ├─ Footer.jsx             ← titolo scena + indicatore in basso
│  │  ├─ Stage.jsx              ← scena fullscreen + frecce + editor
│  │  ├─ Hotspot.jsx            ← puntino cliccabile sopra al prodotto
│  │  ├─ HotspotEditor.jsx      ← pannello editor (premi E)
│  │  ├─ ProductModal.jsx       ← modal del prodotto con carosello
│  │  ├─ InfoModal.jsx          ← modal "Bio & atelier"
│  │  └─ icons.jsx              ← icone SVG inline (no librerie esterne)
│  ├─ pages/
│  │  └─ Landing.jsx            ← orchestra tutto
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
│
├─ scripts/
│  ├─ optimize-images.js        ← compressione automatica (parte al build)
│  └─ build-favicons.js         ← genera le icone dal logo
│
├─ index.html
├─ tailwind.config.js
├─ vite.config.js
├─ netlify.toml                 ← config Netlify (build cmd, publish dir)
├─ package.json
└─ README.md                    ← questo file
```

---

## 13. Comandi npm disponibili

| Comando | Cosa fa |
|---|---|
| `npm run dev` | avvia il sito in locale per provarlo (live reload) |
| `npm run build` | crea la versione di produzione in `dist/` (con ottimizzazione foto) |
| `npm run preview` | prova la versione di produzione in locale |
| `npm run optimize-images` | comprime/ridimensiona tutte le foto in `public/images/` |
| `npm run build-favicons` | rigenera i 3 favicon partendo da `public/logo.png` |

---

## 14. Cheatsheet — le 5 cose che farai sempre

```
# 1. Aggiungi una scena nuova
- copia scene-N.png e scene-N-mobile.png in public/images/scenes/
- aggiungi un blocco in src/data/scenes.js
- git add . && git commit -m "scena N" && git push

# 2. Aggiungi foto a un prodotto (carosello)
- metti 2.jpg, 3.jpg in public/images/products/<nome>/
- in src/data/products.js, aumenta "count"
- git push

# 3. Posiziona hotspot
- apri il sito col link "...?#santa-edit"
- premi E, scegli prodotto, clicca, copia, incolla in scenes.js
- git push

# 4. Cambia email o social
- edita src/data/site.js
- git push

# 5. Cambia il logo
- sostituisci public/logo.png
- npm run build-favicons
- git push
```

---

## 15. Stack tecnico (per chi un domani metterà mano al codice)

- **React 18** + **Vite 6** (build ultra rapido)
- **Tailwind CSS 3** (utility classes per stile)
- **Framer Motion 11** (animazioni e transizioni scene/modal)
- **Sharp** (ottimizzazione immagini al build)
- Icone: SVG inline in `src/components/icons.jsx` (niente librerie CDN)
- Hosting: **Netlify**, deploy automatico via GitHub
