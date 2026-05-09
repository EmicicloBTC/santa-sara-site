import { motion } from "framer-motion";

export function Marquee() {
  const text = "Ceramiche decorate a mano · Pezzi unici · Oggetti ornamentali · Shop · Atelier · ";
  return (
    <div className="overflow-hidden border-y border-stone-950 bg-[#f4efe6] py-4 text-stone-950">
      <motion.div
        className="flex whitespace-nowrap font-serif text-3xl italic font-light tracking-[-0.02em] sm:text-4xl md:text-6xl"
        animate={{ x: [0, -900] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="pr-10">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
