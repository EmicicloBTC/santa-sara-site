import { useCallback, useState } from "react";
import { scenes } from "../data/scenes.js";
import { products } from "../data/products.js";
import { Stage } from "../components/Stage.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ProductModal } from "../components/ProductModal.jsx";
import { InfoModal } from "../components/InfoModal.jsx";
import { CatalogModal } from "../components/CatalogModal.jsx";
import { ContactModal } from "../components/ContactModal.jsx";
import { useLang, useLocalizedScene } from "../i18n/index.jsx";
import {
  findSceneIndexForProduct,
  readProductIdFromUrl,
  syncProductInUrl,
} from "../utils/share.js";

function getInitialSceneIndex() {
  const productId = readProductIdFromUrl();
  if (productId && products[productId]) {
    return findSceneIndexForProduct(scenes, productId);
  }
  return 0;
}

function getInitialProduct() {
  const productId = readProductIdFromUrl();
  return productId && products[productId] ? products[productId] : null;
}

export default function Landing() {
  const { lang } = useLang();
  const [sceneIndex, setSceneIndex] = useState(getInitialSceneIndex);
  const [openProduct, setOpenProduct] = useState(getInitialProduct);
  const [infoOpen, setInfoOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(() => !getInitialProduct());

  const disableAutoAdvance = () => setAutoAdvance(false);

  const handleOpenProduct = useCallback(
    (product) => {
      if (!product) return;
      setOpenProduct(product);
      setAutoAdvance(false);
      syncProductInUrl(product.id, lang);
    },
    [lang],
  );

  const closeProduct = useCallback(() => {
    setOpenProduct(null);
    syncProductInUrl(null, lang);
  }, [lang]);

  const openContact = () => {
    setInfoOpen(false);
    setContactOpen(true);
  };

  const scene = scenes[sceneIndex];
  const localizedScene = useLocalizedScene(scene);

  return (
    <main className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-stone-950 text-stone-950 selection:bg-stone-950 selection:text-white">
      <Stage
        scenes={scenes}
        sceneIndex={sceneIndex}
        onChangeScene={setSceneIndex}
        onOpenProduct={handleOpenProduct}
        sceneNavLocked={!!openProduct || infoOpen || catalogOpen || contactOpen}
        autoAdvance={autoAdvance}
        onDisableAutoAdvance={disableAutoAdvance}
      />
      <Header
        onOpenInfo={() => setInfoOpen(true)}
        onOpenCatalog={() => setCatalogOpen(true)}
        onOpenContact={openContact}
        autoAdvance={autoAdvance}
        onAutoAdvanceChange={setAutoAdvance}
      />
      <Footer sceneTitle={localizedScene.title} sceneIndex={sceneIndex} sceneCount={scenes.length} />
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onOpenProduct={handleOpenProduct}
      />
      <ProductModal product={openProduct} onClose={closeProduct} />
      <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} onOpenContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
