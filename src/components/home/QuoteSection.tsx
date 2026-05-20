"use client";
import { motion } from "framer-motion";
import { StarSparkle } from "@/components/shared/StarSparkle";

const QUOTES = [
  { text: "drawn, not explained.", attr: "ruriroo._" },
  { text: "some things only make sense as lines on paper.", attr: "ruriroo._" },
  { text: "✦", attr: "" },
];

export function QuoteSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,95,136,0.04) 0%, transparent 70%)" }} />

      <div className="container-site">
        <div className="flex flex-col gap-20 max-w-2xl mx-auto">
          {QUOTES.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {q.text === "✦" ? (
                <div className="flex justify-center gap-4">
                  <StarSparkle size={12} delay={0} />
                  <StarSparkle size={18} color="#C85F88" delay={0.2} />
                  <StarSparkle size={12} delay={0.4} />
                </div>
              ) : (
                <>
                  <p className="font-display text-3xl md:text-4xl italic text-cream/80 leading-relaxed">
                    &ldquo;{q.text}&rdquo;
                  </p>
                  {q.attr && (
                    <p className="mt-4 signature text-muted/60 text-base">— {q.attr}</p>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
