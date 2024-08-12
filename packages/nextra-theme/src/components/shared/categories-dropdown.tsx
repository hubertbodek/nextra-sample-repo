import Link from "next/link";
import { useRouter } from "next/router";
import cn from "clsx";
import { ChevronDown } from "~/icons/chevron-down";
import { useEffect, useState } from "react";

export interface LinkProps {
  href: string;
  isActive: boolean;
  label: string;
}

export interface CategoriesDropdownProps {
  links: LinkProps[];
}

export const CategoriesDropdown = ({ links }: CategoriesDropdownProps) => {
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);

  // Always close mobile nav when route was changed (e.g. logo click)
  useEffect(() => {
    setOpen(false);
  }, [asPath]);

  const activeLabel = links.find((link) => link.isActive);

  return (
    <div className="nx-relative z-10">
      <button
        className="nx-items-center nx-justify-between nx-h-[48px] nx-text-body1 nx-text-white nx-inline-flex nx-p-3 nx-bg-brand-dark-700 nx-w-full nx-border nx-border-brand-dark-400"
        onClick={() => setOpen(!open)}
      >
        {activeLabel?.label}
        <div className="nx-h-6 nx-w-6 items-center justify-center flex">
          <ChevronDown />
        </div>
      </button>
      {open && (
        <div className="nx-absolute nx-top-[47px] nx-w-full nx-z-50 nx-bg-brand-dark-700 nx-border nx-border-brand-dark-400 nx-p-1">
          <div className="nx-shrink-0 nx-flex nx-flex-col nx-gap-4">
            <ul className="nx-flex nx-flex-col nx-gap-0.5 w-full">
              {links.map(({ href, isActive, label }, index) => (
                <li className="nx-flex w-full" key={index}>
                  <Link
                    className={cn(
                      "nx-w-full nx-rounded-none nx-px-4 nx-py-2 nx-text-body2 nx-transition-all hover:nx-bg-brand-gray-950 hover:nx-text-white",
                      isActive && "bg-brand-dark-600",
                    )}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
