export type ProjectIcon =
  | "shield"
  | "timer"
  | "plane"
  | "graph"
  | "brain"
  | "laptop"
  | "rocket"
  | "satellite"
  | "workflow";

export interface Project {
  title: string;
  description: string;
  /** Primary destination (live site or repository). */
  url: string;
  /** Source repository, when it differs from `url`. */
  repo?: string;
  /** Demo video (YouTube). */
  video?: string;
  /** Screenshot(s). Empty for code-only work, which gets an icon banner instead. */
  images: { src: string; alt: string }[];
  accent: { dark: string; light: string };
  icon: ProjectIcon;
  /** Grid columns on desktop. */
  colSpan: 1 | 2;
  tags: string[];
  /** Short label for the card footer, e.g. a prize or role. */
  note?: string;
}

export const projects: Project[] = [
  {
    title: "Trace",
    description:
      "AI-assisted security investigation. Unsupervised anomaly detection that found a hidden 22-event attack in 180,800 unlabeled Apache log lines, then groups related events into incidents for analysts.",
    url: "https://devpost.com/software/loggr",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    images: [{ src: "/images/trace-1.webp", alt: "Trace landing page" }],
    accent: { dark: "#ff6b7a", light: "#b3101f" },
    icon: "shield",
    colSpan: 2,
    tags: ["Python", "PyTorch", "scikit-learn", "Flask"],
    note: "1st place, Hack the North 2026",
  },
  {
    title: "Prodly",
    description:
      "An AI productivity platform with a Pomodoro timer, planner and assistant.",
    url: "https://github.com/JeremyFriesenGitHub/prodly",
    images: [{ src: "/images/prodly-1.webp", alt: "Prodly landing page" }],
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "timer",
    colSpan: 1,
    tags: ["Next.js", "TypeScript", "AI"],
    note: "Best UI, Build to Convert",
  },
  {
    title: "Blackbird UAV website",
    description:
      "Public site for Carleton's UAV design team, built and shipped as the team's top contributor.",
    url: "https://blackbirduav.ca",
    repo: "https://github.com/Blackbird-UAV/BlackbirdUAV-Website",
    images: [
      { src: "/images/blackbird-1.webp", alt: "Blackbird UAV homepage" },
    ],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
    icon: "plane",
    colSpan: 1,
    tags: ["React", "Next.js", "GitHub Actions"],
  },
  {
    title: "cuTunnel",
    description:
      "Find the shortest route through Carleton's underground tunnel system with an interactive graph of the campus.",
    url: "https://devpost.com/software/cu-tunnels",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    video: "https://www.youtube.com/watch?v=mcY5xvBvbc0",
    images: [{ src: "/images/cutunnel-1.webp", alt: "cuTunnel route map" }],
    accent: { dark: "#ffa14d", light: "#9a3f00" },
    icon: "graph",
    colSpan: 2,
    tags: ["JavaScript", "Dijkstra", "Cytoscape.js"],
    note: "Wolfram Award and People's Choice, cuHacking 6",
  },
  {
    title: "Carleton AI Society",
    description:
      "The club's website and documentation hub, which I now run as President.",
    url: "https://carletonai.com",
    repo: "https://github.com/carletonai/cais-website",
    images: [
      { src: "/images/cais-2.webp", alt: "Carleton AI Society homepage" },
    ],
    accent: { dark: "#ff6b7a", light: "#b3101f" },
    icon: "brain",
    colSpan: 1,
    tags: ["React", "Vite", "Tailwind CSS"],
  },
  {
    title: "Startup Idea Validator",
    description:
      "Five AI personas stress-test a startup idea and remember earlier validations.",
    url: "https://github.com/JeremyFriesenGitHub/startup-idea-validator",
    images: [
      { src: "/images/validator-1.webp", alt: "Startup Idea Validator app" },
    ],
    accent: { dark: "#6b93ff", light: "#1536b8" },
    icon: "rocket",
    colSpan: 1,
    tags: ["FastAPI", "Backboard.io", "JavaScript"],
  },
  {
    title: "cuHacking 2025 platform",
    description:
      "Website, portal and docs for Carleton's official hackathon, in an Nx monorepo.",
    url: "https://cuhacking.ca",
    repo: "https://github.com/cuhacking/2025",
    images: [{ src: "/images/cuhacking-2.webp", alt: "cuHacking website" }],
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "laptop",
    colSpan: 1,
    tags: ["TypeScript", "Next.js", "Nx"],
  },
  {
    title: "AEAC 2026 flight software",
    description:
      "Autonomous flight control, gimbal control and payload systems for Blackbird UAV's competition drone: Python and C++ on Raspberry Pi and Arduino, linked over Tailscale.",
    url: "https://github.com/Blackbird-UAV/AEAC-2026",
    images: [],
    accent: { dark: "#ffd166", light: "#8a5a00" },
    icon: "satellite",
    colSpan: 2,
    tags: ["Python", "C++", "Raspberry Pi", "Arduino"],
  },
  {
    title: "Event forms automation",
    description:
      "Playwright workflows that file cuHacking's event risk-management forms, saving the logistics team 10+ hours.",
    url: "https://github.com/JeremyFriesenGitHub/Event-Risk-Management-Forms-Automation",
    images: [],
    accent: { dark: "#7dd49e", light: "#1e5b35" },
    icon: "workflow",
    colSpan: 1,
    tags: ["Playwright", "Node.js"],
  },
];
