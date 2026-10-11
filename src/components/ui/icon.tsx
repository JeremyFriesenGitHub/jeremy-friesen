import type { SVGProps } from "react";
import type { SpriteIcon } from "~/lib/icons";
import { spriteUrl } from "~/lib/sprite";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: SpriteIcon;
  /** Width and height in CSS px, like react-icons' size. */
  size?: number;
}

/**
 * A decorative icon from the sprite (lib/icons.ts), hidden from assistive
 * technology: the text or label next to it carries the meaning. Colour comes
 * from `color` as with react-icons. Server components only, since the sprite
 * is built on the server.
 */
export function Icon({ name, size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" {...props}>
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
}
