export interface Experience {
  title: string;
  company: string;
  /** The employer's mark, square, under public/logos. */
  logo?: string;
  location: string;
  country: string;
  date: string;
  /** TODO: Jeremy to write. Hidden while empty. */
  highlights: string[];
  color: string;
  colorLight: string;
}

export const experiences: Experience[] = [
  {
    title: "Cyber Security Intern",
    company: "Government of Canada",
    logo: "/logos/government-of-canada.webp",
    location: "Ottawa, ON",
    country: "Canada",
    date: "May 2026 - Present",
    highlights: [],
    color: "#9ba4ff",
    colorLight: "#3730a3",
  },
  {
    title: "Cloud & IT Analyst Intern",
    company: "Government of Canada",
    logo: "/logos/government-of-canada.webp",
    location: "Ottawa, ON",
    country: "Canada",
    date: "Sep 2024 - Aug 2025",
    highlights: [],
    color: "#67d2ff",
    colorLight: "#0b5f8a",
  },
  {
    title: "Data Science Intern",
    company: "National Research Council of Canada",
    logo: "/logos/government-of-canada.webp",
    location: "Ottawa, ON",
    country: "Canada",
    date: "May 2024 - Aug 2024",
    highlights: [],
    color: "#6ee7b7",
    colorLight: "#047857",
  },
];
