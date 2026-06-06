import { useState } from "react";
import { scenes } from "../data/scenes.js";
import { Stage } from "../components/Stage.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ProductModal } from "../components/ProductModal.jsx";
import { InfoModal } from "../components/InfoModal.jsx";
import { CatalogModal } from "../components/CatalogModal.jsx";
import { ContactModal } from "../components/ContactModal.jsx";
import { useLocalizedScene } from "../i18n/index.jsx";

export default function Landing() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [openProduct, setOpenProduct] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const disableAutoAdvance = () => setAutoAdvance(false);
  const toggleAutoAdvance = () => setAutoAdvance((v) => !v);

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
        onOpenProduct={setOpenProduct}
        sceneNavLocked={!!openProduct || infoOpen || catalogOpen || contactOpen}
        autoAdvance={autoAdvance}
        onDisableAutoAdvance={disableAutoAdvance}
      />
      <Header
        onOpenInfo={() => setInfoOpen(true)}
        onOpenCatalog={() => setCatalogOpen(true)}
        onOpenContact={openContact}
        onDisableAutoAdvance={disableAutoAdvance}
        autoAdvance={autoAdvance}
      />
      <Footer
        sceneTitle={localizedScene.title}
        sceneIndex={sceneIndex}
        sceneCount={scenes.length}
        autoAdvance={autoAdvance}
        onToggleAutoAdvance={toggleAutoAdvance}
      />
      <CatalogModal
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onOpenProduct={setOpenProduct}
      />
      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
      <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} onOpenContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
