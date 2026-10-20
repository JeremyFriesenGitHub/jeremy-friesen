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
      "#community p.text-muted-foreground",
      "#hackathons p.text-muted-foreground",
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
}
