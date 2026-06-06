#!/usr/bin/env node
/**
 * Pagine statiche /share/product/* e /share/scene/* con meta Open Graph corretti.
 * I crawler social (WhatsApp, iMessage, Facebook…) non eseguono JavaScript:
 * leggono queste pagine invece della SPA con ?product= / ?scene=.
 *
 * Per le scene generiamo anche JPEG 1200×630 leggeri: i PNG fullscreen (500–700 KB)
 * spesso non compaiono in WhatsApp, che preferisce JPG sotto ~300 KB.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { products, productCover } from "../src/data/products.js";
import { scenes } from "../src/data/scenes.js";
import { site } from "../src/data/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SHARE_ROOT = path.join(ROOT, "public", "share");
const SITE = "https://santa-sara.com";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
/** Limite prudente per anteprime WhatsApp / Telegram. */
const OG_MAX_BYTES = 280 * 1024;

function absUrl(relative) {
  return `${SITE}${relative.startsWith("/") ? relative : `/${relative}`}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(text, max = 200) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function imageMime(imagePath) {
  if (/\.png$/i.test(imagePath)) return "image/png";
  if (/\.jpe?g$/i.test(imagePath)) return "image/jpeg";
  return "image/jpeg";
}

function getProductFocusImage(scene) {
  const product = products[scene.productId];
  if (!product) return "";
  const images = productImagesList(product);
  if (!images.length) return "";
  const idx = Math.max(0, (scene.productImageIndex ?? 1) - 1);
  return images[idx] ?? images[0];
}

function productImagesList(product) {
  if (!product?.images) return [];
  const { slug, count, ext } = product.images;
  const safeExt = ext.startsWith(".") ? ext.slice(1) : ext;
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.${safeExt}`);
}

function sceneShareMeta(scene) {
  if (scene.type === "productFocus" && scene.productId) {
    const product = products[scene.productId];
    if (product) {
      return {
        title: `${product.title} — ${site.name}`,
        description: truncate(product.description),
        image: getProductFocusImage(scene) || productCover(product) || "/og-image.jpg",
        imageAlt: `${product.title} — ceramica decorata a mano`,
      };
    }
  }
  return {
    title: `${scene.title} — ${site.name}`,
    description: truncate(scene.alt),
    image: scene.image || "/og-image.jpg",
    imageAlt: truncate(scene.alt, 120),
  };
}

/**
 * JPEG 1200×630 da una foto sorgente (scena o prodotto focus).
 * @returns {{ path: string, width?: number, height?: number, type: string }}
 */
async function buildSceneOgImage(sceneId, sourceRelative) {
  const fallback = {
    path: sourceRelative,
    type: imageMime(sourceRelative),
  };
  if (!sourceRelative?.startsWith("/")) return fallback;

  const inputPath = path.join(ROOT, "public", sourceRelative.replace(/^\//, ""));
  try {
    await fs.access(inputPath);
  } catch {
    console.warn(`[generate-share-pages] ! sorgente assente per ${sceneId}: ${sourceRelative}`);
    return fallback;
  }

  const outRelative = `/share/og/scenes/${sceneId}.jpg`;
  const outPath = path.join(ROOT, "public", outRelative.replace(/^\//, ""));
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  const inputBuf = await fs.readFile(inputPath);
  let outBuf = null;

  for (const quality of [82, 74, 66, 58, 50]) {
    outBuf = await sharp(inputBuf, { failOn: "none" })
      .rotate()
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (outBuf.length <= OG_MAX_BYTES) break;
  }

  await fs.writeFile(outPath, outBuf);
  const kb = (outBuf.length / 1024).toFixed(0);
  console.log(`[generate-share-pages] og ${sceneId}: ${kb} KB → ${outRelative}`);

  return {
    path: outRelative,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    type: "image/jpeg",
  };
}

function buildRedirectScript(appParams) {
  const entries = Object.entries(appParams)
    .map(([k, v]) => `d.searchParams.set(${JSON.stringify(k)}, ${JSON.stringify(v)});`)
    .join("\n      ");
  return `(function () {
    var d = new URL(${JSON.stringify(`${SITE}/`)});
    ${entries}
    var lang = new URLSearchParams(location.search).get("lang");
    if (lang === "en") d.searchParams.set("lang", "en");
    location.replace(d.toString());
  })();`;
}

function buildSharePage({
  title,
  description,
  imagePath,
  imageWidth,
  imageHeight,
  imageType,
  sharePath,
  imageAlt,
  appParams,
  linkLabel,
}) {
  const imageUrl = absUrl(imagePath);
  const pageUrl = absUrl(sharePath);
  const redirectScript = buildRedirectScript(appParams);
  const dest = new URL(`${SITE}/`);
  for (const [k, v] of Object.entries(appParams)) dest.searchParams.set(k, v);
  const mime = imageType || imageMime(imagePath);
  const dimTags =
    imageWidth && imageHeight
      ? `\n    <meta property="og:image:width" content="${imageWidth}" />\n    <meta property="og:image:height" content="${imageHeight}" />`
      : "";

  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(dest.toString())}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:type" content="${mime}" />${dimTags}
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
  </head>
  <body>
    <p><a href="${escapeHtml(dest.toString())}">${escapeHtml(linkLabel)}</a></p>
    <script>${redirectScript}</script>
  </body>
</html>
`;
}

async function writeSharePage(dir, filename, html) {
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), html);
}

async function main() {
  await fs.rm(SHARE_ROOT, { recursive: true, force: true });

  let productCount = 0;
  let sceneCount = 0;

  for (const product of Object.values(products)) {
    const cover = productCover(product) || "/og-image.jpg";
    const sharePath = `/share/product/${product.id}/`;
    const html = buildSharePage({
      title: `${product.title} — ${site.name}`,
      description: truncate(`${product.kind}. ${product.description} ${product.price}.`),
      imagePath: cover,
      sharePath,
      imageAlt: `${product.title} — ${product.kind}`,
      appParams: { product: product.id },
      linkLabel: `Apri ${product.title} su ${site.name}`,
    });
    await writeSharePage(path.join(SHARE_ROOT, "product", product.id), "index.html", html);
    productCount++;
  }

  for (const scene of scenes) {
    const meta = sceneShareMeta(scene);
    const og = await buildSceneOgImage(scene.id, meta.image);
    const sharePath = `/share/scene/${scene.id}/`;
    const html = buildSharePage({
      title: meta.title,
      description: meta.description,
      imagePath: og.path,
      imageWidth: og.width,
      imageHeight: og.height,
      imageType: og.type,
      sharePath,
      imageAlt: meta.imageAlt,
      appParams: { scene: scene.id },
      linkLabel: `Apri ${scene.title} su ${site.name}`,
    });
    await writeSharePage(path.join(SHARE_ROOT, "scene", scene.id), "index.html", html);
    sceneCount++;
  }

  console.log(
    `[generate-share-pages] ${productCount} prodotti, ${sceneCount} scene → public/share/`,
  );
}

main().catch((err) => {
  console.error("[generate-share-pages]", err);
  process.exit(1);
});
