import type { Metadata } from "next";
import { artworks, getArtworkImages } from "@/data/artworks";
import { StarField } from "@/components/home/StarField";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Work — ruriroo._",
  description: "All artwork by ruriroo._ — drawings, illustrations, and visual experiments.",
};

export default function UniversePage() {
  return (
    <div className="relative pb-24 min-h-screen" style={{ paddingTop: "clamp(5.5rem, 14vw, 8rem)" }}>
      <StarField />
      <div className="container-site relative z-10">
        {/* Minimal header */}
        <div className="mb-10 md:mb-14">
          <h1
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3rem, 10vw, 6rem)", color: "var(--color-cream)", lineHeight: 1 }}
          >
            work
          </h1>
        </div>

        {/* Pure image grid — no titles, no filters, no labels */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {artworks.map((artwork, i) => {
            const images = getArtworkImages(artwork);
            return (
              <Link
                key={artwork.id}
                href={`/work/${artwork.id}`}
                className="group block mb-3 break-inside-avoid"
              >
                <div className="relative overflow-hidden bg-surface rounded-sm artwork-card">
                  <Image
                    src={images[0]}
                    alt=""
                    width={600}
                    height={800}
                    className="artwork-image object-cover w-full h-auto"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading={i < 8 ? "eager" : "lazy"}
                  />
                  {/* Carousel indicator only */}
                  {artwork.imageCount > 1 && (
                    <div className="absolute top-2 right-2 bg-void/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <span className="text-2xs text-muted/70">+{artwork.imageCount}</span>
                    </div>
                  )}
                  {/* Hover — no text */}
                  <div className="absolute inset-0 bg-void/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
