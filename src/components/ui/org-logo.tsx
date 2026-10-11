import Image from "next/image";
import { Icon } from "~/components/ui/icon";
import type { SpriteIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

type OrgLogoProps = {
  /** The organization, for the monogram when there is no logo. */
  name: string;
  /** Under public/, square. */
  logo?: string;
  /** Shown instead of a monogram when there is no logo. */
  fallbackIcon?: SpriteIcon;
  /** Overrides the initials, e.g. "RCMP". */
  abbr?: string;
  size?: number;
  className?: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .map((word) => word[0])
    .join("")
    .slice(0, 4);

/**
 * An organization's mark beside its name: the logo when the site has one,
 * otherwise an icon or a monogram tinted with the item's accent. The name
 * is always next to it as text, so the mark itself is decorative.
 */
export function OrgLogo({
  name,
  logo,
  fallbackIcon,
  abbr,
  size = 48,
  className,
}: OrgLogoProps) {
  const style = { width: size, height: size };

  if (logo) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background",
          className,
        )}
        style={style}
      >
        <Image
          src={logo}
          alt=""
          width={size}
          height={size}
          className="size-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-(--item-accent)/14 font-mono text-xs font-semibold tracking-tight text-(--item-accent)",
        className,
      )}
      style={style}
    >
      {fallbackIcon ? (
        <Icon name={fallbackIcon} size={Math.round(size / 2)} />
      ) : (
        (abbr ?? initials(name))
      )}
    </span>
  );
}
