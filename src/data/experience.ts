export interface Experience {
  title: string;
  company: string;
  location: string;
  country: string;
  date: string;
  /** One or two lines from the resume, when the role has them. */
  highlights: string[];
  color: string;
  colorLight: string;
}

export const experiences: Experience[] = [
  {
    title: "Cyber Security Intern",
    company: "Government of Canada",
    location: "Ottawa, ON",
    country: "Canada",
    date: "May 2026 - Present",
    highlights: [
      "Distil protocol specifications, cryptographic standards and mathematical papers into implementation-ready solutions.",
      "Develop and maintain encryption and decryption capabilities supporting cyber defence requirements.",
    ],
    color: "#ff6b7a",
    colorLight: "#b3101f",
  },
  {
    title: "IT Analyst Intern",
    company: "Government of Canada",
    location: "Ottawa, ON",
    country: "Canada",
    date: "May 2025 - Aug. 2025",
    highlights: [
      "Automated Azure administration with PowerShell, DevOps and Agile practices, standardizing the team's CI/CD workflows.",
    ],
    color: "#ffd166",
    colorLight: "#8a5a00",
  },
  {
    title: "Cloud Analyst Intern",
    company: "Government of Canada",
    location: "Ottawa, ON",
    country: "Canada",
    date: "Jan. 2025 - Apr. 2025",
    highlights: [
      "Designed scalable cloud architecture and IT infrastructure in Azure for secure internal remote network access.",
    ],
    color: "#6b93ff",
    colorLight: "#1536b8",
  },
  {
    title: "IT Analyst Intern",
    company: "Royal Canadian Mounted Police",
    location: "Ottawa, ON",
    country: "Canada",
    date: "Sept. 2024 - Dec. 2024",
    highlights: [
      "Delivered first-level support for 200+ enterprise and law-enforcement applications, diagnosing incidents and outages quickly.",
    ],
    color: "#67d2ff",
    colorLight: "#0b5f8a",
  },
  {
    title: "Data Scientist Intern",
    company: "National Research Council of Canada",
    location: "Ottawa, ON",
    country: "Canada",
    date: "May 2024 - Aug. 2024",
    highlights: [
      "Automated bivariate and multivariate analysis workflows for the AI for Logistics program's road-freight project.",
      "Analysed 200+ sensor and geospatial datasets with Matplotlib, GeoPandas and Folium, producing 300+ pages of reports.",
    ],
    color: "#ffa14d",
    colorLight: "#9a3f00",
  },
];
