import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworks, getArtworkById, getArtworkImages, getRelatedArtworks } from "@/data/artworks";
import { getAllArtworks } from "@/lib/db";
import type { ArtworkRecord } from "@/lib/db";
import { ArtworkCarousel } from "@/components/artwork/ArtworkCarousel";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import Link from "next/link";

interface Props {
  params: { id: string };
}

// Allow dynamic routes for admin-uploaded works (not pre-generated)
export const dynamicParams = true;

export async function generateStaticParams() {
  return artworks.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Check IG artworks first
  const igArtwork = getArtworkById(params.id);
  if (igArtwork) {
    return {
      title: `${igArtwork.title} — ruriroo._`,
      description: igArtwork.description,
    };
  }
  // Check uploaded artworks
  let uploadedWorks: ArtworkRecord[] = [];
  try { uploadedWorks = getAllArtworks(); } catch {}
  const uploaded = uploadedWorks.find((a) => a.id === params.id);
  if (uploaded) {
    return {
      title: `${uploaded.title} — ruriroo._`,
      description: uploaded.description || "",
    };
  }
  return { title: "Not Found" };
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

export default function ArtworkPage({ params }: Props) {
  // ── Try Instagram artworks first ──────────────────────────────────────
  const igArtwork = getArtworkById(params.id);
  if (igArtwork) {
    const images = getArtworkImages(igArtwork);
    const related = getRelatedArtworks(igArtwork, 4);
    const currentIndex = artworks.findIndex((a) => a.id === igArtwork.id);
    const prevWork = artworks[currentIndex - 1];
    const nextWork = artworks[currentIndex + 1];
    const accentColor = categoryColors[igArtwork.category] || "#C85F88";

    return (
      <ArtworkDetailLayout
        id={igArtwork.id}
        title={igArtwork.title}
        category={igArtwork.category}
        description={igArtwork.description}
        tags={igArtwork.tags}
        palette={igArtwork.palette}
        imageCount={igArtwork.imageCount}
        images={images}
        accentColor={accentColor}
        prevWork={prevWork ? { id: prevWork.id, title: prevWork.title } : null}
        nextWork={nextWork ? { id: nextWork.id, title: nextWork.title } : null}
        relatedCards={related.map((a) => (
          <ArtworkCard key={a.id} artwork={a} index={0} size="sm" />
        ))}
      />
    );
  }

  // ── Try admin-uploaded artworks ────────────────────────────────────────
  let uploadedWorks: ArtworkRecord[] = [];
  try { uploadedWorks = getAllArtworks(); } catch {}
  const uploaded = uploadedWorks.find((a) => a.id === params.id);

  if (!uploaded || !uploaded.published) notFound();

  const accentColor = categoryColors[uploaded.category] || "#C85F88";
  const idx = uploadedWorks.indexOf(uploaded);
  const prevUp = uploadedWorks[idx - 1];
  const nextUp = uploadedWorks[idx + 1];

  return (
    <ArtworkDetailLayout
      id={uploaded.id}
      title={uploaded.title}
      category={uploaded.category}
      description={uploaded.description}
      tags={uploaded.tags}
      palette={uploaded.palette}
      imageCount={uploaded.imageCount}
      images={uploaded.images}
      accentColor={accentColor}
      showYear={uploaded.year}
      prevWork={prevUp ? { id: prevUp.id, title: prevUp.title } : null}
      nextWork={nextUp ? { id: nextUp.id, title: nextUp.title } : null}
      relatedCards={[]}
    />
  );
}

// ── Shared layout component ────────────────────────────────────────────────
function ArtworkDetailLayout({
  title,
  category,
  description,
  tags,
  palette,
  imageCount,
  images,
  accentColor,
  showYear,
  prevWork,
  nextWork,
  relatedCards,
}: {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  palette: string[];
  imageCount: number;
  images: string[];
  accentColor: string;
  showYear?: number;
  prevWork: { id: string; title: string } | null;
  nextWork: { id: string; title: string } | null;
  relatedCards: React.ReactNode[];
}) {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container-site">
        {/* Back nav */}
        <Link
          href="/universe"
          className="inline-flex items-center gap-2 label text-muted hover:text-cream transition-colors duration-300 mb-12 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          All Works
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Carousel */}
          <div>
            <ArtworkCarousel images={images} title={title} />
          </div>

          {/* Metadata */}
          <div className="flex flex-col justify-between">
            <div>
              <SectionLabel>{category}</SectionLabel>
              <h1 className="font-display text-5xl md:text-6xl text-cream mt-3 leading-tight">
                {title}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                {showYear && (
                  <>
                    <span className="label text-faint">{showYear}</span>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accentColor }} />
                  </>
                )}
                <span className="label" style={{ color: accentColor }}>
                  {imageCount} {imageCount === 1 ? "image" : "images"}
                </span>
              </div>

              {description && (
                <p className="mt-8 text-muted leading-relaxed text-base">{description}</p>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface border border-border text-2xs label text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Palette */}
              {palette.length > 0 && (
                <div className="mt-8">
                  <p className="label mb-3">Palette</p>
                  <div className="flex gap-2">
                    {palette.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border border-border/50"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="flex items-center gap-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8C87A">
                  <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" />
                </svg>
                <span className="signature text-muted text-lg">@ruriroo._</span>
              </div>
              <a
                href="https://instagram.com/ruriroo._"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block label text-rose hover:text-rose-bright transition-colors duration-300"
              >
                Follow on Instagram ↗
              </a>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between items-center mt-20 pt-8 border-t border-border/50">
          {prevWork ? (
            <Link
              href={`/work/${prevWork.id}`}
              className="group flex items-center gap-3 text-muted hover:text-cream transition-colors duration-300"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <div>
                <p className="label">Previous</p>
                <p className="font-display text-lg mt-0.5">{prevWork.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextWork ? (
            <Link
              href={`/work/${nextWork.id}`}
              className="group flex items-center gap-3 text-muted hover:text-cream transition-colors duration-300 text-right"
            >
              <div>
                <p className="label">Next</p>
                <p className="font-display text-lg mt-0.5">{nextWork.title}</p>
              </div>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : <div />}
        </div>

        {/* Related */}
        {relatedCards.length > 0 && (
          <div className="mt-24">
            <SectionLabel>Related Works</SectionLabel>
            <h2 className="font-display text-4xl text-cream mt-3 mb-10">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCards}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
