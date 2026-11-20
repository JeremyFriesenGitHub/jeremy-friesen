export type CertificationIcon = "github" | "microsoft" | "kaggle";

export interface Certification {
  /** As the issuer words it. */
  name: string;
  issuer: string;
  /** Month and year, e.g. "May 2025". Hidden while blank. */
  issued?: string;
  /** Only for credentials that lapse. */
  expires?: string;
  /** The issuer's public page for this credential. */
  url: string;
  /** The issuer's mark. */
  icon: CertificationIcon;
  accent: { dark: string; light: string };
}

/** Licenses & certifications, in the order LinkedIn lists them. */
export const certifications: Certification[] = [
  {
    name: "GitHub Foundations",
    issuer: "GitHub",
    issued: "May 2025",
    expires: "May 2028",
    url: "https://www.credly.com/badges/aab96fc1-decd-4a72-a4af-bc3a9bd72279/public_url",
    icon: "github",
    accent: { dark: "#b08cff", light: "#5b21b6" },
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "May 2025",
    url: "https://learn.microsoft.com/en-us/users/jeremyfriesen-3056/credentials/7578b454e676563e",
    icon: "microsoft",
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
  },
  {
    name: "Intro to Machine Learning",
    issuer: "Kaggle",
    url: "https://www.kaggle.com/learn/certification/jeremyfriesen123/intro-to-machine-learning",
    icon: "kaggle",
    accent: { dark: "#5eead4", light: "#0f766e" },
  },
];
