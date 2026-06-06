const preloadedUrls = new Set();

/** Precarica un URL senza attendere (cache HTTP). Idempotente. */
export function preloadUrl(url) {
  if (!url || typeof window === "undefined" || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

/** Precarica più URL in background. */
export function preloadUrls(urls) {
  for (const url of urls) preloadUrl(url);
}

/**
 * Carica e decodifica un'immagine. Risolve quando è pronta per il paint.
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(url) {
  if (!url || typeof window === "undefined") {
    return Promise.reject(new Error("no url"));
  }
  preloadUrl(url);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    img.onerror = () => reject(new Error(`failed: ${url}`));
    img.src = url;
  });
}

/**
 * Attende il caricamento di tutte le URL (errori ignorati) oppure un timeout.
 * Utile per rivelare un blocco di immagini in modo uniforme.
 */
export async function preloadAll(urls, { timeoutMs = 2800 } = {}) {
  const unique = [...new Set(urls.filter(Boolean))];
  if (!unique.length) return;

  const loads = unique.map((url) => loadImage(url).catch(() => null));
  await Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, timeoutMs))]);
}
