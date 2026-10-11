import { spriteSvg } from "~/lib/sprite";

/**
 * The icon sprite the sections reference (see lib/icons.ts). Built once at
 * build time; the URL the pages use carries a content hash, so the file can
 * be cached for a year.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(spriteSvg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
