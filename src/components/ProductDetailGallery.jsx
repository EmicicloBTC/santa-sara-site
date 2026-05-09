import { useEffect, useState } from "react";
import { productImages } from "../data/products.js";
import { CeramicVisual } from "./CeramicVisual.jsx";

/** Dettaglio opera: una foto o più foto con miniature sotto. */
export function ProductDetailGallery({ item }) {
  const urls = productImages(item);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [item.id]);

  if (urls.length === 0) {
    return <CeramicVisual item={item} hero />;
  }

  return (
    <div className="flex h-full min-h-[320px] flex-col gap-3 sm:min-h-[420px] lg:min-h-[560px]">
      <div className="relative min-h-[260px] flex-1 overflow-hidden sm:min-h-[320px]">
        <CeramicVisual item={item} hero photoSrc={urls[active]} />
      </div>
      {urls.length > 1 && (
        <div className="flex flex-wrap gap-2 border-t border-stone-950 bg-[#f4efe6]/95 px-2 py-3 sm:px-3" role="tablist" aria-label="Altre immagini del pezzo">
          {urls.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-xl border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                active === index ? "border-[#ff4f2f] ring-2 ring-stone-950" : "border-stone-950 opacity-80 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-14 w-14 object-cover sm:h-16 sm:w-16" loading="lazy" decoding="async" />
              <span className="sr-only">Immagine {index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
