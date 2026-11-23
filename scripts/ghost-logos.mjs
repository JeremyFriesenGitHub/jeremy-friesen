/**
 * Makes the ghost mask for each logo in public/logos: the logo's mark alone,
 * as white with alpha, written to public/logos/ghost/ under the same name.
 * The site paints it in the text colour (see `.ghost-logo` in globals.css),
 * so every logo reads as the same soft tint in either theme, whatever its
 * own background, and the full-colour logo shows on hover.
 *
 * How much of each pixel is "mark" depends on what the logo sits on:
 * - a dark square: the brighter a pixel, the more mark (its brightest
 *   channel, so red counts as much as white);
 * - a light square: the darker a pixel, the more mark (its darkest
 *   channel, so red counts as much as black);
 * - transparency: the logo's own alpha, shaded by brightness so the parts
 *   inside the outline stay apart.
 * The faintest tenth counts as background, which drops compression noise.
 *
 * Run after adding or changing a logo: `npm run ghost-logos`.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/logos");
const outDir = path.join(dir, "ghost");
await mkdir(outDir, { recursive: true });

const files = (await readdir(dir)).filter((f) =>
  /\.(webp|png|jpe?g)$/i.test(f),
);
for (const file of files) {
  const { data, info } = await sharp(path.join(dir, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const px = (x, y) =>
    data.subarray((y * width + x) * 4, (y * width + x) * 4 + 4);

  // The background is what the four corners agree on.
  const corners = [
    px(0, 0),
    px(width - 1, 0),
    px(0, height - 1),
    px(width - 1, height - 1),
  ];
  const transparent = corners.filter((c) => c[3] < 128).length >= 3;
  const luma = (c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  const dark =
    !transparent && corners.reduce((s, c) => s + luma(c), 0) / 4 < 0.5;

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const c = data.subarray(i * 4, i * 4 + 4);
    let a;
    if (transparent) a = (c[3] / 255) * (0.25 + 0.75 * luma(c));
    else if (dark) a = Math.max(c[0], c[1], c[2]) / 255;
    else a = 1 - Math.min(c[0], c[1], c[2]) / 255;
    out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = 255;
    // The logos are lossy, so their backgrounds are a little noisy: treat
    // the faintest tenth as background.
    a = (a - 0.1) / 0.9;
    out[i * 4 + 3] = Math.round(Math.min(Math.max(a, 0), 1) * 255);
  }
  const name = file.replace(/\.[^.]+$/, ".webp");
  await sharp(out, { raw: { width, height, channels: 4 } })
    .webp({ lossless: true })
    .toFile(path.join(outDir, name));
  console.log(
    `${file}: ${transparent ? "transparent" : dark ? "dark" : "light"} background`,
  );
}
