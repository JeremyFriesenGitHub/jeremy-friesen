import { caseStudyBySlug } from "./case-studies";

export type ProjectIcon =
  | "shield"
  | "plane"
  | "graph"
  | "brain"
  | "laptop"
  | "rocket"
  | "satellite"
  | "workflow"
  | "lock"
  | "layers"
  | "bot"
  | "cpu"
  | "leaf"
  | "radar"
  | "network"
  | "ghost";

/** The long-form story behind a project, shown at /projects/[slug]. */
export interface CaseStudy {
  /** One sentence under the title; also the page's description and link preview. */
  summary: string;
  problem: string[];
  approach: string[];
  result: string[];
  /** What I built, when the project was a team effort. */
  role?: string;
  team?: string[];
}

export interface Project {
  title: string;
  /** URL segment: /projects/[slug] when there is a case study. */
  slug: string;
  description: string;
  /** Month the project shipped or was last worked on, as YYYY-MM. Cards sort by it. */
  date: string;
  /** Primary destination (Devpost, live site or repository). */
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
  /** Short label under the description: a prize (award: true) or the event/role. */
  note?: string;
  award?: boolean;
  caseStudy?: CaseStudy;
}

export type CaseStudyProject = Project & { caseStudy: CaseStudy };

/**
 * Newest first. Hackathon builds link to Devpost, a demo video and source:
 * their backends are long gone, so there are no live-app links here.
 */
const entries: Project[] = [
  {
    title: "Trace",
    slug: "trace",
    description:
      "AI-assisted security investigation. Unsupervised anomaly detection that found a hidden 22-event attack in 180,800 unlabelled Apache log lines and grouped related events into incidents for analysts.",
    date: "2026-09",
    url: "https://devpost.com/software/loggr",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    images: [
      { src: "/images/trace-1.webp", alt: "Trace landing page" },
      { src: "/images/trace-2.webp", alt: "Trace investigation dashboard" },
    ],
    accent: { dark: "#9ba4ff", light: "#3730a3" },
    icon: "shield",
    colSpan: 2,
    tags: ["Python", "PyTorch", "scikit-learn", "Flask"],
    note: "1st place, CSE challenge at Hack the North 2026",
    award: true,
  },
  {
    title: "AEAC 2026 flight software",
    slug: "aeac-2026-flight-software",
    description:
      "Autonomous flight control, gimbal control and payload systems for Blackbird UAV's competition drone: Python and C++ on Raspberry Pi and Arduino, linked over Tailscale.",
    date: "2026-05",
    url: "https://github.com/Blackbird-UAV",
    images: [],
    accent: { dark: "#5eead4", light: "#0f766e" },
    icon: "satellite",
    colSpan: 1,
    tags: ["Python", "C++", "Raspberry Pi", "Arduino"],
    note: "Blackbird UAV, Software Lead",
  },
  {
    title: "MapleVault",
    slug: "maplevault",
    description:
      "Cryptographic provenance for Canadian defence supply chains: signed supplier attestations hash-linked across tiers, with a verifier that scored 98.3% on a 1,000-chain corpus.",
    date: "2026-05",
    url: "https://devpost.com/software/ctl-claude-del",
    repo: "https://github.com/JowiAoun/MapleVault",
    images: [
      {
        src: "/images/maplevault-1.webp",
        alt: "MapleVault system architecture diagram",
      },
    ],
    accent: { dark: "#6ee7b7", light: "#047857" },
    icon: "lock",
    colSpan: 1,
    tags: ["TypeScript", "FastAPI", "Cryptography", "Docker"],
    note: "Ottawa Defence Hackathon",
  },
  {
    title: "Land-cover segmentation",
    slug: "land-cover-segmentation",
    description:
      "Auto-tuned U-Net, DeepLabV3+ and FPN models with ResNet and EfficientNet encoders on aerial imagery of BC communities, joined to ParcelMap BC parcels for West Kelowna, Logan Lake and Cumberland.",
    date: "2026-04",
    url: "https://github.com/JeremyFriesenGitHub/DATA5000_Project",
    images: [],
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "layers",
    colSpan: 1,
    tags: ["PyTorch", "GeoPandas", "Computer vision"],
  },
  {
    title: "Agent²",
    slug: "agent2",
    description:
      "Your real estate agent's agent: text a number, take a short AI phone call about what you want, and get matched listings back by SMS.",
    date: "2026-03",
    url: "https://devpost.com/software/agent-o3l6si",
    repo: "https://github.com/chantalzhang/genaigenesis2026",
    video: "https://www.youtube.com/watch?v=hvT3rvw54yo",
    images: [{ src: "/images/agent2-1.webp", alt: "Agent² landing page" }],
    accent: { dark: "#6b93ff", light: "#1536b8" },
    icon: "bot",
    colSpan: 1,
    tags: ["Python", "FastAPI", "AWS", "Playwright"],
    note: "GenAI Genesis 2026",
  },
  {
    title: "Carleton AI Society",
    slug: "carleton-ai-society",
    description:
      "The club's website and documentation hub, which I now run as President.",
    date: "2026-06",
    url: "https://carletonai.com",
    repo: "https://github.com/carletonai/cais-website",
    images: [
      { src: "/images/cais-2.webp", alt: "Carleton AI Society homepage" },
    ],
    accent: { dark: "#9ba4ff", light: "#3730a3" },
    icon: "brain",
    colSpan: 1,
    tags: ["React", "Vite", "Tailwind CSS"],
  },
  {
    title: "Plante",
    slug: "plante",
    description:
      "A gamified, pixel-art smart plant monitor: Raspberry Pi sensors, an AI chat assistant and a museum you unlock by keeping plants alive.",
    date: "2026-01",
    url: "https://devpost.com/software/plante",
    repo: "https://github.com/JowiAoun/Plante",
    video: "https://www.youtube.com/watch?v=7n9EgHPRCC8",
    images: [
      { src: "/images/plante-1.webp", alt: "Plante pixel-art farm dashboard" },
    ],
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "leaf",
    colSpan: 1,
    tags: ["Next.js", "MongoDB", "Gemini", "Raspberry Pi"],
    note: "Best Designed Hack, uOttaHack 8",
    award: true,
  },
  {
    title: "Startup Idea Validator",
    slug: "startup-idea-validator",
    description:
      "Five AI personas stress-test a startup idea and remember earlier validations.",
    date: "2026-01",
    url: "https://github.com/JeremyFriesenGitHub/startup-idea-validator",
    images: [
      { src: "/images/validator-1.webp", alt: "Startup Idea Validator app" },
    ],
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "rocket",
    colSpan: 1,
    tags: ["FastAPI", "Backboard.io", "JavaScript"],
    note: "AGI Ventures Canada challenge",
  },
  {
    title: "Buildo",
    slug: "buildo",
    description:
      "Describe a hardware idea in plain English and get a parts list, firmware and an assembly guide, grounded in real components.",
    date: "2026-01",
    url: "https://devpost.com/software/product-creator-temp-name-conu-x",
    repo: "https://github.com/chantalzhang/conuhacks26",
    video: "https://www.youtube.com/watch?v=GzHThTiV9rA",
    images: [
      { src: "/images/buildo-1.webp", alt: "Buildo terminal-style interface" },
      {
        src: "/images/buildo-2.webp",
        alt: "Hardware prototype built from a Buildo guide",
      },
    ],
    accent: { dark: "#5eead4", light: "#0f766e" },
    icon: "cpu",
    colSpan: 2,
    tags: ["Next.js", "Flask", "Gemini API", "Snowflake Cortex"],
    note: "MLH Best Use of Gemini API, ConUHacks X",
    award: true,
  },
  {
    title: "Shazam 4 Drones",
    slug: "shazam-4-drones",
    description:
      "Drone detection and classification from audio signatures, built with Blackbird UAV.",
    date: "2025-11",
    url: "https://devpost.com/software/blackbird-uav-shazam-4-drones",
    repo: "https://github.com/Blackbird-UAV/icebreaker-hackathon-2025",
    images: [],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
    icon: "radar",
    colSpan: 1,
    tags: ["Next.js", "FastAPI", "scikit-learn", "SciPy"],
    note: "Shazam for Drones Hackathon",
  },
  {
    title: "Network Threat Explorer",
    slug: "network-threat-explorer",
    description:
      "Upload a capture and explore the traffic: Arkime and DuckDB under the hood, with Cohere summarising what looks suspicious.",
    date: "2025-09",
    url: "https://devpost.com/software/network-threat-explorer",
    repo: "https://github.com/JeremyFriesenGitHub/nte",
    video: "https://www.youtube.com/watch?v=ZuAKIEh6PcA",
    images: [
      {
        src: "/images/nte-1.webp",
        alt: "Network Threat Explorer upload screen",
      },
    ],
    accent: { dark: "#6b93ff", light: "#1536b8" },
    icon: "network",
    colSpan: 1,
    tags: ["Python", "Flask", "DuckDB", "Arkime"],
    note: "CSE prize, Hack the North 2025",
    award: true,
  },
  {
    title: "cuTunnel",
    slug: "cutunnel",
    description:
      "Find the shortest route through Carleton's underground tunnel system with an interactive graph of the campus.",
    date: "2025-03",
    url: "https://devpost.com/software/cu-tunnels",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    video: "https://www.youtube.com/watch?v=mcY5xvBvbc0",
    images: [{ src: "/images/cutunnel-1.webp", alt: "cuTunnel route map" }],
    accent: { dark: "#6ee7b7", light: "#047857" },
    icon: "graph",
    colSpan: 1,
    tags: ["JavaScript", "Dijkstra", "Cytoscape.js"],
    note: "Wolfram Award and People's Choice, cuHacking 6",
    award: true,
  },
  {
    title: "Blackbird UAV website",
    slug: "blackbird-uav-website",
    description:
      "Public site for Carleton's UAV design team. One of its two main contributors, with 160+ commits.",
    date: "2025-11",
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
    title: "cuHacking 2025 platform",
    slug: "cuhacking-2025-platform",
    description:
      "Website, portal and docs for Carleton's official hackathon, in an Nx monorepo.",
    date: "2024-12",
    url: "https://cuhacking.ca",
    repo: "https://github.com/cuhacking/2025",
    images: [{ src: "/images/cuhacking-2.webp", alt: "cuHacking website" }],
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "laptop",
    colSpan: 1,
    tags: ["TypeScript", "Next.js", "Nx"],
  },
  {
    title: "Event forms automation",
    slug: "event-forms-automation",
    description:
      "Playwright workflows that file cuHacking's event risk-management forms, saving the logistics team 10+ hours.",
    date: "2024-11",
    url: "https://github.com/JeremyFriesenGitHub/Event-Risk-Management-Forms-Automation",
    images: [],
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "workflow",
    colSpan: 1,
    tags: ["Playwright", "Node.js"],
  },
  {
    title: "Ghost hunter simulation",
    slug: "ghost-hunter-simulation",
    description:
      "A multi-threaded ghost hunt in C: hunters and a ghost run as pthreads sharing rooms and evidence, with Valgrind-clean memory management.",
    date: "2023-11",
    url: "https://github.com/JeremyFriesenGitHub/Multi-threaded-Ghost-Hunter-Simulation",
    images: [],
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "ghost",
    colSpan: 1,
    tags: ["C", "pthreads", "Valgrind"],
  },
];

/** The cards' data with each flagship project's case study attached. */
export const projects: Project[] = entries.map((p) => ({
  ...p,
  caseStudy: caseStudyBySlug[p.slug],
}));

/** Projects with a case-study page, newest first. */
export const caseStudies: CaseStudyProject[] = projects
  .filter((p): p is CaseStudyProject => p.caseStudy !== undefined)
  .sort((a, b) => b.date.localeCompare(a.date));
