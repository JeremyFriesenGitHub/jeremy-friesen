/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

const isDev = process.env.NODE_ENV === "development";

/**
 * `'unsafe-inline'` is required for scripts because the App Router emits inline bootstrap and
 * RSC payload scripts, and `src/app/layout.tsx` inlines the theme-flash guard. Tightening this
 * to nonces would mean introducing middleware to stamp every response. Styles need it too:
 * Tailwind and the motion components set inline `style` attributes.
 *
 * Every asset the site renders is first-party, so `img-src`, `font-src` and `connect-src` are
 * locked to `'self'` (plus `data:`/`blob:` for inline SVG noise textures and canvas exports).
 */
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self' data:`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  `manifest-src 'self'`,
  `frame-src 'none'`,
  `worker-src 'self' blob:`,
  `upgrade-insecure-requests`,
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Hide the framework version from response headers. */
  poweredByHeader: false,

  images: {
    /** Serve AVIF where the browser supports it, falling back to WebP. */
    formats: ["image/avif", "image/webp"],
    /** No remote images are rendered anywhere, so the optimizer refuses every remote host. */
    remotePatterns: [],
    /** Remote SVGs stay disabled (the default) so an untrusted SVG can't script into the page. */
    contentDispositionType: "attachment",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default config;
