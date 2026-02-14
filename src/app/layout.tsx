import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "~/app/globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Jeremy Friesen",
  description:
    "Portfolio of Jeremy Friesen — CS student at Carleton University passionate about Data Science, Software Development, Cloud Infrastructure, DevSecOps, and AI/ML.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeremy-friesen.com",
  ),
  openGraph: {
    title: "Jeremy Friesen",
    description:
      "CS student at Carleton University — Data Science, Software Development, Cloud & AI/ML.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-mono antialiased">{children}</body>
    </html>
  );
}
