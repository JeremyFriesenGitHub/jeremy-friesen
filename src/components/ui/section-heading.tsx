import { Reveal } from "~/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional link or button rendered on the right on wide screens. */
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-semibold tracking-[0.22em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-pretty text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
