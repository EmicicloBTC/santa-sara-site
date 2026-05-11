#!/usr/bin/env node
/**
 * One-off: rimuove il watermark "Gemini" (stellina ✦) in basso a destra
 * dalle scene 5 (desktop + mobile).
 *
 * Strategia: estrae un riquadro di legno "pulito" preso poco a sinistra
 * del watermark, lo sfuma sui bordi (alpha gradient via SVG mask) e lo
 * compone sopra l'area incriminata. Il risultato si fonde col legno
 * circostante senza una cucitura visibile.
 *
 * Uso:
 *   node scripts/remove-watermark.js          (anteprima → public/images/scenes/*-clean.png)
 *   node scripts/remove-watermark.js --apply  (sovrascrive i file originali)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SCENES = path.join(ROOT, "public", "images", "scenes");

const APPLY = process.argv.includes("--apply");

/**
 * Per ogni scena specifico una toppa "cieca" (90×90, hard edge) centrata
 * sopra il watermark, e una toppa esterna (110×110, feather morbido) che
 * sfuma il bordo. Le due passate si fanno una dopo l'altra: prima la
 * esterna sfumata, poi quella secca al centro, garantita coprire il logo.
 */
const jobs = [
  {
    name: "scene-5.png",
    // watermark Gemini ✦ in basso a destra, sul cassetto inferiore.
    // Centro stellina: (1320, 705) — image 1376×768
    inner: { left: 1280, top: 665, width: 80, height: 80 },        // hard
    outer: { left: 1270, top: 660, width: 100, height: 100 },      // feather
    // sorgente: stesso cassetto, a sinistra del watermark, sotto il manico in ottone
    sourceShift: { dx: -140, dy: 0 },
  },
  {
    name: "scene-5-mobile.png",
    // watermark Gemini ✦ sul fronte del cassetto inferiore, vicino al bordo destro
    // Centro stellina: (680, 1325) — image 768×1376
    inner: { left: 640, top: 1285, width: 80, height: 80 },
    outer: { left: 630, top: 1275, width: 100, height: 100 },
    // sorgente: stesso fronte cassetto, ben a sinistra del watermark
    sourceShift: { dx: -180, dy: 0 },
  },
];

function featherMask(w, h, featherPct) {
  const svg = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="${100 - featherPct}%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`;
  return Buffer.from(svg);
}

async function extractPatch(srcPath, area, opts = {}) {
  const buf = await sharp(srcPath).extract(area).toBuffer();
  if (!opts.feather) return buf;
  const mask = featherMask(area.width, area.height, opts.feather);
  return sharp(buf).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function processOne(job) {
  const src = path.join(SCENES, job.name);
  const finalOut = APPLY ? src : path.join(SCENES, job.name.replace(/\.png$/i, "-clean.png"));
  const tmpOut = path.join(SCENES, `.tmp-${job.name}`);

  const meta = await sharp(src).metadata();

  const outerSrc = {
    left: job.outer.left + job.sourceShift.dx,
    top: job.outer.top + job.sourceShift.dy,
    width: job.outer.width,
    height: job.outer.height,
  };
  const innerSrc = {
    left: job.inner.left + job.sourceShift.dx,
    top: job.inner.top + job.sourceShift.dy,
    width: job.inner.width,
    height: job.inner.height,
  };

  const outerPatch = await extractPatch(src, outerSrc, { feather: 30 });
  const innerPatch = await extractPatch(src, innerSrc); // hard edge

  await sharp(src)
    .composite([
      { input: outerPatch, left: job.outer.left, top: job.outer.top },
      { input: innerPatch, left: job.inner.left, top: job.inner.top },
    ])
    .png({ quality: 92 })
    .toFile(tmpOut);

  // sostituisco l'originale solo a fine elaborazione (atomico-ish)
  await fs.rm(finalOut, { force: true });
  await fs.rename(tmpOut, finalOut);

  console.log(`✓ ${path.relative(ROOT, finalOut)}  (${meta.width}×${meta.height})`);
}

async function main() {
  if (APPLY) console.log("Mode: APPLY (sovrascrivo gli originali)");
  else console.log("Mode: PREVIEW (output in *-clean.png)");

  for (const job of jobs) {
    try {
      await processOne(job);
    } catch (e) {
      console.error(`✗ ${job.name}: ${e.message}`);
      process.exitCode = 1;
    }
  }
}

main();
