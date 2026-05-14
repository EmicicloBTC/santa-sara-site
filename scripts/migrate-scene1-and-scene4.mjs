#!/usr/bin/env node
/**
 * Script di migrazione intro scena 1:
 * 1) Ripristina da git HEAD le vecchie immagini della scena 1 (terrazza) come
 *    scene-4.png / scene-4-mobile.png (la scena 4 nel sito è solo statica, senza video).
 * 2) Processa i NUOVI scene-1.mp4 / scene-1-mobile.mp4 nella working tree:
 *    reverse, H.264, estrae ultimo frame → scene-1.png / scene-1-mobile.png,
 *    primo frame → poster JPG.
 *
 * Richiede: git, ffmpeg nel PATH.
 */
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function gitShow(gitPath) {
  const p = gitPath.replace(/\\/g, "/");
  return execFileSync("git", ["show", `HEAD:${p}`], {
    cwd: ROOT,
    maxBuffer: 200 * 1024 * 1024,
  });
}

function writeIfGitHas(gitPath, absOut) {
  try {
    const buf = gitShow(gitPath);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });
    fs.writeFileSync(absOut, buf);
    console.log(`[migrate] HEAD:${gitPath} → ${path.relative(ROOT, absOut)} (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (e) {
    console.warn(`[migrate] skip (non in HEAD?): ${gitPath} — ${e.message}`);
    return false;
  }
}

function runFfmpeg(args) {
  const r = spawnSync("ffmpeg", args, { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function processIntroVideo({ inputMp4, outMp4, outPng, outPoster }) {
  const tmpRev = `${outMp4}.reversed.tmp.mp4`;
  runFfmpeg([
    "-y",
    "-i",
    inputMp4,
    "-vf",
    "reverse",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    tmpRev,
  ]);
  fs.renameSync(tmpRev, outMp4);

  runFfmpeg(["-y", "-sseof", "-0.05", "-i", outMp4, "-frames:v", "1", "-update", "1", "-q:v", "2", outPng]);
  runFfmpeg(["-y", "-i", outMp4, "-frames:v", "1", "-update", "1", "-q:v", "2", outPoster]);
}

// --- 1) Vecchia scena 1 → immagini scena 4 (solo statiche; niente video in scena 4)
const pairs = [
  ["public/images/scenes/scene-1.png", "public/images/scenes/scene-4.png"],
  ["public/images/scenes/scene-1-mobile.png", "public/images/scenes/scene-4-mobile.png"],
];

for (const [from, to] of pairs) {
  writeIfGitHas(from, path.join(ROOT, to));
}

// --- 2) Salva raw nuovi video prima di sovrascrivere (copia da working tree attuale)
const rawDesktop = path.join(ROOT, "public/videos/_raw-new-scene-1-desktop.mp4");
const rawMobile = path.join(ROOT, "public/videos/_raw-new-scene-1-mobile.mp4");
fs.copyFileSync(path.join(ROOT, "public/videos/scene-1.mp4"), rawDesktop);
fs.copyFileSync(path.join(ROOT, "public/videos/scene-1-mobile.mp4"), rawMobile);
console.log("[migrate] backup raw nuovi video → _raw-new-scene-1-*.mp4");

// --- 3) Processa nuovi intro (sovrascrive scene-1.mp4 nella cartella public)
processIntroVideo({
  inputMp4: rawDesktop,
  outMp4: path.join(ROOT, "public/videos/scene-1.mp4"),
  outPng: path.join(ROOT, "public/images/scenes/scene-1.png"),
  outPoster: path.join(ROOT, "public/videos/scene-1-poster.jpg"),
});
processIntroVideo({
  inputMp4: rawMobile,
  outMp4: path.join(ROOT, "public/videos/scene-1-mobile.mp4"),
  outPng: path.join(ROOT, "public/images/scenes/scene-1-mobile.png"),
  outPoster: path.join(ROOT, "public/videos/scene-1-mobile-poster.jpg"),
});

console.log("[migrate] Fatto: immagini scena 4 da HEAD vecchia scena 1; nuova scena 1 video+png+poster.");

// Rimuovi backup raw locali (non vanno in repo)
for (const f of [rawDesktop, rawMobile]) {
  try {
    fs.unlinkSync(f);
  } catch {
    /* */
  }
}
