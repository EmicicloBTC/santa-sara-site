#!/usr/bin/env node
/**
 * Genera le varie dimensioni di favicon e icone partendo da public/logo.png.
 *
 * Output:
 *   public/favicon-32.png      (browser tab classico)
 *   public/favicon-16.png      (fallback piccolo)
 *   public/apple-touch-icon.png (iOS home screen, 180x180)
 *
 * Uso:
 *   npm run build-favicons
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "logo.png");
const OUT_DIR = path.join(ROOT, "public");

const TARGETS = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function main() {
  try {
    await fs.access(SRC);
  } catch {
    console.error(`[build-favicons] Manca ${SRC}. Metti il logo in public/logo.png e riprova.`);
    process.exit(1);
  }

  const buf = await fs.readFile(SRC);
  for (const t of TARGETS) {
    const out = await sharp(buf)
      .resize(t.size, t.size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(OUT_DIR, t.name), out);
    console.log(`[build-favicons] ${t.name} (${t.size}x${t.size}) ✓`);
  }
}

main().catch((err) => {
  console.error("[build-favicons] errore:", err);
  process.exit(1);
});
