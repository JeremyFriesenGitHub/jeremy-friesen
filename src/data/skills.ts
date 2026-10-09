export type SkillIcon =
  | "python"
  | "typescript"
  | "javascript"
  | "java"
  | "cpp"
  | "postgresql"
  | "html"
  | "css"
  | "bash"
  | "powershell"
  | "nextjs"
  | "react"
  | "node"
  | "express"
  | "flask"
  | "fastapi"
  | "tailwind"
  | "playwright"
  | "pytorch"
  | "scikit"
  | "numpy"
  | "pandas"
  | "geopandas"
  | "folium"
  | "matplotlib"
  | "jupyter"
  | "gemini"
  | "azure"
  | "aws"
  | "gcp"
  | "docker"
  | "kubernetes"
  | "terraform"
  | "githubactions"
  | "vercel"
  | "linux"
  | "wireshark"
  | "arkime"
  | "mongodb"
  | "duckdb"
  | "drizzle"
  | "shadcn"
  | "figma"
  | "mermaid"
  | "git"
  | "github"
  | "vscode"
  | "pycharm"
  | "intellij"
  | "raspberrypi"
  | "arduino"
  | "latex";

export interface Skill {
  name: string;
  icon: SkillIcon;
  url: string;
}

export interface SkillCategory {
  title: string;
  accent: { dark: string; light: string };
  skills: Skill[];
}

/** Mirrors the Technical Skills block of the resume, plus what the projects use. */
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    accent: { dark: "#6b93ff", light: "#1536b8" },
    skills: [
      { name: "Python", icon: "python", url: "https://www.python.org" },
      {
        name: "TypeScript",
        icon: "typescript",
        url: "https://www.typescriptlang.org",
      },
      {
        name: "JavaScript",
        icon: "javascript",
        url: "https://developer.mozilla.org/docs/Web/JavaScript",
      },
      { name: "Java", icon: "java", url: "https://www.java.com" },
      { name: "C / C++", icon: "cpp", url: "https://isocpp.org" },
      {
        name: "SQL · PostgreSQL",
        icon: "postgresql",
        url: "https://www.postgresql.org",
      },
      {
        name: "HTML",
        icon: "html",
        url: "https://developer.mozilla.org/docs/Web/HTML",
      },
      {
        name: "CSS",
        icon: "css",
        url: "https://developer.mozilla.org/docs/Web/CSS",
      },
      { name: "Bash", icon: "bash", url: "https://www.gnu.org/software/bash/" },
      {
        name: "PowerShell",
        icon: "powershell",
        url: "https://learn.microsoft.com/powershell/",
      },
    ],
  },
  {
    title: "Frameworks & Libraries",
    accent: { dark: "#ff6b7a", light: "#b3101f" },
    skills: [
      { name: "Next.js", icon: "nextjs", url: "https://nextjs.org" },
      { name: "React", icon: "react", url: "https://react.dev" },
      { name: "Node.js", icon: "node", url: "https://nodejs.org" },
      { name: "Express", icon: "express", url: "https://expressjs.com" },
      {
        name: "Flask",
        icon: "flask",
        url: "https://flask.palletsprojects.com",
      },
      { name: "FastAPI", icon: "fastapi", url: "https://fastapi.tiangolo.com" },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        url: "https://tailwindcss.com",
      },
      { name: "Playwright", icon: "playwright", url: "https://playwright.dev" },
    ],
  },
  {
    title: "Data & AI",
    accent: { dark: "#b08cff", light: "#5b21b6" },
    skills: [
      { name: "PyTorch", icon: "pytorch", url: "https://pytorch.org" },
      { name: "scikit-learn", icon: "scikit", url: "https://scikit-learn.org" },
      { name: "NumPy", icon: "numpy", url: "https://numpy.org" },
      { name: "pandas", icon: "pandas", url: "https://pandas.pydata.org" },
      { name: "GeoPandas", icon: "geopandas", url: "https://geopandas.org" },
      {
        name: "Folium",
        icon: "folium",
        url: "https://python-visualization.github.io/folium/latest/",
      },
      { name: "Matplotlib", icon: "matplotlib", url: "https://matplotlib.org" },
      { name: "Jupyter", icon: "jupyter", url: "https://jupyter.org" },
      {
        name: "Gemini API",
        icon: "gemini",
        url: "https://ai.google.dev",
      },
    ],
  },
  {
    title: "Cloud, DevOps & Security",
    accent: { dark: "#ffd166", light: "#8a5a00" },
    skills: [
      { name: "Azure", icon: "azure", url: "https://azure.microsoft.com" },
      { name: "AWS", icon: "aws", url: "https://aws.amazon.com" },
      { name: "Google Cloud", icon: "gcp", url: "https://cloud.google.com" },
      { name: "Docker", icon: "docker", url: "https://www.docker.com" },
      { name: "Kubernetes", icon: "kubernetes", url: "https://kubernetes.io" },
      { name: "Terraform", icon: "terraform", url: "https://www.terraform.io" },
      {
        name: "GitHub Actions",
        icon: "githubactions",
        url: "https://github.com/features/actions",
      },
      { name: "Vercel", icon: "vercel", url: "https://vercel.com" },
      { name: "Linux", icon: "linux", url: "https://www.kernel.org" },
      {
        name: "Wireshark",
        icon: "wireshark",
        url: "https://www.wireshark.org",
      },
      { name: "Arkime", icon: "arkime", url: "https://arkime.com" },
    ],
  },
  {
    title: "Data Layer & Design",
    accent: { dark: "#ffa14d", light: "#9a3f00" },
    skills: [
      { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com" },
      { name: "DuckDB", icon: "duckdb", url: "https://duckdb.org" },
      { name: "Drizzle ORM", icon: "drizzle", url: "https://orm.drizzle.team" },
      { name: "shadcn/ui", icon: "shadcn", url: "https://ui.shadcn.com" },
      { name: "Figma", icon: "figma", url: "https://www.figma.com" },
      { name: "Mermaid", icon: "mermaid", url: "https://mermaid.js.org" },
    ],
  },
  {
    title: "Tools & Hardware",
    accent: { dark: "#67d2ff", light: "#0b5f8a" },
    skills: [
      { name: "Git", icon: "git", url: "https://git-scm.com" },
      { name: "GitHub", icon: "github", url: "https://github.com" },
      { name: "VS Code", icon: "vscode", url: "https://code.visualstudio.com" },
      {
        name: "PyCharm",
        icon: "pycharm",
        url: "https://www.jetbrains.com/pycharm/",
      },
      {
        name: "IntelliJ IDEA",
        icon: "intellij",
        url: "https://www.jetbrains.com/idea/",
      },
      {
        name: "Raspberry Pi",
        icon: "raspberrypi",
        url: "https://www.raspberrypi.com",
      },
      { name: "Arduino", icon: "arduino", url: "https://www.arduino.cc" },
      { name: "LaTeX", icon: "latex", url: "https://www.latex-project.org" },
    ],
  },
];
