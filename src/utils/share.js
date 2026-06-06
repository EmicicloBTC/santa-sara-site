const SITE_ORIGIN = "https://santa-sara.com";

function getOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return SITE_ORIGIN;
}

export function getSiteShareUrl() {
  return `${getOrigin()}/`;
}

/** URL con anteprima OG dedicata → redirect alla SPA con modal prodotto. */
export function getProductShareUrl(productId, lang) {
  const url = new URL(`${getOrigin()}/share/product/${encodeURIComponent(productId)}/`);
  if (lang === "en") url.searchParams.set("lang", "en");
  return url.toString();
}

/** URL con anteprima OG dedicata → redirect alla SPA sulla scena. */
export function getSceneShareUrl(sceneId, lang) {
  const url = new URL(`${getOrigin()}/share/scene/${encodeURIComponent(sceneId)}/`);
  if (lang === "en") url.searchParams.set("lang", "en");
  return url.toString();
}

export function readProductIdFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("product");
}

export function readSceneIdFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("scene");
}

export function syncProductInUrl(productId, lang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (productId) url.searchParams.set("product", productId);
  else url.searchParams.delete("product");
  if (lang === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState(window.history.state, "", url);
}

/** Prima scena che contiene il prodotto (hotspot o focus). */
export function findSceneIndexForProduct(scenes, productId) {
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    if (s.productId === productId) return i;
    const hotspots = [...(s.hotspots || []), ...(s.hotspotsMobile || [])];
    if (hotspots.some((h) => h.productId === productId)) return i;
  }
  return 0;
}

export function findSceneIndexById(scenes, sceneId) {
  if (!sceneId) return -1;
  return scenes.findIndex((s) => s.id === sceneId);
}

export async function copyTextToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

/** Web Share API su mobile, altrimenti copia negli appunti. */
export async function shareOrCopy(url, { title, text } = {}) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ url, title, text: text || title });
      return "shared";
    } catch (err) {
      if (err?.name === "AbortError") return "aborted";
    }
  }
  await copyTextToClipboard(url);
  return "copied";
}
