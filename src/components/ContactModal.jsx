import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, Close } from "./icons.jsx";
import { site } from "../data/site.js";
import { useT } from "../i18n/index.jsx";

const FORM_NAME = "contact";
// POST su pagina HTML statica: il redirect SPA (/* → index.html) blocca POST su "/"
const FORM_ENDPOINT = "/netlify-forms-detect.html";

const EMPTY = { name: "", email: "", country: "", message: "" };

export function ContactModal({ open, onClose }) {
  const t = useT();
  const c = t.contact;
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return undefined;
    setStatus("idle");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setFields(EMPTY);
      setStatus("idle");
    }
  }, [open]);

  function setField(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      name: fields.name.trim(),
      email: fields.email.trim(),
      country: fields.country.trim(),
      message: fields.message.trim(),
    });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const text = await res.text();
      // Se il redirect SPA risponde con la homepage React, l'invio non è arrivato a Netlify
      if (!res.ok || text.includes('id="root"')) throw new Error("submit failed");
      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-stone-950/12 bg-white/80 px-4 py-3 text-sm text-stone-900 shadow-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-stone-950/25 focus:bg-white focus:ring-2 focus:ring-stone-950/10";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label={t.ui.close}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-stone-950/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={c.aria}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#f6f1e8] text-stone-950 shadow-2xl ring-1 ring-stone-950/20"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.ui.close}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-stone-900 shadow ring-1 ring-stone-950/15 backdrop-blur-md transition hover:bg-white"
            >
              <Close size={16} />
            </button>

            <div className="p-6 sm:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500">
                {site.email}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-[1.05] tracking-[-0.025em] sm:text-4xl">
                {c.title}
              </h2>
              <p className="mt-3 text-sm leading-[1.6] text-stone-600 sm:text-base">{c.subtitle}</p>

              {status === "success" ? (
                <p className="mt-8 rounded-xl bg-white/70 px-4 py-5 text-sm leading-[1.65] text-stone-800 ring-1 ring-stone-950/10">
                  {c.success}
                </p>
              ) : (
                <form
                  name={FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-4"
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  <p className="hidden" aria-hidden>
                    <label>
                      Non compilare
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-1">
                      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-stone-500">
                        {c.name}
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={fields.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder={c.namePlaceholder}
                        className={inputClass}
                      />
                    </label>
                    <label className="block sm:col-span-1">
                      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-stone-500">
                        {c.email}
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={fields.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder={c.emailPlaceholder}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-stone-500">
                      {c.country}
                    </span>
                    <input
                      type="text"
                      name="country"
                      required
                      autoComplete="country-name"
                      value={fields.country}
                      onChange={(e) => setField("country", e.target.value)}
                      placeholder={c.countryPlaceholder}
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-stone-500">
                      {c.message}
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={fields.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder={c.messagePlaceholder}
                      className={inputClass + " min-h-[120px] resize-y"}
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm leading-[1.55] text-[#b91c1c]" role="alert">
                      {c.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-stone-950 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white transition hover:bg-[#3a342d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? c.sending : c.send}
                    {status !== "sending" && <Arrow size={14} />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
