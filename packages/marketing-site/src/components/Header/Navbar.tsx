import Image from "next/image";
import { cn } from "~/utils/cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components";
import { chevronRight } from "~/icons";
import Link from "~/lib/next";
import grid from "./assets/grid.png";
import { isLinksGroup } from "./helpers";
import type { HeaderLink } from "./types";

interface NavbarProps {
  links: HeaderLink[];
}

export const Navbar = ({ links }: NavbarProps) => (
  <NavigationMenu>
    <NavigationMenuList className="gap-6">
      {links.map((link, index) => (
        <NavigationMenuItem key={index}>
          {isLinksGroup(link) ? (
            <>
              <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
              <NavigationMenuContent className="overflow-hidden">
                <div className="relative z-10">
                  <Image
                    className="absolute -bottom-6 -right-6 -z-10"
                    alt="Grid"
                    height={252}
                    src={grid}
                    width={298}
                  />
                  <ul className="flex flex-col gap-4">
                    {link.links.map((link, index) => (
                      <li key={index}>
                        <Link href={link.href}>
                          <div
                            className={cn(
                              "flex items-center text-white transition-all hover:text-brand-gray-300",
                              link.icon ? "gap-6" : "gap-2",
                            )}
                          >
                            {link.icon ? (
                              <span className="flex h-10 w-10 items-center justify-center border border-brand-dark-400 bg-brand-dark-600">
                                <Image
                                  alt={link.icon.alt}
                                  height={link.icon.height}
                                  src={link.icon.src}
                                  width={link.icon.width}
                                />
                              </span>
                            ) : (
                              <span className="flex h-4 w-4 items-center justify-center">
                                <Image
                                  alt="Chevron right"
                                  height={8}
                                  src={chevronRight.default}
                                  width={8}
                                />
                              </span>
                            )}
                            <div className="w-max min-w-[124px] max-w-[280px]">
                              <p className="">{link.label}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </>
          ) : (
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.label}
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
