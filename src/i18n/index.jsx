import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  translations,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
} from "./translations.js";

const STORAGE_KEY = "ss_lang";

/**
 * Stato globale della lingua. Espone:
 *   - lang:   "it" | "en"
 *   - setLang(l): cambia lingua + persiste in localStorage
 *   - t:      l'intero dizionario per la lingua corrente
 */
const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: translations[DEFAULT_LANG],
});

function readInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // localStorage non disponibile (es. modalità privata): ignora
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignora se localStorage non scrivibile
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (next) => {
        if (SUPPORTED_LANGS.includes(next)) setLangState(next);
      },
      t: translations[lang] || translations[DEFAULT_LANG],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Restituisce l'oggetto dizionario completo per la lingua corrente. */
export function useT() {
  return useContext(I18nContext).t;
}

/** Restituisce { lang, setLang } per il language switcher. */
export function useLang() {
  const { lang, setLang } = useContext(I18nContext);
  return { lang, setLang };
}

/**
 * Restituisce una copia "localizzata" del prodotto: sovrascrive description,
 * dimensions, price, cta e category con i valori della lingua corrente.
 * Il `title` (nome dell'opera) viene SEMPRE conservato dall'originale.
 */
export function useLocalizedProduct(product) {
  const { t } = useContext(I18nContext);
  return useMemo(() => {
    if (!product) return product;
    const tp = t.products?.[product.id] || {};
    return {
      ...product,
      description: tp.description ?? product.description,
      dimensions: tp.dimensions ?? product.dimensions,
      price: tp.price ?? product.price,
      cta: tp.cta ?? product.cta,
      categoryLabel: product.category
        ? t.category?.[product.category] ?? product.category
        : undefined,
    };
  }, [product, t]);
}

/**
 * Restituisce titolo e alt-text tradotti per una scena. Se la chiave manca,
 * fa fallback ai valori "raw" della scena.
 */
export function useLocalizedScene(scene) {
  const { t } = useContext(I18nContext);
  return useMemo(() => {
    if (!scene) return scene;
    const ts = t.scenes?.[scene.id] || {};
    return {
      ...scene,
      title: ts.title ?? scene.title,
      alt: ts.alt ?? scene.alt,
    };
  }, [scene, t]);
}
