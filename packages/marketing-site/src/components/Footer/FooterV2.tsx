import Image from "next/image";
import Link from "next/link";
import { LazyMotion, m } from "framer-motion";
import { Container } from "~/layouts";
import { Separator } from "../Separator";
import type { FooterProps } from "./Footer";

const domAnimation = await import("~/lib/framer-motion/domAnimation").then(
  (mod) => mod.default,
);

export const FooterV2 = ({
  logo,
  links,
  cta1,
  cta2,
  additionalLinks,
  socials,
  copyright,
  withBanner = true,
}: FooterProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative overflow-hidden pb-8">
        {withBanner && (
          <section className="lg:cta-shape relative z-10 flex h-[682px] flex-col items-center gap-y-10 overflow-hidden bg-brand-yellow-500 max-lg:pt-[120px] md:h-[580px] md:flex-row">
            <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-2xl flex-col justify-center px-4 text-brand-dark-500 [text-wrap:balance] max-lg:text-center sm:px-12 md:items-start">
              <h2 className="text-h1-mobile lg:text-[64px]">Start to acme!</h2>
              <p className="mt-6 text-subhead1-mobile lg:text-xl">
                Create great integration experiences for your APIs
              </p>
              {cta1}
            </div>
            <m.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-300px" }}
              className="bottom-0 right-0 z-0 max-lg:px-4 md:absolute"
            ></m.div>
          </section>
        )}
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 z-0 aspect-square w-full max-w-6xl -translate-y-1/2 translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,#fbe33275,#fbe33250,rgba(0,0,0,0),rgba(0,0,0,0))] opacity-30"
        ></div>
        <section className="min-h-[492px]">
          <Container variant="transparent">
            <div className="flex w-full flex-col items-center justify-between gap-12 md:flex-row md:items-start">
              <div className="flex w-full flex-col justify-between gap-10 pt-10 md:flex-row md:items-start md:gap-12 md:pt-16 xl:w-full xl:items-start xl:gap-8">
                <div className="flex flex-wrap gap-6 pt-0 max-md:grid max-md:grid-cols-2 xl:pt-2.5">
                  {links.map((linksChunk, index) => (
                    <div
                      className="flex w-[98px] flex-col flex-wrap gap-6 md:w-[110px]"
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
            <Separator className="invisible my-10 bg-brand-gray-800 md:visible lg:mb-6 lg:mt-[120px]" />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-between gap-y-6 md:flex-row lg:gap-10">
                <div className="flex h-[58px] w-[220px] items-center justify-center">
                  <Link href={logo.href}>{logo.icon}</Link>
                </div>
                {socials}
              </div>
              <div className="flex flex-col flex-wrap items-center gap-y-6 md:w-full md:flex-row lg:gap-2">
                <p className="flex-1 font-mono text-[0.75rem] uppercase leading-6 text-brand-gray-300">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"
                  ></span>
                  All systems operational
                </p>
                <p className="text-center font-mono text-[0.75rem] uppercase leading-6 text-brand-gray-800">
                  {copyright}
                </p>
                <div className="flex w-full flex-1 justify-between gap-4  max-md:max-w-[300px] md:justify-end">
                  {additionalLinks.map(({ href, label }, index) => (
                    <Link href={href} key={index}>
                      <p className="font-sans text-body2 text-brand-gray-800">
                        {label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </footer>
    </LazyMotion>
  );
};
