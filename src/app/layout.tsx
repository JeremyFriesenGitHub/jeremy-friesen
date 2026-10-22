import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { siteDescription, siteName, siteTitle, siteUrl } from "~/lib/site";
import { THEME_COLOR } from "~/lib/theme";
import "~/app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Jeremy Friesen",
    "Carleton University",
    "Computer Science",
    "Cyber Security",
    "Cloud",
    "DevSecOps",
    "Machine Learning",
    "Data Science",
    "Ottawa",
    "Portfolio",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

/**
 * Applies the saved theme (or the OS preference) before first paint so there is
 * no flash of the wrong theme, restores a paused-effects choice the same way,
 * and marks the document as JS-capable so scroll reveals only hide content
 * when they can actually run. Storage can be blocked
 * (Safari's "Block all cookies"), so only the read sits in the try; and a
 * script that fails to load or parse (a browser older than the build targets,
 * a blocked chunk) takes the mark back, so the page reads as it would without
 * JS instead of hiding everything below the hero. The theme-color metas,
 * which Next renders after this script, are set once they exist, so the
 * browser chrome matches a stored theme before React runs. Kept tiny and
 * dependency-free on purpose.
 */
const themeScript = `(function(){var c=document.documentElement.classList;c.add("js");try{if(localStorage.getItem("effects")==="reduced")c.add("reduce-effects")}catch(e){}addEventListener("error",function(e){if(e.target&&e.target.tagName==="SCRIPT")c.remove("js")},true);var s=null;try{s=localStorage.getItem("theme")}catch(e){}var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);c.toggle("dark",d);function m(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(e){e.content=d?"${THEME_COLOR.dark}":"${THEME_COLOR.light}"})}m();addEventListener("DOMContentLoaded",m)})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-full focus-visible:border focus-visible:border-border focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
