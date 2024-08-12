import type { ReactNode } from "react";
import Image from "next/image";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const testimonialVariants = cva("", {
  variants: {
    variant: {
      dark: "bg-brand-dark-700",
      light: "bg-transparent",
    },
    spacing: {
      md: "gap-6 md:gap-8",
      lg: "gap-6 md:gap-10",
    },
  },
  defaultVariants: {
    spacing: "md",
    variant: "dark",
  },
});

const fontVariants = cva("text-white", {
  variants: {
    size: {
      lg: "text-body1 md:text-2xl [&>p]:text-body1 md:[&>p]:text-2xl",
    },
    font: {
      italic: "italic",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

interface TestimonialProps
  extends VariantProps<typeof testimonialVariants>,
    VariantProps<typeof fontVariants> {
  avatar: string;
  children: ReactNode;
  quoted: string;
}

export const Testimonial = ({
  avatar,
  children,
  quoted,
  variant,
  font,
  spacing,
  size,
}: TestimonialProps) => (
  <div
    className={cn(
      "my-10 grid grid-cols-[1px_minmax(0,1fr)] py-6 pl-3 pr-10 md:p-10",
      testimonialVariants({ variant, spacing }),
    )}
  >
    <div className="h-full w-px bg-brand-yellow-500" />
    <div
      className={cn("flex flex-col", [
        testimonialVariants({ spacing, variant }),
      ])}
    >
      <div className={cn(fontVariants({ font, size }))}>{children}</div>
      {avatar || quoted ? (
        <div className="flex items-center gap-3">
          {avatar && (
            <Image
              alt="Avatar"
              className="rounded-[40px] border border-brand-yellow-500"
              src={avatar}
              height={40}
              width={40}
            />
          )}
          {quoted && (
            <p className="text-body1-mobile text-brand-gray-300 md:text-body1">
              {quoted}
            </p>
          )}
        </div>
      ) : null}
    </div>
  </div>
);
