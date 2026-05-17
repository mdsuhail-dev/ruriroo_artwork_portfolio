"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { StarField } from "./StarField";
import { StarSparkle } from "@/components/shared/StarSparkle";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only apply parallax on desktop — mobile gets static, no GPU waste
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Star field */}
      <StarField />

      {/* Background artwork mosaic */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-10 -right-10 w-1/2 h-full">
          <Image
            src="/artwork/DToAJ0kiDsD/DToAJ0kiDsD_1.jpg"
            alt=""
            fill
            className="object-cover object-left blur-sm scale-110"
            priority
            aria-hidden
          />
        </div>
        <div className="absolute -bottom-10 -left-10 w-1/2 h-full">
          <Image
            src="/artwork/DXtbzbhCKTy/DXtbzbhCKTy_2.jpg"
            alt=""
            fill
            className="object-cover object-right blur-sm scale-110"
            priority
            aria-hidden
          />
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 0%, rgba(11,9,16,0.7) 60%, rgba(11,9,16,0.95) 100%)",
        }}
      />

      {/* Hero content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 flex flex-col items-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-rose/50" />
          <span className="label text-rose">egyptian artist · creator · dreamer</span>
          <div className="h-px w-12 bg-rose/50" />
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="heading-display text-cream"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            ruri<span className="italic text-rose">roo</span>
            <span className="text-star">._</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-lg"
        >
          <p className="text-muted text-lg md:text-xl font-display italic leading-relaxed">
            Pencil on paper. Watercolour on paper. Feeling on paper.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <StarSparkle size={10} delay={0} />
            <span className="signature text-muted text-base">ruriroo._, 22</span>
            <StarSparkle size={10} delay={0.3} />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link
            href="/universe"
            className="px-8 py-3.5 bg-rose text-void text-sm font-medium tracking-wider uppercase rounded-full hover:bg-rose-bright transition-all duration-300 hover:shadow-glow-rose hover:-translate-y-0.5"
          >
            Enter Universe
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-border text-cream text-sm font-medium tracking-wider uppercase rounded-full hover:border-rose/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            About me
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label text-faint">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-rose/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
