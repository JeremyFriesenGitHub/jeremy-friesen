import { SiVercel } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { LinkPreview } from "~/components/ui/link-preview";

export function Footer() {
  return (
    <>
      <p className="mt-20 items-center justify-center text-center text-white">
        Website made with:
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
        <LinkPreview
          className="relative items-center justify-center text-white"
          url="https://vercel.com"
        >
          <SiVercel size={40} className="sm:size-10 md:size-20" />
        </LinkPreview>{" "}
        <LinkPreview
          className="relative items-center justify-center text-white"
          url="https://nextjs.org"
        >
          <TbBrandNextjs size={40} className="sm:size-10 md:size-20" />
        </LinkPreview>{" "}
        <LinkPreview
          className="relative items-center justify-center text-white"
          url="https://react.dev"
        >
          <FaReact size={40} className="sm:size-10 md:size-20" />
        </LinkPreview>{" "}
        <LinkPreview
          className="relative items-center justify-center text-white"
          url="https://tailwindcss.com"
        >
          <SiTailwindcss size={40} className="sm:size-10 md:size-20" />
        </LinkPreview>{" "}
        <LinkPreview
          className="relative items-center justify-center text-white"
          url="https://www.typescriptlang.org"
        >
          <SiTypescript size={40} className="sm:size-10 md:size-20" />
        </LinkPreview>{" "}
      </div>
    </>
  );
}
