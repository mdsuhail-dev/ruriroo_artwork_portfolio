import { HomeLoader } from "@/components/home/HomeLoader";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { featuredArtworks, getArtworkImages } from "@/data/artworks";
import { getAllArtworksAsync } from "@/lib/db";
import type { ArtworkRecord } from "@/lib/db";

// Re-read the DB on every request so new uploads appear instantly
export const dynamic = "force-dynamic";

/**
 * Server component — renders instantly, no client JS needed for HTML.
 * Merges admin-uploaded works (JSON DB) with hardcoded Instagram artworks.
 */
export default async function HomePage() {
  let uploadedWorks: ArtworkRecord[] = [];
  try {
    uploadedWorks = await getAllArtworksAsync();
    uploadedWorks = uploadedWorks.filter((a: {published: boolean}) => a.published);
  } catch {
    // DB not created yet — fine
  }

  // Keep only uploads that aren't in the IG list
  const uploadedIds = new Set(uploadedWorks.map((a) => a.id));
  const igFeatured = featuredArtworks.filter((a) => !uploadedIds.has(a.id));

  type GridItem = {
    id: string;
    title: string;
    href: string;
    imageSrc: string;
  };

  // Uploaded works show first (newest), then IG featured — cap at 6
  const uploadSlots = Math.min(uploadedWorks.length, 6);
  const igSlots = Math.max(0, 6 - uploadSlots);

  const gridItems: GridItem[] = [
    ...uploadedWorks.slice(0, uploadSlots).map((a) => ({
      id: a.id,
      title: a.title,
      href: `/work/${a.id}`,
      imageSrc: a.images[0] || "",
    })),
    ...igFeatured.slice(0, igSlots).map((a) => ({
      id: a.id,
      title: a.title,
      href: `/work/${a.id}`,
      imageSrc: getArtworkImages(a)[0] || "",
    })),
  ];

  return (
    <HomeLoader>
      <HeroSection />

      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <FeaturedGrid items={gridItems} />

      <div className="container-site">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <AboutTeaser />
    </HomeLoader>
  );
}
