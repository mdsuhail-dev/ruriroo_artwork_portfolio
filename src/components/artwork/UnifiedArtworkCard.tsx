"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface UnifiedArtwork {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  imageCount: number;
  year?: number;
  showYear?: boolean;
}

interface Props {
  artwork: UnifiedArtwork;
  index?: number;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const categoryColors: Record<string, string> = {
  figures: "#7BA8D4",
  portraits: "#C85F88",
  watercolor: "#C8963C",
  fantasy: "#C85F88",
  nature: "#7A9B5A",
  mixed: "#A09490",
  studies: "#7BA8D4",
};

export function UnifiedArtworkCard({ artwork, index = 0, size = "md", priority = false }: Props) {
  const accentColor = categoryColors[artwork.category] || "#C85F88";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.07 }}
      className="group"
    >
      <Link href={`/work/${artwork.id}`} className="block">
        <div
          className={cn(
            "artwork-card relative overflow-hidden bg-surface rounded-sm",
            size === "sm" && "aspect-[3/4]",
            size === "md" && "aspect-[4/5]",
            size === "lg" && "aspect-[3/4]"
          )}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: "linear-gradient(to top, rgba(11,9,16,0.85) 0%, rgba(11,9,16,0.2) 50%, transparent 100%)" }}
          />

          {/* Image */}
          {artwork.imageSrc && (
            <Image
              src={artwork.imageSrc}
              alt={artwork.title}
              fill
              className="artwork-image object-cover"
              sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 33vw"}
              priority={priority}
            />
          )}

          {/* Multi-image badge */}
          {artwork.imageCount > 1 && (
            <div className="absolute top-3 right-3 z-20 bg-void/70 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="text-2xs text-muted">+{artwork.imageCount}</span>
            </div>
          )}

          {/* Category dot */}
          <div className="absolute top-3 left-3 z-20 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="label mb-1" style={{ color: accentColor }}>{artwork.category}</p>
            <h3 className="font-display text-xl text-cream leading-tight">{artwork.title}</h3>
          </div>
        </div>

        {/* Below image */}
        <div className="mt-3 px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg text-cream/90 group-hover:text-cream transition-colors leading-tight">
              {artwork.title}
            </h3>
            {artwork.showYear && artwork.year && (
              <span className="label text-faint flex-shrink-0 mt-1">{artwork.year}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="label" style={{ color: accentColor }}>{artwork.category}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
