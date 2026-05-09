# Santa Sara — sito React/Vite

Shop / galleria per ceramiche ornamentali decorate a mano (Santa Sara). Stack: React, Vite, Tailwind CSS, Framer Motion, deploy consigliato su Netlify.

## Avvio locale

```bash
npm install
npm run dev
```

Apri l’URL mostrato nel terminale (di solito `http://localhost:5173`).

**Windows (senza terminale):** doppio clic su `AVVIA-SITO.bat` per l’anteprima; su `CREA-PER-NETLIFY.bat` per rigenerare la cartella `dist` e aprirla in Esplora file. Dettagli in `GUIDA-RAPIDA.txt`.

## Build di produzione

```bash
npm run build
npm run preview
```

## Deploy su Netlify

Guida dettagliata in **`NETLIFY-PASSO-PASSO.txt`** (trascina `dist` oppure script).

- **Trascina cartella:** `CREA-PER-NETLIFY.bat` → carica la cartella `dist` su Netlify (Deploy manually).
- **Da terminale:** dopo `ACCEDI-NETLIFY.bat` e una volta `COLLEGA-SITO-UNAVOLTA.bat`, usa `DEPLOY-NETLIFY.bat` oppure `npm run deploy:netlify`.

Impostazioni Netlify (se colleghi Git): **Build command** `npm run build`, **Publish directory** `dist`. Il file `netlify.toml` nel repo allinea già build e `dist`.

## Struttura del codice

- `src/data/products.js` — elenco opere (`works`), categorie (`families`).
- `src/components/` — icone SVG inline, `CeramicVisual`, card shop, marquee, rumore texture.
- `src/pages/HomePage.jsx` — homepage (manifesto, shop, opera selezionata, processo, atelier, newsletter, footer).
- `src/App.jsx` — entry della UI (monta `HomePage`).
- `public/images/` — qui vanno le foto reali dei pezzi.

## Immagini prodotti

In `src/data/products.js`, ogni opera ha un campo opzionale `photo`:

- Percorso pubblico da root, es. `"/images/florence.jpg"`.
- Se `photo` è vuoto o assente, viene usato il visual astratto generato dai colori della scheda.

Aggiungi i file in:

```text
public/images/nome-file.jpg
```

Poi nel prodotto:

```js
photo: "/images/florence.jpg",
```

## Note

- Non si usano librerie di icone esterne: solo SVG inline in `src/components/icons.jsx`.
- Per integrazioni future (es. Supabase per catalogo e immagini), i dati sono già separati in `src/data/products.js`.
