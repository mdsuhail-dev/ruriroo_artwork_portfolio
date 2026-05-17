"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { StarSparkle } from "@/components/shared/StarSparkle";
import Link from "next/link";

const SECRETS = [
  {
    id: 1,
    glyph: "✦",
    title: "The first sketch",
    body: "Every masterpiece starts with a single uncertain line. The first drawing was a pair of eyes — just eyes, staring back.",
    color: "#E8C87A",
  },
  {
    id: 2,
    glyph: "◈",
    title: "The 3AM palette",
    body: "Most of the rose-pink pieces were painted between 2–4AM. The blue ones, always at golden hour. Mood is medium.",
    color: "#7BA8D4",
  },
  {
    id: 3,
    glyph: "⬡",
    title: "The star motif",
    body: "The ✦ star appears in almost every artwork — sometimes obvious, sometimes hidden in a shadow or fold. Find them all.",
    color: "#C85F88",
  },
  {
    id: 4,
    glyph: "◎",
    title: "The name",
    body: "ruriroo._ doesn't mean anything specific. It's a sound. A feeling. The dot-underscore is a wink — open-ended, unfinished, becoming.",
    color: "#E879A0",
  },
];

export default function LabPage() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggle = (id: number) => {
    setRevealed((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Ambient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(123,168,212,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(200,95,136,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "8%", y: "12%", s: 10, d: 0 },
          { x: "90%", y: "8%", s: 7, d: 0.5 },
          { x: "92%", y: "45%", s: 13, d: 1.1 },
          { x: "5%", y: "60%", s: 8, d: 0.7 },
          { x: "50%", y: "88%", s: 11, d: 0.3 },
          { x: "78%", y: "80%", s: 9, d: 1.4 },
        ].map((st, i) => (
          <div key={i} className="absolute" style={{ left: st.x, top: st.y }}>
            <StarSparkle size={st.s} delay={st.d} />
          </div>
        ))}
      </div>

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-rose/40" />
            <span className="label text-rose">secret archive</span>
            <div className="h-px w-10 bg-rose/40" />
          </div>

          <h1
            className="text-6xl md:text-8xl text-cream leading-none mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            The Lab
          </h1>

          <p
            className="text-muted max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
          >
            you weren't supposed to find this. but since you did — welcome.
          </p>
        </motion.div>

        {/* Secret cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
          {SECRETS.map((s, i) => {
            const isOpen = revealed.includes(s.id);
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => toggle(s.id)}
                className="glass-card text-left p-8 group cursor-pointer w-full transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                style={{
                  borderColor: isOpen
                    ? `${s.color}40`
                    : "rgba(42, 34, 50, 0.8)",
                  boxShadow: isOpen
                    ? `0 8px 60px ${s.color}15, 0 0 0 1px ${s.color}20`
                    : "none",
                }}
              >
                {/* Glyph */}
                <div
                  className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: s.color }}
                >
                  {s.glyph}
                </div>

                <h2
                  className="text-xl text-cream mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {s.title}
                </h2>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-muted text-sm leading-relaxed pt-2">{s.body}</p>
                </motion.div>

                {!isOpen && (
                  <p className="text-xs text-muted/50 tracking-widest uppercase mt-2">
                    tap to reveal
                  </p>
                )}

                {/* Subtle glow bg */}
                <div
                  className="absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${s.color}08, transparent)`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Konami hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <div className="glass-card inline-block px-8 py-6 max-w-md">
            <p className="label mb-2">secret sequence</p>
            <p
              className="text-cream/60 text-sm tracking-widest mb-3"
              style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
            <p className="text-xs text-muted/60">
              Try it anywhere on the site for a surprise ✦
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/"
            className="label text-muted hover:text-cream transition-colors duration-300 inline-flex items-center gap-2 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Return to the universe
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
