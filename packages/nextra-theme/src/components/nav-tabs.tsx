import Link from "next/link";
import cn from "clsx";

interface TabProps {
  label: string;
  route: string;
  active: boolean;
}

interface TabsProps {
  tabs: TabProps[];
}

export const NavTabs = ({ tabs }: TabsProps) => {
  return (
    <div className="nx-flex nx-flex-wrap nx-gap-6 nx-pb-4 nx-justify-center md:nx-justify-start ">
      {tabs.map(({ active, label, route }, i) => (
        <Link
          href={route}
          className={cn(
            "nx-text-xl md:nx-text-sm nx-text-primary-gray-800",
            active && "nx-font-bold md:nx-font-normal nx-text-white",
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
