import type { ReactNode } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { cn } from "~/utils/cn";
import Link from "~/lib/next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { isLinksGroup } from "./helpers";
import type { HeaderLink } from "./types";

const domAnimation = await import("~/lib/framer-motion/domAnimation").then(
  (mod) => mod.default,
);

export interface NavItem {
  label: string;
  href: string;
  component: "link" | "button";
  isActive?: boolean;
}

interface NavbarProps {
  links: HeaderLink[];
  mobileSlot: ReactNode;
  isOpen?: boolean;
  socials: ReactNode;
  offset: number;
}

export const MobileNavigation = ({
  links,
  mobileSlot,
  socials,
  offset,
  isOpen = false,
}: NavbarProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <m.div
            animate={{
              opacity: 1,
              background: "var(hsl(--dark-600))",
            }}
            exit={{
              opacity: 0,
              background: "var(hsl(--dark-500))",
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              type: "linear",
              delay: 0.2,
            }}
            className="absolute top-0 h-screen w-full bg-brand-dark-600 px-4 text-center sm:px-12 lg:hidden"
          >
            <div
              style={{ height: `calc(100svh - ${offset}px)`, top: offset }}
              className="relative overflow-y-scroll"
            >
              <div className="relative flex grow flex-col  justify-between pb-16">
                <div className="flex flex-col gap-6">{mobileSlot}</div>
                <nav className="mt-6">
                  <Accordion collapsible type="single">
                    {links.map((link, index) =>
                      isLinksGroup(link) ? (
                        <AccordionItem key={index} value={link.label}>
                          <AccordionTrigger>{link.label}</AccordionTrigger>
                          <AccordionContent>
                            <div className="ml-4 mt-3 flex flex-col gap-4 border-l border-brand-yellow-500 px-4 pb-4 pt-2">
                              {link.links.map((link, index) => (
                                <Link href={link.href} key={index}>
                                  <div
                                    className={cn(
                                      "flex items-center text-white transition-all hover:text-brand-gray-300",
                                      link.icon ? "gap-4" : "gap-2",
                                    )}
                                  >
                                    <div>
                                      <p>{link.label}</p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <AccordionItem key={index} value={link.label}>
                          <Link href={link.href} key={index}>
                            <AccordionTrigger
                              className="w-full"
                              tabIndex={-1}
                              withChevron={false}
                            >
                              {link.label}
                            </AccordionTrigger>
                          </Link>
                        </AccordionItem>
                      ),
                    )}
                  </Accordion>
                </nav>
                <div className="mb-5 mt-12 flex justify-center">{socials}</div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};
