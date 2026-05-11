#!/usr/bin/env node
/**
 * Ottimizzazione automatica delle immagini in public/images/.
 *
 * - Ridimensiona se la dimensione massima supera MAX_DIM
 * - Ricomprime PNG (palette) e JPG (mozjpeg)
 * - Sovrascrive il file solo se l'output è effettivamente più piccolo
 * - Tiene traccia dei file già processati in .image-cache.json
 *   (basato su size+mtime) così le build successive sono no-op
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
const JPG_QUALITY = 78;
const PNG_QUALITY = 75;

function maxDimFor(file) {
  return /-mobile\.(png|jpe?g)$/i.test(file) ? MAX_DIM_MOBILE : MAX_DIM_DEFAULT;
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

  let pipeline = sharp(buf, { failOn: "none" });
  const meta = await pipeline.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const maxDim = maxDimFor(file);
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
    out = await pipeline
      .png({ palette: true, quality: PNG_QUALITY, compressionLevel: 9 })
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
