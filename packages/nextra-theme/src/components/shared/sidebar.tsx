import Link from "next/link";
import cn from "clsx";
import { ReactNode, useState } from "react";
import { LayoutLeft } from "~/icons/layout-left";
import { LayoutRight } from "~/icons/layout-right";
import { Collapse } from "../collapse";
import { Folder } from "../sidebar";
import { PageItem } from "nextra/normalize-pages";
import { Search } from "../search";

export interface LinkProps {
  href: string;
  isActive: boolean;
  label: string;
}

export type SidebarItem = LinkProps | { label: string; items: LinkProps[] };

export interface SidebarProps {
  before?: ReactNode;
  items: SidebarItem[];
  tabs?: ReactNode;
  withSearch?: boolean;
}

const isDropdown = (
  item: SidebarItem,
): item is { label: string; items: LinkProps[] } =>
  typeof item === "object" && "items" in item;

export const Sidebar = ({
  before,
  items,
  tabs,
  withSearch = false,
}: SidebarProps) => {
  const [showSidebar, setSidebar] = useState(true);
  const [showToggleAnimation, setToggleAnimation] = useState(false);
  return (
    <aside className="nx-hidden nx-shrink-0 lg:nx-flex nx-flex-col nx-gap-4 nx-sticky nx-top-[84px] nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] bg-brand-dark-700">
      <Collapse isOpen={showSidebar} horizontal>
        <div className="nx-flex nx-flex-col nx-w-[290px] nx-overflow-y-auto nx-overflow-x-hidden nx-grow nx-h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] nextra-scrollbar">
          {tabs}
          <ul className="nx-flex nx-flex-col pt-4 nx-gap-0.5">
            {before}
            {items?.map((item, index) => {
              if (!isDropdown(item)) {
                const { href, isActive, label } = item;

                return (
                  <li className="nx-flex" key={index}>
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
                );
              }

              const { label, items } = item;

              const normalizedItems = items.map(
                (item) =>
                  ({
                    name: item.label,
                    title: item.label,
                    href: item.href,
                    route: item.href,
                    kind: "MdxPage",
                  }) as PageItem,
              );

              return (
                <Folder
                  key={index}
                  item={{
                    kind: "Folder",
                    type: "",
                    route: "",
                    name: label,
                    title: label,
                    children: normalizedItems,
                  }}
                  anchors={[]}
                />
              );
            })}
          </ul>
        </div>
      </Collapse>
      <div
        className={cn(
          "nx-sticky nx-bottom-0 nx-bg-brand-dark-500 nx-flex nx-flex-col",
        )}
        data-toggle-animation={
          showToggleAnimation ? (showSidebar ? "show" : "hide") : "off"
        }
      >
        <div
          className={cn(
            "nx-h-px nx-mb-2",
            showSidebar ? "nx-bg-brand-gray-950" : "nx-bg-transparent",
          )}
        />
        <button
          className={cn(
            "nx-inline-flex nx-items-center nx-gap-2 nx-text-body2 nx-mb-4 nx-h-5 px-4",
            showSidebar && "nx-ml-auto",
          )}
          title={showSidebar ? "Hide sidebar" : "Show sidebar"}
          onClick={() => {
            setSidebar(!showSidebar);
            setToggleAnimation(true);
          }}
        >
          {showSidebar && <span>Collapse</span>}
          {showSidebar ? <LayoutLeft /> : <LayoutRight />}
        </button>
      </div>
    </aside>
  );
};
