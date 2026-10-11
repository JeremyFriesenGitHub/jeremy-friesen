import type { Metadata } from "next";
import { LuArrowLeft } from "react-icons/lu";
import { GlassButton } from "~/components/ui/glass-button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * The whole site is one page, so a wrong address only needs a way back. Kept
 * free of the navbar: its links are same-page anchors that would not resolve
 * from here.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-20 sm:px-6"
    >
      <div className="glass w-full max-w-lg rounded-3xl p-8 text-center sm:p-10">
        <p className="font-mono text-xs font-semibold tracking-[0.22em] text-primary-strong uppercase">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          There is nothing at this address. Everything lives on the home page.
        </p>
        <GlassButton href="/" variant="primary" className="mt-8">
          <LuArrowLeft size={16} aria-hidden="true" />
          Back home
        </GlassButton>
      </div>
    </main>
  );
}
