import { motion } from "framer-motion";

export function CeramicVisual({ item, hero = false }) {
  const [a, b, c, d] = item.colors;

  if (item.photo && item.photo.trim() !== "") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-stone-900">
        <img
          src={item.photo}
          alt={item.title}
          loading={hero ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
          <p className="max-w-[12rem] font-serif text-2xl leading-none md:text-3xl drop-shadow-md">{item.title}</p>
          <p className="text-xs uppercase tracking-[0.26em] drop-shadow-md">{item.status}</p>
        </div>
      </div>
    );
  }

  const bodyClass = {
    lamp: "h-[62%] w-[44%] rounded-t-[44%] rounded-b-[24%]",
    vase: "h-[68%] w-[42%] rounded-t-[48%] rounded-b-[38%]",
    bottle: "h-[70%] w-[32%] rounded-t-[24%] rounded-b-[35%]",
    plate: "h-[58%] w-[58%] rounded-full",
    tile: "h-[58%] w-[58%] rounded-[18%]",
  }[item.shape];

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${a}, ${b} 42%, ${d})` }}>
      <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: hero ? "22px 22px" : "18px 18px" }} />
      <div className="absolute -left-[18%] top-[12%] h-[48%] w-[70%] rotate-[-18deg] rounded-full blur-2xl" style={{ background: c, opacity: 0.42 }} />
      <div className="absolute -right-[20%] bottom-[8%] h-[42%] w-[72%] rotate-[14deg] rounded-full blur-2xl" style={{ background: b, opacity: 0.5 }} />

      {item.shape === "lamp" && (
        <div className="absolute left-1/2 top-[9%] h-[20%] w-[60%] -translate-x-1/2 rounded-t-[55%] rounded-b-[20%] border border-white/25 bg-white/25 backdrop-blur-sm" />
      )}

      {item.shape === "bottle" && (
        <div className="absolute left-1/2 top-[8%] h-[28%] w-[13%] -translate-x-1/2 rounded-t-full bg-white/35 shadow-2xl" />
      )}

      <motion.div
        initial={{ y: hero ? 20 : 10, rotate: hero ? -2 : 0 }}
        animate={{ y: [0, -8, 0], rotate: hero ? [-2, 1, -2] : [0, 1, 0] }}
        transition={{ duration: hero ? 8 : 7, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${bodyClass} border border-white/35 bg-white/20 shadow-[0_40px_90px_rgba(0,0,0,.35)] backdrop-blur-[1px]`}
        style={{ background: `linear-gradient(145deg, rgba(255,255,255,.55), ${a}66 40%, ${c}88)` }}
      >
        <div className="absolute inset-[12%] rounded-[inherit] border border-black/20" />
        <div className="absolute left-[14%] top-[24%] h-[24%] w-[28%] rotate-[-9deg] rounded-full" style={{ background: d, opacity: 0.72 }} />
        <div className="absolute right-[13%] top-[42%] h-[26%] w-[30%] rotate-[12deg] rounded-full" style={{ background: c, opacity: 0.72 }} />
        <div className="absolute left-[24%] top-[58%] h-[4px] w-[52%] rotate-[-11deg] rounded-full" style={{ background: b }} />
        <div className="absolute left-[18%] top-[67%] h-[4px] w-[62%] rotate-[7deg] rounded-full" style={{ background: d }} />
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white mix-blend-difference">
        <p className="max-w-[12rem] font-serif text-2xl leading-none md:text-3xl">{item.title}</p>
        <p className="text-xs uppercase tracking-[0.26em]">{item.status}</p>
      </div>
    </div>
  );
}
