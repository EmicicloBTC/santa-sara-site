import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../data/products.js";
import { Hotspot } from "./Hotspot.jsx";
import { HotspotEditor } from "./HotspotEditor.jsx";
import { ChevronLeft, ChevronRight } from "./icons.jsx";

const SWIPE_THRESHOLD = 60;

export function Stage({ scenes, sceneIndex, onChangeScene, onOpenProduct }) {
  const scene = scenes[sceneIndex];
  const sceneCount = scenes.length;
  const imgRef = useRef(null);
  const [editor, setEditor] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.location.hash.includes("edit") || window.location.search.includes("edit");
  });
  const [lastClick, setLastClick] = useState(null);

  useEffect(() => {
    function onKey(e) {
      const target = e.target;
      const isFormField =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (isFormField) return;

      // Toggle editor: ?, /, oppure tasto E (più affidabile su tastiera italiana)
      if (e.key === "?" || (e.code === "Slash" && e.shiftKey) || e.key === "e" || e.key === "E") {
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
  }, [sceneIndex, sceneCount, onChangeScene]);

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          drag={sceneCount > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(1);
            else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
          }}
        >
          <div ref={imgRef} className="relative h-full w-full select-none">
            <img
              src={scene.image}
              alt={scene.alt}
              draggable={false}
              className="h-full w-full object-cover"
            />

            {/* leggero gradient per leggibilità header/footer */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

            {scene.hotspots.map((h, i) => (
              <Hotspot
                key={`${scene.id}-${h.productId}-${i}`}
                hotspot={h}
                product={products[h.productId]}
                onOpen={onOpenProduct}
              />
            ))}

            <HotspotEditor enabled={editor} sceneId={scene.id} lastClick={lastClick} />
          </div>
        </motion.div>
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
