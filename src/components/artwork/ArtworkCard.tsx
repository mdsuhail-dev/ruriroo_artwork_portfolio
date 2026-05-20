"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Artwork, getArtworkImages } from "@/data/artworks";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

export function ArtworkCard({ artwork, index = 0, size = "md", priority = false }: ArtworkCardProps) {
  const images = getArtworkImages(artwork);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 }}
      className="group"
    >
      <Link href={`/work/${artwork.id}`} className="block">
        <div className={cn(
          "artwork-card relative overflow-hidden bg-surface rounded-sm",
          size === "sm" && "aspect-[3/4]",
          size === "md" && "aspect-[4/5]",
          size === "lg" && "aspect-[3/4]"
        )}>
          <Image
            src={images[0]}
            alt=""
            fill
            className="artwork-image object-cover"
            sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 33vw"}
            priority={priority}
          />
          {/* Carousel badge only */}
          {artwork.imageCount > 1 && (
            <div className="absolute top-2 right-2 z-20 bg-void/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <span className="text-2xs text-muted/70">+{artwork.imageCount}</span>
            </div>
          )}
          {/* Hover overlay — no text */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(11,9,16,0.5) 0%, transparent 60%)" }} />
        </div>
        {/* NO title, NO category, NO year below image */}
      </Link>
    </motion.article>
  );
}
