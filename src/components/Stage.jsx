import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { products } from "../data/products.js";
import { Hotspot } from "./Hotspot.jsx";
import { HotspotEditor } from "./HotspotEditor.jsx";
import { ChevronLeft, ChevronRight } from "./icons.jsx";

const SWIPE_THRESHOLD = 60;

// Chiave segreta per attivare l'editor in produzione.
// In sviluppo (npm run dev) l'editor è sempre disponibile.
// In produzione devi aprire il sito con questa stringa nell'URL.
// Funzionano TUTTE queste forme:
//   https://...netlify.app/#santa-edit   (hash)
//   https://...netlify.app/?santa-edit   (query string)
//   https://...netlify.app/santa-edit    (path)
// Cambia il valore se vuoi una chiave personale.
const EDITOR_KEY = "santa-edit";

function isEditorAllowed() {
  if (typeof window === "undefined") return false;
  if (import.meta.env.DEV) return true;
  const { hash, search, pathname } = window.location;
  return (
    hash.includes(EDITOR_KEY) ||
    search.includes(EDITOR_KEY) ||
    pathname.includes(EDITOR_KEY)
  );
}

// Curva morbida tipo "ease-in-out" cinematografico, e tempi calibrati per
// dare la sensazione di un dissolvenza pulita senza essere lenti.
const SCENE_EASE = [0.4, 0, 0.2, 1];
const SCENE_TRANSITION = {
  opacity: { duration: 1.1, ease: SCENE_EASE },
  filter: { duration: 1.1, ease: SCENE_EASE },
  scale: { duration: 1.4, ease: SCENE_EASE },
};

/**
 * Hook: true quando lo schermo è in formato verticale (telefono in piedi,
 * tablet stretto, ecc.). Si aggiorna in tempo reale se l'utente ruota.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(orientation: portrait), (max-width: 767px)").matches;
  });
  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait), (max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return isMobile;
}

// Cache "fire-and-forget" per i preload delle scene: evita di rilanciare la
// stessa richiesta più volte.
const preloadedScenes = new Set();
function preloadScene(url) {
  if (!url || preloadedScenes.has(url) || typeof window === "undefined") return;
  preloadedScenes.add(url);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

export function Stage({ scenes, sceneIndex, onChangeScene, onOpenProduct }) {
  const scene = scenes[sceneIndex];
  const sceneCount = scenes.length;
  const detectedMobile = useIsMobile();
  const imgRef = useRef(null);
  const editorAllowed = isEditorAllowed();
  const [editor, setEditor] = useState(() => editorAllowed);
  const [lastClick, setLastClick] = useState(null);
  // override manuale per l'editor: "auto" segue il device, "desktop"/"mobile"
  // forzano la variante (utile per posizionare hotspot mobile da PC)
  const [viewOverride, setViewOverride] = useState("auto");

  const isMobile =
    viewOverride === "mobile" ? true : viewOverride === "desktop" ? false : detectedMobile;

  // sceglie immagine + hotspot in base al device, con fallback intelligente:
  // se manca la foto mobile usiamo la desktop e (di conseguenza) i suoi hotspot
  const useMobileVariant = isMobile && Boolean(scene.imageMobile);
  const currentImage = useMobileVariant ? scene.imageMobile : scene.image;
  const currentHotspots =
    useMobileVariant && scene.hotspotsMobile ? scene.hotspotsMobile : scene.hotspots;
  const usingMobileSet = useMobileVariant && Boolean(scene.hotspotsMobile);
  // Variante mobile del video (opzionale): se siamo su telefono e la scena
  // ha un videoMobile dedicato, usiamo quello. Altrimenti il desktop.
  const currentVideo =
    isMobile && scene.videoMobile ? scene.videoMobile : scene.video;

  // Precarica la scena precedente e la successiva (sia desktop sia mobile)
  // appena entriamo su una scena: navigare avanti/indietro è istantaneo.
  useEffect(() => {
    const nextIdx = (sceneIndex + 1) % sceneCount;
    const prevIdx = (sceneIndex - 1 + sceneCount) % sceneCount;
    for (const idx of [nextIdx, prevIdx]) {
      const s = scenes[idx];
      if (!s) continue;
      preloadScene(s.image);
      if (s.imageMobile) preloadScene(s.imageMobile);
    }
  }, [scenes, sceneIndex, sceneCount]);

  // Memoria delle scene il cui video è già stato visto in questa sessione:
  // quando l'utente torna su una scena già "vissuta", l'intro non riparte.
  // È volutamente in-memory: se ricarica la pagina, il video torna a partire.
  const [playedVideos, setPlayedVideos] = useState(() => new Set());
  const hasVideo = Boolean(currentVideo?.src);
  const playVideoNow = hasVideo && !playedVideos.has(scene.id);

  // Quando la scena ha un video DA RIPRODURRE, gli hotspot sono nascosti
  // finché il video non finisce. Altrimenti (scena senza video o video già
  // visto) sono subito visibili.
  const [hotspotsReady, setHotspotsReady] = useState(!playVideoNow);
  useEffect(() => {
    setHotspotsReady(!playVideoNow);
  }, [scene.id, useMobileVariant, playVideoNow]);

  useEffect(() => {
    function onKey(e) {
      const target = e.target;
      const isFormField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (isFormField) return;

      // Toggle editor: ?, /, oppure tasto E (più affidabile su tastiera italiana).
      // In produzione richiede la chiave segreta nell'URL (vedi EDITOR_KEY).
      if (e.key === "?" || (e.code === "Slash" && e.shiftKey) || e.key === "e" || e.key === "E") {
        if (!editorAllowed) return;
        e.preventDefault();
        setEditor((v) => !v);
        return;
      }
      if (e.key === "ArrowRight") {
        onChangeScene((sceneIndex + 1) % sceneCount);
      } else if (e.key === "ArrowLeft") {
        onChangeScene((sceneIndex - 1 + sceneCount) % sceneCount);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sceneIndex, sceneCount, onChangeScene, editorAllowed]);

  function handleStageClick(e) {
    if (!editor || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLastClick({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  }

  function go(delta) {
    onChangeScene((sceneIndex + delta + sceneCount) % sceneCount);
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-stone-950" onClick={handleStageClick}>
      <AnimatePresence initial={false}>
        <SceneLayer
          key={`${scene.id}-${isMobile ? "m" : "d"}`}
          drag={sceneCount > 1 ? "x" : false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(1);
            else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
          }}
        >
          <div ref={imgRef} className="relative h-full w-full select-none">
            {/* Sfondo statico: visibile quando NON c'e' un video da riprodurre.
                Se c'e' un video, nascondiamo l'immagine finche il video non
                e' finito, altrimenti per la frazione di secondo in cui il
                video non e' ancora partito si vedrebbe l'ultimo frame (=
                immagine) e poi il video tornerebbe indietro: effetto "salto". */}
            <img
              src={currentImage}
              alt={scene.alt}
              draggable={false}
              fetchpriority="high"
              decoding="async"
              loading="eager"
              className={
                "absolute inset-0 h-full w-full object-cover" +
                (playVideoNow ? " opacity-0" : "")
              }
            />

            {playVideoNow && (
              <video
                key={`${scene.id}-video-${isMobile ? "m" : "d"}`}
                src={currentVideo.src}
                poster={currentVideo.poster}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={(e) => {
                  e.currentTarget.pause();
                  setHotspotsReady(true);
                  setPlayedVideos((prev) => {
                    const next = new Set(prev);
                    next.add(scene.id);
                    return next;
                  });
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* leggero gradient per leggibilità header/footer */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: hotspotsReady ? 1 : 0 }}
              transition={{ duration: 0.7, ease: SCENE_EASE }}
              style={{ pointerEvents: hotspotsReady ? "auto" : "none" }}
            >
              {currentHotspots.map((h, i) => (
                <Hotspot
                  key={`${scene.id}-${h.productId}-${i}`}
                  hotspot={h}
                  product={products[h.productId]}
                  onOpen={onOpenProduct}
                />
              ))}
            </motion.div>

            <HotspotEditor
              enabled={editor && editorAllowed}
              sceneId={scene.id}
              lastClick={lastClick}
              products={products}
              isMobile={isMobile}
              targetField={isMobile ? "hotspotsMobile" : "hotspots"}
              usingMobileSet={usingMobileSet}
              viewOverride={viewOverride}
              onChangeViewOverride={setViewOverride}
            />
          </div>
        </SceneLayer>
      </AnimatePresence>

      {sceneCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Scena precedente"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/30 sm:left-6 sm:h-14 sm:w-14"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Scena successiva"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/30 sm:right-6 sm:h-14 sm:w-14"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}

/**
 * Singola "scena" animata. Estratta in un sotto-componente per poter usare
 * useIsPresent: quando l'elemento sta uscendo (durante il crossfade) i click
 * non devono più passare ai suoi hotspot.
 */
function SceneLayer({ children, drag, onDragEnd }) {
  const present = useIsPresent();
  return (
    <motion.div
      className="absolute inset-0 will-change-[opacity,filter,transform]"
      style={{ pointerEvents: present ? "auto" : "none" }}
      initial={{ opacity: 0, filter: "blur(10px)", scale: 1.015 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)", scale: 1.005 }}
      transition={SCENE_TRANSITION}
      drag={drag}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={onDragEnd}
    >
      {children}
    </motion.div>
  );
}
