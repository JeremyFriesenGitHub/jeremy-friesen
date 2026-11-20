import type { MetadataRoute } from "next";
import { siteUrl } from "~/lib/site";

/** The site is one page; `lastModified` is the build, which is when it last changed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
