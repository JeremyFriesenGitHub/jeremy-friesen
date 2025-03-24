import { FaPython } from "react-icons/fa";
import { LinkPreview } from "~/components/ui/link-preview";
import { SiPostgresql, SiTypescript } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { SiExpress } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { SiTailwindcss} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiDrizzle } from "react-icons/si";
import { SiShadcnui } from "react-icons/si";
import { SiPandas } from "react-icons/si";
import { SiGeopandas } from "react-icons/si";
import { SiFolium } from "react-icons/si";
import { SiMermaid } from "react-icons/si";
import { SiScikitlearn } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { SiNetlify } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { SiGithubactions } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";
import { VscGithubAlt } from "react-icons/vsc";
import { VscVscode } from "react-icons/vsc";
import { SiJupyter } from "react-icons/si";
import { SiPycharm } from "react-icons/si";
import { SiIntellijidea } from "react-icons/si";
import { SiEclipseide } from "react-icons/si";


export function Skills() {
    return (   
    <>
         <p className="mt-20 items-center justify-center text-center text-white">Languages:</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.python.org">
                <FaPython size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}

            <LinkPreview className="relative text-white items-center justify-center" url="https://www.postgresql.org">
                <SiPostgresql size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}

            <LinkPreview className="relative text-white items-center justify-center" url="https://www.typescriptlang.org">
                <SiTypescript size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}

            <LinkPreview className="relative text-white items-center justify-center" url="https://www.java.com">
                <FaJava size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}

        </div>

        <p className="mt-20 items-center justify-center text-center text-white">Frameworks:</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://nextjs.org">
                <TbBrandNextjs size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://expressjs.com">
                <SiExpress size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://flask.palletsprojects.com">
                <BiLogoFlask size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://tailwindcss.com">
                <SiTailwindcss size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
        </div>

        
        <p className="mt-20 items-center justify-center text-center text-white">Libraries:</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://react.dev">
                <FaReact size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://orm.drizzle.team">
                <SiDrizzle size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://ui.shadcn.com">
                <SiShadcnui size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://pandas.pydata.org">
                <SiPandas size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://geopandas.org">
                <SiGeopandas size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://python-visualization.github.io/folium/latest/">
                <SiFolium size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://mermaid.js.org">
                <SiMermaid size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://scikit-learn.org">
                <SiScikitlearn size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
        </div>

        
        <p className="mt-20 items-center justify-center text-center text-white">DevOps:</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://azure.microsoft.com">
                <VscAzure size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.netlify.com">
                <SiNetlify size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.docker.com">
                <FaDocker size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://github.com/features/actions">
                <SiGithubactions size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
        </div>

        <p className="mt-20 items-center justify-center text-center text-white">Tools:</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://git-scm.com">
                <FaGitAlt size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://github.com">
                <VscGithubAlt size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://code.visualstudio.com">
                <VscVscode size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://jupyter.org">
                <SiJupyter size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.jetbrains.com/pycharm/">
                <SiPycharm size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.jetbrains.com/idea/">
                <SiIntellijidea size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://eclipseide.org">
                <SiEclipseide size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
        </div>



    </>
    );
}
