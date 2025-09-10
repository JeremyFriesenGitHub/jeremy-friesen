import type { NextApiRequest, NextApiResponse } from "next";

// Pages Router API route: export a default handler (required by Next.js ApiRouteConfig)
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeremy-friesen.com";

  const pages = [
    { url: "/", priority: "1.0" },
    { url: "/projects", priority: "0.8" },
    { url: "/contact", priority: "0.7" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        ({ url, priority }) => `
      <url>
        <loc>${baseUrl}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
