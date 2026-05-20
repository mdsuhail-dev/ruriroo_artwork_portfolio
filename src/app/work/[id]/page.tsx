import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworks, getArtworkById, getRelatedArtworks, getArtworkImages } from "@/data/artworks";
import { ArtworkCarousel } from "@/components/artwork/ArtworkCarousel";
import Link from "next/link";
import Image from "next/image";

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return artworks.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = getArtworkById(params.id);
  const images = artwork ? getArtworkImages(artwork) : [];
  return {
    title: "ruriroo._",
    description: "Art by ruriroo._",
    openGraph: images[0] ? { images: [{ url: images[0] }] } : undefined,
  };
}

export default function ArtworkPage({ params }: Props) {
  const artwork = getArtworkById(params.id);
  if (!artwork) notFound();

  const images = getArtworkImages(artwork);
  const related = getRelatedArtworks(artwork, 6);
  const currentIndex = artworks.findIndex((a) => a.id === artwork.id);
  const prevWork = artworks[currentIndex - 1];
  const nextWork = artworks[currentIndex + 1];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container-site">
        {/* Back */}
        <Link
          href="/universe"
          className="inline-flex items-center gap-2 label text-muted hover:text-cream transition-colors duration-300 mb-10 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          work
        </Link>

        {/* Artwork carousel — centered, no metadata */}
        <div className="max-w-2xl mx-auto">
          <ArtworkCarousel images={images} title="" />
        </div>

        {/* Prev / Next — no titles shown */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-border/30 max-w-2xl mx-auto">
          {prevWork ? (
            <Link href={`/work/${prevWork.id}`} className="group flex items-center gap-2 text-muted hover:text-cream transition-colors duration-300">
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span className="label">prev</span>
            </Link>
          ) : <div />}
          {nextWork ? (
            <Link href={`/work/${nextWork.id}`} className="group flex items-center gap-2 text-muted hover:text-cream transition-colors duration-300 text-right">
              <span className="label">next</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : <div />}
        </div>

        {/* Related — images only, no titles */}
        {related.length > 0 && (
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {related.map((a) => {
                const imgs = getArtworkImages(a);
                return (
                  <Link key={a.id} href={`/work/${a.id}`} className="group block aspect-square overflow-hidden rounded-sm bg-surface">
                    <Image
                      src={imgs[0]}
                      alt=""
                      width={200}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
