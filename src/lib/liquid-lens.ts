/**
 * Real refraction for the liquid glass, in Chromium only. An SVG displacement
 * map given to `backdrop-filter: url(#…)` bends whatever is behind an
 * element's rim toward its centre, the way the edge of a thick lens does.
 * Safari and Firefox don't apply SVG filters to the backdrop, so they keep
 * the plain blur, and so do phones (battery) and anyone who asked for less
 * transparency. The CSS side is the `--lens` variable in globals.css.
 *
 * One <filter> per element size: the map has to match the element's box,
 * so elements of the same size and radius share one, counted by `users`.
 */

interface Lens {
  node: SVGFilterElement;
  users: number;
}

const SVG_NS = "http://www.w3.org/2000/svg";
const lenses = new Map<string, Lens>();
let defs: SVGSVGElement | null = null;

export function lensSupported(): boolean {
  if (typeof window === "undefined") return false;
  const brands = (
    navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    }
  ).userAgentData?.brands;
  if (!brands?.some((b) => b.brand === "Chromium")) return false;
  return (
    matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !matchMedia("(prefers-reduced-transparency: reduce)").matches
  );
}

/**
 * Red and green carry the x and y displacement (128 is none), pointing from
 * the rim toward the centre and fading out `bezel` pixels in. The fall-off
 * is steep, like the edge of a rounded slab: most of the bend sits in the
 * outer few pixels and the middle stays undistorted. Blue is how much of
 * the bent, barely blurred view shows over the frost: all of it at the rim,
 * none `bezel` pixels in.
 */
function displacementMap(w: number, h: number, r: number, bezel: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const hw = w / 2;
  const hh = h / 2;
  for (let j = 0; j < h; j++) {
    const py = j + 0.5 - hh;
    const qy = Math.abs(py) - (hh - r);
    for (let i = 0; i < w; i++) {
      const px = i + 0.5 - hw;
      const qx = Math.abs(px) - (hw - r);
      // Distance in from the rounded edge (0 on the rim).
      const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
      const inside = Math.min(Math.max(qx, qy), 0);
      const depth = r - outside - inside;
      let dx = 0;
      let dy = 0;
      let rim = 0;
      if (depth >= 0 && depth < bezel) {
        let nx: number;
        let ny: number;
        if (qx > 0 && qy > 0) {
          const len = Math.hypot(qx, qy) || 1;
          nx = (-Math.sign(px) * qx) / len;
          ny = (-Math.sign(py) * qy) / len;
        } else if (qx > qy) {
          nx = -Math.sign(px);
          ny = 0;
        } else {
          nx = 0;
          ny = -Math.sign(py);
        }
        const t = depth / bezel;
        const m = (1 - t) ** 2.4;
        dx = nx * m;
        dy = ny * m;
        rim = 1 - t * t * (3 - 2 * t);
      }
      const k = (j * w + i) * 4;
      data[k] = Math.round(128 + dx * 127);
      data[k + 1] = Math.round(128 + dy * 127);
      data[k + 2] = Math.round(rim * 255);
      data[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

function lensKey(w: number, h: number, r: number, bezel: number, blur: number) {
  return `${w}x${h}r${Math.round(r)}b${bezel}f${Math.round(blur)}`;
}

export function lensId(key: string) {
  return `lens-${key}`;
}

/**
 * Creates (or reuses) the filter for this box and returns its key. The
 * filter does the frosting too (`blur`, in px, replaces the CSS blur), so
 * the rim can show the bent view sharper than the frosted middle.
 */
export function acquireLens(
  w: number,
  h: number,
  r: number,
  bezel: number,
  blur: number,
): string | null {
  const key = lensKey(w, h, r, bezel, blur);
  const existing = lenses.get(key);
  if (existing) {
    existing.users++;
    return key;
  }
  const map = displacementMap(w, h, r, bezel);
  if (!map) return null;
  if (!defs) {
    defs = document.createElementNS(SVG_NS, "svg");
    defs.setAttribute("aria-hidden", "true");
    defs.setAttribute("width", "0");
    defs.setAttribute("height", "0");
    defs.style.position = "absolute";
    defs.style.pointerEvents = "none";
    document.body.appendChild(defs);
  }
  const filter = document.createElementNS(SVG_NS, "filter");
  filter.id = lensId(key);
  for (const [name, value] of [
    ["x", "0"],
    ["y", "0"],
    ["width", String(w)],
    ["height", String(h)],
    ["filterUnits", "userSpaceOnUse"],
    ["primitiveUnits", "userSpaceOnUse"],
    ["color-interpolation-filters", "sRGB"],
  ])
    filter.setAttribute(name!, value!);
  const add = (tag: string, attrs: Record<string, string>) => {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [name, value] of Object.entries(attrs))
      node.setAttribute(name, value);
    filter.appendChild(node);
  };
  // The frost: the same blur the CSS would apply. Outside the box the blur
  // reads transparency, which would fade the edges, so alpha is set back to
  // one; colour matrices work on unpremultiplied colour, which leaves each
  // pixel the average of the backdrop pixels inside the box.
  add("feGaussianBlur", {
    in: "SourceGraphic",
    stdDeviation: String(blur),
    result: "blurred",
  });
  add("feColorMatrix", {
    in: "blurred",
    type: "matrix",
    values: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1",
    result: "frost",
  });
  // The rim: the backdrop bent toward the centre, only lightly softened.
  add("feImage", {
    href: map,
    x: "0",
    y: "0",
    width: String(w),
    height: String(h),
    preserveAspectRatio: "none",
    result: "map",
  });
  add("feDisplacementMap", {
    in: "SourceGraphic",
    in2: "map",
    // The largest bend, at the very rim, is half of this: more than the
    // bezel is wide, so the rim visibly gathers in what lies further inside.
    scale: String(bezel * 3.3),
    xChannelSelector: "R",
    yChannelSelector: "G",
    result: "bent",
  });
  add("feGaussianBlur", {
    in: "bent",
    stdDeviation: String(Math.max(1, Math.min(4, blur / 7))),
    result: "bentSoft",
  });
  // Blue becomes alpha: the bent view over the frost, fading out inward.
  add("feColorMatrix", {
    in: "map",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0",
    result: "rim",
  });
  add("feComposite", {
    in: "bentSoft",
    in2: "rim",
    operator: "in",
    result: "edge",
  });
  add("feComposite", { in: "edge", in2: "frost", operator: "over" });
  defs.appendChild(filter);
  lenses.set(key, { node: filter, users: 1 });
  return key;
}

export function releaseLens(key: string) {
  const lens = lenses.get(key);
  if (!lens) return;
  lens.users--;
  if (lens.users > 0) return;
  lens.node.remove();
  lenses.delete(key);
}
