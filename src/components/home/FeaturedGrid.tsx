"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";

type GridItem = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  source: "upload" | "ig";
};

interface Props {
  items: GridItem[];
}

export function FeaturedGrid({ items }: Props) {
  const selected = items.slice(0, 6);

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
    <section className="py-24 relative">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>Selected Works</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl text-cream mt-3 leading-none"
            >
              From the<br />
              <span className="italic text-rose">sketchbook</span>
            </motion.h2>
          </div>
          <Link
            href="/universe"
            className="inline-flex items-center gap-2 label text-muted hover:text-cream transition-colors duration-300 group"
          >
            View all works
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {selected.map((item, i) => (
            <motion.article
              key={item.id}
              className={colSpans[i] || "col-span-6 md:col-span-4"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-4%" }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={item.href} className="group block">
                <div className={`artwork-card relative overflow-hidden bg-surface ${aspects[i] || "aspect-square"}`}>
                  {item.imageSrc && (
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="artwork-image object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i < 2}
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Hover label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <h3 className="font-display text-lg text-cream">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-2 font-display text-sm text-muted group-hover:text-cream transition-colors duration-300">
                  {item.title}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
