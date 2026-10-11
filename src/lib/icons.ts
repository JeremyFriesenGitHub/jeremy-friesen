import type { IconType } from "react-icons";
import { BiLogoFlask } from "react-icons/bi";
import {
  FaAws,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaLinkedinIn,
  FaLinux,
  FaMasksTheater,
  FaNode,
  FaPython,
  FaReact,
  FaYoutube,
} from "react-icons/fa6";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io5";
import { LiaCanadianMapleLeaf } from "react-icons/lia";
import {
  LuArrowUpRight,
  LuAward,
  LuBrainCircuit,
  LuBriefcase,
  LuChartLine,
  LuCode,
  LuExternalLink,
  LuFileText,
  LuGavel,
  LuGraduationCap,
  LuLaptop,
  LuMapPin,
  LuPlane,
  LuRadar,
  LuRocket,
  LuSatellite,
  LuShieldCheck,
  LuTrophy,
  LuUsersRound,
  LuWaypoints,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiArduino,
  SiCplusplus,
  SiDevpost,
  SiDrizzle,
  SiDuckdb,
  SiExpress,
  SiFastapi,
  SiFolium,
  SiGeopandas,
  SiGithubactions,
  SiGnubash,
  SiGooglecloud,
  SiGooglegemini,
  SiIntellijidea,
  SiJupyter,
  SiKubernetes,
  SiLatex,
  SiMermaid,
  SiMongodb,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPycharm,
  SiPytorch,
  SiRaspberrypi,
  SiScikitlearn,
  SiShadcnui,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiWireshark,
} from "react-icons/si";
import { VscAzure, VscTerminalPowershell, VscVscode } from "react-icons/vsc";
import type { CommunityIcon } from "~/data/community";
import type { ProjectIcon } from "~/data/projects";
import type { SkillIcon } from "~/data/skills";

/** Icons the sections use for links, facts and awards, beyond the data files' own. */
type UiIcon =
  | "arrow-up-right"
  | "award"
  | "briefcase"
  | "devpost"
  | "external-link"
  | "file-text"
  | "gavel"
  | "graduation-cap"
  | "linkedin"
  | "map-pin"
  | "maple-leaf"
  | "trophy"
  | "youtube";

/**
 * Every icon the server-rendered sections draw, by name. They are served once,
 * as the sprite at /icons.svg (src/app/icons.svg/route.ts), and placed with
 * <use> by components/ui/icon.tsx. Inlining them instead put ~180 KB of path
 * data in the document, and again in the payload React hydrates from.
 */
export const spriteIcons = {
  python: FaPython,
  typescript: SiTypescript,
  javascript: IoLogoJavascript,
  java: FaJava,
  cpp: SiCplusplus,
  postgresql: SiPostgresql,
  html: IoLogoHtml5,
  css: IoLogoCss3,
  bash: SiGnubash,
  powershell: VscTerminalPowershell,
  nextjs: SiNextdotjs,
  react: FaReact,
  node: FaNode,
  express: SiExpress,
  flask: BiLogoFlask,
  fastapi: SiFastapi,
  tailwind: SiTailwindcss,
  playwright: FaMasksTheater,
  pytorch: SiPytorch,
  scikit: SiScikitlearn,
  numpy: SiNumpy,
  pandas: SiPandas,
  geopandas: SiGeopandas,
  folium: SiFolium,
  matplotlib: LuChartLine,
  jupyter: SiJupyter,
  gemini: SiGooglegemini,
  azure: VscAzure,
  aws: FaAws,
  gcp: SiGooglecloud,
  docker: FaDocker,
  kubernetes: SiKubernetes,
  terraform: SiTerraform,
  githubactions: SiGithubactions,
  vercel: SiVercel,
  linux: FaLinux,
  wireshark: SiWireshark,
  arkime: LuRadar,
  mongodb: SiMongodb,
  duckdb: SiDuckdb,
  drizzle: SiDrizzle,
  shadcn: SiShadcnui,
  figma: FaFigma,
  mermaid: SiMermaid,
  git: FaGitAlt,
  github: FaGithub,
  vscode: VscVscode,
  pycharm: SiPycharm,
  intellij: SiIntellijidea,
  raspberrypi: SiRaspberrypi,
  arduino: SiArduino,
  latex: SiLatex,
  // Projects and Community
  shield: LuShieldCheck,
  plane: LuPlane,
  graph: LuWaypoints,
  brain: LuBrainCircuit,
  laptop: LuLaptop,
  rocket: LuRocket,
  satellite: LuSatellite,
  workflow: LuWorkflow,
  keyboard: LuCode,
  users: LuUsersRound,
  // Links, facts and awards
  "arrow-up-right": LuArrowUpRight,
  award: LuAward,
  briefcase: LuBriefcase,
  devpost: SiDevpost,
  "external-link": LuExternalLink,
  "file-text": LuFileText,
  gavel: LuGavel,
  "graduation-cap": LuGraduationCap,
  linkedin: FaLinkedinIn,
  "map-pin": LuMapPin,
  "maple-leaf": LiaCanadianMapleLeaf,
  trophy: LuTrophy,
  youtube: FaYoutube,
} as const satisfies Record<
  SkillIcon | ProjectIcon | CommunityIcon | UiIcon,
  IconType
>;

export type SpriteIcon = keyof typeof spriteIcons;
