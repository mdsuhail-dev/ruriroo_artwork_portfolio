import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://ruriroo.vercel.app/sitemap.xml",
    host: "https://ruriroo.vercel.app",
  };
}
