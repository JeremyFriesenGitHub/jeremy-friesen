import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { siteDescription, siteName, siteUrl } from "~/lib/site";
import "~/app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | CS @ Carleton · Security, Cloud & AI/ML`,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description:
      "CS student at Carleton University: security, cloud infrastructure, data science and AI/ML. 7× hackathon winner.",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "CS student at Carleton University: security, cloud infrastructure, data science and AI/ML.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#08080d" },
  ],
};

/**
 * Applies the saved theme (or the OS preference) before first paint so there is
 * no flash of the wrong theme, and marks the document as JS-capable so scroll
 * reveals only hide content when they can actually run. Kept tiny and
 * dependency-free on purpose.
 */
const themeScript = `(function(){var c=document.documentElement.classList;c.add("js");try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d){c.add("dark")}else{c.remove("dark")}}catch(e){}})();`;

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
