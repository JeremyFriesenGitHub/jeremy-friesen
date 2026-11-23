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

/** "Carleton AI Society" -> "CAS"; a name that is already initials ("IBM") stays whole. */
const initials = (name: string) =>
  /^[A-Z]{2,4}$/.test(name)
    ? name
    : name
        .split(/\s+/)
        .filter((word) => /^[A-Z]/.test(word))
        .map((word) => word[0])
        .join("")
        .slice(0, 4);

/** "/logos/x.webp" -> "/logos/ghost/x.webp", made by `npm run ghost-logos`. */
const ghostOf = (logo: string) =>
  logo.replace(/\/logos\/([^/]+)\.\w+$/, "/logos/ghost/$1.webp");

/**
 * An organization's mark beside its name: the logo when the site has one,
 * otherwise an icon or a monogram. Either is a ghost, a see-through tint of
 * the text colour, until its card is hovered or focused (`lit:`), when the
 * logo shows in full colour and an icon takes the item's accent. The name
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
          "relative flex shrink-0 overflow-hidden rounded-xl ghost-tile",
          className,
        )}
        style={style}
      >
        {/* The mark alone, painted in the ghost ink. Print and forced
            colours drop backgrounds, so they get the logo itself. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-current transition-opacity duration-350 print:hidden forced-colors:hidden lit:opacity-0"
          style={{
            maskImage: `url(${ghostOf(logo)})`,
            maskSize: "cover",
            maskPosition: "center",
            maskRepeat: "no-repeat",
          }}
        />
        <Image
          src={logo}
          alt=""
          width={size}
          height={size}
          className="relative size-full object-cover opacity-0 transition-opacity duration-350 print:opacity-100 forced-colors:opacity-100 lit:opacity-100"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl ghost-tile font-mono text-xs font-semibold tracking-tight lit:bg-(--item-accent)/14 lit:text-(--item-ink)",
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
