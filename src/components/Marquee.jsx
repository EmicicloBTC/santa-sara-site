import { motion } from "framer-motion";

export function Marquee() {
  const text = "CERAMICHE DECORATE A MANO · PEZZI UNICI · OGGETTI ORNAMENTALI · SHOP · ATELIER · ";
  return (
    <div className="overflow-hidden border-y border-stone-950 bg-[#f4efe6] py-3 text-stone-950">
      <motion.div
        className="flex whitespace-nowrap font-serif text-2xl italic tracking-[-0.04em] sm:text-3xl md:text-5xl"
        animate={{ x: [0, -900] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="pr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
