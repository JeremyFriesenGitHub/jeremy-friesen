import { cn } from "~/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 text-white font-mono", className,)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className={cn("group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none text-white font-mono", className, )}>
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2 font-mono">
        {icon}
        <div className="mt-2 mb-2 font-bold text-white dark:text-neutral-200 font-mono">
          {title}
        </div>
        <div className="font-mono text-xs font-normal text-white dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
