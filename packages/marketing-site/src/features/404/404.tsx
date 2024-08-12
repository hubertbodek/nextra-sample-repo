import Image from "next/image";
import { Button } from "~/components";
import { ArrowIcon } from "~/icons";
import { Container } from "~/layouts";
import Link from "~/lib/next";
import grid from "./assets/grid.png";

export interface NotFoundProps {
  button: {
    label: string;
    href: string;
  };
  description: string;
  title: string;
}

export const NotFound = ({ button, description, title }: NotFoundProps) => (
  <Container className="relative">
    <section className="mx-auto flex max-w-[1060px] flex-col items-center py-[60px] md:py-[120px]">
      <Image
        alt="Grid"
        className="absolute top-0"
        height={700}
        src={grid}
        width={700}
      />
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-h2-mobile text-white  md:text-h2">{title}</h1>
          <p className="text-subhead1-mobile text-brand-gray-300 md:text-subhead1">
            {description}
          </p>
        </div>
        <Link href={button.href}>
          <Button asChild size="lg">
            <div>
              {button.label} <ArrowIcon />
            </div>
          </Button>
        </Link>
      </div>
    </section>
  </Container>
);
