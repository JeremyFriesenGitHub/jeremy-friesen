/**
 * Hackathon submissions. Devpost entries are sourced from
 * https://devpost.com/JeremyFriesenGitHub; the rest ran off Devpost
 * (AGI Ventures Canada and the SSSC's InnovateNow!).
 * Winners are listed first (most recent hackathon first), then the rest.
 */
export interface HackathonProject {
  title: string;
  tagline: string;
  hackathon: string;
  /** Month the hackathon ran, when known. */
  date?: string;
  /** Prize text as shown by the organizers. Present only for winning submissions. */
  award?: string;
  /** Devpost submission page, when the hackathon ran on Devpost. */
  url?: string;
  /** Live demo, when one is still up. */
  site?: string;
  /** Source repository, when public. */
  repo?: string;
  builtWith: string[];
  accent: { dark: string; light: string };
}

export interface JudgingRole {
  event: string;
  organizer: string;
  date: string;
  url: string;
}

/**
 * Counts cover every hackathon entered, on and off Devpost. The Devpost
 * profile lists one more (Hack the Hill III) that was never entered.
 */
export const hackathonStats = {
  entered: 11,
  wins: 7,
  devpostProjects: 8,
} as const;

export const judging: JudgingRole[] = [
  {
    event: "cuHacking 2026",
    organizer: "Carleton University's official hackathon",
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
    tagline:
      "Unsupervised log anomaly detection that surfaced a hidden 22-event attack in 180,800 Apache log lines.",
    hackathon: "Hack the North 2026",
    date: "Sep 2026",
    award: "1st place · CSE: Log & Order",
    url: "https://devpost.com/software/loggr",
    site: "https://trace.cooking",
    repo: "https://github.com/JeremyFriesenGitHub/htn26",
    builtWith: ["Python", "PyTorch", "scikit-learn", "PyOD", "Flask"],
    accent: { dark: "#ff6b7a", light: "#b3101f" },
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
    accent: { dark: "#ffd166", light: "#8a5a00" },
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
    accent: { dark: "#6b93ff", light: "#1536b8" },
  },
  {
    title: "Prodly",
    tagline:
      "An AI productivity platform with a Pomodoro timer, planner and assistant, judged the cleanest interface of the event.",
    hackathon: "AGI Ventures Canada · Hackathon 3.0: Build to Convert",
    date: "Sep 2025",
    award: "Best UI",
    site: "https://jeremyfriesengithub.github.io/prodly/",
    repo: "https://github.com/JeremyFriesenGitHub/prodly",
    builtWith: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
    accent: { dark: "#b08cff", light: "#5b21b6" },
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
    accent: { dark: "#ffa14d", light: "#9a3f00" },
  },
  {
    title: "Telehealth for remote regions",
    tagline:
      "A free telemedicine concept for communities without nearby care: symptom surveys, live chat and video consults.",
    hackathon: "InnovateNow! 2",
    date: "Oct 2023",
    award: "3rd place",
    repo: "https://github.com/JeremyFriesenGitHub/InnovateNow",
    builtWith: ["JavaScript", "Node.js", "HTML", "CSS"],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
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
    accent: { dark: "#ff6b7a", light: "#b3101f" },
  },
  {
    title: "Startup Idea Validator",
    tagline:
      "Five AI personas (VC, engineer, ethicist, user, analyst) stress-test a startup idea with persistent memory.",
    hackathon: "AGI Ventures Canada · Mini Hacker House",
    date: "Jan 2026",
    site: "https://jeremyfriesengithub.github.io/startup-idea-validator/",
    repo: "https://github.com/JeremyFriesenGitHub/startup-idea-validator",
    builtWith: ["FastAPI", "Backboard.io", "JavaScript", "Python"],
    accent: { dark: "#b08cff", light: "#5b21b6" },
  },
  {
    title: "MapleVault",
    tagline: "Signed attestation chains for Canadian defence procurement.",
    hackathon: "Verified Canadian Supply Chains",
    url: "https://devpost.com/software/ctl-claude-del",
    builtWith: ["TypeScript", "FastAPI", "Docker"],
    accent: { dark: "#ffa14d", light: "#9a3f00" },
  },
  {
    title: "Shazam 4 Drones",
    tagline:
      "A drone classification and detection platform built with Blackbird UAV.",
    hackathon: "Shazam for Drones Hackathon",
    url: "https://devpost.com/software/blackbird-uav-shazam-4-drones",
    repo: "https://github.com/Blackbird-UAV/icebreaker-hackathon-2025",
    builtWith: ["Next.js", "FastAPI", "scikit-learn", "SciPy", "Twilio"],
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
  },
];
