import {
  FaPython,
  FaJava,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiTypescript,
  SiExpress,
  SiDrizzle,
  SiShadcnui,
  SiPandas,
  SiGeopandas,
  SiFolium,
  SiMermaid,
  SiScikitlearn,
  SiNetlify,
  SiGithubactions,
  SiJupyter,
  SiPycharm,
  SiIntellijidea,
  SiEclipseide,
  SiCytoscapedotjs,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoFlask } from "react-icons/bi";
import { VscAzure, VscGithubAlt, VscVscode } from "react-icons/vsc";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io5";
import { LinkPreview } from "~/components/ui/link-preview";
import { FaNode } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const skillsData = [
  {
    title: "Languages",
    skills: [
      { icon: <FaPython />, url: "https://www.python.org" },
      { icon: <SiPostgresql />, url: "https://www.postgresql.org" },
      { icon: <SiTypescript />, url: "https://www.typescriptlang.org" },
      { icon: <FaJava />, url: "https://www.java.com" },
      { icon: <IoLogoHtml5 />, url: "https://www.w3schools.com/html/" },
      {
        icon: <IoLogoCss3 />,
        url: "https://www.w3.org/Style/CSS/Overview.en.html",
      },
      { icon: <IoLogoJavascript />, url: "https://www.javascript.com" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { icon: <TbBrandNextjs />, url: "https://nextjs.org" },
      { icon: <SiExpress />, url: "https://expressjs.com" },
      { icon: <BiLogoFlask />, url: "https://flask.palletsprojects.com" },
      { icon: <SiTailwindcss />, url: "https://tailwindcss.com" },
      { icon: <FaNode />, url: "https://nodejs.org/en" },
    ],
  },
  {
    title: "Libraries",
    skills: [
      { icon: <FaReact />, url: "https://react.dev" },
      { icon: <SiDrizzle />, url: "https://orm.drizzle.team" },
      { icon: <SiShadcnui />, url: "https://ui.shadcn.com" },
      { icon: <SiPandas />, url: "https://pandas.pydata.org" },
      { icon: <SiGeopandas />, url: "https://geopandas.org" },
      {
        icon: <SiFolium />,
        url: "https://python-visualization.github.io/folium/latest/",
      },
      { icon: <SiMermaid />, url: "https://mermaid.js.org" },
      { icon: <SiScikitlearn />, url: "https://scikit-learn.org" },
      { icon: <SiCytoscapedotjs />, url: "https://js.cytoscape.org" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { icon: <VscAzure />, url: "https://azure.microsoft.com" },
      { icon: <SiNetlify />, url: "https://www.netlify.com" },
      { icon: <FaDocker />, url: "https://www.docker.com" },
      { icon: <SiGithubactions />, url: "https://github.com/features/actions" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { icon: <FaGitAlt />, url: "https://git-scm.com" },
      { icon: <VscGithubAlt />, url: "https://github.com" },
      { icon: <VscVscode />, url: "https://code.visualstudio.com" },
      { icon: <SiJupyter />, url: "https://jupyter.org" },
      { icon: <SiPycharm />, url: "https://www.jetbrains.com/pycharm/" },
      { icon: <SiIntellijidea />, url: "https://www.jetbrains.com/idea/" },
      { icon: <SiEclipseide />, url: "https://eclipseide.org" },
      { icon: <FaFigma />, url: "https://www.figma.com" },
    ],
  },
];

const colors = ["#A32B0A", "#426100", "#005E8A", "#705000"];

export function Skills() {
  return (
    <div className="grid grid-cols-1 gap-8 p-6 text-center text-white sm:grid-cols-2 lg:grid-cols-3">
      {skillsData.map((category, index) => (
        <Card
          key={index}
          className="p-4 text-white shadow-md"
          style={{ backgroundColor: colors[index % colors.length] }}
        >
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 items-center justify-center gap-6 p-4">
            {category.skills.map((skill, idx) => (
              <LinkPreview
                key={idx}
                className="relative flex items-center justify-center"
                url={skill.url}
              >
                <div className="text-5xl text-white sm:text-6xl md:text-7xl">
                  {skill.icon}
                </div>
              </LinkPreview>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
