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
  program: "fourth-year Computer Science",
  location: "Ottawa, ON",
  /** Rotates through the hero headline. */
  focus: ["Security", "Cloud & DevOps", "AI/ML", "Data Science"],
} as const;

export const aboutText = {
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
