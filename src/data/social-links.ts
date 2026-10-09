export const socialLinks = {
  resume:
    "https://drive.google.com/file/d/1DmrlFnYDeuEydZJNtONpJW-0bkdkTIu-/view?usp=sharing",
  github: "https://github.com/JeremyFriesenGitHub",
  linkedin: "https://www.linkedin.com/in/jeremyfriesen1",
  devpost: "https://devpost.com/JeremyFriesenGitHub",
  repo: "https://github.com/JeremyFriesenGitHub/jeremy-friesen",
} as const;

export const profile = {
  name: "Jeremy Friesen",
  firstName: "Jeremy",
  lastName: "Friesen",
  role: "Cyber Security Intern",
  organization: "Government of Canada",
  school: "Carleton University",
  program: "4th-year Computer Science",
  location: "Ottawa, ON",
  /** Rotates through the hero headline. */
  focus: ["Security", "Cloud & DevOps", "AI / ML", "Data Science"],
  tagline:
    "I build secure, data-driven software, from cloud infrastructure and DevSecOps to AI/ML.",
} as const;

export const aboutText = {
  intro:
    "I'm a fourth-year Computer Science student at Carleton University, a Cyber Security Intern with the Government of Canada, and President of the Carleton AI Society.",
  points: [
    {
      text: "Committed to",
      highlight: "continuous learning & improvement",
    },
    {
      text: "Passionate about and experienced in",
      highlight:
        "data science & analysis, software development, cloud & IT infrastructure, DevSecOps, and AI/ML",
    },
    {
      text: "Happiest when",
      highlight: "building with a team, on campus or at a hackathon",
    },
  ],
  /** Devpost interests, surfaced as chips. */
  interests: [
    "DevOps",
    "IoT",
    "Machine Learning / AI",
    "Productivity",
    "Social Good",
    "Web",
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#community", label: "Community" },
  { href: "#projects", label: "Projects" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#skills", label: "Skills" },
] as const;
