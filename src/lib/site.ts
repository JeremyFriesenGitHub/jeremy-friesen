import { copy } from "~/data/copy";
import { env } from "~/env";

/** Canonical origin, without a trailing slash. */
export const siteUrl = (
  env.NEXT_PUBLIC_SITE_URL ?? "https://jeremy-friesen.com"
).replace(/\/$/, "");

export const siteName = "Jeremy Friesen";

/** Search snippet and link-preview line; `undefined` while blank so nothing empty is emitted. */
export const siteDescription = copy.meta.description || undefined;

/** Browser tab and search headline of the home page. */
export const siteTitle = copy.meta.titleSuffix
  ? `${siteName} | ${copy.meta.titleSuffix}`
  : siteName;
