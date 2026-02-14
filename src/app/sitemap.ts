import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeremy-friesen.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
  ];
}
