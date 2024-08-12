import { cn } from "~/utils/cn";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components";
import Link from "~/lib/next";
import { isLinksGroup } from "./helpers";
import type { HeaderLink } from "./types";

interface NavbarProps {
  links: HeaderLink[];
}

export const NavbarV2 = ({ links }: NavbarProps) => (
  <NavigationMenuList className="nav-list relative z-50 gap-2">
    {links.map((link, index) => (
      <NavigationMenuItem key={index}>
        {isLinksGroup(link) ? (
          <>
            <NavigationMenuTrigger className="nav-item px-2 py-3">
              {link.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-full overflow-hidden px-6 py-2">
              <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {link.links.map((link, index) => (
                  <li key={index} className="py-2">
                    <Link
                      href={link.href}
                      className="text-sm text-brand-dark-500 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </>
        ) : (
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "px-2 py-3",
                "nav-item",
              )}
            >
              {link.label}
            </NavigationMenuLink>
          </Link>
        )}
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
);
