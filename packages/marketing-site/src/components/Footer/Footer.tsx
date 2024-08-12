import type { ReactNode } from "react";
import Image from "next/image";
import { Separator } from "~/components";
import { Container } from "~/layouts";
import Link from "~/lib/next";
import type { Link as LinkType, Logo } from "./types";

interface FooterProps {
  additionalLinks: LinkType[];
  copyright: string;
  cta1: ReactNode;
  cta2: ReactNode;
  links: LinkType[][];
  logo: Logo;
  socials: ReactNode;
  background: string;
  withBanner?: boolean;
}

const Footer = ({
  additionalLinks,
  copyright,
  cta1,
  cta2,
  links,
  logo,
  socials,
  background,
}: FooterProps) => (
  <section className="bg-brand-dark-700">
    <footer className="relative overflow-hidden">
      <Image
        alt="Footer background illustration"
        src={background}
        className="absolute left-1/2 top-0 h-full min-w-[1460px] -translate-x-1/2 object-cover object-top"
      />
      <Container variant="tertiary">
        <div className="flex w-full max-w-screen-2xl flex-col items-center gap-10 pb-4 pt-20 md:items-stretch md:gap-[86px] md:pb-[92px] md:pt-[100px]">
          <div className="flex w-full flex-col items-center justify-between gap-12 md:flex-row md:items-start">
            <div className="flex w-min flex-col items-center gap-10 md:gap-6">
              <div className="flex h-[58px] w-[220px] items-center justify-center">
                <Link href={logo.href}>{logo.icon}</Link>
              </div>
              {cta1}
            </div>
            <div className="flex w-full flex-col items-center justify-end gap-10 md:items-end md:gap-12 md:pt-[26px] xl:w-full xl:flex-row xl:items-start xl:gap-8 xl:pt-4">
              <div className="flex flex-wrap gap-4 pt-0 md:gap-6 xl:pt-2.5">
                {links.map((linksChunk, index) => (
                  <div
                    className="flex w-[98px] flex-col flex-wrap gap-4 md:w-[110px] md:gap-6"
                    key={index}
                  >
                    {linksChunk.map(({ label, href }, index) => (
                      <Link href={href} key={index}>
                        <p className="font-sans text-button-large text-white transition-[color] duration-300 ease-in-out hover:text-brand-gray-300 active:text-brand-yellow-200">
                          {label}
                        </p>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="ml-auto mr-auto w-full max-w-[346px] self-start md:mr-0 xl:ml-0">
                {cta2}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 md:pl-2.5">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex gap-4">
                  {additionalLinks.map(({ href, label }, index) => (
                    <Link href={href} key={index}>
                      <p className="font-sans text-body2 text-brand-gray-300">
                        {label}
                      </p>
                    </Link>
                  ))}
                </div>
                {socials}
              </div>
              <Separator className="bg-brand-dark-500" />
            </div>
            <div className="flex w-[206px] items-center justify-center gap-2 md:w-full">
              <p className="text-center font-mono text-[0.75rem] uppercase leading-6 text-brand-gray-300">
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  </section>
);

export type { FooterProps };
export { Footer };
