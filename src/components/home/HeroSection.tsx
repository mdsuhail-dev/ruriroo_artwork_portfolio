"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { StarField } from "./StarField";

const QUOTES = [
  "drawn, not explained.",
  "look. don't ask.",
  "every line, intentional.",
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute inset-0 hero-gradient" />
      <StarField />

      {/* Blurred artwork atmosphere */}
      <div className="absolute inset-0 z-0 opacity-8">
        <div className="absolute -top-10 -right-10 w-1/2 h-full">
          <img src="/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg" alt="" className="w-full h-full object-cover object-left blur-md scale-110 opacity-60" aria-hidden />
        </div>
        <div className="absolute -bottom-10 -left-10 w-1/2 h-full">
          <img src="/artwork/DXtbzbhCKTy/DXtbzbhCKTy_2.jpg" alt="" className="w-full h-full object-cover object-right blur-md scale-110 opacity-60" aria-hidden />
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 0%, rgba(11,9,16,0.75) 60%, rgba(11,9,16,0.97) 100%)" }} />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Name */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="heading-display text-cream"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            ruri<span className="italic text-rose">roo</span><span className="text-star">._</span>
          </motion.h1>
        </div>

        {/* Rotating quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-display italic text-muted text-xl md:text-2xl mt-4 tracking-wide"
        >
          {QUOTES[0]}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <Link
            href="/universe"
            className="px-10 py-4 border border-border/60 text-cream text-xs font-medium tracking-[0.25em] uppercase rounded-full hover:border-rose/60 hover:text-rose transition-all duration-500 hover:-translate-y-0.5"
          >
            view work
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-rose/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
