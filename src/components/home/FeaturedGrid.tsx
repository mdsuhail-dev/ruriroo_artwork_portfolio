"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredArtworks, getArtworkImages } from "@/data/artworks";

export function FeaturedGrid() {
  const selected = featuredArtworks.slice(0, 6);

  return (
    <section className="py-24 relative">
      <div className="container-site">
        {/* Asymmetric grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {selected.map((artwork, i) => {
            const images = getArtworkImages(artwork);
            const colSpans = [
              "col-span-12 md:col-span-7",
              "col-span-12 md:col-span-5",
              "col-span-6 md:col-span-4",
              "col-span-6 md:col-span-4",
              "col-span-12 md:col-span-4",
              "col-span-12 md:col-span-6",
            ];
            const aspects = [
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[3/4]",
              "aspect-[3/4]",
              "aspect-[16/9]",
            ];

            return (
              <motion.div
                key={artwork.id}
                className={colSpans[i] || "col-span-6 md:col-span-4"}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/work/${artwork.id}`} className="group block">
                  <div className={`artwork-card relative overflow-hidden bg-surface ${aspects[i] || "aspect-square"}`}>
                    <Image
                      src={images[0]}
                      alt=""
                      fill
                      className="artwork-image object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i < 2}
                    />
                    {/* Subtle hover overlay — no text */}
                    <div className="absolute inset-0 bg-void/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* Glow border on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(200,95,136,0.3)" }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all — minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            href="/universe"
            className="inline-flex items-center gap-2 label text-muted hover:text-cream transition-colors duration-300 group"
          >
            more work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
