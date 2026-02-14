/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      }, // Microlink Image Preview
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
  },

  transpilePackages: ["geist"],
};

export default config;
