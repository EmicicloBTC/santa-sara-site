#!/usr/bin/env node
/**
 * Ottimizzazione automatica delle immagini in public/images/.
 *
 * - Ridimensiona se la dimensione massima supera MAX_DIM
 * - Ricomprime PNG (palette) e JPG (mozjpeg)
 * - Sovrascrive il file solo se l'output è effettivamente più piccolo
 * - Tiene traccia dei file già processati in .image-cache.json
 *   (basato su size+mtime) così le build successive sono no-op
 * - Dopo l'ottimizzazione, controlla orientamento e risoluzione minima delle
 *   immagini in public/images/scenes/ (solo scene-NN.png / scene-NN-mobile.png)
 *
 * Uso:
 *   npm run optimize-images   (manuale)
 *   npm run build              (parte in automatico via prebuild)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(ROOT, ".image-cache.json");

// px sul lato più lungo. Per le immagini "mobile" (filename contiene -mobile)
// abbassiamo: i telefoni non hanno mai bisogno di più di 1300 px.
const MAX_DIM_DEFAULT = 1800;
const MAX_DIM_MOBILE = 1300;
/** Limite più basso solo per le scene (sfondi fullscreen): meno peso, restano nitide su schermo. */
const MAX_DIM_SCENES = 1500;
const MAX_DIM_SCENES_MOBILE = 1000;
const JPG_QUALITY = 78;
const PNG_QUALITY = 75;
/** Palette PNG un filo più aggressiva sulle scene. */
const PNG_QUALITY_SCENES = 68;

/**
 * Bump quando cambiano i limiti sulle scene: così la cache non salta
 * le PNG in public/images/scenes/ che andrebbero riprocessate.
 */
const SCENE_IMAGE_RULES = 2;

function maxDimFor(rel) {
  const normalized = rel.replace(/\\/g, "/");
  const mobile = /-mobile\.(png|jpe?g)$/i.test(normalized);
  if (normalized.includes("public/images/scenes/")) {
    return mobile ? MAX_DIM_SCENES_MOBILE : MAX_DIM_SCENES;
  }
  return mobile ? MAX_DIM_MOBILE : MAX_DIM_DEFAULT;
}

function pngQualityFor(rel) {
  const normalized = rel.replace(/\\/g, "/");
  return normalized.includes("public/images/scenes/") ? PNG_QUALITY_SCENES : PNG_QUALITY;
}

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return ext === ".png" || ext === ".jpg" || ext === ".jpeg";
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

const SCENES_DIR = path.join(IMAGES_DIR, "scenes");
/** Lato lungo minimo consigliato (px) dopo lettura file — avviso, non errore. */
const MIN_LONG_EDGE_SCENE_DESKTOP = 1000;
const MIN_LONG_EDGE_SCENE_MOBILE = 900;

/**
 * Verifica orientamento e risoluzione minima delle scene (desktop = orizzontale,
 * mobile = verticale). Stampa avvisi in console così ogni build / optimize
 * segnala subito PNG/JPG incoerenti.
 * Solo file `scene-<numero>.png` e `scene-<numero>-mobile.png` (es. scene-3.png).
 */
async function validateSceneDimensions() {
  try {
    await fs.access(SCENES_DIR);
  } catch {
    return;
  }

  for await (const file of walk(SCENES_DIR)) {
    if (!isImage(file)) continue;
    const rel = path.relative(ROOT, file).replaceAll("\\", "/");
    const base = path.basename(file);
    if (!/^scene-\d+(-mobile)?\.(png|jpe?g)$/i.test(base)) continue;

    const mobile = /-mobile\.(png|jpe?g)$/i.test(base);

    let meta;
    try {
      const buf = await fs.readFile(file);
      meta = await sharp(buf, { failOn: "none" }).rotate().metadata();
    } catch (err) {
      console.warn(`[optimize-images] ⚠ ${rel}: impossibile leggere le dimensioni (${err.message})`);
      continue;
    }

    const w = meta.width || 0;
    const h = meta.height || 0;
    if (!w || !h) continue;

    const longest = Math.max(w, h);

    if (mobile) {
      if (w >= h) {
        console.warn(
          `[optimize-images] ⚠ ${rel}: mobile atteso in VERTICALE (altezza > larghezza). Risultato: ${w}×${h}px.`,
        );
      }
      if (longest < MIN_LONG_EDGE_SCENE_MOBILE) {
        console.warn(
          `[optimize-images] ⚠ ${rel}: lato lungo ${longest}px < ${MIN_LONG_EDGE_SCENE_MOBILE}px consigliati per fullscreen nitida su telefono.`,
        );
      }
    } else {
      if (h >= w) {
        console.warn(
          `[optimize-images] ⚠ ${rel}: desktop atteso in ORIZZONTALE (larghezza > altezza). Risultato: ${w}×${h}px.`,
        );
      }
      if (longest < MIN_LONG_EDGE_SCENE_DESKTOP) {
        console.warn(
          `[optimize-images] ⚠ ${rel}: lato lungo ${longest}px < ${MIN_LONG_EDGE_SCENE_DESKTOP}px consigliati per fullscreen nitida.`,
        );
      }
    }
  }
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

function signature(stat) {
  return `${stat.size}-${Math.round(stat.mtimeMs)}`;
}

async function optimize(file, manifest) {
  const stat = await fs.stat(file);
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  const sig = signature(stat);
  if (manifest[rel] === sig) return { rel, skipped: true };

  const buf = await fs.readFile(file);
  const ext = path.extname(file).toLowerCase();

  // .rotate() (senza argomenti) applica la rotazione indicata dall'EXIF e
  // poi rimuove il tag: indispensabile per foto di smartphone, altrimenti
  // sharp strip-pa l'EXIF SENZA ruotare i pixel e l'immagine finisce
  // coricata (vedi commit cronologia).
  let pipeline = sharp(buf, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const maxDim = maxDimFor(rel);
  if (longest > maxDim) {
    pipeline = pipeline.resize({
      width: (meta.width || 0) >= (meta.height || 0) ? maxDim : null,
      height: (meta.height || 0) > (meta.width || 0) ? maxDim : null,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let out;
  if (ext === ".png") {
    const q = pngQualityFor(rel);
    out = await pipeline
      .png({ palette: true, quality: q, compressionLevel: 9 })
      .toBuffer();
  } else {
    out = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();
  }

  if (out.length < buf.length) {
    await fs.writeFile(file, out);
    const newStat = await fs.stat(file);
    manifest[rel] = signature(newStat);
    return { rel, before: buf.length, after: out.length };
  }
  manifest[rel] = sig;
  return { rel, before: buf.length, after: buf.length, noGain: true };
}

async function main() {
  try {
    await fs.access(IMAGES_DIR);
  } catch {
    console.log("[optimize-images] Cartella public/images non trovata, skip.");
    return;
  }

  const manifest = await loadManifest();
  if (manifest.__sceneImageRules !== SCENE_IMAGE_RULES) {
    for (const k of Object.keys(manifest)) {
      if (k.startsWith("public/images/scenes/")) delete manifest[k];
    }
    manifest.__sceneImageRules = SCENE_IMAGE_RULES;
    console.log(
      "[optimize-images] Regole scene aggiornate: ricalcolo PNG in public/images/scenes/ (max px + qualità).",
    );
  }
  let optimized = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for await (const file of walk(IMAGES_DIR)) {
    if (!isImage(file)) continue;
    try {
      const r = await optimize(file, manifest);
      if (r.skipped) {
        skipped++;
        continue;
      }
      totalBefore += r.before;
      totalAfter += r.after;
      optimized++;
      const tag = r.noGain ? "·" : "↓";
      console.log(`[optimize-images] ${tag} ${r.rel}: ${fmtKB(r.before)} → ${fmtKB(r.after)}`);
    } catch (err) {
      console.warn(`[optimize-images] ! ${file}: ${err.message}`);
    }
  }

  await saveManifest(manifest);

  await validateSceneDimensions();

  if (optimized > 0) {
    const saved = totalBefore - totalAfter;
    console.log(
      `[optimize-images] Fatto: ${optimized} immagini ottimizzate, ${skipped} già a posto. Risparmiati ${fmtKB(saved)} su ${fmtKB(totalBefore)}.`,
    );
  } else {
    console.log(`[optimize-images] Tutte le ${skipped} immagini sono già ottimizzate.`);
  }
}

main().catch((err) => {
  console.error("[optimize-images] errore:", err);
  process.exit(1);
});
