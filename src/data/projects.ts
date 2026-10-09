export type ProjectIcon =
  | "timer"
  | "docs"
  | "graph"
  | "computer"
  | "database"
  | "ai";

export interface Project {
  title: string;
  description: string;
  /** Primary destination (live site or repository). */
  url: string;
  /** Source repository, when it differs from `url`. */
  repo?: string;
  images: { src: string; alt: string }[];
  accent: { dark: string; light: string };
  icon: ProjectIcon;
  /** Grid columns on tablet and up. */
  colSpan: 1 | 2;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Prodly",
    description: "An AI-powered productivity platform.",
    url: "https://jeremyfriesengithub.github.io/prodly/",
    repo: "https://github.com/JeremyFriesenGitHub/prodly",
    images: [
      { src: "/images/prodly-1.webp", alt: "Prodly landing page" },
      { src: "/images/prodly-2.webp", alt: "Prodly Pomodoro timer" },
    ],
    accent: { dark: "#c48ae8", light: "#7822ae" },
    icon: "timer",
    colSpan: 2,
    tags: ["Next.js", "TypeScript", "AI"],
  },
  {
    title: "CAIS Docs",
    description: "Documentation hub for the Carleton AI Society.",
    url: "https://carletonai.github.io/docs/",
    images: [{ src: "/images/cais-1.webp", alt: "Carleton AI Society docs" }],
    accent: { dark: "#e88a8a", light: "#9d1f1f" },
    icon: "docs",
    colSpan: 1,
    tags: ["Documentation", "Community"],
  },
  {
    title: "cuTunnel",
    description:
      "Find the shortest route through Carleton's underground tunnel system.",
    url: "https://devpost.com/software/cu-tunnels",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    images: [
      { src: "/images/cutunnel-1.webp", alt: "cuTunnel route map" },
      { src: "/images/cutunnel-2.webp", alt: "cuTunnel presentation slide" },
    ],
    accent: { dark: "#e8907a", light: "#8f3018" },
    icon: "graph",
    colSpan: 2,
    tags: ["JavaScript", "Dijkstra", "Cytoscape.js"],
  },
  {
    title: "cuHacking",
    description: "Carleton's official student-run hackathon.",
    url: "https://cuhacking.ca",
    images: [{ src: "/images/cuhacking-1.webp", alt: "cuHacking website" }],
    accent: { dark: "#7dd49e", light: "#1e5b35" },
    icon: "computer",
    colSpan: 1,
    tags: ["TypeScript", "Open source"],
  },
  {
    title: "Statsbomb DBMS",
    description: "An open-source football data DBMS built on StatsBomb open data.",
    url: "https://github.com/JeremyFriesenGitHub/Statsbomb_DBMS",
    images: [{ src: "/images/statsbomb-1.webp", alt: "Statsbomb DBMS code" }],
    accent: { dark: "#6ec4e8", light: "#125672" },
    icon: "database",
    colSpan: 1,
    tags: ["Python", "PostgreSQL"],
  },
  {
    title: "A.I. Snow Day Predictor",
    description:
      "Predicts Ottawa snow days from live, real-world weather data.",
    url: "https://github.com/JeremyFriesenGitHub/ai-snow-day-predictor",
    images: [
      { src: "/images/snowday-1.webp", alt: "Weather statistics chart" },
      { src: "/images/snowday-2.webp", alt: "Second weather statistics chart" },
    ],
    accent: { dark: "#e8c05a", light: "#664d0e" },
    icon: "ai",
    colSpan: 2,
    tags: ["Python", "Jupyter", "scikit-learn"],
  },
];
