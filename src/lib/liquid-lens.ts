/**
 * Real refraction for the liquid glass, in Chromium only. An SVG displacement
 * map given to `backdrop-filter: url(#…)` bends whatever is behind an
 * element's rim toward its centre, the way the edge of a thick lens does.
 * Safari and Firefox don't apply SVG filters to the backdrop, so they keep
 * the plain blur, and so do phones (battery) and anyone who asked for less
 * transparency. The CSS side is the `--lens` variable in globals.css.
 *
 * It is the costliest thing the glass does: every lens on screen is drawn
 * again whenever what lies behind it changes, which is each lamp frame and
 * each scroll frame. So it goes only where the bend shows: the navbar, which
 * content scrolls under, and the few small glass buttons. Cards and the
 * hero's floating tiles don't get one: behind their rims there is only the
 * smooth lamp, where the bend changes no pixel by more than about 5%.
 *
 * One <filter> per element size and blur: the map has to match the
 * element's box, so elements of the same size and radius share one, counted
 * by `users`. The map image itself is shared across blurs, so a theme switch
 * (which changes the blur) only makes new filters, not new maps.
 */

interface Lens {
  node: SVGFilterElement;
  users: number;
  map: string;
}

interface MapImage {
  url: string;
  users: number;
}

const SVG_NS = "http://www.w3.org/2000/svg";
const lenses = new Map<string, Lens>();
const maps = new Map<string, MapImage>();
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
 * The map's pixels. Red and green carry the x and y displacement (128 is
 * none), pointing from the rim toward the centre and fading out `bezel`
 * pixels in. The fall-off is steep, like the edge of a rounded slab: most of
 * the bend sits in the outer few pixels and the middle stays undistorted.
 * Blue is how much of the bent, barely blurred view shows over the frost:
 * all of it at the rim, none `bezel` pixels in.
 *
 * Everything further in than the bezel is the same neutral pixel, so only
 * the ring near the edge is worked out: full rows within reach of the top
 * and bottom (and of the rounded corners), and just the bezel's columns at
 * either side of the rows between.
 */
export function mapPixels(w: number, h: number, r: number, bezel: number) {
  const data = new Uint8ClampedArray(w * h * 4);
  const neutral = new Uint8ClampedArray([128, 128, 0, 255]);
  new Uint32Array(data.buffer).fill(new Uint32Array(neutral.buffer)[0]!);
  const hw = w / 2;
  const hh = h / 2;

  const shade = (i: number, j: number) => {
    const py = j + 0.5 - hh;
    const qy = Math.abs(py) - (hh - r);
    const px = i + 0.5 - hw;
    const qx = Math.abs(px) - (hw - r);
    // Distance in from the rounded edge (0 on the rim).
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
    const inside = Math.min(Math.max(qx, qy), 0);
    const depth = r - outside - inside;
    if (depth < 0 || depth >= bezel) return;
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
    const rim = 1 - t * t * (3 - 2 * t);
    const k = (j * w + i) * 4;
    data[k] = Math.round(128 + nx * m * 127);
    data[k + 1] = Math.round(128 + ny * m * 127);
    data[k + 2] = Math.round(rim * 255);
  };

  // Rows this close to the top or bottom can hold rim pixels anywhere
  // across (the corners curve in by up to `r`); rows between only near the
  // sides, where the depth is simply the distance to the side.
  const band = Math.ceil(Math.max(r, bezel)) + 1;
  const side = Math.min(Math.ceil(bezel) + 1, Math.ceil(hw));
  for (let j = 0; j < h; j++) {
    if (j < band || j >= h - band) {
      for (let i = 0; i < w; i++) shade(i, j);
    } else {
      for (let i = 0; i < side; i++) shade(i, j);
      for (let i = Math.max(side, w - side); i < w; i++) shade(i, j);
    }
  }
  return data;
}

function mapImage(w: number, h: number, r: number, bezel: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.putImageData(new ImageData(mapPixels(w, h, r, bezel), w, h), 0, 0);
  return canvas.toDataURL("image/png");
}

function mapKey(w: number, h: number, r: number, bezel: number) {
  return `${w}x${h}r${Math.round(r)}b${bezel}`;
}

export function lensKey(
  w: number,
  h: number,
  r: number,
  bezel: number,
  blur: number,
) {
  return `${mapKey(w, h, r, bezel)}f${Math.round(blur)}`;
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
  const mk = mapKey(w, h, r, bezel);
  let map = maps.get(mk);
  if (!map) {
    const url = mapImage(w, h, r, bezel);
    if (!url) return null;
    map = { url, users: 0 };
    maps.set(mk, map);
  }
  map.users++;
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
    result: "opaque",
  });
  // Alpha one is only right where there is a backdrop at all. While a parent
  // fades in (opacity below 1), the glass sees only that parent, which is
  // transparent, and forcing alpha would turn it black; the plain CSS blur
  // leaves it transparent, so this does too.
  add("feComposite", {
    in: "opaque",
    in2: "SourceAlpha",
    operator: "in",
    result: "frost",
  });
  // The rim: the backdrop bent toward the centre, only lightly softened.
  add("feImage", {
    href: map.url,
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
  lenses.set(key, { node: filter, users: 1, map: mk });
  return key;
}

export function releaseLens(key: string) {
  const lens = lenses.get(key);
  if (!lens) return;
  lens.users--;
  if (lens.users > 0) return;
  lens.node.remove();
  lenses.delete(key);
  const map = maps.get(lens.map);
  if (map && --map.users <= 0) maps.delete(lens.map);
}

/**
 * Calls `onChange` when something a filter is built from may have changed
 * without any element resizing: the theme (each has its own --glass-blur),
 * the small-screen blur, or effects being paused or resumed. One observer
 * is shared by every lens on the page.
 */
const watchers = new Set<() => void>();
let stopWatching: (() => void) | null = null;

export function watchLensInputs(onChange: () => void) {
  watchers.add(onChange);
  if (!stopWatching) {
    const notify = () => watchers.forEach((fn) => fn());
    const mo = new MutationObserver(notify);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const small = matchMedia("(max-width: 640px)");
    small.addEventListener("change", notify);
    stopWatching = () => {
      mo.disconnect();
      small.removeEventListener("change", notify);
    };
  }
  return () => {
    watchers.delete(onChange);
    if (watchers.size || !stopWatching) return;
    stopWatching();
    stopWatching = null;
  };
}
