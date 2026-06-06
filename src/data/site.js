/**
 * Configurazione globale del sito Santa Sara.
 * Cambia qui email e link social: vengono usati ovunque (header, footer,
 * modal bio, mailto delle CTA prodotto…).
 *
 * EMAIL PUBBLICA vs INOLTRO
 * -------------------------
 * Sul sito compare e si usa sempre `hello@santasara.com` (mailto, bio, menu).
 * Le risposte devono arrivare alla casella reale configurando l'inoltro sul
 * dominio santasara.com (ImprovMX o simile) — istruzioni in GUIDA-RAPIDA.txt.
 */
export const site = {
  name: "Santa Sara",
  email: "hello@santasara.com",
  social: {
    instagram: {
      label: "Instagram",
      url: "https://www.instagram.com/santasara_ceramic/",
      handle: "@santasara_ceramic",
    },
    tiktok: {
      label: "TikTok",
      url: "https://www.tiktok.com/@santasara_ceramic",
      handle: "@santasara_ceramic",
    },
    etsy: {
      label: "Etsy",
      url: "https://www.etsy.com/shop/santasaraceramic/",
      handle: "santasaraceramic",
    },
  },
};

/** Link mailto coerente con l'email pubblica del sito. */
export function mailtoLink(subject) {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.email}${q}`;
}
