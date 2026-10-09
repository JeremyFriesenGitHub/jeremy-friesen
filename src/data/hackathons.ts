/**
 * Hackathon submissions, sourced from https://devpost.com/JeremyFriesenGitHub.
 * Winners are listed first (most recent hackathon first), then the rest.
 */
export interface HackathonProject {
  title: string;
  tagline: string;
  hackathon: string;
  /** Month the hackathon ran, when known. */
  date?: string;
  /** Prize text as shown on Devpost. Present only for winning submissions. */
  award?: string;
  /** Devpost submission page. */
  url: string;
  /** Live demo, when one is still up. */
  site?: string;
  /** Source repository, when public. */
  repo?: string;
  builtWith: string[];
  accent: { dark: string; light: string };
}

export const devpostStats = {
  projects: 8,
  hackathons: 9,
  wins: 5,
} as const;

export const hackathonProjects: HackathonProject[] = [
  {
    title: "Trace",
    tagline:
      "Unsupervised log anomaly detection that surfaced a hidden 22-event attack in 180,800 Apache log lines.",
    hackathon: "Hack the North 2026",
    date: "Sep 2026",
    award: "1st place · CSE: Log & Order",
    url: "https://devpost.com/software/loggr",
    site: "https://trace.cooking",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    builtWith: ["Python", "PyTorch", "scikit-learn", "PyOD", "Flask"],
    accent: { dark: "#6ec4e8", light: "#125672" },
  },
  {
    title: "Buildo",
    tagline:
      "Describe a hardware idea in plain English and get a parts list, firmware and assembly guide.",
    hackathon: "ConUHacks X",
    date: "Jan 2026",
    award: "MLH · Best Use of Gemini API",
    url: "https://devpost.com/software/product-creator-temp-name-conu-x",
    site: "https://www.peter-griffin.tech",
    builtWith: ["Next.js", "React", "Flask", "Gemini API", "Snowflake Cortex"],
    accent: { dark: "#e8c05a", light: "#664d0e" },
  },
  {
    title: "Plante",
    tagline:
      "A gamified, pixel-art smart plant monitor with Raspberry Pi sensors and an AI chat assistant.",
    hackathon: "uOttaHack 8",
    date: "Jan 2026",
    award: "Best Designed Hack",
    url: "https://devpost.com/software/plante",
    builtWith: ["Next.js", "MongoDB", "Gemini", "Raspberry Pi", "Arduino"],
    accent: { dark: "#7dd49e", light: "#1e5b35" },
  },
  {
    title: "Network Threat Explorer",
    tagline: "Insightful network traffic visualization and analysis.",
    hackathon: "Hack the North 2025",
    date: "Sep 2025",
    award: "CSE: Network Traffic Exploration",
    url: "https://devpost.com/software/network-threat-explorer",
    builtWith: ["Python", "Flask", "DuckDB", "Cohere", "Arkime"],
    accent: { dark: "#e8907a", light: "#8f3018" },
  },
  {
    title: "cuTunnel",
    tagline:
      "Shortest routes through Carleton's underground tunnel system, powered by Dijkstra's algorithm.",
    hackathon: "cuHacking 6",
    date: "Mar 2025",
    award: "Wolfram Award (Top 5) · People's Choice",
    url: "https://devpost.com/software/cu-tunnels",
    repo: "https://github.com/JeremyFriesenGitHub/cuTunnel",
    builtWith: ["JavaScript", "Cytoscape.js", "HTML", "CSS"],
    accent: { dark: "#c48ae8", light: "#7822ae" },
  },
  {
    title: "Agent²",
    tagline:
      "Your real estate agent's agent: text a number, take a short AI call, get matched listings by SMS.",
    hackathon: "GenAI Genesis 2026",
    date: "Mar 2026",
    url: "https://devpost.com/software/agent-o3l6si",
    site: "https://www.agentsquared.tech",
    builtWith: ["Python", "FastAPI", "AWS", "PersonaPlex", "Playwright"],
    accent: { dark: "#e88a8a", light: "#9d1f1f" },
  },
  {
    title: "MapleVault",
    tagline: "Signed attestation chains for Canadian defence procurement.",
    hackathon: "Verified Canadian Supply Chains",
    url: "https://devpost.com/software/ctl-claude-del",
    builtWith: ["TypeScript", "FastAPI", "Docker"],
    accent: { dark: "#f0a07a", light: "#8a3a10" },
  },
  {
    title: "Shazam 4 Drones",
    tagline: "A drone classification and detection platform built with Blackbird UAV.",
    hackathon: "Shazam for Drones Hackathon",
    url: "https://devpost.com/software/blackbird-uav-shazam-4-drones",
    builtWith: ["Next.js", "FastAPI", "scikit-learn", "SciPy", "Twilio"],
    accent: { dark: "#8fd3f4", light: "#0f5c7a" },
  },
];
