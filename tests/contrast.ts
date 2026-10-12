import type { Page } from "@playwright/test";

/**
 * Measures the contrast of real text against whatever is actually behind it,
 * since the lava lamp puts a different colour under every glyph. For each
 * selector: find its text runs, make the glyphs transparent, screenshot the
 * element's box, and compare the text colour with every backdrop pixel under
 * the runs. Returns the 5th-percentile ratio, so a few bright pixels under a
 * descender do not fail the page but a wash under a line does.
 */
export async function worstContrast(
  page: Page,
  selector: string,
): Promise<{ p5: number; size: number; weight: number } | null> {
  const el = await page.$(selector);
  if (!el) return null;
  await el.evaluate((e) =>
    e.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await page.waitForTimeout(150);

  const runs = await el.evaluate((e) => {
    const out: {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      size: number;
      weight: number;
    }[] = [];
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!node.textContent?.trim()) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      const cs = getComputedStyle(parent);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (
          r.width > 1 &&
          r.height > 1 &&
          r.top >= 0 &&
          r.bottom <= innerHeight
        )
          out.push({
            x: r.left,
            y: r.top,
            w: r.width,
            h: r.height,
            color: cs.color,
            size: parseFloat(cs.fontSize),
            weight: Number(cs.fontWeight),
          });
      }
    }
    return out;
  });
  if (runs.length === 0) return null;

  const box = await el.boundingBox();
  if (!box) return null;
  const viewport = page.viewportSize() ?? { width: 1280, height: 800 };
  const clip = {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(box.width, viewport.width - Math.max(0, box.x)),
    height: Math.min(box.height, viewport.height - Math.max(0, box.y)),
  };

  // Hide the glyphs but keep every background, including the element's own glass.
  const restore = await el.evaluateHandle((e) => {
    const parents = new Set<HTMLElement>();
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (node.textContent?.trim() && node.parentElement)
        parents.add(node.parentElement);
    }
    const saved = [...parents].map((p) => ({
      p,
      color: p.style.color,
      fill: p.style.webkitTextFillColor,
    }));
    for (const { p } of saved) {
      p.style.color = "transparent";
      p.style.webkitTextFillColor = "transparent";
    }
    return saved;
  });
  const png = (await page.screenshot({ clip, type: "png" })).toString("base64");
  await restore.evaluate((saved) => {
    for (const { p, color, fill } of saved) {
      p.style.color = color;
      p.style.webkitTextFillColor = fill;
    }
  });

  return page.evaluate(
    async ({ png, runs, clip }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return null;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const lin = (v: number) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const lum = (r: number, g: number, b: number) =>
        0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      const toRgba = (col: string) => {
        const t = document.createElement("canvas");
        t.width = t.height = 1;
        const tc = t.getContext("2d")!;
        tc.fillStyle = col;
        tc.fillRect(0, 0, 1, 1);
        const v = tc.getImageData(0, 0, 1, 1).data;
        return [v[0]!, v[1]!, v[2]!, v[3]! / 255] as const;
      };
      // The screenshot is device pixels; runs are CSS pixels.
      const scale = canvas.width / clip.width;
      const ratios: number[] = [];
      let size = 0;
      let weight = 0;
      for (const run of runs) {
        const [tr, tg, tb, a] = toRgba(run.color);
        size = run.size;
        weight = run.weight;
        const x0 = Math.max(0, Math.floor((run.x - clip.x) * scale));
        const y0 = Math.max(0, Math.floor((run.y - clip.y) * scale));
        const x1 = Math.min(
          canvas.width,
          Math.ceil((run.x + run.w - clip.x) * scale),
        );
        const y1 = Math.min(
          canvas.height,
          Math.ceil((run.y + run.h - clip.y) * scale),
        );
        for (let y = y0; y < y1; y += 2) {
          for (let x = x0; x < x1; x += 2) {
            const i = (y * canvas.width + x) * 4;
            const R = data[i]!;
            const G = data[i + 1]!;
            const B = data[i + 2]!;
            const r = a * tr + (1 - a) * R;
            const g = a * tg + (1 - a) * G;
            const b = a * tb + (1 - a) * B;
            const lb = lum(R, G, B);
            const lt = lum(r, g, b);
            ratios.push((Math.max(lb, lt) + 0.05) / (Math.min(lb, lt) + 0.05));
          }
        }
      }
      if (ratios.length === 0) return null;
      ratios.sort((p, q) => p - q);
      return {
        p5: ratios[Math.floor(0.05 * (ratios.length - 1))]!,
        size,
        weight,
      };
    },
    { png, runs, clip },
  );
}

/** WCAG AA: 4.5:1 for body text, 3:1 for large text (24px, or 18.66px bold). */
export function requiredRatio(size: number, weight: number): number {
  return size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
}
