import type { Metadata } from "next";
import { artworks, getArtworkImages } from "@/data/artworks";
import { getAllArtworksAsync } from "@/lib/db";
import type { ArtworkRecord } from "@/lib/db";
import { UnifiedArtworkGrid } from "@/components/artwork/UnifiedArtworkGrid";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { StarField } from "@/components/home/StarField";
import type { UnifiedArtwork } from "@/components/artwork/UnifiedArtworkCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Universe — ruriroo._",
  description:
    "Explore the full artwork universe of ruriroo._ — pencil portraits, watercolour, mixed media, fantasy, and nature studies.",
};

export default async function UniversePage() {
  let uploadedWorks: ArtworkRecord[] = [];
  try {
    const all = await getAllArtworksAsync();
    uploadedWorks = all.filter((a) => a.published);
  } catch {}

  const uploadedIds = new Set(uploadedWorks.map((a) => a.id));

  // Build unified list: uploaded first (newest), then IG artworks
  const unified: UnifiedArtwork[] = [
    ...uploadedWorks.map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      imageSrc: a.images[0] || "",
      imageCount: a.imageCount,
      year: a.year,
      showYear: true, // uploaded works always show year
    })),
    ...artworks
      .filter((a) => !uploadedIds.has(a.id))
      .map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category,
        imageSrc: getArtworkImages(a)[0] || "",
        imageCount: a.imageCount,
        year: a.year,
        showYear: false, // old IG posts don't show year
      })),
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <StarField />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel>All Works</SectionLabel>
          <h1 className="font-display text-7xl md:text-9xl text-cream mt-3 leading-none">
            The <span className="italic text-rose">Universe</span>
          </h1>
          <p className="mt-6 text-muted max-w-md leading-relaxed">
            {unified.length} works. Pencil, watercolour, ink, marker — all from these sketchbooks.
          </p>
        </div>

        {/* Grid with filter */}
        <UnifiedArtworkGrid artworks={unified} showFilter />
      </div>
    </div>
  );
}
