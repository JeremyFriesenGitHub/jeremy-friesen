import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests against the production build (tests/). `npm run build` first;
 * the config starts `next start` itself. Headless Chromium has no GPU, so
 * WebGL runs on SwiftShader, which is enough to prove the lava lamp draws.
 * PLAYWRIGHT_CHROMIUM_PATH points at a Chromium to use instead of the one
 * `npx playwright install` downloads.
 */
const port = 3100;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH ?? undefined,
      args: [
        "--use-gl=swiftshader",
        "--enable-webgl",
        "--ignore-gpu-blocklist",
      ],
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
