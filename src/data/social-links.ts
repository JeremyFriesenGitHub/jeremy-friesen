export const socialLinks = {
  resume:
    "https://drive.google.com/file/d/1DmrlFnYDeuEydZJNtONpJW-0bkdkTIu-/view?usp=sharing",
  github: "https://github.com/JeremyFriesenGitHub",
  linkedin: "https://www.linkedin.com/in/jeremyfriesen1",
  devpost: "https://devpost.com/JeremyFriesenGitHub",
  repo: "https://github.com/JeremyFriesenGitHub/jeremy-friesen",
} as const;

/** Shown in the footer, as Jeremy wrote them. */
export const contact = {
  email: "jeremyfriesen@cmail.carleton.ca",
  phone: "+1 (343) 575-8441",
} as const;

/** "+1 (343) 575-8441" -> "tel:+13435758441". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const profile = {
  name: "Jeremy Friesen",
  firstName: "Jeremy",
  lastName: "Friesen",
  role: "Cyber Security Intern",
  organization: "Government of Canada",
  school: "Carleton University",
  location: "Ottawa, ON",
  /** Rotates through the hero headline. */
  focus: ["Security", "Cloud & DevOps", "AI/ML", "Data Science"],
} as const;

export const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#community", label: "Community" },
  { href: "#projects", label: "Projects" },
  { href: "#hackathons", label: "Hackathons" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
] as const;
