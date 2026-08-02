export interface Project {
  title: string;
  description: string;
  url: string;
  images: { src: string; alt: string }[];
  color: string;
  colorLight: string;
  iconName: string;
  colSpan: number;
}

export const projects: Project[] = [
  {
    title: "Prodly",
    description: "An AI Productivity Platform",
    url: "https://jeremyfriesengithub.github.io/prodly/",
    images: [
      { src: "/test7.png", alt: "prodly landing page" },
      { src: "/test8.png", alt: "pomodoro timer" },
    ],
    color: "#c48ae8",
    colorLight: "#7822ae",
    iconName: "LuTimer",
    colSpan: 2,
  },
  {
    title: "CAIS",
    description: "Carleton AI Society docs",
    url: "https://carletonai.github.io/docs/",
    images: [{ src: "/test9.png", alt: "CAIS Docs" }],
    color: "#e88a8a",
    colorLight: "#9d1f1f",
    iconName: "SiGoogledocs",
    colSpan: 1,
  },
  {
    title: "cuTunnel",
    description:
      "A web app that helps people navigate Carleton's underground tunnel system",
    url: "https://devpost.com/software/cu-tunnels",
    images: [
      { src: "/test.png", alt: "cuTunnel Preview" },
      { src: "/test6.png", alt: "cuTunnel Slides" },
    ],
    color: "#e8907a",
    colorLight: "#8f3018",
    iconName: "PiGraphFill",
    colSpan: 2,
  },
  {
    title: "cuHacking",
    description: "Carleton's official hackathon",
    url: "https://cuhacking.ca",
    images: [{ src: "/test2.png", alt: "cuHacking Docs" }],
    color: "#7dd49e",
    colorLight: "#1e5b35",
    iconName: "RiComputerLine",
    colSpan: 1,
  },
  {
    title: "Statsbomb DBMS",
    description: "An open-source DBMS",
    url: "https://github.com/JeremyFriesenGitHub/Statsbomb_DBMS",
    images: [{ src: "/test3.png", alt: "Code from Statsbomb" }],
    color: "#6ec4e8",
    colorLight: "#125672",
    iconName: "GoDatabase",
    colSpan: 1,
  },
  {
    title: "A.I. Snowday Predictor",
    description:
      "An open-source snowday predictor using live data and Artificial Intelligence",
    url: "https://github.com/JeremyFriesenGitHub/ai-snow-day-predictor",
    images: [
      { src: "/test4.png", alt: "Graph 1 of weather stats" },
      { src: "/test5.png", alt: "Graph 2 of weather stats" },
    ],
    color: "#e8c05a",
    colorLight: "#664d0e",
    iconName: "GiArtificialIntelligence",
    colSpan: 2,
  },
];
