import { LiquidBackgroundLoader } from "~/components/background/liquid-background-loader";

/** The lava lamp and the film grain over it, behind every page that wants them. */
export function Backdrop() {
  return (
    <>
      <LiquidBackgroundLoader />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 noise opacity-[0.035] dark:opacity-[0.045] print:hidden"
      />
    </>
  );
}
