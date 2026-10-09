export type CommunityIcon = "brain" | "plane" | "keyboard" | "users";

export interface CommunityRole {
  org: string;
  /** What the organization is, in a few words. */
  blurb: string;
  url: string;
  /** Most recent role first. */
  roles: { title: string; date: string }[];
  highlights: string[];
  icon: CommunityIcon;
  accent: { dark: string; light: string };
}

/** Clubs and teams, sourced from the resume and GitHub activity. */
export const communityRoles: CommunityRole[] = [
  {
    org: "Carleton AI Society",
    blurb: "Carleton's AI and machine learning club, 100+ members",
    url: "https://carletonai.com",
    roles: [
      { title: "President", date: "May 2026 - Present" },
      { title: "Developer", date: "Jun. 2025 - Sept. 2025" },
    ],
    highlights: [
      "Lead the society and design technical workshops that turn research-level ML material into hands-on sessions.",
      "Run club operations: the annual budget, administrative filings and CUSA ratification.",
      "Built the club website and documentation site, now the most active contributor to both.",
    ],
    icon: "brain",
    accent: { dark: "#ff6b7a", light: "#b3101f" },
  },
  {
    org: "Blackbird UAV",
    blurb: "Carleton's UAV engineering and design team",
    url: "https://blackbirduav.ca",
    roles: [{ title: "Software Lead", date: "Jul. 2025 - Aug. 2026" }],
    highlights: [
      "Led the software sub-team building autonomous flight control and payload systems in Python and C++ on Raspberry Pi and Arduino for the AEAC competition.",
      "Built the team's public website in React and Next.js to market its goals and mission.",
    ],
    icon: "plane",
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
  },
  {
    org: "cuHacking",
    blurb: "Carleton University's official hackathon",
    url: "https://cuhacking.ca",
    roles: [
      { title: "Judge", date: "Jul. 2026" },
      { title: "Software Developer", date: "Aug. 2024 - Dec. 2024" },
    ],
    highlights: [
      "Contributed to the website, portal and documentation site, introducing Agile, Extreme Programming and trunk-based development.",
      "Wrote an open-source Playwright tool that automates event forms, saving the logistics team 10+ hours.",
      "Returned as a judge for cuHacking 2026.",
    ],
    icon: "keyboard",
    accent: { dark: "#b08cff", light: "#5b21b6" },
  },
  {
    org: "Carleton Computer Science Society",
    blurb: "The student society for Carleton's CS program",
    url: "https://ccss.carleton.ca",
    roles: [
      { title: "Developer", date: "Summer 2025" },
      { title: "Resources Committee Volunteer", date: "Jun. 2024 - May 2025" },
    ],
    highlights: [
      "Wrote FAQs and articles for the student resources site.",
      "Worked with the dev team on the society's GitHub organization and handbook.",
    ],
    icon: "users",
    accent: { dark: "#ffd166", light: "#8a5a00" },
  },
];
