/**
 * Hackathon submissions. Devpost entries are sourced from
 * https://devpost.com/JeremyFriesenGitHub; the rest ran off Devpost
 * (AGI Ventures Canada and the SSSC's InnovateNow!). Hackathon backends are
 * long gone, so cards link to Devpost, demo videos and source rather than live apps.
 * Winners are listed first (most recent hackathon first), then the rest.
 */
export interface HackathonProject {
  title: string;
  /** TODO: Jeremy to write. Hidden while empty. */
  tagline: string;
  hackathon: string;
  /** Month the hackathon ran, when known. */
  date?: string;
  /** Prize text as shown by the organizers. Present only for winning submissions. */
  award?: string;
  /** Devpost submission page, when the hackathon ran on Devpost. */
  url?: string;
  /** Demo video (YouTube), the preferred way to see a hackathon build. */
  video?: string;
  /** Live site, only when it still works without a backend. */
  site?: string;
  /** Source repository, when public. */
  repo?: string;
  builtWith: string[];
  accent: { dark: string; light: string };
}

export interface JudgingRole {
  event: string;
  /** Who ran it. TODO: Jeremy to write. Hidden while empty. */
  organizer: string;
  date: string;
  url: string;
}

/**
 * Counts cover every hackathon entered, on and off Devpost. The Devpost
 * profile lists one more (Hack the Hill III) that was never entered.
 */
export const judging: JudgingRole[] = [
  {
    event: "cuHacking 2026",
    organizer: "",
    date: "Jul 2026",
    url: "https://cuhacking.ca",
  },
  {
    event: "InnovateNow! 3",
    organizer: "Science Student Success Centre, Carleton",
    date: "Oct 2024",
    url: "https://innovatenow.devpost.com",
  },
];

export const hackathonProjects: HackathonProject[] = [
  {
    title: "Trace",
    tagline: "",
    hackathon: "Hack the North 2026",
    date: "Sep 2026",
    award: "1st place · CSE: Log & Order",
    url: "https://devpost.com/software/loggr",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    builtWith: ["Python", "PyTorch", "scikit-learn", "PyOD", "Flask"],
    accent: { dark: "#9ba4ff", light: "#3730a3" },
  },
  {
    title: "Buildo",
    tagline: "",
    hackathon: "ConUHacks X",
    date: "Jan 2026",
    award: "MLH · Best Use of Gemini API",
    url: "https://devpost.com/software/product-creator-temp-name-conu-x",
    video: "https://www.youtube.com/watch?v=GzHThTiV9rA",
    repo: "https://github.com/chantalzhang/conuhacks26",
    builtWith: ["Next.js", "React", "Flask", "Gemini API", "Snowflake Cortex"],
    accent: { dark: "#5eead4", light: "#0f766e" },
  },
  {
    title: "Plante",
    tagline: "",
    hackathon: "uOttaHack 8",
    date: "Jan 2026",
    award: "Best Designed Hack",
    url: "https://devpost.com/software/plante",
    video: "https://www.youtube.com/watch?v=7n9EgHPRCC8",
    repo: "https://github.com/JowiAoun/Plante",
    builtWith: ["Next.js", "MongoDB", "Gemini", "Raspberry Pi", "Arduino"],
    accent: { dark: "#93c5fd", light: "#1d4ed8" },
  },
  {
    title: "Network Threat Explorer",
    tagline: "",
    hackathon: "Hack the North 2025",
    date: "Sep 2025",
    award: "CSE: Network Traffic Exploration",
    url: "https://devpost.com/software/network-threat-explorer",
    video: "https://www.youtube.com/watch?v=ZuAKIEh6PcA",
    repo: "https://github.com/JeremyFriesenGitHub/nte",
    builtWith: ["Python", "Flask", "DuckDB", "Cohere", "Arkime"],
    accent: { dark: "#6b93ff", light: "#1536b8" },
  },
  {
    title: "Prodly",
    tagline: "",
    hackathon: "AGI Ventures Canada · Hackathon 3.0: Build to Convert",
    date: "Sep 2025",
    award: "Best UI",
    repo: "https://github.com/JeremyFriesenGitHub/prodly",
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
    accent: { dark: "#b08cff", light: "#5b21b6" },
  },
  {
    title: "cuTunnel",
    tagline: "",
    hackathon: "cuHacking 6",
    date: "Mar 2025",
    award: "Wolfram Award (Top 5) · People's Choice",
    url: "https://devpost.com/software/cu-tunnels",
    video: "https://www.youtube.com/watch?v=mcY5xvBvbc0",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    builtWith: ["JavaScript", "Cytoscape.js", "HTML", "CSS"],
    accent: { dark: "#6ee7b7", light: "#047857" },
  },
  {
    title: "Telehealth for remote regions",
    tagline: "",
    hackathon: "InnovateNow! 2",
    date: "Oct 2023",
    award: "3rd place",
    repo: "https://github.com/JeremyFriesenGitHub/InnovateNow",
    builtWith: ["JavaScript", "Node.js", "HTML", "CSS"],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
  },
  {
    title: "MapleVault",
    tagline: "",
    hackathon: "Ottawa Defence Hackathon · Verified Canadian Supply Chains",
    date: "May 2026",
    url: "https://devpost.com/software/ctl-claude-del",
    repo: "https://github.com/JowiAoun/MapleVault",
    builtWith: ["TypeScript", "FastAPI", "Docker"],
    accent: { dark: "#6ee7b7", light: "#047857" },
  },
  {
    title: "Agent²",
    tagline: "",
    hackathon: "GenAI Genesis 2026",
    date: "Mar 2026",
    url: "https://devpost.com/software/agent-o3l6si",
    video: "https://www.youtube.com/watch?v=hvT3rvw54yo",
    repo: "https://github.com/chantalzhang/genaigenesis2026",
    builtWith: ["Python", "FastAPI", "AWS", "PersonaPlex", "Playwright"],
    accent: { dark: "#9ba4ff", light: "#3730a3" },
  },
  {
    title: "Startup Idea Validator",
    tagline: "",
    hackathon: "AGI Ventures Canada · Hacker House Challenge",
    date: "Jan 2026",
    repo: "https://github.com/JeremyFriesenGitHub/startup-idea-validator",
    builtWith: ["FastAPI", "Backboard.io", "JavaScript", "Python"],
    accent: { dark: "#b08cff", light: "#5b21b6" },
  },
  {
    title: "Shazam 4 Drones",
    tagline: "",
    hackathon: "Shazam for Drones Hackathon",
    date: "Nov 2025",
    url: "https://devpost.com/software/blackbird-uav-shazam-4-drones",
    repo: "https://github.com/Blackbird-UAV/icebreaker-hackathon-2025",
    builtWith: ["Next.js", "FastAPI", "scikit-learn", "SciPy", "Twilio"],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
  },
];

/** Counted from the cards, so the hero and the stats row never drift from them. */
export const hackathonStats = {
  entered: hackathonProjects.length,
  wins: hackathonProjects.filter((p) => p.award).length,
  devpostProjects: hackathonProjects.filter((p) => p.url).length,
};
