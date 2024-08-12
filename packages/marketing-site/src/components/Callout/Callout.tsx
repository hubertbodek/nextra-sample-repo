import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";
import alertTriangle from "./assets/alert-triangle.svg";
import bulb from "./assets/bulb.svg";
import informationCircleBlue from "./assets/information-circle-blue.svg";
import informationCircleRed from "./assets/information-circle-red.svg";
import { Slash } from "./Slash";

const icons = {
  error: {
    alt: "Error Icon",
    height: 32,
    src: informationCircleRed,
    width: 32,
  },
  info: {
    alt: "Info Icon",
    height: 32,
    src: informationCircleBlue,
    width: 32,
  },
  success: {
    alt: "Success Icon",
    height: 32,
    src: bulb,
    width: 32,
  },
  warning: {
    alt: "Warning Icon",
    height: 32,
    src: alertTriangle,
    width: 32,
  },
};

const calloutVariants = cva(
  "text-white border-t mt-4 p-6 flex flex-col gap-[28px]",
  {
    variants: {
      variant: {
        error: "bg-brand-danger-50 border-brand-danger-500",
        info: "bg-brand-info-50 border-brand-info-500",
        success: "bg-brand-code-green-dark border-brand-success-500",
        warning: "bg-brand-warning-50 border-brand-warning-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const slashVariants = cva("", {
  variants: {
    variant: {
      error: "fill-brand-danger-500",
      info: "fill-brand-info-500",
      success: "fill-brand-success-500",
      warning: "fill-brand-warning-500",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface CalloutProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  asChild?: boolean;
  children: ReactNode;
  title: string;
}

const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ asChild, children, className, title, variant }, ref) => {
    const Comp = asChild ? Slot : "div";
    const icon = icons[variant ?? "info"];

    return (
      <Comp
        className={cn(
          calloutVariants({
            className,
            variant,
          }),
        )}
        ref={ref}
      >
        <div className="flex items-center gap-4">
          <Image
            alt={icon.alt}
            height={icon.height}
            src={icon.src}
            width={icon.width}
          />
          <p>{title}</p>
        </div>
        <div className="flex gap-2.5">
          <div className="flex h-7 w-5 items-center justify-center">
            <Slash className={cn(slashVariants({ variant }))} />
          </div>
          <div className="text-body1">{children}</div>
        </div>
      </Comp>
    );
  },
);

Callout.displayName = "Quote";

export type { CalloutProps };
export { Callout };
