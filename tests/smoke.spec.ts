import { expect, test, type Page } from "@playwright/test";
import { requiredRatio, worstContrast } from "./contrast";

type Theme = "light" | "dark";

async function openHome(page: Page, theme: Theme) {
  await page.addInitScript((t: Theme) => {
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* storage blocked: the OS theme applies */
    }
  }, theme);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
}

/** Standard deviation of the pixels in a clip: a flat canvas is near zero. */
async function pixelSpread(
  page: Page,
  clip: { x: number; y: number; width: number; height: number },
) {
  const png = (await page.screenshot({ clip, type: "png" })).toString("base64");
  return page.evaluate(async (png) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let sum = 0;
    let sq = 0;
    let n = 0;
    for (let i = 0; i < d.length; i += 16) {
      const v = (d[i]! + d[i + 1]! + d[i + 2]!) / 3;
      sum += v;
      sq += v * v;
      n++;
    }
    const mean = sum / n;
    return Math.sqrt(sq / n - mean * mean);
  }, png);
}

test("the home page renders the hero and draws the lava lamp", async ({
  page,
}) => {
  await openHome(page, "dark");
  await expect(page).toHaveTitle(/Jeremy Friesen/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Jeremy Friesen",
  );
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();

  const canvas = page.locator("canvas");
  await expect(canvas).toHaveCount(1);
  // Text and tiles hidden: what is left is the lamp, which must not be flat.
  await page.addStyleTag({
    content: "main, header, .noise { visibility: hidden !important }",
  });
  const spread = await pixelSpread(page, {
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
  });
  expect(spread).toBeGreaterThan(8);
});

test("the projects grid shows eight cards, then all of them", async ({
  page,
}) => {
  await openHome(page, "dark");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important }",
  });
  const grid = page.locator("#projects .grid");
  const visible = () =>
    grid
      .locator(":scope > *")
      .evaluateAll(
        (els) =>
          els.filter((e) => getComputedStyle(e).display !== "none").length,
      );
  await grid.scrollIntoViewIfNeeded();
  expect(await visible()).toBe(8);

  const button = page.getByRole("button", { name: /Show \d+ more projects/ });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveCount(0);
  expect(await visible()).toBeGreaterThan(8);
  // Focus moved to the first revealed card, on screen.
  const focused = page.locator(":focus");
  await expect(focused).toBeInViewport();
});

test("the navbar frosts when the grid grows under it without a scroll", async ({
  page,
}) => {
  // Two columns: the first revealed card lands in view, so nothing scrolls.
  await page.setViewportSize({ width: 800, height: 900 });
  await openHome(page, "dark");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important }",
  });
  const frost = page.locator(
    'nav[aria-label="Primary"] > span[aria-hidden="true"]',
  );
  const button = page.getByRole("button", { name: /Show \d+ more projects/ });
  // Park the grid's end just above the bar, which puts the button behind it.
  await page.evaluate(() => {
    const grid = document.querySelector("#projects .grid")!;
    scrollTo(0, scrollY + grid.getBoundingClientRect().bottom + 20);
  });
  await expect(frost).toHaveCSS("opacity", "0");
  const before = await page.evaluate(() => scrollY);

  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveCount(0);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await expect(frost).toHaveCSS("opacity", "1");
});

test("the navbar fits its links from tablet width up", async ({ page }) => {
  // The narrowest width of each layout: links alone (md), with the socials
  // and the resume (lg), and with the name as well (xl).
  for (const width of [768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
    const fit = await page
      .locator('nav[aria-label="Primary"]')
      .evaluate((nav) => {
        const links = [...nav.querySelectorAll("ul a")];
        return {
          links: links.length,
          tallest: Math.max(
            ...links.map((a) => a.getBoundingClientRect().height),
          ),
          // The pill hugs its content up to the viewport less its margins.
          spare: innerWidth - 24 - nav.getBoundingClientRect().width,
          clipped: nav.scrollWidth - nav.clientWidth,
        };
      });
    expect(fit.links, `links shown at ${width}px`).toBeGreaterThan(0);
    expect(fit.tallest, `no link wraps at ${width}px`).toBeLessThan(40);
    expect(fit.clipped, `nothing is clipped at ${width}px`).toBeLessThanOrEqual(
      0,
    );
    // Room to spare, so a slightly wider font rendering still fits.
    expect(fit.spare, `spare room at ${width}px`).toBeGreaterThanOrEqual(24);
  }
});

test("each certification links to its credential and the navbar reaches the section", async ({
  page,
}) => {
  await openHome(page, "dark");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important }",
  });
  const links = page.locator("#certifications h3 a");
  expect(await links.count()).toBeGreaterThan(0);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\//);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }

  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Certifications" })
    .click();
  await expect(
    page.getByRole("heading", { level: 2, name: "Certifications" }),
  ).toBeInViewport();
});

test("the effects toggle pauses the lamp and the choice persists", async ({
  page,
}) => {
  await openHome(page, "dark");
  const html = page.locator("html");
  await page.getByRole("button", { name: "Pause background effects" }).click();
  await expect(html).toHaveClass(/reduce-effects/);
  expect(await page.evaluate(() => localStorage.getItem("effects"))).toBe(
    "reduced",
  );
  await expect(
    page.getByRole("button", { name: "Resume background effects" }),
  ).toBeVisible();

  await page.reload({ waitUntil: "networkidle" });
  await expect(html).toHaveClass(/reduce-effects/);
  // The lamp holds a still frame rather than disappearing.
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("case studies have their own page, link preview and sitemap entry", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  const match = /<loc>[^<]*\/projects\/([a-z0-9-]+)<\/loc>/.exec(xml);
  expect(match, "the sitemap lists at least one case study").not.toBeNull();
  const slug = match![1]!;

  await page.goto(`/projects/${slug}`, { waitUntil: "networkidle" });
  const title = await page.getByRole("heading", { level: 1 }).textContent();
  expect(title?.trim().length).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { name: "Built with" })).toBeVisible();

  const ogImage = await page
    .locator('meta[property="og:image"]')
    .first()
    .getAttribute("content");
  expect(ogImage).toContain(`/projects/${slug}/opengraph-image`);
  // The tag carries the canonical origin; fetch the same path from the server under test.
  const image = await request.get(new URL(ogImage!).pathname);
  expect(image.ok()).toBeTruthy();
  expect(image.headers()["content-type"]).toContain("image/png");
});

for (const theme of ["light", "dark"] as const) {
  test(`body text stays readable over the lamp (${theme})`, async ({
    page,
  }) => {
    await openHome(page, theme);
    await page.addStyleTag({
      content:
        "html { scroll-behavior: auto !important } * { animation: none !important; transition: none !important }",
    });
    const probes = [
      "#top > div.relative > p",
      'nav[aria-label="Primary"] ul',
      "#experience p.text-muted-foreground",
      "#community li span.text-sm",
      "#hackathons p.text-muted-foreground",
      "#certifications p.text-muted-foreground",
    ];
    for (const selector of probes) {
      const result = await worstContrast(page, selector);
      expect(result, `probe ${selector} found text`).not.toBeNull();
      const need = requiredRatio(result!.size, result!.weight);
      expect(
        result!.p5,
        `${selector} (${theme}) holds ${need}:1`,
      ).toBeGreaterThanOrEqual(need);
    }
  });

  test(`nav links stay readable over the project screenshots (${theme})`, async ({
    page,
  }) => {
    await openHome(page, theme);
    await page.addStyleTag({
      content:
        "html { scroll-behavior: auto !important } *, *::before, *::after { animation: none !important; transition: none !important }",
    });
    // The bar loads clear and frosts over once screenshots are underneath.
    const frost = page.locator(
      'nav[aria-label="Primary"] > span[aria-hidden="true"]',
    );
    await expect(frost).toHaveCSS("opacity", "0");

    await page.getByRole("button", { name: /Show \d+ more projects/ }).click();
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());

    // One scroll position per row of cards: its screenshots centred behind the bar.
    const stops = await page.evaluate(() => {
      const bar = document
        .querySelector('nav[aria-label="Primary"]')!
        .getBoundingClientRect();
      const tops = new Set<number>();
      for (const img of document.querySelectorAll("#projects .grid img")) {
        const r = img.getBoundingClientRect();
        if (r.height === 0) continue;
        tops.add(
          Math.round(
            scrollY + r.top + r.height / 2 - (bar.top + bar.height / 2),
          ),
        );
      }
      return [...tops];
    });
    expect(stops.length).toBeGreaterThan(2);

    for (const top of stops) {
      await page.evaluate((y) => scrollTo(0, y), top);
      // Lazy screenshots: measure once the ones in view have arrived.
      await page.waitForFunction(() =>
        [...document.querySelectorAll("#projects .grid img")].every((img) => {
          const r = img.getBoundingClientRect();
          const inView = r.height > 0 && r.bottom > 0 && r.top < innerHeight;
          return !inView || (img as HTMLImageElement).complete;
        }),
      );
      await expect(frost).toHaveCSS("opacity", "1");
      const result = await worstContrast(page, 'nav[aria-label="Primary"] ul');
      expect(result, "the nav links were measured").not.toBeNull();
      expect(
        result!.p5,
        `nav links at scrollY ${top} (${theme}) hold 4.5:1`,
      ).toBeGreaterThanOrEqual(requiredRatio(result!.size, result!.weight));
      // The probe must not have moved the page off the row being measured.
      expect(await page.evaluate(() => Math.round(scrollY))).toBe(top);

      // Hovered, the section's own link is the hardest case: its pill, its
      // hover fill and the bar's glow all sit between the text and the glass.
      const link = 'nav[aria-label="Primary"] ul a[href="#projects"]';
      await page.hover(link);
      const hovered = await worstContrast(page, link);
      expect(hovered, "the hovered link was measured").not.toBeNull();
      expect(
        hovered!.p5,
        `hovered Projects link at scrollY ${top} (${theme}) holds 4.5:1`,
      ).toBeGreaterThanOrEqual(requiredRatio(hovered!.size, hovered!.weight));
      await page.mouse.move(0, 700);
    }
  });
}
