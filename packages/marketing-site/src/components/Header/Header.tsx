import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "~/components";
import { Container } from "~/layouts";
import Link from "~/lib/next";
import { HamburgerButton } from "./HamburgerButton";
import { MobileNavigation } from "./MobileNavigation";
import { NavbarV2 } from "./NavbarV2";
import type { HeaderLink } from "./types";

export interface HeaderLogo {
  href: string;
  children: ReactNode;
}

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  desktopSlot?: ReactNode;
  withBanner?: boolean;
  links: HeaderLink[];
  mobileSlot?: ReactNode;
  logo: HeaderLogo;
  socials: ReactNode;
}

const HEADER_HEIGHT = 64;
const MOBILE_BANNER_HEIGHT = 40;

export const Header = ({
  desktopSlot,
  withBanner,
  links,
  logo,
  mobileSlot,
  socials,
  ...props
}: HeaderProps) => {
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
  }, [isOpen]);

  const offset = withBanner
    ? HEADER_HEIGHT + MOBILE_BANNER_HEIGHT
    : HEADER_HEIGHT;

  return (
    <header
      className="sticky top-0 z-50 w-full bg-brand-yellow-500"
      ref={stickyHeaderRef}
    >
      <NavigationMenu className="bg-brand-yellow-500">
        <MobileNavigation
          isOpen={isOpen}
          links={links}
          mobileSlot={mobileSlot}
          socials={socials}
          offset={offset + 40}
        />

        <div className="relative box-content flex h-14 w-full items-center border-b border-brand-yellow-600 bg-brand-yellow-500 md:h-24">
          <Container
            overflow="none"
            {...props}
            className="relative z-20 mx-auto w-full bg-brand-yellow-500 lg:py-4"
          >
            <div className="relative z-10 flex h-full w-full items-center gap-x-8 max-lg:justify-between">
              <Link href={logo.href}>{logo.children}</Link>
              <div className="relative z-30 hidden w-full items-center justify-between gap-8 lg:flex">
                <NavbarV2 links={links} />
                {desktopSlot}
              </div>
              <HamburgerButton
                onClick={() => setIsOpen((o) => !o)}
                isOpen={isOpen}
                className="lg:hidden"
              />
            </div>
          </Container>
        </div>
      </NavigationMenu>
    </header>
  );
};
