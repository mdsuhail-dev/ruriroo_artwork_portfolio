"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { StarSparkle } from "@/components/shared/StarSparkle";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,95,136,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "15%", y: "20%", size: 10, delay: 0 },
          { x: "80%", y: "15%", size: 14, delay: 0.8 },
          { x: "70%", y: "70%", size: 8, delay: 0.4 },
          { x: "20%", y: "75%", size: 12, delay: 1.2 },
          { x: "50%", y: "10%", size: 7, delay: 0.6 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
          >
            <StarSparkle size={s.size} delay={s.delay} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6"
      >
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span
            className="text-[clamp(7rem,20vw,14rem)] font-display text-cream/5 leading-none tracking-tighter select-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-8 mb-4"
        >
          <h1
            className="text-5xl md:text-7xl text-cream leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            lost in the void
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted text-base max-w-sm mx-auto leading-relaxed mb-3"
        >
          This page wandered off somewhere between the sketchbook and the stars.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ fontFamily: "var(--font-caveat)" }}
          className="text-rose text-xl mb-12"
        >
          ✦ even lost pages are beautiful ✦
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-8 py-3.5 bg-rose text-void text-sm font-medium tracking-wider uppercase rounded-full hover:bg-rose-bright transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,95,136,0.4)] hover:-translate-y-0.5"
          >
            Back Home
          </Link>
          <Link
            href="/universe"
            className="px-8 py-3.5 border border-border text-cream text-sm font-medium tracking-wider uppercase rounded-full hover:border-rose/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Enter Universe
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
