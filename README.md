# jeremy-friesen.com

Personal portfolio of Jeremy Friesen, Computer Science student at Carleton University.
Live at [jeremy-friesen.com](https://jeremy-friesen.com).

## Stack

- **Next.js 16** (App Router, Turbopack) on **React 19** and **TypeScript**
- **Tailwind CSS v4** with a CSS-first design system (`src/app/globals.css`)
- No animation library: scroll reveals, the hero word rotation and magnetic hover are
  CSS transitions/keyframes driven by one `IntersectionObserver` and a few pointer handlers
- A single-pass **WebGL** "liquid aurora" background with a CSS fallback
- Hosted on **Vercel**; CI on GitHub Actions (`npm ci`, lint, typecheck, build, audit)

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run check      # eslint + tsc --noEmit (CI runs this and then `npm run build`)
npm run build      # production build
npm run preview    # build, then serve the production build
npm run format:write
```

## Content

All copy and links live in `src/data/`:

| File              | What it drives                                             |
| ----------------- | ---------------------------------------------------------- |
| `social-links.ts` | Profile, hero copy, about text, nav items, socials         |
| `experience.ts`   | Timeline entries                                           |
| `projects.ts`     | "Selected work" bento grid (images in `public/images`)     |
| `hackathons.ts`   | Hackathon submissions, awards, judging and stats           |
| `community.ts`    | Club and team roles (CAIS, Blackbird UAV, cuHacking, CCSS) |
| `skills.ts`       | Skill categories and icon mapping                          |

## Design notes

- **Theme:** `html.dark` toggles dark mode; the choice is persisted in `localStorage`
  and otherwise follows the OS. An inline script in `layout.tsx` applies it before
  first paint, and the toggle uses the View Transitions API where available.
- **Glass:** `.glass`, `.glass-strong` and `.glass-pill` utilities in `globals.css`.
  Cards pass pointer position to `--mx`/`--my` for the specular highlight. Nested
  elements use `.glass-pill` (no backdrop blur) to keep compositing cheap.
- **Background:** `src/components/background/liquid-background.tsx` renders at
  roughly half resolution, caps itself at 30 fps (20 fps below the hero), pauses
  when the tab is hidden, and draws a single static frame for reduced-motion or
  data-saver users.
- **Security headers** (CSP, HSTS, COOP/CORP, Permissions-Policy) are set in
  `next.config.js`.

## Project structure

```
├── .github/workflows/ci.yml
├── public/images/               # optimised WebP assets
├── src/
│   ├── app/                     # layout, page, globals.css, metadata routes, icons
│   ├── components/
│   │   ├── background/          # WebGL aurora + loader
│   │   ├── effects/             # magnetic hover
│   │   ├── sections/            # hero, about, experience, projects, hackathons, skills, footer
│   │   ├── ui/                  # glass-card, glass-button, chip, reveal, section, theme-toggle
│   │   └── navbar.tsx
│   ├── data/                    # all site content
│   ├── hooks/                   # use-theme, use-active-section, use-pointer-glow
│   ├── lib/                     # cn(), site constants
│   └── env.js                   # validated environment variables
├── eslint.config.js
├── next.config.js
├── postcss.config.js
├── prettier.config.js
└── tsconfig.json
```

## Environment

| Variable               | Purpose                                      | Default                      |
| ---------------------- | -------------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/robots | `https://jeremy-friesen.com` |

## Contributing

Issues and pull requests are welcome. `main` is protected: open a PR and let the
CI workflow's `check` job run. After changing dependencies, regenerate the lockfile
with `npx npm@10 install --package-lock-only` so it stays compatible with the npm
that ships with Node 22 in CI.

## License

MIT, see [LICENSE](LICENSE).
