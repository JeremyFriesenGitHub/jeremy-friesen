export type ProjectIcon =
  | "shield"
  | "plane"
  | "graph"
  | "brain"
  | "laptop"
  | "rocket"
  | "workflow"
  | "lock"
  | "layers"
  | "bot"
  | "cpu"
  | "leaf"
  | "radar"
  | "network";

export interface Project {
  title: string;
  /** TODO: Jeremy to write. Hidden while empty. */
  description: string;
  /** Month the project shipped or was last worked on, as YYYY-MM. Cards sort by it. */
  date: string;
  /** Primary destination (Devpost, live site or repository). */
  url: string;
  /** Source repository, when it differs from `url`. */
  repo?: string;
  /** Demo video (YouTube). */
  video?: string;
  /**
   * One screenshot per card. Left out for code-only work, which gets an icon
   * banner instead. `position: "center"` keeps the middle of the image in view
   * when a wide card crops it; screenshots default to their top.
   */
  image?: { src: string; alt: string; position?: "top" | "center" };
  accent: { dark: string; light: string };
  icon: ProjectIcon;
  tags: string[];
  /** Short label under the description: a prize (award: true) or the event/role. */
  note?: string;
  award?: boolean;
}

/**
 * Newest first. Hackathon builds link to Devpost, a demo video and source:
 * their backends are long gone, so there are no live-app links here.
 * Cards from the same month keep this order. Every card is one column wide.
 */
export const projects: Project[] = [
  {
    title: "Trace",
    description: "",
    date: "2026-09",
    url: "https://devpost.com/software/loggr",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    image: { src: "/images/trace-1.webp", alt: "Trace landing page" },
    accent: { dark: "#9ba4ff", light: "#3730a3" },
    icon: "shield",
    tags: ["Python", "PyTorch", "scikit-learn", "Flask"],
    note: "1st place, CSE challenge at Hack the North 2026",
    award: true,
  },
  {
    title: "MapleVault",
    description: "",
    date: "2026-05",
    url: "https://devpost.com/software/ctl-claude-del",
    repo: "https://github.com/JowiAoun/MapleVault",
    image: {
      src: "/images/maplevault-1.webp",
      alt: "MapleVault system architecture diagram",
    },
    accent: { dark: "#6ee7b7", light: "#047857" },
    icon: "lock",
    tags: ["TypeScript", "FastAPI", "Cryptography", "Docker"],
    note: "Ottawa Defence Hackathon",
  },
  {
    title: "Land-cover segmentation",
    description: "",
    date: "2026-04",
    url: "https://github.com/JeremyFriesenGitHub/DATA5000_Project",
    image: {
      src: "/images/landcover-1.webp",
      alt: "Risk map generated from the model output for Logan Lake",
    },
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "layers",
    tags: ["PyTorch", "GeoPandas", "Computer vision"],
  },
  {
    title: "Agent²",
    description: "",
    date: "2026-03",
    url: "https://devpost.com/software/agent-o3l6si",
    repo: "https://github.com/chantalzhang/genaigenesis2026",
    video: "https://www.youtube.com/watch?v=hvT3rvw54yo",
    image: { src: "/images/agent2-1.webp", alt: "Agent² landing page" },
    accent: { dark: "#6b93ff", light: "#1536b8" },
    icon: "bot",
    tags: ["Python", "FastAPI", "AWS", "Playwright"],
    note: "GenAI Genesis 2026",
  },
  {
    title: "Carleton AI Society",
    description: "",
    date: "2026-06",
    url: "https://carletonai.com",
    repo: "https://github.com/carletonai/cais-website",
    image: { src: "/images/cais-2.webp", alt: "Carleton AI Society homepage" },
    accent: { dark: "#9ba4ff", light: "#3730a3" },
    icon: "brain",
    tags: ["React", "Vite", "Tailwind CSS"],
  },
  {
    title: "Buildo",
    description: "",
    date: "2026-01",
    url: "https://devpost.com/software/product-creator-temp-name-conu-x",
    repo: "https://github.com/chantalzhang/conuhacks26",
    video: "https://www.youtube.com/watch?v=GzHThTiV9rA",
    image: {
      src: "/images/buildo-2.webp",
      alt: "Hardware prototype built from a Buildo guide",
    },
    accent: { dark: "#5eead4", light: "#0f766e" },
    icon: "cpu",
    tags: ["Next.js", "Flask", "Gemini API", "Snowflake Cortex"],
    note: "MLH Best Use of Gemini API, ConUHacks X",
    award: true,
  },
  {
    title: "Plante",
    description: "",
    date: "2026-01",
    url: "https://devpost.com/software/plante",
    repo: "https://github.com/JowiAoun/Plante",
    video: "https://www.youtube.com/watch?v=7n9EgHPRCC8",
    image: {
      src: "/images/plante-1.webp",
      alt: "Plante pixel-art farm dashboard",
    },
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "leaf",
    tags: ["Next.js", "MongoDB", "Gemini", "Raspberry Pi"],
    note: "Best Designed Hack, uOttaHack 8",
    award: true,
  },
  {
    title: "Startup Idea Validator",
    description: "",
    date: "2026-01",
    url: "https://github.com/JeremyFriesenGitHub/startup-idea-validator",
    image: {
      src: "/images/validator-1.webp",
      alt: "Startup Idea Validator app",
    },
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "rocket",
    tags: ["FastAPI", "Backboard.io", "JavaScript"],
    note: "AGI Ventures Canada challenge",
  },
  {
    title: "Shazam 4 Drones",
    description: "",
    date: "2025-11",
    url: "https://devpost.com/software/blackbird-uav-shazam-4-drones",
    repo: "https://github.com/Blackbird-UAV/icebreaker-hackathon-2025",
    image: { src: "/images/shazam-1.webp", alt: "Blackbird UAV logo" },
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
    icon: "radar",
    tags: ["Next.js", "FastAPI", "scikit-learn", "SciPy"],
    note: "Shazam for Drones Hackathon",
  },
  {
    title: "Network Threat Explorer",
    description: "",
    date: "2025-09",
    url: "https://devpost.com/software/network-threat-explorer",
    repo: "https://github.com/JeremyFriesenGitHub/nte",
    video: "https://www.youtube.com/watch?v=ZuAKIEh6PcA",
    image: {
      src: "/images/nte-1.webp",
      alt: "Network Threat Explorer upload screen",
    },
    accent: { dark: "#6b93ff", light: "#1536b8" },
    icon: "network",
    tags: ["Python", "Flask", "DuckDB", "Arkime"],
    note: "CSE prize, Hack the North 2025",
    award: true,
  },
  {
    title: "cuTunnel",
    description: "",
    date: "2025-03",
    url: "https://devpost.com/software/cu-tunnels",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    video: "https://www.youtube.com/watch?v=mcY5xvBvbc0",
    image: { src: "/images/cutunnel-1.webp", alt: "cuTunnel route map" },
    accent: { dark: "#6ee7b7", light: "#047857" },
    icon: "graph",
    tags: ["JavaScript", "Dijkstra", "Cytoscape.js"],
    note: "Wolfram Award and People's Choice, cuHacking 6",
    award: true,
  },
  {
    title: "Blackbird UAV website",
    description: "",
    date: "2025-11",
    url: "https://blackbirduav.ca",
    repo: "https://github.com/Blackbird-UAV/BlackbirdUAV-Website",
    image: { src: "/images/blackbird-1.webp", alt: "Blackbird UAV homepage" },
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
    icon: "plane",
    tags: ["React", "Next.js", "GitHub Actions"],
  },
  {
    title: "cuHacking 2025 platform",
    description: "",
    date: "2024-12",
    url: "https://docs.cuhacking.ca/",
    repo: "https://github.com/cuhacking/2025",
    image: {
      src: "/images/cuhacking-docs-1.webp",
      alt: "cuHacking 2025 DevDocs banner",
      position: "center",
    },
    accent: { dark: "#b08cff", light: "#5b21b6" },
    icon: "laptop",
    tags: ["TypeScript", "Next.js", "Nx"],
  },
  {
    title: "Risk management forms automation",
    description: "",
    date: "2024-11",
    url: "https://github.com/JeremyFriesenGitHub/Event-Risk-Management-Forms-Automation",
    image: {
      src: "/images/riskforms-1.webp",
      alt: "Event Risk Management page",
    },
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
    icon: "workflow",
    tags: ["Playwright", "Node.js"],
  },
];
