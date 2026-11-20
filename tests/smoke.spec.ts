import { expect, test, type Page } from "@playwright/test";
import { requiredRatio, worstContrast } from "./contrast";

type Theme = "light" | "dark";

async function openHome(
  page: Page,
  theme: Theme,
  { lampPaused = false }: { lampPaused?: boolean } = {},
) {
  await page.addInitScript(
    ({ theme, lampPaused }: { theme: Theme; lampPaused: boolean }) => {
      try {
        localStorage.setItem("theme", theme);
        // What the navbar's effects toggle stores (hooks/use-effects.ts).
        if (lampPaused) localStorage.setItem("effects", "reduced");
      } catch {
        /* storage blocked: the OS theme applies */
      }
    },
    { theme, lampPaused },
  );
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

  const navLink = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Certifications" });
  await navLink.click();
  await expect(
    page.getByRole("heading", { level: 2, name: "Certifications" }),
  ).toBeInViewport();
  await expect(navLink).toHaveAttribute("aria-current", "location");

  // On a very tall screen the page ends before this short last section
  // reaches the middle of the viewport; at the bottom it is still the current
  // one. Back to the top first, so the click's "location" cannot stand in.
  await page.setViewportSize({ width: 1280, height: 2400 });
  await page.evaluate(() => scrollTo(0, 0));
  await expect(navLink).not.toHaveAttribute("aria-current", "location");
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await expect(navLink).toHaveAttribute("aria-current", "location");
  const sectionTop = await page
    .locator("#certifications")
    .evaluate((el) => el.getBoundingClientRect().top / innerHeight);
  expect(sectionTop, "the section sits below the band").toBeGreaterThan(0.45);

  // On a short screen the footer fills the view at the bottom of the page and
  // the section is behind the bar, so nothing is current.
  await page.setViewportSize({ width: 932, height: 430 });
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight - 650));
  await expect(navLink).toHaveAttribute("aria-current", "location");
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await expect(
    page
      .getByRole("navigation", { name: "Primary" })
      .locator('[aria-current="location"]'),
  ).toHaveCount(0);
});

test("the navbar keeps its logo under a content blocker and has no divider", async ({
  page,
}) => {
  await openHome(page, "dark");
  // Generic rules from EasyList's annoyance list: they hide "back to top"
  // widgets, and once hid this logo because of its label.
  await page.addStyleTag({
    content:
      '[aria-label="Back to top"], [title="Back to Top"], a[title="Back to top"], a[title="Back To Top"] { display: none !important }',
  });
  const nav = page.getByRole("navigation", { name: "Primary" });
  const logo = nav.locator('a[href="#top"]');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAccessibleName(/Jeremy Friesen/);

  const borders = await nav.locator("ul").evaluate((list) => {
    const cs = getComputedStyle(list);
    return [cs.borderLeftWidth, cs.borderRightWidth];
  });
  expect(borders).toEqual(["0px", "0px"]);
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

test("the old project pages are gone and their addresses lead to the projects section", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const locs = [...(await sitemap.text()).matchAll(/<loc>([^<]*)<\/loc>/g)];
  expect(locs).toHaveLength(1);
  expect(new URL(locs[0]![1]!).pathname).toBe("/");

  const old = await request.get("/projects/agent2", { maxRedirects: 0 });
  expect(old.status()).toBe(308);
  expect(old.headers().location).toBe("/#projects");

  await openHome(page, "dark");
  await expect(page.locator('a[href^="/projects"]')).toHaveCount(0);
});

test("the footer links the email address and the phone number", async ({
  page,
}) => {
  await openHome(page, "dark");
  const footer = page.locator("footer");
  const email = footer.locator('a[href^="mailto:"]');
  await expect(email).toHaveCount(1);
  expect(await email.getAttribute("href")).toBe(
    `mailto:${(await email.textContent())!.trim()}`,
  );
  const phone = footer.locator('a[href^="tel:"]');
  await expect(phone).toHaveCount(1);
  expect(await phone.getAttribute("href")).toMatch(/^tel:\+\d{11}$/);

  // The narrowest width at which the contact block sits beside the link
  // columns: every link stays on one line with its icon at full size.
  await page.setViewportSize({ width: 768, height: 800 });
  const squeezed = await footer.locator("ul a").evaluateAll((links) =>
    links
      .filter((a) => {
        const icon = a.querySelector("svg");
        return (
          a.getBoundingClientRect().height > 30 ||
          (icon !== null && icon.getBoundingClientRect().width < 13.9)
        );
      })
      .map((a) => a.textContent),
  );
  expect(squeezed, "footer links that wrap or shrink at 768px").toEqual([]);
});

test("every profile is linked from the bar, the phone menu and the footer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openHome(page, "dark");
  // The profiles search engines are told about (Person.sameAs in the JSON-LD).
  const profiles = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => {
      const data = JSON.parse(script.textContent ?? "{}") as {
        "@graph": { "@type": string; sameAs?: string[] }[];
      };
      return data["@graph"].find((n) => n["@type"] === "Person")?.sameAs ?? [];
    });
  expect(profiles.some((url) => url.startsWith("https://x.com/"))).toBe(true);

  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const url of profiles) {
    await expect(nav.locator(`a[href="${url}"]`)).toBeVisible();
    // Twice in the footer: the icon row and the "Elsewhere" column.
    await expect(page.locator(`footer a[href="${url}"]`).first()).toBeVisible();
  }

  // The narrowest phone: the menu's last row may wrap but must not spill.
  await page.setViewportSize({ width: 320, height: 700 });
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  for (const url of profiles) {
    await expect(menu.locator(`a[href="${url}"]`)).toBeVisible();
  }
  const spill = await menu.evaluate((el) => {
    const box = el.getBoundingClientRect();
    return Math.max(
      ...[...el.querySelectorAll("a")].map(
        (a) => a.getBoundingClientRect().right - box.right,
      ),
    );
  });
  expect(spill, "menu links stay inside the menu").toBeLessThanOrEqual(0);
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
      // Accent-coloured copy on glass (--item-ink): an employer, an award.
      "#experience h3 + p",
      "#hackathons h3 ~ p.font-medium",
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
    // The lamp holds a still frame, as with the site's own toggle. This is
    // about the bar over the screenshots, and drawing the moving lamp in
    // software took the test past its minute on a busy CI runner. The links
    // over the moving lamp are a probe in the test above.
    await openHome(page, theme, { lampPaused: true });
    await expect(page.locator("html")).toHaveClass(/reduce-effects/);
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
