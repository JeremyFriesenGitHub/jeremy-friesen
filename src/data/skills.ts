export interface Skill {
  iconName: string;
  url: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { iconName: "FaPython", url: "https://www.python.org" },
      { iconName: "SiPostgresql", url: "https://www.postgresql.org" },
      { iconName: "SiTypescript", url: "https://www.typescriptlang.org" },
      { iconName: "FaJava", url: "https://www.java.com" },
      { iconName: "IoLogoHtml5", url: "https://www.w3schools.com/html/" },
      {
        iconName: "IoLogoCss3",
        url: "https://www.w3.org/Style/CSS/Overview.en.html",
      },
      { iconName: "IoLogoJavascript", url: "https://www.javascript.com" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { iconName: "TbBrandNextjs", url: "https://nextjs.org" },
      { iconName: "SiExpress", url: "https://expressjs.com" },
      { iconName: "BiLogoFlask", url: "https://flask.palletsprojects.com" },
      { iconName: "SiTailwindcss", url: "https://tailwindcss.com" },
      { iconName: "FaNode", url: "https://nodejs.org/en" },
    ],
  },
  {
    title: "Libraries",
    skills: [
      { iconName: "FaReact", url: "https://react.dev" },
      { iconName: "SiDrizzle", url: "https://orm.drizzle.team" },
      { iconName: "SiShadcnui", url: "https://ui.shadcn.com" },
      { iconName: "SiPandas", url: "https://pandas.pydata.org" },
      { iconName: "SiGeopandas", url: "https://geopandas.org" },
      {
        iconName: "SiFolium",
        url: "https://python-visualization.github.io/folium/latest/",
      },
      { iconName: "SiMermaid", url: "https://mermaid.js.org" },
      { iconName: "SiScikitlearn", url: "https://scikit-learn.org" },
      { iconName: "SiCytoscapedotjs", url: "https://js.cytoscape.org" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { iconName: "VscAzure", url: "https://azure.microsoft.com" },
      { iconName: "SiNetlify", url: "https://www.netlify.com" },
      { iconName: "FaDocker", url: "https://www.docker.com" },
      {
        iconName: "SiGithubactions",
        url: "https://github.com/features/actions",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      { iconName: "FaGitAlt", url: "https://git-scm.com" },
      { iconName: "VscGithubAlt", url: "https://github.com" },
      { iconName: "VscVscode", url: "https://code.visualstudio.com" },
      { iconName: "SiJupyter", url: "https://jupyter.org" },
      { iconName: "SiPycharm", url: "https://www.jetbrains.com/pycharm/" },
      { iconName: "SiIntellijidea", url: "https://www.jetbrains.com/idea/" },
      { iconName: "SiEclipseide", url: "https://eclipseide.org" },
      { iconName: "FaFigma", url: "https://www.figma.com" },
      { iconName: "SiVercel", url: "https://vercel.com" },
    ],
  },
];

export const categoryColors = ["#e8907a", "#7dd49e", "#6ec4e8", "#e8c05a"];
export const categoryColorsLight = ["#8f3018", "#1e5b35", "#125672", "#664d0e"];
