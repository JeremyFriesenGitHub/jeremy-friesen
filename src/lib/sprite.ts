import { createHash } from "node:crypto";
import type { ReactElement, ReactNode } from "react";
import type { IconType } from "react-icons";
import { spriteIcons, type SpriteIcon } from "~/lib/icons";

/**
 * The SVG sprite behind components/ui/icon.tsx, built from react-icons' own
 * data at build time. Server only: it is assembled with Node's crypto module
 * and must not be imported from a client component.
 *
 * react-icons stores an icon as a tree of React props. Rendering one gives
 * <IconBase attr={root attributes}>{shape elements}</IconBase>, where IconBase
 * would draw the <svg>; here each becomes a <symbol> instead.
 */

/** React prop names back to SVG attributes; viewBox is camelCase in SVG too. */
const attributeName = (key: string) =>
  key === "viewBox"
    ? key
    : key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const attributes = (props: Record<string, unknown>) =>
  Object.entries(props)
    .filter(
      ([key, value]) =>
        key !== "children" &&
        key !== "role" &&
        (typeof value === "string" || typeof value === "number"),
    )
    .map(
      ([key, value]) =>
        ` ${attributeName(key)}="${escapeAttribute(String(value))}"`,
    )
    .join("");

const markup = (node: ReactNode): string => {
  if (Array.isArray(node)) return node.map(markup).join("");
  if (!node || typeof node !== "object" || !("type" in node)) return "";
  const element = node as ReactElement<Record<string, unknown>>;
  if (typeof element.type !== "string") return "";
  const children = markup(element.props.children as ReactNode);
  return `<${element.type}${attributes(element.props)}>${children}</${element.type}>`;
};

const symbol = (name: string, Icon: IconType) => {
  const element = Icon({}) as ReactElement<{
    attr: Record<string, string>;
    children?: ReactNode;
  }>;
  // IconBase's defaults, then the icon's own root attributes, as it renders them.
  const root = {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    ...element.props.attr,
  };
  return `<symbol id="${name}"${attributes(root)}>${markup(element.props.children)}</symbol>`;
};

export const spriteSvg = `<svg xmlns="http://www.w3.org/2000/svg">${(
  Object.keys(spriteIcons) as SpriteIcon[]
)
  .map((name) => symbol(name, spriteIcons[name]))
  .join("")}</svg>`;

/** Changes whenever an icon does, so the sprite can be cached for good. */
export const spriteVersion = createHash("sha256")
  .update(spriteSvg)
  .digest("hex")
  .slice(0, 8);

export const spriteUrl = `/icons.svg?v=${spriteVersion}`;
