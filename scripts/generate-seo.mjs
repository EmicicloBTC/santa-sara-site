#!/usr/bin/env node
/**
 * Genera JSON-LD, sitemap e contenuto noscript per i motori di ricerca.
 * Legge products.js e site.js — eseguito automaticamente prima di ogni build.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products, productCover } from "../src/data/products.js";
import { site } from "../src/data/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://santa-sara.com";
const TODAY = new Date().toISOString().slice(0, 10);

function absUrl(relative) {
  return `${SITE}${relative.startsWith("/") ? relative : `/${relative}`}`;
}

function parsePrice(price) {
  if (!price || /richiesta/i.test(price)) return null;
  const m = price.replace(/\./g, "").match(/(\d+)/);
  return m ? m[1] : null;
}

function productOffer(product) {
  const price = parsePrice(product.price);
  const offer = {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability:
      product.sold === true
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    url: product.ctaHref?.startsWith("http") ? product.ctaHref : absUrl("/"),
  };
  if (price) offer.price = price;
  return offer;
}

function buildStructuredData() {
  const sameAs = Object.values(site.social).map((s) => s.url);
  const productList = Object.values(products);

  const productNodes = productList.map((p) => {
    const cover = productCover(p);
    const node = {
      "@type": "Product",
      "@id": `${SITE}/#product-${p.id}`,
      name: p.title,
      description: p.description,
      category: p.category || "Ceramica",
      brand: { "@id": `${SITE}/#organization` },
      manufacturer: { "@id": `${SITE}/#organization` },
      offers: productOffer(p),
    };
    if (cover) node.image = absUrl(cover);
    return node;
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: site.name,
        url: `${SITE}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/apple-touch-icon.png`,
          width: 180,
          height: 180,
        },
        image: `${SITE}/og-image.jpg`,
        description:
          "Ceramica d'autore italiana decorata a mano. Vasi, piatti e oggetti d'arredo unici, dipinti uno per uno in atelier.",
        email: site.email,
        address: { "@type": "PostalAddress", addressCountry: "IT" },
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          availableLanguage: ["Italian", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: site.name,
        description: "Ceramiche d'autore, dipinte a mano in Italia.",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: ["it-IT", "en-US"],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: `${SITE}/`,
        name: "Santa Sara — Ceramiche d'autore, dipinte a mano in Italia",
        description:
          "Santa Sara: ceramica d'autore italiana decorata a mano. Vasi, piatti, palle natalizie e oggetti d'arredo unici.",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        inLanguage: "it-IT",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE}/#catalog`,
        name: "Catalogo Santa Sara",
        numberOfItems: productList.length,
        itemListElement: productList.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@id": `${SITE}/#product-${p.id}` },
        })),
      },
      ...productNodes,
    ],
  };
}

function buildNoscript() {
  const lines = productListGrouped();
  return `<noscript>
  <article>
    <h1>Santa Sara — Ceramiche d'autore, dipinte a mano in Italia</h1>
    <p>
      Ceramiche ornamentali decorate a mano. Ogni pezzo è unico, dipinto in atelier:
      forma classica, segno contemporaneo. Vasi, piatti, palle natalizie e oggetti d'arredo.
    </p>
    <p>Contatti: <a href="mailto:${site.email}">${site.email}</a></p>
    <h2>Catalogo</h2>
    ${lines}
  </article>
</noscript>`;
}

function productListGrouped() {
  const byCat = new Map();
  for (const p of Object.values(products)) {
    const cat = p.category || "Altro";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(p);
  }
  return [...byCat.entries()]
    .map(([cat, items]) => {
      const lis = items
        .map(
          (p) =>
            `<li><strong>${escapeHtml(p.title)}</strong> — ${escapeHtml(p.kind)}. ${escapeHtml(p.description)} ${escapeHtml(p.price)}.</li>`
        )
        .join("\n      ");
      return `<h3>${escapeHtml(cat)}</h3>\n    <ul>\n      ${lis}\n    </ul>`;
    })
    .join("\n    ");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSitemap() {
  const images = [
    { loc: `${SITE}/og-image.jpg`, title: "Santa Sara — Ceramiche d'autore", caption: "Terrazza con cachepot Visionari II e vaso Kentucky '73." },
    ...Object.values(products)
      .map((p) => {
        const cover = productCover(p);
        if (!cover) return null;
        return {
          loc: absUrl(cover),
          title: `${p.title} — Santa Sara`,
          caption: p.description.slice(0, 200),
        };
      })
      .filter(Boolean),
  ];

  const imageXml = images
    .map(
      (img) => `    <image:image>
      <image:loc>${escapeHtml(img.loc)}</image:loc>
      <image:title>${escapeHtml(img.title)}</image:title>
      <image:caption>${escapeHtml(img.caption)}</image:caption>
    </image:image>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Generato da scripts/generate-seo.mjs — ${TODAY} -->
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="${SITE}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />
${imageXml}
  </url>

</urlset>
`;
}

function replaceBlock(html, startMarker, endMarker, content) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Marker SEO mancante: ${startMarker}`);
  }
  return `${html.slice(0, start + startMarker.length)}\n${content}\n    ${html.slice(end)}`;
}

async function main() {
  const jsonLd = JSON.stringify(buildStructuredData(), null, 2).replace(/<\//g, "<\\/");
  const noscript = buildNoscript();
  const sitemap = buildSitemap();

  const indexPath = path.join(ROOT, "index.html");
  let indexHtml = await fs.readFile(indexPath, "utf8");
  indexHtml = replaceBlock(indexHtml, "<!-- @seo:jsonld -->", "<!-- @seo:jsonld-end -->", jsonLd);
  indexHtml = replaceBlock(indexHtml, "<!-- @seo:noscript -->", "<!-- @seo:noscript-end -->", noscript);
  await fs.writeFile(indexPath, indexHtml);

  await fs.writeFile(path.join(ROOT, "public", "sitemap.xml"), sitemap);

  const count = Object.keys(products).length;
  console.log(`[generate-seo] JSON-LD (${count} prodotti), sitemap e noscript aggiornati (${TODAY}).`);
}

main().catch((err) => {
  console.error("[generate-seo]", err);
  process.exit(1);
});
