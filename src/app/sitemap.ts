import type { MetadataRoute } from "next";
import { artworks } from "@/data/artworks";

const BASE_URL = "https://ruriroo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const artworkPages = artworks.map((a) => ({
    url: `${BASE_URL}/work/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/universe`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/archive`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/lab`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    ...artworkPages,
  ];
}
