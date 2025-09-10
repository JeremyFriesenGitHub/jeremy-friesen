import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://jeremy-friesen.com";

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
      </url>`,
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
