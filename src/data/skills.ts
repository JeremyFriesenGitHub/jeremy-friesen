export type SkillIcon =
  | "python"
  | "postgresql"
  | "typescript"
  | "java"
  | "html"
  | "css"
  | "javascript"
  | "nextjs"
  | "express"
  | "flask"
  | "fastapi"
  | "tailwind"
  | "node"
  | "react"
  | "pytorch"
  | "drizzle"
  | "shadcn"
  | "pandas"
  | "geopandas"
  | "folium"
  | "mermaid"
  | "scikit"
  | "cytoscape"
  | "mongodb"
  | "azure"
  | "aws"
  | "netlify"
  | "docker"
  | "githubactions"
  | "vercel"
  | "git"
  | "github"
  | "vscode"
  | "jupyter"
  | "pycharm"
  | "intellij"
  | "eclipse"
  | "figma";

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

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    accent: { dark: "#6ec4e8", light: "#125672" },
    skills: [
      { name: "Python", icon: "python", url: "https://www.python.org" },
      { name: "TypeScript", icon: "typescript", url: "https://www.typescriptlang.org" },
      { name: "JavaScript", icon: "javascript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { name: "Java", icon: "java", url: "https://www.java.com" },
      { name: "SQL · PostgreSQL", icon: "postgresql", url: "https://www.postgresql.org" },
      { name: "HTML", icon: "html", url: "https://developer.mozilla.org/docs/Web/HTML" },
      { name: "CSS", icon: "css", url: "https://developer.mozilla.org/docs/Web/CSS" },
    ],
  },
  {
    title: "Frameworks",
    accent: { dark: "#7dd49e", light: "#1e5b35" },
    skills: [
      { name: "Next.js", icon: "nextjs", url: "https://nextjs.org" },
      { name: "React", icon: "react", url: "https://react.dev" },
      { name: "Node.js", icon: "node", url: "https://nodejs.org" },
      { name: "Express", icon: "express", url: "https://expressjs.com" },
      { name: "Flask", icon: "flask", url: "https://flask.palletsprojects.com" },
      { name: "FastAPI", icon: "fastapi", url: "https://fastapi.tiangolo.com" },
      { name: "Tailwind CSS", icon: "tailwind", url: "https://tailwindcss.com" },
    ],
  },
  {
    title: "Data & AI",
    accent: { dark: "#c48ae8", light: "#7822ae" },
    skills: [
      { name: "PyTorch", icon: "pytorch", url: "https://pytorch.org" },
      { name: "scikit-learn", icon: "scikit", url: "https://scikit-learn.org" },
      { name: "pandas", icon: "pandas", url: "https://pandas.pydata.org" },
      { name: "GeoPandas", icon: "geopandas", url: "https://geopandas.org" },
      { name: "Folium", icon: "folium", url: "https://python-visualization.github.io/folium/latest/" },
      { name: "Jupyter", icon: "jupyter", url: "https://jupyter.org" },
      { name: "Cytoscape.js", icon: "cytoscape", url: "https://js.cytoscape.org" },
    ],
  },
  {
    title: "Cloud & DevOps",
    accent: { dark: "#e8c05a", light: "#664d0e" },
    skills: [
      { name: "Azure", icon: "azure", url: "https://azure.microsoft.com" },
      { name: "AWS", icon: "aws", url: "https://aws.amazon.com" },
      { name: "Docker", icon: "docker", url: "https://www.docker.com" },
      { name: "GitHub Actions", icon: "githubactions", url: "https://github.com/features/actions" },
      { name: "Vercel", icon: "vercel", url: "https://vercel.com" },
      { name: "Netlify", icon: "netlify", url: "https://www.netlify.com" },
    ],
  },
  {
    title: "Data Layer & UI",
    accent: { dark: "#e8907a", light: "#8f3018" },
    skills: [
      { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com" },
      { name: "Drizzle ORM", icon: "drizzle", url: "https://orm.drizzle.team" },
      { name: "shadcn/ui", icon: "shadcn", url: "https://ui.shadcn.com" },
      { name: "Mermaid", icon: "mermaid", url: "https://mermaid.js.org" },
      { name: "Figma", icon: "figma", url: "https://www.figma.com" },
    ],
  },
  {
    title: "Tools",
    accent: { dark: "#8fd3f4", light: "#0f5c7a" },
    skills: [
      { name: "Git", icon: "git", url: "https://git-scm.com" },
      { name: "GitHub", icon: "github", url: "https://github.com" },
      { name: "VS Code", icon: "vscode", url: "https://code.visualstudio.com" },
      { name: "PyCharm", icon: "pycharm", url: "https://www.jetbrains.com/pycharm/" },
      { name: "IntelliJ IDEA", icon: "intellij", url: "https://www.jetbrains.com/idea/" },
      { name: "Eclipse", icon: "eclipse", url: "https://eclipseide.org" },
    ],
  },
];
