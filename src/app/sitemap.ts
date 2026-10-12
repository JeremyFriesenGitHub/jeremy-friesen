import type { MetadataRoute } from "next";
import { caseStudies } from "~/data/projects";
import { siteUrl } from "~/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/resume`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...caseStudies.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
