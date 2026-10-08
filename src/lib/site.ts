import { env } from "~/env";

/** Canonical origin, without a trailing slash. */
export const siteUrl = (
  env.NEXT_PUBLIC_SITE_URL ?? "https://jeremy-friesen.com"
).replace(/\/$/, "");

export const siteName = "Jeremy Friesen";

export const siteDescription =
  "Portfolio of Jeremy Friesen — Computer Science student at Carleton University and Cyber Security Intern at the Government of Canada, building at the intersection of security, cloud infrastructure, data science and AI/ML.";
