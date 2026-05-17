"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { StarSparkle } from "@/components/shared/StarSparkle";

export function AboutTeaser() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: "radial-gradient(circle, #C85F88, transparent)" }}
      />

      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <SectionLabel delay={0}>The Artist</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-6xl text-cream mt-4 leading-[1.05]"
            >
              Drawing the world
              <br />
              <span className="italic text-rose">as she feels it</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-muted leading-relaxed max-w-sm"
            >
              ruriroo._ is a 22-year-old Egyptian college student whose sketchbooks hold
              portraits, food studies, fantasy figures, and mixed-media experiments — all
              carrying her signature scattered ✦ stars.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-muted leading-relaxed max-w-sm"
            >
              Her work oscillates between melancholic pencil studies and vibrant
              watercolour celebrations — always intimate, always raw.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-rose/50 text-cream text-sm font-medium tracking-wider uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                Full Story
              </Link>
              <a
                href="https://instagram.com/ruriroo._"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-rose hover:text-rose-bright transition-colors duration-300"
              >
                @ruriroo._ ↗
              </a>
            </motion.div>
          </div>

          {/* Stats / Quote side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Quote */}
            <div className="glass-card p-8 relative">
              <div className="absolute -top-3 -left-3">
                <StarSparkle size={20} color="#E8C87A" delay={0} />
              </div>
              <p className="font-display text-2xl italic text-cream/90 leading-relaxed">
                "Every sketch is a small act of paying attention to the world."
              </p>
              <p className="mt-4 signature text-muted">— ruriroo._</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "48+", label: "Works" },
                { number: "2021", label: "Since" },
                { number: "∞", label: "Stories" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 border border-border/50 rounded-sm">
                  <p className="font-display text-3xl text-cream">{stat.number}</p>
                  <p className="label mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
