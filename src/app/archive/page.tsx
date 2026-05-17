import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artworks, getArtworkImages } from "@/data/artworks";
import { getAllArtworks } from "@/lib/db";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archive — ruriroo._",
  description: "Chronological archive of all artwork by ruriroo._ — from early sketches to the latest mixed media work.",
};

// Group items by year — works with both IG and uploaded artworks
function groupByYear(items: { id: string; year: number; title: string; imageSrc: string }[]) {
  return items.reduce((acc, item) => {
    const year = item.year.toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof items>);
}

export default function ArchivePage() {
  // Get admin-uploaded works
  let uploadedItems: { id: string; year: number; title: string; imageSrc: string }[] = [];
  try {
    uploadedItems = getAllArtworks()
      .filter((a) => a.published)
      .map((a) => ({ id: a.id, year: a.year, title: a.title, imageSrc: a.images[0] || "" }));
  } catch {}

  // Merge uploaded + IG artworks into unified flat list
  const uploadedIds = new Set(uploadedItems.map((a) => a.id));
  const igItems = artworks
    .filter((a) => !uploadedIds.has(a.id))
    .map((a) => ({ id: a.id, year: a.year, title: a.title, imageSrc: getArtworkImages(a)[0] || "" }));

  const allItems = [...uploadedItems, ...igItems].sort((a, b) => b.year - a.year);
  const grouped = groupByYear(allItems);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-site">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel>Chronological</SectionLabel>
          <h1 className="font-display text-7xl md:text-9xl text-cream mt-3 leading-none">
            Archive
          </h1>
          <p className="mt-6 text-muted max-w-md leading-relaxed">
            Every piece, in order — watching the evolution from first strokes to current mastery.
          </p>
        </div>

        {/* Timeline by year */}
        <div className="space-y-20">
          {years.map((year) => (
            <div key={year}>
              {/* Year header */}
              <div className="flex items-center gap-4 mb-10 sticky top-20 z-10 bg-void/80 backdrop-blur-sm py-3 -mx-4 px-4">
                <div className="h-px flex-1 bg-border" />
                <h2 className="font-display text-5xl text-cream/30">{year}</h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Works grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {grouped[year].map((item) => (
                  <Link
                    key={item.id}
                    href={`/work/${item.id}`}
                    className="group relative aspect-square overflow-hidden rounded-sm bg-surface"
                    title={item.title}
                  >
                    {item.imageSrc && (
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 16vw"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-void/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <p className="text-2xs text-cream leading-tight font-display">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
