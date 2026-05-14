#!/usr/bin/env node
/**
 * Ricomprime i video intro delle scene (public/videos/scene-*.mp4) per alleggerire
 * il sito: scala la risoluzione massima e usa H.264 CRF più alto del default "master".
 *
 * Richiede ffmpeg nel PATH. Non tocca file che non matchano scene-*.mp4.
 * Sostituisce il file solo se l'output è più piccolo (o quasi uguale entro 1%).
 *
 * Uso: npm run optimize-videos
 */
import { readdirSync, statSync, unlinkSync, renameSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VIDEOS = path.join(ROOT, "public", "videos");

function isSceneMp4(name) {
  return /^scene-.+\.mp4$/i.test(name) && !name.includes(".tmp");
}

function maxWidthFor(name) {
  return /-mobile\.mp4$/i.test(name) ? 960 : 1600;
}

function runFfmpeg(args) {
  const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
  return r.status === 0;
}

function fmtMB(n) {
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

let done = 0;
let skipped = 0;

for (const name of readdirSync(VIDEOS)) {
  if (!isSceneMp4(name)) continue;
  const input = path.join(VIDEOS, name);
  const tmp = path.join(VIDEOS, `${name}.opt.tmp.mp4`);
  const maxW = maxWidthFor(name);
  const vf = `scale=min(${maxW}\\,iw):-2:flags=lanczos`;

  const before = statSync(input).size;
  const ok = runFfmpeg([
    "-y",
    "-i",
    input,
    "-an",
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "28",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    tmp,
  ]);
  if (!ok) {
    try {
      unlinkSync(tmp);
    } catch {
      /* */
    }
    console.warn(`[optimize-videos] ! fallito: ${name}`);
    continue;
  }
  const after = statSync(tmp).size;
  if (after <= before * 1.01) {
    renameSync(tmp, input);
    console.log(`[optimize-videos] ↓ ${name}: ${fmtMB(before)} → ${fmtMB(after)}`);
    done++;
  } else {
    unlinkSync(tmp);
    console.log(`[optimize-videos] · ${name}: output più grande, lascio originale (${fmtMB(before)})`);
    skipped++;
  }
}

if (done === 0 && skipped === 0) {
  console.log("[optimize-videos] Nessun scene-*.mp4 trovato in public/videos.");
} else {
  console.log(`[optimize-videos] Fatto: ${done} file aggiornati, ${skipped} lasciati invariati.`);
}
