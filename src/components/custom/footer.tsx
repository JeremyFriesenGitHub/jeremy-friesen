import { VscAzure } from "react-icons/vsc";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { LinkPreview } from "~/components/ui/link-preview";

export function Footer() {
    return (   
    <>
         <p className="mt-20 items-center justify-center text-center text-white">Made with</p><div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <LinkPreview className="relative text-white items-center justify-center" url="https://azure.microsoft.com/en-ca">
                <VscAzure size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://nextjs.org">
                <TbBrandNextjs size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://react.dev">
                <FaReact size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://tailwindcss.com">
                <SiTailwindcss size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
            <LinkPreview className="relative text-white items-center justify-center" url="https://www.typescriptlang.org">
                <SiTypescript size={40} className="sm:size-10 md:size-20" />
            </LinkPreview>{" "}
        </div>
    </>
    );
}
