export const socialLinks = {
  resume:
    "https://drive.google.com/file/d/1C9QWZYbZ9FBwLat5M1vibf_GK56ivlLR/view?usp=sharing",
  github: "https://github.com/JeremyFriesenGitHub",
  linkedin: "https://www.linkedin.com/in/jeremyfriesen1",
  repo: "https://github.com/JeremyFriesenGitHub/jeremy-friesen",
} as const;

export const aboutText = {
  intro: "I'm a third year CS Student at Carleton University who's:",
  points: [
    {
      text: "Committed to",
      highlight: "Continuous Learning & Improvement",
    },
    {
      text: "Passionate about and experienced in",
      highlight:
        "Data Science/Analysis, Software Development, Cloud & IT Infrastructure, DevSecOps, and AI/ML",
    },
    {
      text: "Always striving to build a solid",
      highlight: "professional network",
    },
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
] as const;
