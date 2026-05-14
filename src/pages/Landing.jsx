import { useState } from "react";
import { scenes } from "../data/scenes.js";
import { Stage } from "../components/Stage.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ProductModal } from "../components/ProductModal.jsx";
import { InfoModal } from "../components/InfoModal.jsx";
import { CatalogModal } from "../components/CatalogModal.jsx";
import { useLocalizedScene } from "../i18n/index.jsx";

export default function Landing() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [openProduct, setOpenProduct] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const scene = scenes[sceneIndex];
  const localizedScene = useLocalizedScene(scene);

  return (
    <main className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-stone-950 text-stone-950 selection:bg-stone-950 selection:text-white">
      <Stage
        scenes={scenes}
        sceneIndex={sceneIndex}
        onChangeScene={setSceneIndex}
        onOpenProduct={setOpenProduct}
      />
      <Header
        onOpenInfo={() => setInfoOpen(true)}
        onOpenCatalog={() => setCatalogOpen(true)}
      />
      <Footer sceneTitle={localizedScene.title} sceneIndex={sceneIndex} sceneCount={scenes.length} />
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onOpenProduct={setOpenProduct}
      />
      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
      <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
    </main>
  );
}
