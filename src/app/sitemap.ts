import { MetadataRoute } from "next";
import { artworks } from "@/data/artworks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ruriroo.art";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/universe`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/archive`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const artworkRoutes: MetadataRoute.Sitemap = artworks.map((a) => ({
    url: `${base}/work/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: a.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...artworkRoutes];
}
